export interface CatalogItem {
  id: string;
  name: string;
  image: string;
  category: string;
  price: number;
  originalPrice?: number;
  inStock: boolean;
  description: string;
} 