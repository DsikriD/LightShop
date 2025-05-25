import { configureStore } from "@reduxjs/toolkit";
import { productsReducer } from "../pages/ProductPage/slice/productSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});

// Тип состояния RootState
export type RootState = ReturnType<typeof store.getState>;

// Тип dispatch-а
export type AppDispatch = typeof store.dispatch;
