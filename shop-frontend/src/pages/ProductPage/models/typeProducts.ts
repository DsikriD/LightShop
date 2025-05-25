export interface Product {
  id: string;
  name: string;
  description: string;
  manufacturer?: string;
  type?: string;
  power?: number;
  illuminated_area?: number;
  quantity: number;
  collection?: string;
  height?: number;
  diameter?: number;
  style?: string;
  material?: string;
  image: string;

  article?: string;
  category?: string;
  interior?: string;
  length?: number;
  width?: number;
  weight?: number;
  form?: string;

  any_ceiling?: boolean;
  has_controller?: boolean;
  has_remote?: boolean;
  adjustable_height?: boolean;
  ip_rating?: string;
  built_in_led?: boolean;
  lamp_types?: string;
  luminous_flux?: number;
  color_temperature?: number;
  cri_index?: number;

  frame_material?: string;
  frame_color?: string;
  frame_surface?: string;
  shade_material?: string;
  shade_color?: string;
  shade_surface?: string;
  has_remote_included?: boolean;
  wifi_control?: boolean;
  has_dimmer?: boolean;
}

export interface ProductState {
  collection: Product[];
  loading: boolean;
  error: string | null | undefined;
}
