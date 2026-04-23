import React, { useState, useEffect } from "react";
import styles from "../styles/Item.module.css";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../components/Cart";
import axios from "axios";
import { API_BASE_URL, toBackendUrl } from "../config/backend";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [count, setCount] = useState(1);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/${id}`);
      setProduct(response.data[0]);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (!product) {
    return <h2>Product not found!</h2>;
  }

  const discount = product.discount_price
    ? Math.round(((product.price - product.discount_price) / product.price) * 100)
    : 0;

  const handleIncrement = () => setCount((prev) => prev + 1);
  const handleDecrement = () => {
    if (count > 1) setCount((prev) => prev - 1);
  };

  const handleAddToCart = () => {
    addToCart(product, count);
  };

  return (
    <section className={styles.Container}>
      <div className={styles.itemContainer}>
        <div className={styles.imgContainer}>
          <img src={toBackendUrl(product.image)} alt={product.title} />
        </div>
        <div className={styles.txtContainer}>
          <h2>{product.title}</h2>
          <div className={styles.priceContainer}>
            <div className={styles.price}>
              <h3>${product.discont_price * count}</h3>
              {product.price && <h4>${product.price * count}</h4>}
            </div>
            {discount !== 0 && (
              <div className={styles.sale}>
                <span className={styles.discountBadge}>-{discount}%</span>
              </div>
            )}
            <div className={styles.plusBtnContainer}>
              <div className={styles.plus}>
                <button onClick={handleDecrement}>-</button>
                <input type="text" value={count} readOnly />
                <button onClick={handleIncrement}>+</button>
              </div>
              <Link to="/cart">
                <button className={styles.addToCart} onClick={handleAddToCart}>
                  Add to cart
                </button>
              </Link>
            </div>
            <div className={styles.txtDescription}>
              <h5>Description</h5>
              <p>{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
