import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Product } from "../models/typeProducts";
import { API_URL } from "../../../config";

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (product: Product, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/products/${product.id}`,
        product,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data;
    } catch (error: any) {
      console.error("Error updating product:", error);

      return rejectWithValue({
        message: error.response?.data?.message || "Failed to update product",
        status: error.response?.status || 500,
      });
    }
  }
);
