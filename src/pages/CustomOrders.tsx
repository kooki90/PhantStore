
import React, { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { CustomOrder } from '@/types/customOrder';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, FileText, Clock, DollarSign, Calendar, Clipboard, CheckCircle } from 'lucide-react';

// Mock data for custom orders Database - ed2d66c3726158affb93550b0ec274c2
const mockCustomOrders: CustomOrder[] = [
  {
    id: "1",
    userId: "user1",
    title: "Custom Discord Moderation Bot",
    description: "I need a Discord bot that can handle moderation duties with customizable commands.",
    type: "discord_bot",
    budget: 150,
    timeline: "2 weeks",
    requirements: "Must include role management, content filtering, and auto-moderation features.",
    status: "in_progress",
    createdAt: "2023-05-15T10:30:00Z",
    updatedAt: "2023-05-18T14:20:00Z",
    priceEstimate: 200
  },
  {
    id: "2",
    userId: "user1",
    title: "Minecraft Economy Plugin",
    description: "Custom economy plugin for my Minecraft server with shop GUI and player-to-player transactions.",
    type: "minecraft_plugin",
    budget: 100,
    timeline: "1 month",
    requirements: "Compatible with Paper 1.19, MySQL database integration, and multi-server support.",
    status: "pending",
    createdAt: "2023-06-20T08:15:00Z",
    updatedAt: "2023-06-20T08:15:00Z"
  }
];

const CustomOrders = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState<CustomOrder[]>(mockCustomOrders);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'discord_bot',
    budget: '',
    timeline: '',
    requirements: '',
  });

  // This would fetch from an API in a real implementation
  // useEffect(() => {
  //   // Fetch user's custom orders
  //   // setOrders(data)
  // }, [user]);
  // [{%%__NONCE__%%}]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      type: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.title || !formData.description || !formData.budget || !formData.timeline) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newOrder: CustomOrder = {
        id: `order-${Date.now()}`,
        userId: user?.email || 'anonymous',
        title: formData.title,
        description: formData.description,
        type: formData.type as 'discord_bot' | 'minecraft_plugin' | 'website' | 'other',
        budget: Number(formData.budget),
        timeline: formData.timeline,
        requirements: formData.requirements,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      // Simulate sending to Discord webhook
      console.log('Sending new custom order notification to Discord:', newOrder);
      
      // Update local state
      setOrders(prev => [newOrder, ...prev]);
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        type: 'discord_bot',
        budget: '',
        timeline: '',
        requirements: '',
      });
      
      // Show success message
      toast({
        title: "Custom order submitted",
        description: "Your request has been submitted. We'll review it and contact you soon.",
      });
      
      // Switch to orders tab
      setActiveTab('orders');
    } catch (error) {
      console.error("Error submitting custom order:", error);
      toast({
        title: "Submission failed",
        description: "There was an error submitting your request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return "bg-amber-100 text-amber-800";
      case 'approved':
        return "bg-blue-100 text-blue-800";
      case 'in_progress':
        return "bg-purple-100 text-purple-800";
      case 'completed':
        return "bg-green-100 text-green-800";
      case 'rejected':
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <MainLayout>
      <section className="pt-32 pb-20">
        <div className="container px-4 mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Custom Orders</h1>
          </div>
          
          <Tabs defaultValue="orders" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full md:w-auto grid-cols-2">
              <TabsTrigger value="orders">My Requests</TabsTrigger>
              <TabsTrigger value="new">New Request</TabsTrigger>
            </TabsList>
            
            <TabsContent value="orders" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Custom Order Requests</CardTitle>
                  <CardDescription>Track and manage your custom order requests</CardDescription>
                </CardHeader>
                <CardContent>
                  {orders.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Request</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {orders.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell className="font-medium">
                              {order.title}
                              <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                                {order.description}
                              </p>
                            </TableCell>
                            <TableCell>
                              {order.type.split('_').map(word => 
                                word.charAt(0).toUpperCase() + word.slice(1)
                              ).join(' ')}
                            </TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1).replace('_', ' ')}
                              </span>
                            </TableCell>
                            <TableCell>
                              {formatDate(order.createdAt)}
                            </TableCell>
                            <TableCell>
                              {order.priceEstimate 
                                ? `$${order.priceEstimate.toFixed(2)}` 
                                : 'Pending'
                              }
                            </TableCell>
                            <TableCell>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                  >
                                    <FileText className="mr-1 h-3 w-3" />
                                    Details
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      {order.title}
                                    </AlertDialogTitle>
                                    <AlertDialogDescription asChild>
                                      <div className="space-y-4 mt-2">
                                        <div className="space-y-1">
                                          <p className="text-sm font-semibold">Description:</p>
                                          <p className="text-sm">{order.description}</p>
                                        </div>
                                        
                                        <div className="grid grid-cols-2 gap-4">
                                          <div className="space-y-1">
                                            <p className="text-sm font-semibold flex items-center">
                                              <Clock className="w-3 h-3 mr-1" /> Timeline:
                                            </p>
                                            <p className="text-sm">{order.timeline}</p>
                                          </div>
                                          <div className="space-y-1">
                                            <p className="text-sm font-semibold flex items-center">
                                              <DollarSign className="w-3 h-3 mr-1" /> Budget:
                                            </p>
                                            <p className="text-sm">${order.budget}</p>
                                          </div>
                                          <div className="space-y-1">
                                            <p className="text-sm font-semibold flex items-center">
                                              <Calendar className="w-3 h-3 mr-1" /> Created:
                                            </p>
                                            <p className="text-sm">{formatDate(order.createdAt)}</p>
                                          </div>
                                          <div className="space-y-1">
                                            <p className="text-sm font-semibold flex items-center">
                                              <CheckCircle className="w-3 h-3 mr-1" /> Status:
                                            </p>
                                            <p className="text-sm capitalize">{order.status.replace('_', ' ')}</p>
                                          </div>
                                        </div>
                                        
                                        <div className="space-y-1">
                                          <p className="text-sm font-semibold flex items-center">
                                            <Clipboard className="w-3 h-3 mr-1" /> Requirements:
                                          </p>
                                          <p className="text-sm">{order.requirements}</p>
                                        </div>
                                        
                                        {order.adminNotes && (
                                          <div className="space-y-1">
                                            <p className="text-sm font-semibold">Notes from Admin:</p>
                                            <p className="text-sm">{order.adminNotes}</p>
                                          </div>
                                        )}
                                      </div>
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Close</AlertDialogCancel>
                                    {order.status === 'pending' && (
                                      <AlertDialogAction
                                        onClick={() => {
                                          // In a real implementation, this would call an API
                                          setOrders(orders.filter(o => o.id !== order.id));
                                          toast({
                                            title: "Request Cancelled",
                                            description: "Your custom order request has been cancelled."
                                          });
                                        }}
                                      >
                                        Cancel Request
                                      </AlertDialogAction>
                                    )}
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground mb-4">You haven't submitted any custom order requests yet.</p>
                      <Button onClick={() => setActiveTab('new')}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        New Request
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="new" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Request a Custom Order</CardTitle>
                  <CardDescription>
                    Fill out the form below to request a custom solution. Our team will review your request
                    and provide a quote within 24-48 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="title">Project Title*</Label>
                        <Input 
                          id="title" 
                          name="title"
                          placeholder="E.g., Discord Bot for Server Management" 
                          value={formData.title}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="type">Project Type*</Label>
                        <Select 
                          value={formData.type} 
                          onValueChange={handleSelectChange}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a project type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Project Types</SelectLabel>
                              <SelectItem value="discord_bot">Discord Bot</SelectItem>
                              <SelectItem value="minecraft_plugin">Minecraft Plugin</SelectItem>
                              <SelectItem value="website">Website</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="description">Project Description*</Label>
                        <Textarea 
                          id="description" 
                          name="description"
                          placeholder="Describe what you need for your project in detail" 
                          value={formData.description}
                          onChange={handleInputChange}
                          rows={4}
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="budget">Budget (USD)*</Label>
                          <Input 
                            id="budget" 
                            name="budget"
                            type="number" 
                            placeholder="Your budget for this project" 
                            min="1"
                            value={formData.budget}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="timeline">Expected Timeline*</Label>
                          <Input 
                            id="timeline" 
                            name="timeline"
                            placeholder="E.g., 2 weeks, 1 month" 
                            value={formData.timeline}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="requirements">Technical Requirements</Label>
                        <Textarea 
                          id="requirements" 
                          name="requirements"
                          placeholder="Any specific technical requirements or features needed" 
                          value={formData.requirements}
                          onChange={handleInputChange}
                          rows={3}
                        />
                      </div>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveTab('orders')}
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Request'}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </MainLayout>
  );
};

export default CustomOrders;
