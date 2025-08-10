import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../config";
import { Product } from "../models/typeProducts";

export const fetchProducts = createAsyncThunk<Product[]>(
  "products/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/admin/products`, { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue("Ошибка при загрузке продуктов");
    }
  }
);
