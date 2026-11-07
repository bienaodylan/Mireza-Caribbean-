export interface Product {
  id: string;
  name: string;
  category: 'lingerie' | 'swimwear' | 'corsets' | 'homewear' | 'streetwear' | 'accessoires';
  collection: 'panthere-rose' | 'caribbean-noir' | 'signature';
  price: number; // in FCFA
  originalPrice?: number;
  image: string;
  gallery?: string[];
  description: string;
  sizes: string[];
  colors: { name: string; hex: string }[];
  isNew?: boolean;
  isBestseller?: boolean;
  isLimited?: boolean;
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  selectedColor: { name: string; hex: string };
  quantity: number;
}
