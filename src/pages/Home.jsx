import React, { useEffect, useState } from "react";
import { fetchProducts, fetchCategories } from "../fetch-data/fetchData";
import styles from "../styles/Home.module.css";
import img from "../assets/img.svg";
import img4Pets from "../assets/image4Pets.svg";
import { Link } from "react-router-dom";
import DiscountForm from "../components/DiscountForm";
import { useCart } from "../components/Cart";
import { toBackendUrl } from "../config/backend";

export default function Home() {
  const { addToCart } = useCart();
  const [saleItems, setSaleItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formHidden, setFormHidden] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      const products = await fetchProducts();
      const discountedItems = products
        .filter((item) => item.discont_price && item.discont_price < item.price)
        .slice(0, 4);

      setSaleItems(discountedItems);
    };

    loadProducts();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const loadCategories = async () => {
      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories.slice(0, 4));
    };

    loadCategories();
  }, []);

  const handleAddToCart = (product) => {
    addToCart({ ...product, count: 1 });
  };

  return (
    <div className={styles.homePageContainer}>
      <div className={styles.homeImg}>
        <img src={img} alt="Amazing Discounts" />
        <div className={styles.homeTextContainer}>
          <h1>Amazing Discounts on Pets Products!</h1>
          <Link to="/discounted">
            <button className={styles.checkOut}>Check out</button>
          </Link>
        </div>
      </div>

      <section className={styles.categoriesContainer}>
        <div className={styles.saleHeader}>
          <h2>Categories</h2>
          <div className={styles.line}></div>
          <Link to="/categories">
            <button>All categories</button>
          </Link>
        </div>

        <div className={styles.saleProducts}>
          {categories.map((category) => (
            <div key={category.id} className={styles.productCard}>
              <Link
                to={`/category/${category.id}`}
                className={styles.productLink}
              >
                <div className={styles.imageWrapper}>
                  <img
                    src={toBackendUrl(category.image)}
                    alt={category.title}
                  />
                </div>
              </Link>
              <h4>{category.title}</h4>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.discountContainer}>
        <h2>5% off on the first order</h2>
        <div
          className={`${styles.imgRegistration} ${formHidden ? styles.centered : ""}`}
        >
          <img src={img4Pets} alt="4 Pets" className={styles.petsImage} />
          <DiscountForm onHidden={setFormHidden} />
        </div>
      </section>

      <section className={styles.saleContainer}>
        <div className={styles.saleHeader}>
          <h2>Sale</h2>
          <div className={styles.line}></div>
          <Link to="/discounted">
            <button>All sales</button>
          </Link>
        </div>
        <div className={styles.saleProducts}>
          {saleItems.map((item) => {
            const discount = Math.round(
              ((item.price - item.discont_price) / item.price) * 100,
            );
            return (
              <div key={item.id} className={styles.productCard}>
                <Link to={`/item/${item.id}`} className={styles.productLink}>
                  <div className={styles.imageWrapper}>
                    <img src={toBackendUrl(item.image)} alt={item.title} />
                    <span className={styles.discountBadge}>-{discount}%</span>
                  </div>
                </Link>
                <h4>{item.title}</h4>
                <div className={styles.prices}>
                  <h3>${item.discont_price}</h3>
                  <p>${item.price}</p>
                </div>
                <button
                  className={styles.addToCart}
                  onClick={() => handleAddToCart(item)}
                >
                  Add to Cart
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
