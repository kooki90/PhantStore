
import { Product } from './product';

export type License = {
  id: string;
  userId: string;
  productId: string;
  licenseKey: string;
  product?: Product;
  createdAt: string;
  expiresAt?: string;
  activationLimit: number;
  activationCount: number;
  status: 'active' | 'expired' | 'revoked';
  lastActivated?: string;
};

export type LicenseFormData = {
  productId: string;
  expiresAt?: string;
  activationLimit: number;
};

export type LicenseActivation = {
  id: string;
  licenseId: string;
  deviceInfo: string;
  activatedAt: string;
  ipAddress: string;
};
