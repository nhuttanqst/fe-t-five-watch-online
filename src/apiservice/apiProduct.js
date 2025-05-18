// src/apiservice/apiProduct.js
import axios from 'axios';

const API_URL = 'http://localhost:5004/api/product';

// Lấy danh sách sản phẩm
export const getProducts = async (page = 1, limit = 10, category = '') => {
  const response = await axios.get(API_URL, {
    params: { page, limit, danhMuc: category },
  });
  return response.data;
};

// Lấy một sản phẩm
export const getProduct = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Tạo sản phẩm
export const createProduct = async (productData) => {
  const formData = new FormData();
  for (const key in productData) {
    if (key === 'hinhAnh' && productData[key]) {
      productData[key].forEach((file, index) => {
        formData.append(`hinhAnh[${index}]`, file);
      });
    } else {
      formData.append(key, productData[key]);
    }
  }
  const response = await axios.post(API_URL, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

// Cập nhật sản phẩm
export const updateProduct = async (id, productData) => {
  const formData = new FormData();
  for (const key in productData) {
    if (key === 'hinhAnhMoi' && productData[key]) {
      productData[key].forEach((file, index) => {
        formData.append(`hinhAnhMoi[${index}]`, file);
      });
    } else if (key === 'hinhAnhXoa' && productData[key]) {
      formData.append('hinhAnhXoa', JSON.stringify(productData[key]));
    } else {
      formData.append(key, productData[key]);
    }
  }
  const response = await axios.put(`${API_URL}/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

// Xóa sản phẩm
export const deleteProduct = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};