
import { Subscription } from '@/types/subscription';
import { toast } from "@/hooks/use-toast";

// Mock subscriptions data
const mockSubscriptions: Subscription[] = [
  {
    id: "sub_1",
    userId: "user_1",
    productId: "prod_1",
    product: {
      id: "prod_1",
      title: "Premium Discord Bot Access",
      description: "Monthly access to our premium Discord bots with advanced features and priority support.",
      price: 9.99,
      discountPrice: 7.99,
      rating: 4.9,
      image: '/placeholder.svg',
      category: 'Subscriptions',
      bybitUrl: "https://builtbybit.com/creators/phant_walker.522983"
    },
    status: "active",
    currentPeriodStart: "2023-11-01",
    currentPeriodEnd: "2023-12-01",
    nextBillingDate: "2023-12-01",
    cancelAtPeriodEnd: false,
    paymentMethod: {
      type: 'card',
      last4: '4242',
      brand: 'visa',
      expiryMonth: 12,
      expiryYear: 2025
    },
    price: 7.99,
    interval: 'month',
    createdAt: "2023-09-15"
  },
  {
    id: "sub_2",
    userId: "user_1",
    productId: "prod_2",
    product: {
      id: "prod_2",
      title: "Developer Tools Bundle",
      description: "Access to our entire collection of developer tools and utilities, updated monthly.",
      price: 19.99,
      discountPrice: 14.99,
      rating: 4.7,
      image: '/placeholder.svg',
      category: 'Subscriptions',
      bybitUrl: "https://builtbybit.com/creators/phant_walker.522983"
    },
    status: "canceled",
    currentPeriodStart: "2023-09-15",
    currentPeriodEnd: "2023-10-15",
    nextBillingDate: "",
    cancelAtPeriodEnd: true,
    paymentMethod: {
      type: 'paypal'
    },
    price: 14.99,
    interval: 'month',
    createdAt: "2023-08-01"
  }
];

// Get user subscriptions
export const getUserSubscriptions = async (userId: string): Promise<Subscription[]> => {
  // In a real implementation, this would fetch from your backend
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockSubscriptions);
    }, 500);
  });
};

// Cancel a subscription
export const cancelSubscription = async (subscriptionId: string): Promise<Subscription> => {
  // In a real implementation, this would call your payment provider's API
  return new Promise((resolve) => {
    setTimeout(() => {
      const subscription = mockSubscriptions.find(sub => sub.id === subscriptionId);
      if (subscription) {
        subscription.cancelAtPeriodEnd = true;
        toast({
          title: "Subscription Cancelled",
          description: `Your subscription will end on ${new Date(subscription.currentPeriodEnd).toLocaleDateString()}.`
        });
        resolve({...subscription});
      } else {
        throw new Error("Subscription not found");
      }
    }, 500);
  });
};

// Resume a subscription
export const resumeSubscription = async (subscriptionId: string): Promise<Subscription> => {
  // In a real implementation, this would call your payment provider's API
  return new Promise((resolve) => {
    setTimeout(() => {
      const subscription = mockSubscriptions.find(sub => sub.id === subscriptionId);
      if (subscription) {
        subscription.cancelAtPeriodEnd = false;
        toast({
          title: "Subscription Resumed",
          description: "Your subscription has been successfully resumed."
        });
        resolve({...subscription});
      } else {
        throw new Error("Subscription not found");
      }
    }, 500);
  });
};

// Resubscribe to a canceled subscription
export const resubscribe = async (subscriptionId: string): Promise<Subscription> => {
  // In a real implementation, this would create a new subscription
  return new Promise((resolve) => {
    setTimeout(() => {
      const oldSubscription = mockSubscriptions.find(sub => sub.id === subscriptionId);
      if (oldSubscription) {
        const newSubscription: Subscription = {
          ...oldSubscription,
          id: `new_${subscriptionId}`,
          status: 'active',
          currentPeriodStart: new Date().toISOString(),
          currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          cancelAtPeriodEnd: false,
          createdAt: new Date().toISOString()
        };
        
        toast({
          title: "Subscription Activated",
          description: "You have successfully resubscribed."
        });
        resolve(newSubscription);
      } else {
        throw new Error("Subscription not found");
      }
    }, 500);
  });
};

// Get subscription invoices (mock)
export const getSubscriptionInvoices = async (subscriptionId: string) => {
  // In a real implementation, this would fetch invoice history
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: `inv_${subscriptionId}_1`,
          date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          amount: mockSubscriptions.find(sub => sub.id === subscriptionId)?.price || 0,
          status: 'paid',
          pdfUrl: '#'
        },
        {
          id: `inv_${subscriptionId}_2`,
          date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
          amount: mockSubscriptions.find(sub => sub.id === subscriptionId)?.price || 0,
          status: 'paid',
          pdfUrl: '#'
        }
      ]);
    }, 500);
  });
};
