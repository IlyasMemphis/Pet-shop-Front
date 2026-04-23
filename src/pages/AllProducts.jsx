import React, { useState, useEffect } from "react";
import styles from "../styles/AllProducts.module.css";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../components/Cart";
import { fetchCategories, fetchProducts } from "../fetch-data/fetchData";
import { toBackendUrl } from "../config/backend";

export default function AllProducts() {
  const location = useLocation();
  const { addToCart } = useCart();

  const [filter, setFilter] = useState({
    minPrice: "",
    maxPrice: "",
    discountOnly: location.state?.discountOnly || false,
    categoryId: getCategoryFromURL(),
    sortBy: "default"
  });

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  function getCategoryFromURL() {
    const params = new URLSearchParams(location.search);
    return params.get("categoryId") || "All";
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        const fetchedProducts = await fetchProducts();

        if (Array.isArray(fetchedCategories)) {
          setCategories(fetchedCategories);
        } else {
          throw new Error("Invalid category format");
        }

        if (Array.isArray(fetchedProducts)) {
          setProducts(fetchedProducts);
        } else {
          throw new Error("Invalid products format");
        }
      } catch (error) {
        setError("Error loading data");
        console.error(error);
      }
    };

    loadData();
  }, []);

  const filteredItems = Array.isArray(products)
    ? products
        .filter(item =>
          (!filter.minPrice || item.price >= parseFloat(filter.minPrice)) &&
          (!filter.maxPrice || item.price <= parseFloat(filter.maxPrice)) &&
          (!filter.discountOnly || item.discont_price) &&
          (filter.categoryId === "All" || item.categoryId === +filter.categoryId)
        )
        .sort((a, b) => {
          if (filter.sortBy === "priceAsc") return a.price - b.price;
          if (filter.sortBy === "priceDesc") return b.price - a.price;
          if (filter.sortBy === "name") return a.title.localeCompare(b.title);
          return 0;
        })
    : [];

  const handleAddToCart = (product) => {
    addToCart({ ...product, count: 1 });
  };

  const categoryTitles = {
    All: "All Products",
    Food: "Dry & Wet Food",
    Beds: "Baskets & Beds",
    Accessories: "Accessories",
    Toys: "Toys",
    Care: "Care & Grooming",
    Snacks: "Snacks & Supplements",
    Fencing: "Runs & Fencing",
    Scratching: "Trees & Scratching"
  };

  useEffect(() => {
    if (filter.discountOnly) {
      const timer = setTimeout(() => {
        setShowDiscountContainer(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [filter.discountOnly]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setFilter(prev => ({
      ...prev,
      categoryId: params.get("categoryId") ? Number(params.get("categoryId")) : "All"
    }));
  }, [location.search]);

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <section className={styles.productsContainer}>
      <div className={styles.products}>
        <h1>{categoryTitles[filter.categoryId] || "All Products"}</h1>
        <div className={styles.filter}>
          <div className={styles.priceFilter}>
            <p>Price</p>
            <input type="number" placeholder="from" onChange={(e) => setFilter({ ...filter, minPrice: e.target.value })} />
            <input type="number" placeholder="to" onChange={(e) => setFilter({ ...filter, maxPrice: e.target.value })} />
          </div>
          <div className={styles.discountFilter}>
            <p>Discounted items</p>
            <input type="checkbox" onChange={(e) => setFilter({ ...filter, discountOnly: e.target.checked })} />
          </div>
          <div className={styles.categoryFilter}>
            <p>Category</p>
            <select value={filter.categoryId} onChange={(e) => setFilter({ ...filter, categoryId: e.target.value })}>
              <option value="All">All</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.title}</option>
              ))}
            </select>
          </div>
          <div className={styles.sortFilter}>
            <p>Sort by</p>
            <select onChange={(e) => setFilter({ ...filter, sortBy: e.target.value })}>
              <option value="default">By Default</option>
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>
      </div>
      <div className={styles.list}>
        {filteredItems.map((item) => {
          const discount = item.discont_price ? Math.round(((item.price - item.discont_price) / item.price) * 100) : 0;
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
                <h3 className={item.discont_price ? styles.priceGray : styles.priceBlue}>${item.price}</h3>
              </div>
              <button className={styles.addToCart} onClick={() => handleAddToCart(item)}>Add to Cart</button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
