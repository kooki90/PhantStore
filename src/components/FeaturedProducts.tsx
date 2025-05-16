import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from './ProductCard';
import { Link } from 'react-router-dom';

// Mock data for featured products
const featuredProducts = [
  {
    id: "1",
    title: "Advanced Crystal PvP Setup",
    description: "Complete crystal PvP setup for your server",
    price: 26.99,
    discountPrice: undefined,
    rating: 4.9,
    image: "https://img.dbhostings.com/uploads/682779cb27b98.jpg",
    category: "Minecraft",
    subcategory: "Server Setups",
    badge: "Premium",
    bybitUrl: "https://builtbybit.com/resources/advanced-crystal-pvp-setup.63510/",
    visible: true
  },
  {
    id: "2",
    title: "StrikePractice Custom Server Setup",
    description: "Complete StrikePractice server configuration",
    price: 24.99,
    discountPrice: undefined,
    rating: 4.9,
    image: "https://img.dbhostings.com/uploads/682780addd3e5.jpg",
    category: "Minecraft",
    subcategory: "Server Setups",
    badge: "Premium",
    bybitUrl: "https://builtbybit.com/resources/strikepractice-custom-server-setup.60046/",
    visible: true
  },
  {
    id: "3",
    title: "ArenaResetter",
    description: "Arena reset plugin for Minecraft servers",
    price: 3.99,
    discountPrice: undefined,
    rating: 4.6,
    image: "https://img.dbhostings.com/uploads/68277969a8aa5.jpg",
    category: "Minecraft",
    subcategory: "Plugins",
    bybitUrl: "https://builtbybit.com/resources/arenaresetter.64042/",
    visible: true
  },
  {
    id: "4",
    title: "LightRTPQueue",
    description: "Advanced RTP queue system for Minecraft",
    price: 3.99,
    discountPrice: undefined,
    rating: 4.7,
    image: "https://img.dbhostings.com/uploads/68277fff18dc1.jpg",
    category: "Minecraft",
    subcategory: "Plugins",
    bybitUrl: "https://builtbybit.com/resources/lightrtpqueue.63190/",
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