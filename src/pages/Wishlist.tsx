
import { Link } from 'react-router-dom';
import { ShoppingCart, Trash2, HeartOff } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (item: any) => {
    addToCart({
      ...item,
      quantity: 1
    });
    
    toast({
      title: "Added to cart",
      description: `${item.title} has been added to your cart.`,
    });
    
    removeFromWishlist(item.id);
  };

  return (
    <MainLayout>
      <section className="pt-32 pb-20">
        <div className="container px-4 mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Your Wishlist</h1>
            {wishlistItems.length > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearWishlist}
                className="text-phant-gray hover:text-red-500"
              >
                Clear Wishlist
              </Button>
            )}
          </div>
          
          {wishlistItems.length === 0 ? (
            <div className="glassmorphism rounded-xl p-12 text-center">
              <div className="flex justify-center mb-4">
                <HeartOff className="h-16 w-16 text-phant-gray/50" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Your wishlist is empty</h2>
              <p className="text-phant-gray mb-6">Find products you love and add them to your wishlist</p>
              <Link to="/products">
                <Button className="bg-gradient-to-r from-phant-blue to-phant-neon-blue hover:from-phant-neon-blue hover:to-phant-blue text-white transition-all duration-300">
                  Browse Products
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlistItems.map((item) => (
                <div key={item.id} className="glassmorphism rounded-xl overflow-hidden group">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-phant-dark/90 to-transparent"></div>
                    <div className="absolute top-3 right-3 flex space-x-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 bg-phant-dark-blue/70 backdrop-blur-sm text-phant-gray hover:text-red-500"
                        onClick={() => removeFromWishlist(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="mb-1">
                      <span className="text-xs text-phant-gray">{item.category}</span>
                    </div>
                    <h3 className="font-medium mb-2 line-clamp-1">{item.title}</h3>
                    <p className="text-xs text-phant-gray line-clamp-2 mb-4">{item.description}</p>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        {item.discountPrice ? (
                          <div className="flex items-center gap-2">
                            <span className="text-phant-blue font-semibold">${item.discountPrice.toFixed(2)}</span>
                            <span className="text-xs text-phant-gray line-through">${item.price.toFixed(2)}</span>
                          </div>
                        ) : (
                          <span className="text-phant-blue font-semibold">${item.price.toFixed(2)}</span>
                        )}
                      </div>
                      
                      <Button 
                        onClick={() => handleAddToCart(item)}
                        className="bg-phant-blue/20 hover:bg-phant-blue/30 text-phant-blue border border-phant-blue/30"
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                  
                  <Link
                    to={`/product/${item.id}`}
                    className="absolute inset-0 z-10 opacity-0"
                    aria-label={`View ${item.title}`}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
};

export default Wishlist;
