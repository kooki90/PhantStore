import { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/context/CartContext';
import { Package, Check, ShoppingCart } from 'lucide-react';

// Mock bundle data
const bundleData = [
  {
    id: "bundle1",
    title: "Discord + Minecraft Bundle",
    description: "Get our popular Discord Moderation Bot and Minecraft Economy Plugin at a discounted price",
    regularPrice: 74.98,
    bundlePrice: 59.99,
    savings: 14.99,
    savingsPercent: 20,
    products: [
      {
        id: "1",
        title: "Discord Bot Pro - Moderation Suite",
        description: "Advanced moderation tools with AI-powered content filtering and user management.",
        price: 49.99,
        image: "https://img.dbhostings.com/uploads/67ef956a7787b.png?q=80&w=1000&auto=format&fit=croped2d66c3726158affb93550b0ec274c2",
        category: "Discord Bots",
        bybitUrl: "https://builtbybit.com/creators/phant_walker.522983"
      },
      {
        id: "2",
        title: "Minecraft Economy Plugin",
        description: "Complete economy system with shops, banking, and player markets for Minecraft servers.",
        price: 24.99,
        image: "https://img.dbhostings.com/uploads/67ef956a7787b.png?q=80&w=1000&auto=format&fit=crop%%__NONCE__%%",
        category: "Minecraft Plugins",
        bybitUrl: "https://builtbybit.com/creators/phant_walker.522983"
      }
    ]
  },
  {
    id: "bundle2",
    title: "Minecraft Ultimate Bundle",
    description: "Take your Minecraft server to the next level with our most popular Minecraft plugins",
    regularPrice: 84.97,
    bundlePrice: 64.99,
    savings: 19.98,
    savingsPercent: 23,
    products: [
      {
        id: "2",
        title: "Minecraft Economy Plugin",
        description: "Complete economy system with shops, banking, and player markets for Minecraft servers.",
        price: 24.99,
        image: "https://img.dbhostings.com/uploads/67ef956a7787b.png?q=80&w=1000&auto=format&fit=crop%%__NONCE__%%",
        category: "Minecraft Plugins",
        bybitUrl: "https://builtbybit.com/creators/phant_walker.522983"
      },
      {
        id: "6",
        title: "Minecraft Server Management Plugin",
        description: "Advanced server management with performance optimization and monitoring tools.",
        price: 34.99,
        image: "https://images.unsplash.com/photo-1639253960237-21f8b264e566?q=80&w=1000&auto=format&fit=crop%%__NONCE__%%",
        category: "Minecraft Plugins",
        bybitUrl: "https://builtbybit.com/creators/phant_walker.522983"
      },
      {
        id: "8",
        title: "Minecraft Minigames Bundle",
        description: "Collection of 10 popular minigames ready to deploy on your Minecraft server.",
        price: 24.99,
        image: "https://img.dbhostings.com/uploads/67ef956a7787b.png?q=80&w=1000&auto=format&fit=crop%%__NONCE__%%",
        category: "Minecraft Plugins",
        bybitUrl: "https://builtbybit.com/creators/phant_walker.522983"
      }
    ]
  },
  {
    id: "bundle3",
    title: "Developer Essentials Bundle",
    description: "Perfect for developers, including a portfolio template and Discord integration tools",
    regularPrice: 69.98,
    bundlePrice: 49.99,
    savings: 19.99,
    savingsPercent: 28,
    products: [
      {
        id: "1",
        title: "Discord Bot Pro - Moderation Suite",
        description: "Advanced moderation tools with AI-powered content filtering and user management.",
        price: 49.99,
        image: "https://img.dbhostings.com/uploads/67ef956a7787b.png?q=80&w=1000&auto=format&fit=crop%%__NONCE__%%",
        category: "Discord Bots",
        bybitUrl: "https://builtbybit.com/creators/phant_walker.522983"
      },
      {
        id: "7",
        title: "Personal Portfolio Template",
        description: "Responsive portfolio website template with dark mode and customizable sections.",
        price: 19.99,
        image: "https://img.dbhostings.com/uploads/67ef956a7787b.png?q=80&w=1000&auto=format&fit=crop%%__NONCE__%%",
        category: "Website Templates",
        bybitUrl: "https://builtbybit.com/creators/phant_walker.522983"
      }
    ]
  }
];

const Bundles = () => {
  const { toast } = useToast();
  const { addToCart } = useCart();
  const [expandedBundle, setExpandedBundle] = useState<string | null>(null);

  const toggleBundle = (id: string) => {
    setExpandedBundle(expandedBundle === id ? null : id);
  };

  const handleAddBundleToCart = (bundle: any) => {
    // Creating a single bundle product from multiple products
    const bundleItem = {
      id: bundle.id,
      title: bundle.title,
      description: bundle.description,
      price: bundle.regularPrice,
      discountPrice: bundle.bundlePrice,
      rating: 5.0,
      image: bundle.products[0].image,
      category: "Bundles",
      badge: `Save ${bundle.savingsPercent}%`,
      bybitUrl: "https://builtbybit.com/creators/phant_walker.522983?%%__NONCE__%%",
      quantity: 1
    };
    
    addToCart(bundleItem);
    
    toast({
      title: "Bundle added to cart",
      description: `${bundle.title} has been added to your cart.`,
    });
  };

  return (
    <MainLayout>
      <section className="pt-32 pb-20">
        <div className="container px-4 mx-auto">
          <div className="max-w-xl mx-auto text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Bundle Deals</h1>
            <p className="text-phant-gray">Save money by purchasing our curated product bundles</p>
          </div>
          
          <div className="grid gap-8 mb-16">
            {bundleData.map((bundle) => (
              <div key={bundle.id} className="glassmorphism rounded-xl overflow-hidden transition-all duration-300 hover:border-phant-blue/40">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-1/4">
                      <div className="aspect-square rounded-lg overflow-hidden">
                        <img src={bundle.products[0].image} alt={bundle.title} className="w-full h-full object-cover" />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                        <div>
                          <div className="inline-block px-3 py-1 rounded-full bg-phant-blue/20 text-phant-blue text-xs font-medium mb-2">
                            Save {bundle.savingsPercent}%
                          </div>
                          <h2 className="text-xl font-bold mb-2">{bundle.title}</h2>
                          <p className="text-phant-gray mb-4">{bundle.description}</p>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {bundle.products.map((product) => (
                              <span key={product.id} className="text-xs bg-phant-dark-blue px-2 py-1 rounded">
                                {product.category}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-start md:items-end space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-phant-gray line-through text-sm">${bundle.regularPrice.toFixed(2)}</span>
                            <span className="text-phant-blue font-bold text-2xl">${bundle.bundlePrice.toFixed(2)}</span>
                          </div>
                          <p className="text-green-400 text-sm">You save: ${bundle.savings.toFixed(2)}</p>
                          
                          <Button 
                            onClick={() => handleAddBundleToCart(bundle)}
                            className="mt-4 bg-gradient-to-r from-phant-blue to-phant-neon-blue hover:from-phant-neon-blue hover:to-phant-blue text-white transition-all duration-300"
                          >
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            Add Bundle to Cart
                          </Button>
                        </div>
                      </div>
                      
                      <Button 
                        variant="ghost" 
                        onClick={() => toggleBundle(bundle.id)}
                        className="text-phant-blue hover:text-phant-neon-blue hover:bg-phant-blue/10 w-full justify-start"
                      >
                        <Package className="mr-2 h-4 w-4" />
                        {expandedBundle === bundle.id ? "Hide Bundle Contents" : "Show Bundle Contents"}
                      </Button>
                    </div>
                  </div>
                  
                  {expandedBundle === bundle.id && (
                    <div className="mt-6 border-t border-phant-dark-gray pt-6 animate-slide-down-fade">
                      <h3 className="text-lg font-medium mb-4">Bundle Contents:</h3>
                      <div className="space-y-4">
                        {bundle.products.map((product) => (
                          <div key={product.id} className="flex items-start gap-4 p-4 rounded-lg bg-phant-dark-blue/50">
                            <div className="w-16 h-16 flex-shrink-0 rounded overflow-hidden">
                              <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium">{product.title}</h4>
                              <p className="text-phant-gray text-sm line-clamp-2">{product.description}</p>
                            </div>
                            <div className="flex flex-col items-end">
                              <p className="text-phant-blue font-medium">${product.price.toFixed(2)}</p>
                              <div className="flex items-center text-green-400 text-xs mt-1">
                                <Check className="h-3 w-3 mr-1" />
                                Included
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Bundles;
