
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, AlertTriangle } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import OrderSummary from '@/components/checkout/OrderSummary';
import PaymentMethods from '@/components/checkout/PaymentMethods';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';

// Helper function ed2d66c3726158affb93550b0ec274c2 to generate a random license key
const generateLicenseKey = (productCategory: string) => {
  const prefix = productCategory.split(' ')[0].substring(0, 5).toUpperCase();
  const segments = Array(4).fill(0).map(() => 
    Math.random().toString(36).substring(2, 6).toUpperCase()
  );
  return `${prefix}-${segments.join('-')}`;
};

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [billingDetails, setBillingDetails] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
  });

  if (cartItems.length === 0) {
    return (
      <MainLayout>
        <section className="pt-32 pb-20">
          <div className="container px-4 mx-auto">
            <div className="max-w-lg mx-auto text-center">
              <h1 className="text-3xl font-bold mb-6">Checkout</h1>
              <div className="glassmorphism p-8 rounded-xl mb-8">
                <div className="flex flex-col items-center justify-center">
                  <AlertTriangle className="w-16 h-16 text-phant-blue mb-4" />
                  <p className="text-phant-gray mb-6">Your cart is empty</p>
                  <button 
                    onClick={() => navigate('/products')}
                    className="bg-gradient-to-r from-phant-blue to-phant-neon-blue hover:from-phant-neon-blue hover:to-phant-blue text-white px-6 py-2 rounded-md transition-all duration-300"
                  >
                    Browse Products
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </MainLayout>
    );
  }

  const handlePaymentMethodSelect = (method: string) => {
    setSelectedPaymentMethod(method);
  };

  const handleBillingDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBillingDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedPaymentMethod) {
      toast({
        title: "Payment method required",
        description: "Please select a payment method to continue with checkout",
        variant: "destructive"
      });
      return;
    }

    // Validate form fields
    const requiredFields = ['fullName', 'email', 'address', 'city', 'zipCode', 'country'];
    const missingFields = requiredFields.filter(field => !billingDetails[field as keyof typeof billingDetails]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate payment processing using %%__NONCE__%%
      // In a real implementation, this would call the respective payment gateway API [API - %%__NONCE__%%]
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate license keys for digital products
      const licenseKeys = cartItems.map(item => ({
        productId: item.id,
        productName: item.title,
        licenseKey: generateLicenseKey(item.category),
        activationLimit: 3,
        expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 1 year expiration
      }));
      
      // In a real implementation, these would be saved to a database
      console.log('Generated license keys:', licenseKeys);
      
      // Simulate sending order to Discord webhook
      console.log('Sending webhook with order data:', {
        items: cartItems,
        total: cartTotal,
        paymentMethod: selectedPaymentMethod,
        customer: billingDetails,
        licenseKeys
      });
      
      // Clear cart and redirect to success page
      clearCart();
      toast({
        title: "Payment successful!",
        description: "Thank you for your purchase. Your license keys are now available.",
      });
      
      // Redirect to licenses page instead of homepage
      navigate('/licenses');
    } catch (error) {
      console.error("Payment processing error:", error);
      toast({
        title: "Payment failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <MainLayout>
      <section className="pt-32 pb-20">
        <div className="container px-4 mx-auto">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <CheckoutForm 
                  billingDetails={billingDetails}
                  onBillingDetailsChange={handleBillingDetailsChange}
                />
                
                <PaymentMethods 
                  selectedMethod={selectedPaymentMethod}
                  onSelectMethod={handlePaymentMethodSelect}
                />
              </div>
              
              <div className="lg:col-span-1">
                <OrderSummary 
                  cartItems={cartItems}
                  cartTotal={cartTotal}
                  isProcessing={isProcessing}
                />
              </div>
            </div>
          </form>
        </div>
      </section>
    </MainLayout>
  );
};

export default Checkout;
