import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Pencil, Trash2, Eye, EyeOff } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
import AdminLayout from '@/layouts/AdminLayout';
import { Product } from '@/types/product';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Main categories and their subcategories
const categories = {
  "Discord": ["Bots", "Others"],
  "Minecraft": ["Plugins", "Server Setups", "Builds", "Configs", "Skripts", "Others"],
  "Roblox": ["Game Setups", "Maps", "Vehicles", "Scripts", "Others"],
  "Website": ["Standalone", "Tebex", "Pterodactyl", "NamelessMC", "Xenforo", "Others"]
};

// Mock data - would come from API in a real application
const initialProducts: Product[] = [
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
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1631049035182-249067d7618e?q=80&w=1000&auto=format&fit=crop",
    category: "Minecraft",
    subcategory: "Plugins",
    bybitUrl: "https://builtbybit.com/creators/phant_walker.522983",
    visible: false
  },
  {
    id: "3",
    title: "Pterodactyl Control Panel Theme",
    description: "Premium dark theme for Pterodactyl with customizable elements and improved UX.",
    price: 19.99,
    discountPrice: 14.99,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1629654291663-b91ad427698f?q=80&w=1000&auto=format&fit=crop",
    category: "Website",
    subcategory: "Pterodactyl",
    badge: "New",
    bybitUrl: "https://builtbybit.com/creators/phant_walker.522983",
    visible: false
  },
  {
    id: "4",
    title: "Roblox Game Template",
    description: "Fully-featured game template with customizable mechanics and monetization.",
    price: 59.99,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?q=80&w=1000&auto=format&fit=crop",
    category: "Roblox",
    subcategory: "Game Setups",
    bybitUrl: "https://builtbybit.com/creators/phant_walker.522983",
    visible: false
  }
];

const Products = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});
  const [isNewProduct, setIsNewProduct] = useState(false);
  const { toast } = useToast();
  const [availableSubcategories, setAvailableSubcategories] = useState<string[]>([]);

  const handleOpenNewProductDialog = () => {
    setCurrentProduct({
      id: String(Date.now()),
      title: '',
      description: '',
      price: 0,
      discountPrice: undefined,
      rating: 5,
      image: '',
      category: '',
      subcategory: '',
      badge: '',
      bybitUrl: 'https://builtbybit.com/creators/phant_walker.522983',
      visible: true
    });
    setAvailableSubcategories([]);
    setIsNewProduct(true);
    setIsEditDialogOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setCurrentProduct({...product});
    // Set available subcategories based on the product's category
    if (product.category && product.category in categories) {
      setAvailableSubcategories(categories[product.category as keyof typeof categories] || []);
    } else {
      setAvailableSubcategories([]);
    }
    setIsNewProduct(false);
    setIsEditDialogOpen(true);
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      // API call to delete product
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setProducts(products.filter(product => product.id !== id));
        toast({
          title: "Product deleted",
          description: "The product has been deleted successfully."
        });
      } else {
        throw new Error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({
        title: "Error",
        description: "Failed to delete product. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentProduct.title || !currentProduct.price) {
      toast({
        title: "Error",
        description: "Title and price are required fields.",
        variant: "destructive"
      });
      return;
    }
    
    if (isNewProduct) {
      setProducts([...products, currentProduct as Product]);
      toast({
        title: "Product created",
        description: "The product has been created successfully."
      });
    } else {
      setProducts(products.map(product => 
        product.id === currentProduct.id ? {...currentProduct as Product} : product
      ));
      toast({
        title: "Product updated",
        description: "The product has been updated successfully."
      });
    }
    
    setIsEditDialogOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentProduct({
      ...currentProduct,
      [name]: name === 'price' || name === 'discountPrice' || name === 'rating' 
        ? parseFloat(value) || 0 
        : value
    });
  };

  const handleCategoryChange = (value: string) => {
    setCurrentProduct({
      ...currentProduct,
      category: value,
      subcategory: '' // Reset subcategory when category changes
    });
    
    // Update available subcategories
    if (value in categories) {
      setAvailableSubcategories(categories[value as keyof typeof categories] || []);
    } else {
      setAvailableSubcategories([]);
    }
  };

  const handleSubcategoryChange = (value: string) => {
    setCurrentProduct({
      ...currentProduct,
      subcategory: value
    });
  };

  const handleVisibilityChange = (id: string) => {
    setProducts(products.map(product => 
      product.id === id ? { ...product, visible: !product.visible } : product
    ));
    
    const updatedProduct = products.find(product => product.id === id);
    const newVisibility = !(updatedProduct?.visible);
    
    toast({
      title: newVisibility ? "Product visible" : "Product hidden",
      description: `The product is now ${newVisibility ? 'visible' : 'hidden'} on the website.`
    });
  };

  const handleVisibilityToggle = (checked: boolean) => {
    setCurrentProduct({
      ...currentProduct,
      visible: checked
    });
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <Button onClick={handleOpenNewProductDialog}>
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Product List</CardTitle>
          <CardDescription>Manage your digital products</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Subcategory</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Visibility</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.title}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.subcategory || '-'}</TableCell>
                  <TableCell>
                    {product.discountPrice ? (
                      <div>
                        <span className="font-semibold">${product.discountPrice.toFixed(2)}</span>
                        <span className="text-xs text-muted-foreground line-through ml-2">${product.price.toFixed(2)}</span>
                      </div>
                    ) : (
                      `$${product.price.toFixed(2)}`
                    )}
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleVisibilityChange(product.id)}
                      className={product.visible ? "text-green-500" : "text-red-500"}
                    >
                      {product.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => handleEditProduct(product)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="text-destructive"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              
              {products.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-6">
                    No products found. Click 'Add Product' to create one.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{isNewProduct ? 'Add New Product' : 'Edit Product'}</DialogTitle>
            <DialogDescription>
              {isNewProduct 
                ? 'Fill in the details to create a new product.' 
                : 'Update the product information below.'}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSaveProduct} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title*</Label>
                <Input 
                  id="title" 
                  name="title" 
                  value={currentProduct.title || ''} 
                  onChange={handleInputChange} 
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category*</Label>
                <Select 
                  value={currentProduct.category || ''} 
                  onValueChange={handleCategoryChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(categories).map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subcategory">Subcategory</Label>
                <Select 
                  value={currentProduct.subcategory || ''} 
                  onValueChange={handleSubcategoryChange}
                  disabled={!currentProduct.category || availableSubcategories.length === 0}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select subcategory" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableSubcategories.map(subcat => (
                      <SelectItem key={subcat} value={subcat}>{subcat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="price">Price*</Label>
                <Input 
                  id="price" 
                  name="price" 
                  type="number" 
                  min="0" 
                  step="0.01" 
                  value={currentProduct.price || ''} 
                  onChange={handleInputChange} 
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="discountPrice">Discount Price</Label>
                <Input 
                  id="discountPrice" 
                  name="discountPrice" 
                  type="number" 
                  min="0" 
                  step="0.01" 
                  value={currentProduct.discountPrice || ''} 
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="rating">Rating</Label>
                <Input 
                  id="rating" 
                  name="rating" 
                  type="number" 
                  min="0" 
                  max="5" 
                  step="0.1" 
                  value={currentProduct.rating || 5} 
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="badge">Badge</Label>
                <Input 
                  id="badge" 
                  name="badge" 
                  value={currentProduct.badge || ''} 
                  onChange={handleInputChange}
                  placeholder="e.g. New, Best Seller"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="visibility" 
                    checked={currentProduct.visible ?? true}
                    onCheckedChange={handleVisibilityToggle}
                  />
                  <Label htmlFor="visibility" className="cursor-pointer">
                    Visible on website
                  </Label>
                </div>
                <p className="text-xs text-muted-foreground">
                  When checked, this product will be shown on the website
                </p>
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="bybitUrl">Bybit URL*</Label>
                <Input 
                  id="bybitUrl" 
                  name="bybitUrl" 
                  value={currentProduct.bybitUrl || 'https://builtbybit.com/creators/phant_walker.522983'} 
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="image">Image URL</Label>
                <Input 
                  id="image" 
                  name="image" 
                  value={currentProduct.image || ''} 
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  name="description" 
                  value={currentProduct.description || ''} 
                  onChange={handleInputChange} 
                  rows={4}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {isNewProduct ? 'Create Product' : 'Save Changes'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default Products;