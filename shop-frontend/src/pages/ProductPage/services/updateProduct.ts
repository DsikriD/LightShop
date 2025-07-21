import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Product } from "../models/typeProducts";
import { API_URL } from "../../../config";

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (product: Product, { rejectWithValue }) => {
    try {
      // Фильтруем только допустимые поля
      const allowedFields = [
        "name", "description", "manufacturer", "type", "power", "illuminated_area",
        "quantity", "collection", "height", "diameter", "style", "material", "image"
      ];
      const filteredProduct = Object.fromEntries(
        Object.entries(product).filter(([key]) => allowedFields.includes(key))
      );
      const response = await axios.put(
        `${API_URL}/products/${product.id}`,
        filteredProduct,
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
