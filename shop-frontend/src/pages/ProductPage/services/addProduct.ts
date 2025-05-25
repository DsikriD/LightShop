import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../config";
import { Product } from "../models/typeProducts";

export const addProduct = createAsyncThunk<Product, Product>(
  "products/add",
  async (product, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/products`, product);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
