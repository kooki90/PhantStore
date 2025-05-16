
import { Product } from './product';

export type Subscription = {
  id: string;
  userId: string;
  productId: string;
  product?: Product;
  status: 'active' | 'canceled' | 'paused' | 'past_due';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  nextBillingDate: string;
  cancelAtPeriodEnd: boolean;
  paymentMethod: {
    type: 'card' | 'paypal';
    last4?: string;
    brand?: string;
    expiryMonth?: number;
    expiryYear?: number;
  };
  price: number;
  interval: 'month' | 'year';
  createdAt: string;
};
