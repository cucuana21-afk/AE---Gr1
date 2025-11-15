// client/src/api/typeProduct.routes.js
import axiosNoAuth from "../axios/axiosNoAuth";
import axiosAuth from "../axios/axiosAuth";

export const fetchTypeProducts = async () => {
  try {
    const response = await axiosNoAuth.get('typeProducts');
    return response.data;
  } catch (error) {
    console.error("Error fetching type products:", error);
    return error.response?.data;
  }
};

export const getTypeProductById = async (id) => {
  try {
    const response = await axiosNoAuth.get(`typeProducts/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching type product:", error);
    return error.response?.data;
  }
};

export const createTypeProduct = async (productData) => {
  try {
    const response = await axiosAuth.post('typeProducts', productData);
    return response.data;
  } catch (error) {
    console.error("Error creating type product:", error);
    return error.response?.data;
  }
};

export const updateTypeProduct = async (id, productData) => {
  try {
    const response = await axiosAuth.put(`typeProducts/${id}`, productData);
    return response.data;
  } catch (error) {
    console.error("Error updating type product:", error);
    return error.response?.data;
  }
};

export const deleteTypeProduct = async (id) => {
  try {
    const response = await axiosAuth.delete(`typeProducts/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting type product:", error);
    return error.response?.data;
  }
};