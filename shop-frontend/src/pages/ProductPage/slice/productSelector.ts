import { RootState } from "../../../store/store";

// Селектор для извлечения списка продуктов
export const getProducts = (state: RootState) => state.products.collection;
