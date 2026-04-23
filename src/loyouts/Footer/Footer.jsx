import styles from "../../styles/Footer.module.css";
import instaLogo from "../../assets/ic-instagram.svg";
import whatsappLogo from "../../assets/ic-whatsapp.svg";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <h1>Contact</h1>
      <div className={styles.contactInfo_and_map}>
        <div className={styles.contactInfo}>
          <div className={styles.phoneSocials}>
            <div className={styles.phone}>
              <p>Phone</p>
              <h3>+49 30 915-88492</h3>
            </div>
            <div className={styles.socials}>
              <p>Socials</p>
              <img src={instaLogo} alt="instagram" />
              <img src={whatsappLogo} alt="whatsapp" className={styles.whatsappLogo} />
            </div>
          </div>
          <div className={styles.adressWH}>
            <div className={styles.adress}>
              <p>Adress</p>
              <h3>Wallstraẞe 9-13, 10179 Berlin</h3>
            </div>
            <div className={styles.workingHours}>
              <p>Working Hours</p>
              <h3>24 hours a day</h3>
            </div>
          </div>
        </div>
        <div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2042.2411353482087!2d13.353933445872661!3d52.50361673843917!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a84fb0e85329a1%3A0xa141f1e83418ee88!2sIT%20Career%20Hub!5e0!3m2!1sde!2sde!4v1741970981815!5m2!1sde!2sde"
            className={styles.map}
          ></iframe>
        </div>
      </div>
    </footer>
  );
}
