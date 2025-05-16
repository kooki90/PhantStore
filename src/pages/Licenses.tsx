
import { useState, useEffect } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { useAuth } from '@/context/AuthContext';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RefreshCcw, Copy, ExternalLink, Info, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { License } from '@/types/license';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

// Mock data for licenses
const mockLicenses: License[] = [
  {
    id: "1",
    userId: "user1",
    productId: "1",
    licenseKey: "DBOT-XXXX-XXXX-XXXX-ABCD",
    product: {
      id: "1",
      title: "Discord Bot Pro - Moderation Suite",
      description: "Advanced moderation tools with AI-powered content filtering and user management.",
      price: 49.99,
      discountPrice: 39.99,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1614680376739-414d95ff43df?q=80&w=1000&auto=format&fit=crop",
      category: "Discord Bots",
      badge: "Best Seller",
      bybitUrl: "https://builtbybit.com/creators/phant_walker.522983"
    },
    createdAt: "2023-01-01T12:00:00Z",
    expiresAt: "2024-01-01T12:00:00Z",
    activationLimit: 3,
    activationCount: 1,
    status: "active"
  },
  {
    id: "2",
    userId: "user1",
    productId: "2",
    licenseKey: "MCRAFT-XXXX-XXXX-XXXX-EFGH",
    product: {
      id: "2",
      title: "Minecraft Economy Plugin",
      description: "Complete economy system with shops, banking, and player markets for Minecraft servers.",
      price: 24.99,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1631049035182-249067d7618e?q=80&w=1000&auto=format&fit=crop",
      category: "Minecraft Plugins",
      bybitUrl: "https://builtbybit.com/creators/phant_walker.522983"
    },
    createdAt: "2023-02-15T10:30:00Z",
    activationLimit: 2,
    activationCount: 2,
    status: "active"
  }
];

const Licenses = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [licenses, setLicenses] = useState<License[]>(mockLicenses);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [currentLicense, setCurrentLicense] = useState<License | null>(null);
  const [isRegenerating, setIsRegenerating] = useState(false);

  // This would fetch from API in a real implementation
  useEffect(() => {
    // Simulate API fetch
    setLicenses(mockLicenses);
  }, [user]);

  const handleCopyLicenseKey = (licenseKey: string) => {
    navigator.clipboard.writeText(licenseKey);
    toast({
      title: "License key copied",
      description: "The license key has been copied to your clipboard."
    });
  };

  const handleRegenerate = (license: License) => {
    setIsRegenerating(true);
    
    // Simulate API call to regenerate license key
    setTimeout(() => {
      const newLicenseKey = `${license.licenseKey.split('-')[0]}-${Math.random().toString(36).substring(2, 6)}-${Math.random().toString(36).substring(2, 6)}-${Math.random().toString(36).substring(2, 6)}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
      
      setLicenses(licenses.map(l => 
        l.id === license.id 
          ? { ...l, licenseKey: newLicenseKey } 
          : l
      ));
      
      toast({
        title: "License key regenerated",
        description: "A new license key has been generated for your product."
      });
      
      setIsRegenerating(false);
    }, 1500);
  };

  const viewLicenseDetails = (license: License) => {
    setCurrentLicense(license);
    setIsDetailsOpen(true);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Never expires";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "expired":
        return "bg-amber-100 text-amber-800";
      case "revoked":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <MainLayout>
      <section className="pt-32 pb-20">
        <div className="container px-4 mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">My Licenses</h1>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>License Keys</CardTitle>
              <CardDescription>Manage your product license keys</CardDescription>
            </CardHeader>
            <CardContent>
              {licenses.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>License Key</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Activations</TableHead>
                      <TableHead>Expires</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {licenses.map((license) => (
                      <TableRow key={license.id}>
                        <TableCell className="font-medium">
                          {license.product?.title}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <code className="bg-muted px-2 py-1 rounded text-xs">
                              {license.licenseKey}
                            </code>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleCopyLicenseKey(license.licenseKey)}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(license.status)}`}>
                            {license.status.charAt(0).toUpperCase() + license.status.slice(1)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span className="cursor-help flex items-center">
                                  {license.activationCount} / {license.activationLimit}
                                  {license.activationCount >= license.activationLimit && (
                                    <AlertCircle className="ml-1 h-4 w-4 text-amber-500" />
                                  )}
                                </span>
                              </TooltipTrigger>
                              <TooltipContent>
                                {license.activationCount >= license.activationLimit 
                                  ? "You've reached your activation limit for this license"
                                  : `You can activate this product on ${license.activationLimit - license.activationCount} more devices`
                                }
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </TableCell>
                        <TableCell>
                          {formatDate(license.expiresAt)}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleRegenerate(license)}
                              disabled={isRegenerating}
                            >
                              <RefreshCcw className="mr-1 h-3 w-3" />
                              Regenerate
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => viewLicenseDetails(license)}
                            >
                              <Info className="mr-1 h-3 w-3" />
                              Details
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">You don't have any license keys yet.</p>
                  <Button onClick={() => window.location.href = '/products'}>
                    Browse Products
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* License Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-md">
          {currentLicense && (
            <>
              <DialogHeader>
                <DialogTitle>License Details</DialogTitle>
                <DialogDescription>
                  Information and activation history for {currentLicense.product?.title}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>License Key</Label>
                  <div className="flex items-center space-x-2">
                    <Input 
                      value={currentLicense.licenseKey} 
                      readOnly 
                      className="font-mono"
                    />
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => handleCopyLicenseKey(currentLicense.licenseKey)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Purchased</Label>
                    <p className="text-sm mt-1">{formatDate(currentLicense.createdAt)}</p>
                  </div>
                  <div>
                    <Label>Expires</Label>
                    <p className="text-sm mt-1">{formatDate(currentLicense.expiresAt)}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Activation History</Label>
                  {currentLicense.activationCount > 0 ? (
                    <div className="border rounded-md p-3 space-y-2">
                      <div className="text-sm flex justify-between">
                        <span>Device 1</span>
                        <span className="text-muted-foreground">
                          {new Date().toLocaleDateString()}
                        </span>
                      </div>
                      {/* This would show real device history in a real app */}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No activations recorded yet.
                    </p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label>Activation Limit</Label>
                  <div className="flex items-center">
                    <span className="text-sm">
                      {currentLicense.activationCount} of {currentLicense.activationLimit} activations used
                    </span>
                    <div className="flex-grow mx-2 bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary rounded-full h-2" 
                        style={{
                          width: `${(currentLicense.activationCount / currentLicense.activationLimit) * 100}%`
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <DialogFooter className="flex justify-between">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsDetailsOpen(false)}
                >
                  Close
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => {
                    toast({
                      title: "Feature Coming Soon",
                      description: "This feature is not yet implemented."
                    });
                  }}
                >
                  Reset Activations
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default Licenses;
