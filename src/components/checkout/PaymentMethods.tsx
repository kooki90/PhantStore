
import { CreditCard, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PaymentMethodsProps {
  selectedMethod: string | null;
  onSelectMethod: (method: string) => void;
}

const PaymentMethods = ({ selectedMethod, onSelectMethod }: PaymentMethodsProps) => {
  return (
    <div className="glassmorphism rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-6">Payment Method</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <PaymentMethodCard
          id="stripe"
          title="Credit Card"
          description="Pay with Visa, Mastercard, Amex, or Discover"
          icon={<CreditCard className="w-6 h-6" />}
          isSelected={selectedMethod === 'stripe'}
          onClick={() => onSelectMethod('stripe')}
        />
        
        <PaymentMethodCard
          id="paypal"
          title="PayPal"
          description="Pay with your PayPal account"
          icon={
            <svg viewBox="0 0 24 24" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.9994 7.49C20.9994 7.2 20.7994 7 20.5894 7H18.5894C18.3894 7 18.1894 7.2 18.1894 7.4L17.0894 15.6C17.0894 15.8 17.1894 16 17.3894 16H18.3894C18.5894 16 18.7894 15.8 18.7894 15.6L18.9894 14H19.9894C21.5894 14 22.7894 12.5 22.5894 10.9L22.3894 9.3C22.1994 8.2 21.7894 7.5 20.9994 7.5M20.5894 10.8L20.6894 9.9C20.7894 9.2 20.2894 8.5 19.5894 8.5H18.8894L19.2894 10.8H20.5894M13.4994 7.5C12.5994 7.5 11.7994 8.2 11.5994 9.1L10.4994 15.6C10.3994 15.8 10.5894 16 10.7994 16H11.7994C11.9994 16 12.1994 15.8 12.1994 15.6L12.3994 14H13.8994C15.4994 14 16.6994 12.5 16.4994 10.9L16.2994 9.3C16.1994 8.3 14.6994 7.5 13.4994 7.5M14.0894 10.9C14.1894 10.2 13.6894 9.5 12.9894 9.5H12.1894L12.5894 11.9H13.8894C14.0894 11.9 14.0894 11.3 14.0894 10.9M8.90039 7.5C7.90039 7.5 7.20039 8.2 7.00039 9.1L5.90039 15.6C5.90039 15.8 6.10039 16 6.30039 16H7.30039C7.50039 16 7.70039 15.8 7.70039 15.6L7.90039 14H9.40039C11.0004 14 12.2004 12.5 12.0004 10.9L11.8004 9.3C11.6004 8.3 10.1004 7.5 8.90039 7.5M9.50039 10.9C9.60039 10.2 9.10039 9.5 8.40039 9.5H7.60039L8.00039 11.9H9.30039C9.40039 11.9 9.40039 11.3 9.50039 10.9M3.60039 8.2C3.60039 8 3.40039 7.8 3.20039 7.8H2.10039C1.90039 7.8 1.70039 8 1.70039 8.2L1.20039 11.8C1.20039 12 1.40039 12.2 1.60039 12.2H2.70039C2.90039 12.2 3.10039 12 3.10039 11.8L3.60039 8.2M1.80039 13.5L1.60039 14.7C1.60039 14.9 1.70039 15.1 2.00039 15.1H3.10039C3.30039 15.1 3.50039 14.9 3.50039 14.7L3.60039 13.6C3.60039 13.4 3.50039 13.2 3.20039 13.2H2.10039C2.00039 13.2 1.90039 13.3 1.80039 13.5Z" fill="currentColor" />
            </svg>
          }
          isSelected={selectedMethod === 'paypal'}
          onClick={() => onSelectMethod('paypal')}
        />
        
        <PaymentMethodCard
          id="upi"
          title="UPI"
          description="Pay with UPI apps (India only)"
          icon={<DollarSign className="w-6 h-6" />}
          isSelected={selectedMethod === 'upi'}
          onClick={() => onSelectMethod('upi')}
        />
      </div>
      
      {selectedMethod === 'stripe' && (
        <div className="mt-6 p-4 rounded-md bg-phant-dark-gray/20 border border-phant-dark-gray">
          <h3 className="text-md font-medium mb-4">Credit Card Details</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="cardNumber" className="block text-sm">Card Number</label>
              <input 
                type="text" 
                id="cardNumber" 
                placeholder="4242 4242 4242 4242"
                className="w-full px-3 py-2 bg-transparent border border-phant-dark-gray rounded-md" 
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="expiry" className="block text-sm">Expiry (MM/YY)</label>
                <input 
                  type="text" 
                  id="expiry" 
                  placeholder="MM/YY"
                  className="w-full px-3 py-2 bg-transparent border border-phant-dark-gray rounded-md" 
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="cvc" className="block text-sm">CVC</label>
                <input 
                  type="text" 
                  id="cvc" 
                  placeholder="123"
                  className="w-full px-3 py-2 bg-transparent border border-phant-dark-gray rounded-md" 
                />
              </div>
            </div>
          </div>
        </div>
      )}
      
      {selectedMethod === 'paypal' && (
        <div className="mt-6 p-4 rounded-md bg-phant-dark-gray/20 border border-phant-dark-gray">
          <p className="text-center">You will be redirected to PayPal to complete your payment.</p>
        </div>
      )}
      
      {selectedMethod === 'upi' && (
        <div className="mt-6 p-4 rounded-md bg-phant-dark-gray/20 border border-phant-dark-gray">
          <h3 className="text-md font-medium mb-4">UPI Payment</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="upiId" className="block text-sm">UPI ID</label>
              <input 
                type="text" 
                id="upiId" 
                placeholder="mustafaa@fam"
                className="w-full px-3 py-2 bg-transparent border border-phant-dark-gray rounded-md" 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface PaymentMethodCardProps {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  isSelected: boolean;
  onClick: () => void;
}

const PaymentMethodCard = ({
  id,
  title,
  description,
  icon,
  isSelected,
  onClick,
}: PaymentMethodCardProps) => {
  return (
    <Button
      type="button"
      variant="outline"
      className={`flex flex-col items-start justify-start h-auto p-4 space-y-2 border hover:border-phant-blue transition-all ${
        isSelected
          ? 'bg-phant-blue/20 border-phant-blue text-phant-blue'
          : 'bg-transparent border-phant-dark-gray'
      }`}
      onClick={onClick}
    >
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="font-medium">{title}</span>
      </div>
      <p className="text-xs text-phant-gray">{description}</p>
    </Button>
  );
};

export default PaymentMethods;
