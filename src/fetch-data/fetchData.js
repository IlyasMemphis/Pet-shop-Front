import axios from "axios";
import { API_BASE_URL } from "../config/backend";

const handleRequest = async (url, method = "get", data = null) => {
  try {
    const response = await axios({ method, url, data });
    return response.data;
  } catch (error) {
    console.error(`Ошибка при запросе: ${url}`, error);
    return null;
  }
};

export const fetchCategories = () =>
  handleRequest(`${API_BASE_URL}/categories/all`);
export const fetchProductsByCategory = (categoryId) =>
  handleRequest(`${API_BASE_URL}/products/category/${categoryId}`);
export const fetchProducts = () =>
  handleRequest(`${API_BASE_URL}/products/all`);
export const fetchProductById = (productId) =>
  handleRequest(`${API_BASE_URL}/products/${productId}`);
export const sendOrder = (orderData) =>
  handleRequest(`${API_BASE_URL}/order/send`, "post", orderData);
