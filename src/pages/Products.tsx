import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Filter, ChevronDown, ChevronLeft } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import ProductCard from '@/components/ProductCard';
import CategoryCard from '@/components/CategoryCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ProductCategory, ProductSubcategory } from '@/types/product';

// Reorganized product data with subcategories
const productData = [
  {
    id: "1",
    title: "Billboard - Ultimate Trade Plugin",
    description: "A powerful trade plugin for your Minecraft server",
    price: 0,
    discountPrice: undefined,
    rating: 4.8,
    image: "https://img.dbhostings.com/uploads/682778d2d6981.jpg",
    category: "Minecraft",
    subcategory: "Plugins",
    badge: "Free",
    bybitUrl: "https://builtbybit.com/resources/billboard-ultimate-trade-plugin.66428/",
    visible: true
  },
  {
    id: "2",
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
    id: "3",
    title: "CoinFlip - Make Your Server Cool",
    description: "Add exciting coinflip games to your server",
    price: 1.99,
    discountPrice: undefined,
    rating: 4.7,
    image: "https://img.dbhostings.com/uploads/68277998c70c5.jpg",
    category: "Minecraft",
    subcategory: "Plugins",
    bybitUrl: "https://builtbybit.com/resources/coinflip-make-your-server-cool.64712/",
    visible: true
  },
  {
    id: "4",
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
    id: "5",
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
  },
  {
    id: "6",
    title: "Easy SingleBiome Crystal PvP",
    description: "Single biome crystal PvP setup",
    price: 4.99,
    discountPrice: undefined,
    rating: 4.8,
    image: "https://img.dbhostings.com/uploads/682780402796d.jpg",
    category: "Minecraft",
    subcategory: "Server Setups",
    bybitUrl: "https://builtbybit.com/resources/easy-singlebiome-crystal-pvp.62332/",
    visible: true
  },
  {
    id: "7",
    title: "EasyKillstreak - Make Your Server Cool",
    description: "Add killstreak features to your server",
    price: 0.99,
    discountPrice: undefined,
    rating: 4.6,
    image: "https://img.dbhostings.com/uploads/68278089c99ba.jpg",
    category: "Minecraft",
    subcategory: "Plugins",
    bybitUrl: "https://builtbybit.com/resources/easykillstreak-make-your-server-cool.61329/",
    visible: true
  },
  {
    id: "8",
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
  }
];

// Define hierarchical categories structure
const categoryStructure: ProductCategory[] = [
  {
    id: "discord",
    name: "Discord",
    description: "Discord bots and tools",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8"><path d="M9 17l6 0"></path><path d="M13 9c0-1-1-2-3-2-2 0-3 1-3 2s1 2 3 2c2 0 3 1 3 2s-1 2-3 2c-2 0-3-1-3-2"></path><path d="M12 19a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z"></path></svg>',
    subcategories: [
      {
        id: "discord-bots",
        name: "Bots",
        description: "Discord bot solutions",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12" y2="16"></line></svg>',
        count: productData.filter(p => p.category === "Discord" && p.subcategory === "Bots" && p.visible).length
      },
      {
        id: "discord-others",
        name: "Others",
        description: "Other Discord tools",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12" y2="16"></line></svg>',
        count: productData.filter(p => p.category === "Discord" && p.subcategory === "Others" && p.visible).length
      }
    ],
    count: productData.filter(p => p.category === "Discord" && p.visible).length
  },
  {
    id: "minecraft",
    name: "Minecraft",
    description: "Minecraft plugins and resources",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8"><rect width="20" height="20" x="2" y="2" rx="2"></rect><rect width="8" height="8" x="8" y="8" rx="1"></rect></svg>',
    subcategories: [
      {
        id: "minecraft-plugins",
        name: "Plugins",
        description: "Server plugins and extensions",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12" y2="16"></line></svg>',
        count: productData.filter(p => p.category === "Minecraft" && p.subcategory === "Plugins" && p.visible).length
      },
      {
        id: "minecraft-server-setups",
        name: "Server Setups",
        description: "Complete server configurations",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12" y2="16"></line></svg>',
        count: productData.filter(p => p.category === "Minecraft" && p.subcategory === "Server Setups" && p.visible).length
      },
      {
        id: "minecraft-builds",
        name: "Builds",
        description: "Pre-made world builds and structures",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12" y2="16"></line></svg>',
        count: productData.filter(p => p.category === "Minecraft" && p.subcategory === "Builds" && p.visible).length
      },
      {
        id: "minecraft-configs",
        name: "Configs",
        description: "Configuration files and templates",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12" y2="16"></line></svg>',
        count: productData.filter(p => p.category === "Minecraft" && p.subcategory === "Configs" && p.visible).length
      },
      {
        id: "minecraft-skripts",
        name: "Skripts",
        description: "Skript scripts and addons",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12" y2="16"></line></svg>',
        count: productData.filter(p => p.category === "Minecraft" && p.subcategory === "Skripts" && p.visible).length
      },
      {
        id: "minecraft-others",
        name: "Others",
        description: "Other Minecraft resources",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12" y2="16"></line></svg>',
        count: productData.filter(p => p.category === "Minecraft" && p.subcategory === "Others" && p.visible).length
      }
    ],
    count: productData.filter(p => p.category === "Minecraft" && p.visible).length
  },
  {
    id: "roblox",
    name: "Roblox",
    description: "Roblox game resources",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8"><rect width="18" height="18" x="3" y="3" rx="2"></rect><path d="M7 7h.01"></path><path d="M17 7h.01"></path><path d="M7 17h.01"></path><path d="M17 17h.01"></path></svg>',
    subcategories: [
      {
        id: "roblox-game-setups",
        name: "Game Setups",
        description: "Complete game templates",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12" y2="16"></line></svg>',
        count: productData.filter(p => p.category === "Roblox" && p.subcategory === "Game Setups" && p.visible).length
      },
      {
        id: "roblox-maps",
        name: "Maps",
        description: "Premade maps and environments",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12" y2="16"></line></svg>',
        count: productData.filter(p => p.category === "Roblox" && p.subcategory === "Maps" && p.visible).length
      },
      {
        id: "roblox-vehicles",
        name: "Vehicles",
        description: "Vehicle models and scripts",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12" y2="16"></line></svg>',
        count: productData.filter(p => p.category === "Roblox" && p.subcategory === "Vehicles" && p.visible).length
      },
      {
        id: "roblox-skripts",
        name: "Scripts",
        description: "Lua scripts and modules",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12" y2="16"></line></svg>',
        count: productData.filter(p => p.category === "Roblox" && p.subcategory === "Scripts" && p.visible).length
      },
      {
        id: "roblox-others",
        name: "Others",
        description: "Other Roblox resources",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12" y2="16"></line></svg>',
        count: productData.filter(p => p.category === "Roblox" && p.subcategory === "Others" && p.visible).length
      }
    ],
    count: productData.filter(p => p.category === "Roblox" && p.visible).length
  },
  {
    id: "website",
    name: "Website",
    description: "Website templates and tools",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><line x1="3" x2="21" y1="9" y2="9"></line><line x1="9" x2="9" y1="21" y2="9"></line></svg>',
    subcategories: [
      {
        id: "website-standalone",
        name: "Standalone",
        description: "Complete website templates",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12" y2="16"></line></svg>',
        count: productData.filter(p => p.category === "Website" && p.subcategory === "Standalone" && p.visible).length
      },
      {
        id: "website-tebex",
        name: "Tebex",
        description: "Tebex themes and integrations",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12" y2="16"></line></svg>',
        count: productData.filter(p => p.category === "Website" && p.subcategory === "Tebex" && p.visible).length
      },
      {
        id: "website-pterodactyl",
        name: "Pterodactyl",
        description: "Pterodactyl panel themes",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8"><path d="M12 3C4 3 4 9 4 9v4.5C4 16 6 18 9 18h1.5"></path><path d="M4 9h16"></path><path d="M20 9c0-3.3-2.7-6-6-6"></path><path d="M16 21v-7"></path><path d="M13 17l3 4 3-4"></path></svg>',
        count: productData.filter(p => p.category === "Website" && p.subcategory === "Pterodactyl" && p.visible).length
      },
      {
        id: "website-namelessmc",
        name: "NamelessMC",
        description: "NamelessMC themes and modules",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12" y2="16"></line></svg>',
        count: productData.filter(p => p.category === "Website" && p.subcategory === "NamelessMC" && p.visible).length
      },
      {
        id: "website-xenforo",
        name: "Xenforo",
        description: "Xenforo themes and addons",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12" y2="16"></line></svg>',
        count: productData.filter(p => p.category === "Website" && p.subcategory === "Xenforo" && p.visible).length
      },
      {
        id: "website-others",
        name: "Others",
        description: "Other website resources",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12" y2="16"></line></svg>',
        count: productData.filter(p => p.category === "Website" && p.subcategory === "Others" && p.visible).length
      }
    ],
    count: productData.filter(p => p.category === "Website" && p.visible).length
  }
];

const Products = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'main' | 'category' | 'subcategory'>('main');
  const location = useLocation();
  
  // Check for category and subcategory in URL query params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    const subcategoryParam = params.get('subcategory');
    
    if (categoryParam && subcategoryParam) {
      setSelectedCategory(categoryParam);
      setSelectedSubcategory(subcategoryParam);
      setViewMode('subcategory');
    } else if (categoryParam) {
      setSelectedCategory(categoryParam);
      setSelectedSubcategory(null);
      setViewMode('category');
    } else {
      setSelectedCategory(null);
      setSelectedSubcategory(null);
      setViewMode('main');
    }
  }, [location.search]);
  
  // Filter products based on search query, category, subcategory and visibility
  const filteredProducts = productData.filter(product => {
    const matchesSearch = !searchQuery || 
                         product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesSubcategory = !selectedSubcategory || product.subcategory === selectedSubcategory;
    const isVisible = product.visible !== false; // Only show products that are visible
    
    return matchesSearch && matchesCategory && matchesSubcategory && isVisible;
  });

  const getCurrentCategory = () => {
    return categoryStructure.find(category => category.name === selectedCategory);
  };

  const getCurrentSubcategories = () => {
    const category = getCurrentCategory();
    return category ? category.subcategories : [];
  };

  const handleResetFilters = () => {
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    setSearchQuery("");
    setViewMode('main');
    window.history.pushState({}, '', '/products');
  };

  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setSelectedSubcategory(null);
    setViewMode('category');
    window.history.pushState({}, '', `/products?category=${encodeURIComponent(categoryName)}`);
  };

  const handleSubcategorySelect = (subcategoryName: string) => {
    setSelectedSubcategory(subcategoryName);
    setViewMode('subcategory');
    window.history.pushState({}, '', `/products?category=${encodeURIComponent(selectedCategory || '')}&subcategory=${encodeURIComponent(subcategoryName)}`);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    setViewMode('main');
    window.history.pushState({}, '', '/products');
  };

  const handleBackToCategory = () => {
    setSelectedSubcategory(null);
    setViewMode('category');
    window.history.pushState({}, '', `/products?category=${encodeURIComponent(selectedCategory || '')}`);
  };

  // Get all visible products
  const allVisibleProducts = productData.filter(product => product.visible !== false);

  return (
    <MainLayout>
      <section className="pt-32 pb-20">
        <div className="container px-4 mx-auto">
          <div className="max-w-xl mx-auto text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Products</h1>
            <p className="text-muted-foreground">Explore our collection of premium digital products</p>
          </div>
          
          {/* Navigation Breadcrumb */}
          {viewMode !== 'main' && (
            <div className="mb-8">
              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleBackToCategories}
                >
                  All Categories
                </Button>
                
                {viewMode === 'category' || viewMode === 'subcategory' ? (
                  <>
                    <span>/</span>
                    <Button
                      variant={viewMode === 'subcategory' ? "ghost" : "default"}
                      size="sm"
                      onClick={() => handleCategorySelect(selectedCategory || '')}
                    >
                      {selectedCategory}
                    </Button>
                  </>
                ) : null}
                
                {viewMode === 'subcategory' ? (
                  <>
                    <span>/</span>
                    <Button
                      variant="default"
                      size="sm"
                    >
                      {selectedSubcategory}
                    </Button>
                  </>
                ) : null}
              </div>
            </div>
          )}
          
          {/* Search Bar - Always visible */}
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          {/* Main Categories View */}
          {viewMode === 'main' && (
            <>
              <div className="mb-12">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold mb-2">Browse by Category</h2>
                  <p className="text-muted-foreground">Find the perfect digital products for your needs</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {categoryStructure.map((category) => (
                    <div 
                      key={category.id}
                      onClick={() => handleCategorySelect(category.name)}
                      className="cursor-pointer"
                    >
                      <CategoryCard category={category} />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* All Products on Main Page */}
              <div className="mt-16">
                <h2 className="text-2xl font-bold mb-8 text-center">All Products</h2>
                {allVisibleProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {allVisibleProducts.map((product, index) => (
                      <div 
                        key={product.id} 
                        className="animate-fade-in" 
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <ProductCard {...product} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No products available at the moment</p>
                  </div>
                )}
              </div>
            </>
          )}
          
          {/* Category View with Subcategories */}
          {viewMode === 'category' && (
            <div className="mb-12">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{selectedCategory}</h2>
                  <p className="text-muted-foreground">Browse {selectedCategory} subcategories</p>
                </div>
                <Button 
                  variant="outline"
                  onClick={handleBackToCategories}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft size={16} /> Back to Categories
                </Button>
              </div>
              
              {/* Subcategories Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {getCurrentSubcategories().map((subcategory) => (
                  <div 
                    key={subcategory.id}
                    onClick={() => handleSubcategorySelect(subcategory.name)}
                    className="cursor-pointer"
                  >
                    <CategoryCard 
                      category={subcategory} 
                      isSubcategory={true}
                      parentCategory={selectedCategory || undefined}
                    />
                  </div>
                ))}
              </div>
              
              {/* Products in this category (without filtering by subcategory) */}
              <div>
                <h3 className="text-xl font-bold mb-6">All {selectedCategory} Products</h3>
                
                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map((product, index) => (
                      <div 
                        key={product.id} 
                        className="animate-fade-in" 
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <ProductCard {...product} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground mb-4">No products found in this category</p>
                    <Button 
                      variant="outline" 
                      onClick={handleResetFilters}
                    >
                      View All Products
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Subcategory View */}
          {viewMode === 'subcategory' && (
            <div className="mb-12">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{selectedCategory} - {selectedSubcategory}</h2>
                  <p className="text-muted-foreground">Browse {selectedCategory} {selectedSubcategory} products</p>
                </div>
                <Button 
                  variant="outline"
                  onClick={handleBackToCategory}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft size={16} /> Back to {selectedCategory}
                </Button>
              </div>
              
              {/* Products in this subcategory */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map((product, index) => (
                    <div 
                      key={product.id} 
                      className="animate-fade-in" 
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <ProductCard {...product} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">No products found in this subcategory</p>
                  <Button 
                    variant="outline" 
                    onClick={handleBackToCategory}
                  >
                    View All {selectedCategory} Products
                  </Button>
                </div>
              )}
            </div>
          )}
          
          {/* No products found state - when filtering */}
          {filteredProducts.length === 0 && searchQuery && (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No products found matching your search</p>
              <Button 
                variant="outline" 
                onClick={() => setSearchQuery('')}
              >
                Clear Search
              </Button>
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
};

export default Products;