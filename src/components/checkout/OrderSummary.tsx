
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CartItem } from '@/types/product';

interface OrderSummaryProps {
  cartItems: CartItem[];
  cartTotal: number;
  isProcessing: boolean;
}

const OrderSummary = ({ cartItems, cartTotal, isProcessing }: OrderSummaryProps) => {
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      setCouponError('Please enter a coupon code');
      return;
    }

    // In a real implementation, this would validate the coupon against a backend API
    if (couponCode.toLowerCase() === 'phant20') {
      const discountAmount = cartTotal * 0.2;
      setDiscount(discountAmount);
      setCouponApplied(true);
      setCouponError('');
      
      // Simulate sending webhook with coupon data
      console.log('Sending webhook with coupon data:', {
        code: couponCode,
        discountAmount,
        discountPercentage: '20%'
      });
    } else {
      setCouponError('Invalid coupon code');
      setDiscount(0);
      setCouponApplied(false);
    }
  };

  const finalTotal = cartTotal - discount;

  return (
    <div className="glassmorphism rounded-xl p-6 sticky top-24">
      <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
      
      <div className="max-h-60 overflow-y-auto mb-6">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-start gap-3 py-3 border-b border-phant-dark-gray last:border-0">
            <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-grow">
              <h3 className="text-sm font-medium">{item.title}</h3>
              <p className="text-xs text-phant-gray">Qty: {item.quantity}</p>
            </div>
            <div className="text-right">
              <p className="font-medium">
                ${((item.discountPrice || item.price) * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Input
            placeholder="Enter coupon code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="flex-grow border border-phant-dark-gray bg-transparent"
          />
          <Button 
            type="button" 
            variant="outline"
            onClick={handleApplyCoupon}
            disabled={couponApplied}
            className="border-phant-dark-gray hover:border-phant-blue"
          >
            Apply
          </Button>
        </div>
        
        {couponError && (
          <p className="text-xs text-red-500 mt-1">{couponError}</p>
        )}
        
        {couponApplied && (
          <p className="text-xs text-green-500 mt-1">Coupon applied successfully!</p>
        )}
      </div>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-phant-gray">Subtotal</span>
          <span>${cartTotal.toFixed(2)}</span>
        </div>
        
        {discount > 0 && (
          <div className="flex justify-between text-green-500">
            <span>Discount</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
        )}
        
        <div className="h-px bg-phant-dark-gray my-2"></div>
        
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span className="text-phant-blue">${finalTotal.toFixed(2)}</span>
        </div>
      </div>
      
      <Button 
        type="submit"
        disabled={isProcessing}
        className="w-full bg-gradient-to-r from-phant-blue to-phant-neon-blue hover:from-phant-neon-blue hover:to-phant-blue text-white transition-all duration-300 h-12"
      >
        {isProcessing ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : (
          <span className="flex items-center">
            Complete Purchase
            <ArrowRight className="ml-2 h-4 w-4" />
          </span>
        )}
      </Button>
    </div>
  );
};

export default OrderSummary;
