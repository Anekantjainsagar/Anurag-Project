export interface ProductWeightOption {
  label: string;
  price: number;
  originalPrice: number;
  discount: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  subtitle: string;
  defaultPrice: number;
  defaultOriginalPrice: number;
  defaultDiscount: string;
  rating: number;
  reviewsCount: number;
  image: string; // primary image
  images: string[]; // at least 3-4 high-res gallery images
  options: ProductWeightOption[];
  inStock?: boolean;
  description: string;
  origin?: string;
  features?: string[];
  nutritionalFacts?: Record<string, string>;
  purityParameters?: Record<string, string>;
  tag?: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  itemCount: number;
  slug: string;
  tagline?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  image: string;
  readTime: string;
  summary: string;
  author?: string;
}

export interface WhyChooseFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface CartItem {
  id: string; // unique cart line id combining product.id and option
  productId: string;
  name: string;
  subtitle: string;
  price: number;
  originalPrice: number;
  weight: string;
  image: string;
  quantity: number;
}
