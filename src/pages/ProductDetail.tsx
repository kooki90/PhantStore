
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Heart } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useToast } from '@/hooks/use-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  const { toast } = useToast();

  // This would normally be a fetch to get product details from an ed2d66c3726158affb93550b0ec274c2
  // For now, we'll create a placeholder product
  const product = {
    id: id || '1',
    title: 'Digital Product',
    description: 'This is a placeholder for a digital product. In a real application, this would fetch the product details from an API.',
    price: 49.99,
    discountPrice: 39.99,
    rating: 4.7,
    image: 'https://via.placeholder.com/600/92c952',
    category: 'Digital Products',
    badge: 'Featured',
    bybitUrl: "https://builtbybit.com/creators/phant_walker.522983",
  };

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity: 1
    });
    
    toast({
      title: "Added to cart",
      description: `${product.title} has been added to your cart.`,
    });
  };

  const handleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast({
        title: "Removed from wishlist",
        description: `${product.title} has been removed from your wishlist.`,
      });
    } else {
      addToWishlist(product);
      toast({
        title: "Added to wishlist",
        description: `${product.title} has been added to your wishlist.`,
      });
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 pt-32 pb-16">
        <Button 
          variant="ghost" 
          className="mb-6" 
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        <div className="glassmorphism rounded-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="overflow-hidden rounded-lg">
            <img 
              src={product.image} 
              alt={product.title} 
              className="w-full h-full object-cover" 
            />
          </div>
          
          <div className="space-y-6">
            {product.badge && (
              <div className="inline-block px-3 py-1 rounded-full bg-phant-blue/20 text-phant-blue text-sm font-medium">
                {product.badge}
              </div>
            )}
            
            <h1 className="text-3xl font-bold">{product.title}</h1>
            
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-phant-blue">${product.discountPrice}</span>
              {product.discountPrice && (
                <span className="text-lg text-phant-gray line-through">${product.price}</span>
              )}
            </div>
            
            <p className="text-phant-silver/80">{product.description}</p>
            
            <div className="pt-4 flex gap-4">
              <Button 
                className="flex-1 bg-gradient-to-r from-phant-blue to-phant-neon-blue text-white hover:from-phant-neon-blue hover:to-phant-blue transition-all duration-300"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
              
              <Button 
                variant="outline" 
                className={`border-phant-dark-gray ${inWishlist ? 'text-phant-blue' : 'text-phant-silver/80 hover:text-phant-blue'}`}
                onClick={handleWishlist}
              >
                <Heart className="mr-2 h-4 w-4" fill={inWishlist ? '#4FACFE' : 'none'} />
                {inWishlist ? 'Wishlisted' : 'Wishlist'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductDetail;
