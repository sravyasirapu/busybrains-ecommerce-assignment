import axios from 'axios';

const API_URL = "http://localhost:8080/api/products";

// Helper function to get the JWT token from browser storage
const authHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    return { Authorization: 'Bearer ' + user.token };
  } else {
    return {};
  }
};

// 1. Get all products (Everyone)
const getAllProducts = () => {
  return axios.get(API_URL, { headers: authHeader() });
};

// 2. Add a product (Admin only)
const createProduct = (productData) => {
  return axios.post(API_URL, productData, { headers: authHeader() });
};

// 3. Update a product (Admin only)
const updateProduct = (id, productData) => {
  return axios.put(`${API_URL}/${id}`, productData, { headers: authHeader() });
};

// 4. Delete a product (Admin only)
const deleteProduct = (id) => {
  return axios.delete(`${API_URL}/${id}`, { headers: authHeader() });
};

const productService = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};

export default productService;