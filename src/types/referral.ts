
export type Referral = {
  id: string;
  userId: string;
  code: string;
  url: string;
  createdAt: string;
  visits: number;
  signups: number;
  purchases: number;
  earnings: number;
  status: 'active' | 'paused' | 'expired';
  expiresAt?: string;
};

export type ReferralTransaction = {
  id: string;
  referralId: string;
  amount: number;
  type: 'commission' | 'withdrawal' | 'credit';
  status: 'pending' | 'completed' | 'failed';
  date: string;
  details: string;
  referredUserId?: string;
  orderId?: string;
};

export type WithdrawalMethod = {
  id: string;
  userId: string;
  type: 'paypal' | 'bank' | 'crypto';
  details: {
    email?: string;
    accountName?: string;
    accountNumber?: string;
    routingNumber?: string;
    bankName?: string;
    walletAddress?: string;
  };
  isDefault: boolean;
};
