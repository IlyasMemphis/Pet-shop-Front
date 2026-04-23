import Error from "../assets/404.svg"
import { Link } from "react-router-dom"
import styles from "../styles/Error.module.css"

export default function Error404() {
    return(
    <section className={styles.Container}>
        <div className={styles.imgContainer}>
        <img src={Error} alt="404" />
        </div>
        <div className={styles.txtContainer}>
            <div className={styles.txt}>
        <h1>Page Not Found</h1>
        <p>We’re sorry, the page you requested could not be found.
        Please go back to the homepage.</p>
            </div>
        <Link to="/"><button>Go Home</button></Link>
        </div>
    </section>
    )
}
