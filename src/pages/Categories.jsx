import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchCategories } from "../fetch-data/fetchData";
import styles from "../styles/Categories.module.css";
import { toBackendUrl } from "../config/backend";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const loadCategories = async () => {
      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories);
    };
    loadCategories();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.categories}>Categories</h1>
      <div className={styles.categoriesList}>
        {categories.map((category) => (
          <Link key={category.id} to={`/category/${category.id}`} className={styles.categoryItem}>
            <img src={toBackendUrl(category.image)} alt={category.title} />
            <h3>{category.title}</h3>
            <p>{category.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
