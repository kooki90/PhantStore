import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from './ProductCard';
import { Link } from 'react-router-dom';

// Mock data for featured products
const featuredProducts = [
  {
    id: "1",
    title: "Info, Moderation & Chat Skript",
    description: "Powerful Skript that adds essential player and admin commands while preventing command abuse.",
    price: 1.50,
    discountPrice: 1.35,
    rating: 4.8,
    image: "https://img.dbhostings.com/uploads/67ef956a7787b.png?q=80&w=1000&auto=format&fit=crop",
    category: "Minecraft",
    subcategory: "Skripts",
    badge: "Best Seller",
    bybitUrl: "https://builtbybit.com/resources/info-moderation-chat-skript.63611/",
    visible: true
  },
  {
    id: "2",
    title: "Minecraft Economy Plugin",
    description: "Complete economy system with shops, banking, and player markets for Minecraft servers.",
    price: 24.99,
    discountPrice: undefined,
    rating: 4.6,
    image: "https://img.dbhostings.com/uploads/67ed1bbdf3914.jpg?q=80&w=1000&auto=format&fit=crop",
    category: "Minecraft",
    subcategory: "Skripts",
    bybitUrl: "https://builtbybit.com/creators/phant_walker.522983",
    visible: true
  },
  {
    id: "3",
    title: "Minecraft Economy Plugin",
    description: "Complete economy system with shops, banking, and player markets for Minecraft servers.",
    price: 24.99,
    discountPrice: undefined,
    rating: 4.6,
    image: "https://img.dbhostings.com/uploads/67ed1bbdf3914.jpg?q=80&w=1000&auto=format&fit=crop",
    category: "Minecraft",
    subcategory: "Skripts",
    bybitUrl: "https://builtbybit.com/creators/phant_walker.522983",
    visible: true
  },
  {
    id: "4",
    title: "Roblox Game Template",
    description: "Fully-featured game template with customizable mechanics and monetization.",
    price: 59.99,
    discountPrice: undefined,
    rating: 4.7,
    image: "https://img.dbhostings.com/uploads/67ed1bbdf3914.jpg?q=80&w=1000&auto=format&fit=crop",
    category: "Minecraft",
    subcategory: "Skripts",
    bybitUrl: "https://builtbybit.com/creators/phant_walker.522983",
    visible: true
  }
];

const FeaturedProducts = () => {
  return (
    <section className="py-20 relative">
      {/* Background accents */}
      <div className="absolute left-0 top-40 w-1/3 h-80 bg-phant-blue/5 blur-3xl rounded-full"></div>
      
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="mb-6 md:mb-0">
            <div className="inline-block px-3 py-1 rounded-full bg-phant-blue/10 border border-phant-blue/20 text-phant-blue text-xs font-medium mb-3">
              Top Products
            </div>
            <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
            <p className="text-phant-gray max-w-md">Discover our most popular digital products trusted by thousands of developers</p>
          </div>
          
          <Link to="/products">
            <Button variant="ghost" className="text-phant-blue hover:text-phant-neon-blue hover:bg-phant-blue/5 group">
              View All Products
              <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <div 
              key={product.id} 
              className="animate-slide-up-fade" 
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
