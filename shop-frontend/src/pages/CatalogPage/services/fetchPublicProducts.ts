import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../config";
import { CatalogItem } from "../models/typeCatalog";

export interface CatalogProductApi {
  id: string;
  name: string;
  description?: string | null;
  image?: string | null;
  type?: string | null;
  quantity?: number | null;
}

export const fetchPublicProducts = createAsyncThunk<CatalogItem[]>(
  "catalog/fetchPublicProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/products`);
      const items: CatalogProductApi[] = res.data;
      // Маппинг на вид каталога (подставляем значения по умолчанию)
      const mapped: CatalogItem[] = items.map((p) => ({
        id: String(p.id),
        name: p.name,
        description: p.description ?? "",
        image: p.image ?? "/placeholder.svg?height=400&width=400&text=Product",
        category: p.type ?? "General",
        price: 0,
        originalPrice: undefined,
        inStock: (p.quantity ?? 0) > 0,
      }));
      return mapped;
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message || "Failed to load products");
    }
  }
); 