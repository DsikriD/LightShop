import { configureStore, createSlice } from "@reduxjs/toolkit";
import { productsReducer } from "../pages/ProductPage/slice/productSlice";
import { fetchPublicProducts } from "../pages/CatalogPage/services/fetchPublicProducts";

const catalogSlice = createSlice({
  name: "catalog",
  initialState: { items: [] as any[], loading: false as boolean },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPublicProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPublicProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload as any[];
      })
      .addCase(fetchPublicProducts.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const store = configureStore({
  reducer: {
    products: productsReducer,
    catalog: catalogSlice.reducer,
  },
});

// Тип состояния RootState
export type RootState = ReturnType<typeof store.getState>;

// Тип dispatch-а
export type AppDispatch = typeof store.dispatch;
