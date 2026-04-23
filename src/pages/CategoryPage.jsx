import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../components/Cart";
import { fetchCategories, fetchProducts } from "../fetch-data/fetchData";
import styles from "../styles/CategoryPage.module.css";
import { toBackendUrl } from "../config/backend";

const CategoryPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [categoryTitle, setCategoryTitle] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  useEffect(() => {
    const loadData = async () => {
      const fetchedCategories = await fetchCategories();
      const fetchedProducts = await fetchProducts();
      const category = fetchedCategories.find((cat) => cat.id === parseInt(id));
      setCategories(fetchedCategories);
      setProducts(fetchedProducts.filter((prod) => prod.categoryId === parseInt(id)));
      setCategoryTitle(category ? category.title : "All Products");
    };
    loadData();
  }, [id]);

  const handleAddToCart = (product) => {
    addToCart({ ...product, count: 1 });
  };

  return (
    <section className={styles.productsContainer}>
      <div className={styles.products}>
        <h1>{categoryTitle}</h1>
        <div className={styles.list}>
          {products.map((item) => {
            const discount =
              item.discont_price ? Math.round(((item.price - item.discont_price) / item.price) * 100) : 0;
            return (
              <div key={item.id} className={styles.productCard}>
                <div className={styles.imageWrapper}>
                  <Link to={`/item/${item.id}`}>
                    <img src={toBackendUrl(item.image)} alt={item.title} />
                  </Link>
                  {item.discont_price && <span className={styles.discountBadge}>-{discount}%</span>}
                </div>
                <h4 className={styles.txt}>{item.title}</h4>
                <div className={styles.prices}>
                  {item.discont_price && <p className={styles.priceBlue}>${item.discont_price}</p>}
                  <h3 className={item.discont_price ? styles.priceGray : styles.priceBlue}>
                    ${item.price}
                  </h3>
                </div>
                <button className={styles.addToCart} onClick={() => handleAddToCart(item)}>
                  Add to Cart
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryPage;
