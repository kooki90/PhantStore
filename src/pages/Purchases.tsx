
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, FileText, Search, ShoppingBag } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Purchase } from '@/types/purchase';
import { useToast } from '@/hooks/use-toast';

// Mock purchases data
const mockPurchases: Purchase[] = [
  {
    id: '1',
    userId: 'user1',
    orderId: 'ORD-12345',
    products: [
      {
        productId: 'prod1',
        product: {
          id: 'prod1',
          title: 'UI Framework Pro',
          description: 'Premium UI components for modern web applications',
          price: 49.99,
          discountPrice: 39.99,
          rating: 4.8,
          image: '/placeholder.svg',
          category: 'UI Kits',
          bybitUrl: "https://builtbybit.com/creators/phant_walker.522983"
        },
        quantity: 1,
        price: 39.99
      }
    ],
    total: 39.99,
    purchaseDate: '2023-11-15T14:30:00Z',
    status: 'completed',
    paymentMethod: 'card',
    downloadLinks: [
      {
        fileId: 'file1',
        fileName: 'ui-framework-pro-v1.2.zip',
        url: '#',
        expiresAt: '2023-12-15T14:30:00Z'
      }
    ]
  },
  {
    id: '2',
    userId: 'user1',
    orderId: 'ORD-12346',
    products: [
      {
        productId: 'prod2',
        product: {
          id: 'prod2',
          title: 'Commerce Template',
          description: 'E-commerce template with Tailwind CSS',
          price: 29.99,
          discountPrice: 24.99,
          rating: 4.6,
          image: '/placeholder.svg',
          category: 'Templates',
          bybitUrl: "https://builtbybit.com/creators/phant_walker.522983"
        },
        quantity: 1,
        price: 24.99
      },
      {
        productId: 'prod3',
        product: {
          id: 'prod3',
          title: 'Dashboard Pro',
          description: 'Admin dashboard with analytics',
          price: 39.99,
          discountPrice: 34.99,
          rating: 4.7,
          image: '/placeholder.svg',
          category: 'Templates',
          bybitUrl: "https://builtbybit.com/creators/phant_walker.522983"
        },
        quantity: 1,
        price: 34.99
      }
    ],
    total: 59.98,
    purchaseDate: '2023-10-22T09:15:00Z',
    status: 'completed',
    paymentMethod: 'paypal',
    downloadLinks: [
      {
        fileId: 'file2',
        fileName: 'commerce-template-v2.0.zip',
        url: '#',
        expiresAt: '2023-11-22T09:15:00Z'
      },
      {
        fileId: 'file3',
        fileName: 'dashboard-pro-v1.5.zip',
        url: '#',
        expiresAt: '2023-11-22T09:15:00Z'
      }
    ]
  },
  {
    id: '3',
    userId: 'user1',
    orderId: 'ORD-12347',
    products: [
      {
        productId: 'prod4',
        product: {
          id: 'prod4',
          title: 'Icon Pack Premium',
          description: '500+ premium icons for your projects',
          price: 19.99,
          discountPrice: 15.99,
          rating: 4.5,
          image: '/placeholder.svg',
          category: 'Graphics',
          bybitUrl: "https://builtbybit.com/creators/phant_walker.522983"
        },
        quantity: 1,
        price: 15.99
      }
    ],
    total: 15.99,
    purchaseDate: '2023-09-05T16:45:00Z',
    status: 'completed',
    paymentMethod: 'card',
    downloadLinks: [
      {
        fileId: 'file4',
        fileName: 'icon-pack-premium.zip',
        url: '#',
        expiresAt: '2023-10-05T16:45:00Z'
      }
    ]
  }
];

const Purchases = () => {
  const [purchases, setPurchases] = useState<Purchase[]>(mockPurchases);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const { toast } = useToast();
  const navigate = useNavigate();

  const filteredPurchases = purchases.filter(purchase => {
    const matchesSearch = purchase.orderId.toLowerCase().includes(searchTerm.toLowerCase()) || 
      purchase.products.some(product => 
        product.product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    if (activeTab === 'all') return matchesSearch;
    return purchase.status === activeTab && matchesSearch;
  });

  const handleDownload = (fileId: string, fileName: string) => {
    // In a real app, this would trigger a file download
    toast({
      title: "Download started",
      description: `${fileName} is downloading...`,
    });
    
    // Simulate download success after 2 seconds
    setTimeout(() => {
      toast({
        title: "Download complete",
        description: `${fileName} has been successfully downloaded.`,
      });
    }, 2000);
  };

  const generateInvoice = (orderId: string) => {
    // In a real app, this would generate and download an invoice PDF
    toast({
      title: "Generating invoice",
      description: `Invoice for order ${orderId} is being generated...`,
    });
    
    // Simulate invoice generation after 1.5 seconds
    setTimeout(() => {
      toast({
        title: "Invoice ready",
        description: `Invoice for order ${orderId} has been generated.`,
      });
    }, 1500);
  };

  return (
    <MainLayout>
      <section className="pt-32 pb-20">
        <div className="container px-4 mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Purchase History</h1>
            <Button onClick={() => navigate('/products')} className="bg-phant-blue hover:bg-phant-blue/90">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Browse Products
            </Button>
          </div>
          
          <div className="glassmorphism rounded-xl p-6 mb-8">
            <div className="mb-6">
              <div className="relative">
                <Input
                  placeholder="Search by order ID or product name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-phant-dark-blue border-phant-dark-gray focus:border-phant-blue"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-phant-gray h-4 w-4" />
              </div>
            </div>
            
            <Tabs 
              defaultValue="all" 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="all">All Orders</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="processing">Processing</TabsTrigger>
              </TabsList>
              
              <TabsContent value={activeTab} className="mt-0">
                {filteredPurchases.length > 0 ? (
                  <div className="space-y-6">
                    {filteredPurchases.map((purchase) => (
                      <div key={purchase.id} className="bg-phant-dark-blue/30 rounded-lg p-5">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-lg">Order #{purchase.orderId}</h3>
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                purchase.status === 'completed' ? 'bg-green-500/20 text-green-500' : 
                                purchase.status === 'processing' ? 'bg-yellow-500/20 text-yellow-500' : 
                                'bg-red-500/20 text-red-500'
                              }`}>
                                {purchase.status.charAt(0).toUpperCase() + purchase.status.slice(1)}
                              </span>
                            </div>
                            <p className="text-sm text-phant-gray mt-1">
                              {new Date(purchase.purchaseDate).toLocaleDateString()} • ${purchase.total.toFixed(2)} • {purchase.paymentMethod}
                            </p>
                          </div>
                          <div className="flex gap-2 mt-4 md:mt-0">
                            <Button 
                              onClick={() => generateInvoice(purchase.orderId)}
                              variant="outline" 
                              size="sm" 
                              className="text-xs h-8 border-phant-dark-gray hover:bg-phant-dark-blue"
                            >
                              <FileText className="mr-1 h-3 w-3" />
                              Invoice
                            </Button>
                          </div>
                        </div>
                        
                        <div className="divide-y divide-phant-dark-gray/50">
                          {purchase.products.map((item) => (
                            <div key={item.productId} className="py-3 flex items-start gap-3">
                              <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0 bg-phant-dark-blue">
                                <img 
                                  src={item.product.image} 
                                  alt={item.product.title} 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-grow">
                                <h4 className="font-medium">{item.product.title}</h4>
                                <p className="text-xs text-phant-gray">{item.product.category} • Qty: {item.quantity}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">${item.price.toFixed(2)}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        {purchase.downloadLinks && purchase.downloadLinks.length > 0 && (
                          <div className="mt-4 pt-4 border-t border-phant-dark-gray/50">
                            <h4 className="text-sm font-medium mb-2">Downloads</h4>
                            <div className="space-y-2">
                              {purchase.downloadLinks.map((download) => (
                                <div key={download.fileId} className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-phant-blue/20 rounded-full flex items-center justify-center">
                                      <FileText className="h-4 w-4 text-phant-blue" />
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium">{download.fileName}</p>
                                      {download.expiresAt && (
                                        <p className="text-xs text-phant-gray">
                                          Expires: {new Date(download.expiresAt).toLocaleDateString()}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                  <Button 
                                    onClick={() => handleDownload(download.fileId, download.fileName)}
                                    size="sm" 
                                    className="text-xs h-8 bg-phant-blue/20 hover:bg-phant-blue/30 text-phant-blue border border-phant-blue/30"
                                  >
                                    <Download className="mr-1 h-3 w-3" />
                                    Download
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <ShoppingBag className="mx-auto h-12 w-12 text-phant-gray mb-3" />
                    <h3 className="text-lg font-medium mb-2">No purchases found</h3>
                    <p className="text-phant-gray mb-6">You haven't made any purchases yet.</p>
                    <Button onClick={() => navigate('/products')} className="bg-gradient-to-r from-phant-blue to-phant-neon-blue hover:from-phant-neon-blue hover:to-phant-blue">
                      Browse Products
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Purchases;
