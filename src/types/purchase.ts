
import { Product } from './product';

export type Purchase = {
  id: string;
  userId: string;
  orderId: string;
  products: {
    productId: string;
    product: Product;
    quantity: number;
    price: number;
  }[];
  total: number;
  purchaseDate: string;
  status: 'completed' | 'processing' | 'refunded';
  paymentMethod: string;
  downloadLinks?: {
    fileId: string;
    fileName: string;
    url: string;
    expiresAt?: string;
  }[];
};
