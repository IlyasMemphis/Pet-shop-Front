import { Link, NavLink } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import Cart from "../../assets/cart.svg";
import { useCart } from "../../components/Cart";
import styles from "../../styles/Header.module.css";

export default function Header() {
  const { getCartItemCount } = useCart();
  const cartItemCount = getCartItemCount();

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <Link to="/" className={styles.logo}>
          <img src={Logo} alt="Logo" />
        </Link>
        <nav>
          <ul>
            <li><NavLink to="/" className={styles.navLink}>Main Page</NavLink></li>
            <li><NavLink to="/categories" className={styles.navLink}>Categories</NavLink></li>
            <li><NavLink to="/products" className={styles.navLink}>All Product</NavLink></li>
            <li><NavLink to="/discounted" className={styles.navLink}>All sales</NavLink></li>
          </ul>
        </nav>
        <Link to="/cart">
          <div className={styles.cartContainer}>
            <img src={Cart} alt="cart" className={styles.cart} />
            {cartItemCount > 0 && (
              <span className={styles.cartCount}>{cartItemCount}</span>
            )}
          </div>
        </Link>
      </div>
    </header>
  );
}
