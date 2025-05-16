import { useState, useEffect } from 'react';
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

// Mock data for products - would come from API in a real application
const products = [
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
    bybitUrl: "https://builtbybit.com/resources/info-moderation-chat-skript.63611/"
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
    bybitUrl: "https://builtbybit.com/creators/phant_walker.522983"
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
    bybitUrl: "https://builtbybit.com/creators/phant_walker.522983"
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
    bybitUrl: "https://builtbybit.com/creators/phant_walker.522983"
    visible: true
  }
];

// Pages for navigation
const pages = [
  { id: "home", name: "Home", path: "/" },
  { id: "products", name: "Products", path: "/products" },
  { id: "about", name: "About Us", path: "/about" },
  { id: "contact", name: "Contact", path: "/contact" },
  { id: "profile", name: "My Profile", path: "/profile" },
  { id: "purchases", name: "My Purchases", path: "/purchases" },
  { id: "licenses", name: "My Licenses", path: "/licenses" },
];

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SearchDialog = ({ open, onOpenChange }: SearchDialogProps) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Reset search when dialog opens
  useEffect(() => {
    if (open) {
      setSearchQuery("");
    }
  }, [open]);
  
  const handleSelect = (id: string, type: 'product' | 'page') => {
    onOpenChange(false);
    
    if (type === 'product') {
      navigate(`/products/${id}`);
    } else {
      const page = pages.find(page => page.id === id);
      if (page) {
        navigate(page.path);
      }
    }
  };
  
  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput 
        placeholder="Search products, pages..." 
        value={searchQuery}
        onValueChange={setSearchQuery}
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        
        <CommandGroup heading="Products">
          {products
            .filter(product => 
              product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
              product.category.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .slice(0, 5)
            .map(product => (
              <CommandItem
                key={product.id}
                value={`product-${product.id}`}
                onSelect={() => handleSelect(product.id, 'product')}
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded overflow-hidden mr-3 bg-muted flex-shrink-0">
                    <img 
                      src={product.image} 
                      alt={product.title} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder.svg';
                      }}
                    />
                  </div>
                  <div>
                    <p className="font-medium">{product.title}</p>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                  </div>
                </div>
              </CommandItem>
            ))}
        </CommandGroup>
        
        <CommandGroup heading="Pages">
          {pages
            .filter(page => 
              page.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map(page => (
              <CommandItem
                key={page.id}
                value={`page-${page.id}`}
                onSelect={() => handleSelect(page.id, 'page')}
              >
                <Search className="mr-2 h-4 w-4" />
                <span>{page.name}</span>
              </CommandItem>
            ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default SearchDialog;
