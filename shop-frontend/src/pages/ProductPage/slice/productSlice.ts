import { createSlice } from "@reduxjs/toolkit";
import { ProductState } from "../models/typeProducts";
import { updateProduct } from "../services/updateProduct";
import { fetchProducts } from "../services/fetchProducts";
import { addProduct } from "../services/addProduct";
import { deleteProduct } from "../services/deleteProduct ";

const initialProductState: ProductState = {
  collection: [],
  loading: false,
  error: null,
};

// Слайс для продуктов
const productsSlice = createSlice({
  name: "products",
  initialState: initialProductState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Получение всех продуктов
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.collection = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Ошибка загрузки продуктов";
      })
      // Добавление продукта
      .addCase(addProduct.fulfilled, (state, action) => {
        state.collection.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.error = action.error.message || "Ошибка при добавлении продукта";
      })
      // Обновление продукта
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.collection.findIndex(
          (p) => p.id === action.payload.id
        );
        if (index !== -1) {
          state.collection[index] = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.error = action.error.message || "Ошибка при обновлении продукта";
      })
      // Удаление продукта
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.collection = state.collection.filter(
          (p) => p.id !== action.payload
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.error = action.error.message || "Ошибка при удалении продукта";
      });
  },
});

export const selectProducts = (state: ProductState) => state.collection;

export const productsReducer = productsSlice.reducer;
export default productsReducer;
