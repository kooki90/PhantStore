
export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  discountPrice?: number;
  rating: number;
  image: string;
  category: string;
  subcategory?: string;
  badge?: string;
  bybitUrl: string;
  visible?: boolean;
};

export type CartItem = Product & {
  quantity: number;
};

export type ProductSubcategory = {
  id: string;
  name: string;
  description: string;
  icon: string;
  count: number;
};

export type ProductCategory = {
  id: string;
  name: string;
  description: string;
  icon: string;
  subcategories: ProductSubcategory[];
  count: number;
};
