import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, CreditCard } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';

const Cart = () => {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, cartTotal } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'paypal' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    if (!paymentMethod) {
      toast({
        title: "Payment method required",
        description: "Please select a payment method before proceeding.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing [ed2d66c3726158affb93550b0ec274c2]
    setTimeout(() => {
      toast({
        title: "Order successfully placed!",
        description: "Thank you for your purchase. You will receive a confirmation email shortly.",
      });
      clearCart();
      navigate('/');
      setIsProcessing(false);
    }, 2000);
  };

  if (cartItems.length === 0) {
    return (
      <MainLayout>
        <section className="pt-32 pb-20">
          <div className="container px-4 mx-auto">
            <div className="max-w-lg mx-auto text-center">
              <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
              <div className="glassmorphism p-8 rounded-xl mb-8">
                <p className="text-phant-gray mb-6">Your cart is empty</p>
                <Button 
                  onClick={() => navigate('/products')}
                  className="bg-gradient-to-r from-phant-blue to-phant-neon-blue hover:from-phant-neon-blue hover:to-phant-blue text-white transition-all duration-300"
                >
                  Browse Products
                </Button>
              </div>
            </div>
          </div>
        </section>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <section className="pt-32 pb-20">
        <div className="container px-4 mx-auto">
          <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="glassmorphism rounded-xl overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Items ({cartItems.length})</h2>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-phant-gray hover:text-red-500"
                      onClick={clearCart}
                    >
                      Clear Cart
                    </Button>
                  </div>
                  
                  <div className="divide-y divide-phant-dark-gray">
                    {cartItems.map((item) => (
                      <div key={item.id} className="py-4 flex flex-col sm:flex-row gap-4">
                        <div className="w-full sm:w-24 h-24 rounded overflow-hidden flex-shrink-0">
                          <img 
                            src={item.image} 
                            alt={item.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-grow">
                          <div className="flex flex-col sm:flex-row justify-between">
                            <div>
                              <h3 className="font-medium mb-1">{item.title}</h3>
                              <p className="text-phant-gray text-sm mb-2">{item.category}</p>
                            </div>
                            
                            <div className="flex flex-col items-start sm:items-end">
                              <div className="flex items-center gap-2">
                                {item.discountPrice ? (
                                  <>
                                    <span className="text-phant-blue font-semibold">${item.discountPrice.toFixed(2)}</span>
                                    <span className="text-sm text-phant-gray line-through">${item.price.toFixed(2)}</span>
                                  </>
                                ) : (
                                  <span className="text-phant-blue font-semibold">${item.price.toFixed(2)}</span>
                                )}
                              </div>
                              
                              <div className="flex items-center gap-1 mt-2">
                                <Button 
                                  variant="outline" 
                                  size="icon" 
                                  className="h-8 w-8 rounded-full border-phant-dark-gray"
                                  onClick={() => decreaseQuantity(item.id)}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-8 text-center">{item.quantity}</span>
                                <Button 
                                  variant="outline" 
                                  size="icon" 
                                  className="h-8 w-8 rounded-full border-phant-dark-gray"
                                  onClick={() => increaseQuantity(item.id)}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-8 w-8 ml-2 text-phant-gray hover:text-red-500"
                                  onClick={() => removeFromCart(item.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="glassmorphism rounded-xl overflow-hidden sticky top-24">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-phant-gray">Subtotal</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-phant-gray">Tax</span>
                      <span>$0.00</span>
                    </div>
                    <div className="h-px bg-phant-dark-gray my-2"></div>
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span className="text-phant-blue">${cartTotal.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="font-medium mb-3">Payment Method</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        type="button"
                        variant={paymentMethod === 'stripe' ? 'default' : 'outline'}
                        className={`flex items-center justify-center h-14 px-4 ${
                          paymentMethod === 'stripe'
                            ? 'bg-phant-blue/20 text-phant-blue border-phant-blue'
                            : 'border-phant-dark-gray'
                        }`}
                        onClick={() => setPaymentMethod('stripe')}
                      >
                        <CreditCard className="mr-2 h-4 w-4" />
                        Credit Card
                      </Button>
                      
                      <Button
                        type="button"
                        variant={paymentMethod === 'paypal' ? 'default' : 'outline'}
                        className={`flex items-center justify-center h-14 px-4 ${
                          paymentMethod === 'paypal'
                            ? 'bg-phant-blue/20 text-phant-blue border-phant-blue'
                            : 'border-phant-dark-gray'
                        }`}
                        onClick={() => setPaymentMethod('paypal')}
                      >
                        <svg viewBox="0 0 24 24" className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20.9994 7.49C20.9994 7.2 20.7994 7 20.5894 7H18.5894C18.3894 7 18.1894 7.2 18.1894 7.4L17.0894 15.6C17.0894 15.8 17.1894 16 17.3894 16H18.3894C18.5894 16 18.7894 15.8 18.7894 15.6L18.9894 14H19.9894C21.5894 14 22.7894 12.5 22.5894 10.9L22.3894 9.3C22.1994 8.2 21.7894 7.5 20.9994 7.5M20.5894 10.8L20.6894 9.9C20.7894 9.2 20.2894 8.5 19.5894 8.5H18.8894L19.2894 10.8H20.5894M13.4994 7.5C12.5994 7.5 11.7994 8.2 11.5994 9.1L10.4994 15.6C10.3994 15.8 10.5894 16 10.7994 16H11.7994C11.9994 16 12.1994 15.8 12.1994 15.6L12.3994 14H13.8994C15.4994 14 16.6994 12.5 16.4994 10.9L16.2994 9.3C16.1994 8.3 14.6994 7.5 13.4994 7.5M14.0894 10.9C14.1894 10.2 13.6894 9.5 12.9894 9.5H12.1894L12.5894 11.9H13.8894C14.0894 11.9 14.0894 11.3 14.0894 10.9M8.90039 7.5C7.90039 7.5 7.20039 8.2 7.00039 9.1L5.90039 15.6C5.90039 15.8 6.10039 16 6.30039 16H7.30039C7.50039 16 7.70039 15.8 7.70039 15.6L7.90039 14H9.40039C11.0004 14 12.2004 12.5 12.0004 10.9L11.8004 9.3C11.6004 8.3 10.1004 7.5 8.90039 7.5M9.50039 10.9C9.60039 10.2 9.10039 9.5 8.40039 9.5H7.60039L8.00039 11.9H9.30039C9.40039 11.9 9.40039 11.3 9.50039 10.9M3.60039 8.2C3.60039 8 3.40039 7.8 3.20039 7.8H2.10039C1.90039 7.8 1.70039 8 1.70039 8.2L1.20039 11.8C1.20039 12 1.40039 12.2 1.60039 12.2H2.70039C2.90039 12.2 3.10039 12 3.10039 11.8L3.60039 8.2M1.80039 13.5L1.60039 14.7C1.60039 14.9 1.70039 15.1 2.00039 15.1H3.10039C3.30039 15.1 3.50039 14.9 3.50039 14.7L3.60039 13.6C3.60039 13.4 3.50039 13.2 3.20039 13.2H2.10039C2.00039 13.2 1.90039 13.3 1.80039 13.5Z" fill="currentColor" />
                        </svg>
                        PayPal
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Button 
                      onClick={handleCheckout}
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
                          Checkout
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </span>
                      )}
                    </Button>
                    
                    <Button
                      onClick={() => navigate('/checkout')}
                      variant="outline"
                      className="w-full border-phant-dark-gray hover:border-phant-blue"
                    >
                      <span className="flex items-center">
                        Proceed to Checkout
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </span>
                    </Button>
                  </div>
                  
                  <div className="mt-4 text-center">
                    <Link to="/products" className="text-sm text-phant-blue hover:underline">
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Cart;

