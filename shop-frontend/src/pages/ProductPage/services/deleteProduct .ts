import axios from "axios";
import { API_URL } from "../../../config";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const deleteProduct = createAsyncThunk<string, string>(
  "products/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/products/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
