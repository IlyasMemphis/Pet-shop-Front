import React, { useState, useEffect } from "react";
import styles from "../styles/DiscountForm.module.css";

const DiscountForm = ({ onHidden }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [discountApplied, setDiscountApplied] = useState(false);
  const [showDiscountContainer, setShowDiscountContainer] = useState(true);
  const [isRemoved, setIsRemoved] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      errors: {
        ...prev.errors,
        [name]:
          !value.trim() ||
          (name === "phone" && !/^\d{10,15}$/.test(value)) ||
          (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)),
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !/^\d{10,15}$/.test(formData.phone) ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      alert("Please fill in all fields.");
      return;
    }

    localStorage.setItem("discountApplied", "true");
    setDiscountApplied(true);
  };

  useEffect(() => {
    if (discountApplied) {
      const hideTimer = setTimeout(() => {
        setShowDiscountContainer(false);
      }, 5000);

      const removeTimer = setTimeout(() => {
        setIsRemoved(true);
        onHidden?.(true);
      }, 6000);

      return () => {
        clearTimeout(hideTimer);
        clearTimeout(removeTimer);
      };
    }
  }, [discountApplied, onHidden]);

  if (isRemoved) return null;

  return (
    <div
      className={`${styles.discountContainer} ${!showDiscountContainer ? styles.hidden : ""}`}
    >
      {discountApplied ? (
        <div className={styles.successMessage}>
          🎉 Congrats, {formData.name}! You've got a 5% discount on your first
          order!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            className={`${styles.inputField} ${formData.errors?.name ? styles.error : ""}`}
          />
          <input
            type="text"
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            className={`${styles.inputField} ${formData.errors?.phone ? styles.error : ""}`}
          />
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className={`${styles.inputField} ${formData.errors?.email ? styles.error : ""}`}
          />
          <button type="submit" className={styles.submitButton}>
            Get Discount
          </button>
        </form>
      )}
    </div>
  );
};

export default DiscountForm;
