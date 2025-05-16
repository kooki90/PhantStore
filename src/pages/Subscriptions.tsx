
import React, { useState, useEffect } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Clock, CreditCard, Download, Calendar, AlertCircle } from 'lucide-react';
import { getUserSubscriptions, cancelSubscription, resumeSubscription, resubscribe, getSubscriptionInvoices } from '@/services/subscriptionService';
import { Subscription } from '@/types/subscription';
import { useToast } from '@/hooks/use-toast';

const SubscriptionCard = ({ 
  subscription,
  onCancel,
  onResume,
  onResubscribe 
}: { 
  subscription: Subscription,
  onCancel: (id: string) => void,
  onResume: (id: string) => void,
  onResubscribe: (id: string) => void
}) => {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [showInvoices, setShowInvoices] = useState(false);
  const { product, status, currentPeriodEnd, cancelAtPeriodEnd } = subscription;
  const isActive = status === 'active';
  const formattedDate = new Date(currentPeriodEnd).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const loadInvoices = async () => {
    try {
      const data = await getSubscriptionInvoices(subscription.id);
      setInvoices(data as any[]);
      setShowInvoices(true);
    } catch (error) {
      console.error("Failed to load invoices", error);
    }
  };

  return (
    <>
      <Card className={`mb-6 ${!isActive ? 'opacity-75' : ''}`}>
        <CardHeader className="pb-3">
          <CardTitle className="flex justify-between items-start">
            <span>{product?.title || "Subscription"}</span>
            <Badge variant={isActive ? "default" : "outline"}>
              {isActive ? 'Active' : 'Cancelled'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">{product?.description}</p>
          
          <div className="flex items-center gap-2 mb-3 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>
              {isActive 
                ? cancelAtPeriodEnd 
                  ? `Cancels on ${formattedDate}`
                  : `Renews on ${formattedDate}` 
                : `Ended on ${formattedDate}`}
            </span>
          </div>
          
          <div className="flex items-center gap-2 mb-3 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>Started on {new Date(subscription.createdAt).toLocaleDateString()}</span>
          </div>
          
          <div className="flex items-center gap-2 mb-6 text-sm">
            <CreditCard className="h-4 w-4 text-muted-foreground" />
            <span>
              ${subscription.price} / {subscription.interval}
              {subscription.paymentMethod.type === 'card' && subscription.paymentMethod.last4 && (
                <span className="ml-1 text-muted-foreground">
                  via {subscription.paymentMethod.brand} ending in {subscription.paymentMethod.last4}
                </span>
              )}
              {subscription.paymentMethod.type === 'paypal' && (
                <span className="ml-1 text-muted-foreground">via PayPal</span>
              )}
            </span>
          </div>
          
          <Separator className="my-4" />
        </CardContent>
        <CardFooter className="flex justify-between items-center pt-0">
          {isActive ? (
            cancelAtPeriodEnd ? (
              <Button variant="outline" onClick={() => onResume(subscription.id)}>
                Resume Subscription
              </Button>
            ) : (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline">Cancel Subscription</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Cancel Subscription</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to cancel your subscription to {product?.title}? 
                      You will continue to have access until the end of your current billing period on {formattedDate}.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Keep Subscription</AlertDialogCancel>
                    <AlertDialogAction onClick={() => onCancel(subscription.id)}>
                      Yes, Cancel Subscription
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )
          ) : (
            <Button variant="outline" onClick={() => onResubscribe(subscription.id)}>
              Resubscribe
            </Button>
          )}
          
          <Button variant="ghost" size="sm" className="gap-1" onClick={loadInvoices}>
            <Download className="h-4 w-4" /> Invoices
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={showInvoices} onOpenChange={setShowInvoices}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invoice History</DialogTitle>
            <DialogDescription>
              Your billing history for {product?.title}
            </DialogDescription>
          </DialogHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Invoice</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.length > 0 ? (
                invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell>{new Date(invoice.date).toLocaleDateString()}</TableCell>
                    <TableCell>${invoice.amount}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {invoice.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <a href={invoice.pdfUrl} target="_blank" rel="noopener noreferrer">
                          <Download className="h-4 w-4" />
                        </a>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">No invoices available</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>
    </>
  );
};

const Subscriptions = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'active' | 'canceled'>('all');
  const { toast } = useToast();

  useEffect(() => {
    const loadSubscriptions = async () => {
      try {
        const data = await getUserSubscriptions('user_1'); // In a real app, get the actual user ID
        setSubscriptions(data);
      } catch (error) {
        console.error("Failed to load subscriptions", error);
        toast({
          title: "Error",
          description: "Failed to load your subscriptions. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadSubscriptions();
  }, [toast]);

  const handleCancel = async (id: string) => {
    try {
      const updated = await cancelSubscription(id);
      setSubscriptions(prev => 
        prev.map(sub => sub.id === id ? { ...sub, cancelAtPeriodEnd: true } : sub)
      );
    } catch (error) {
      console.error("Failed to cancel subscription", error);
      toast({
        title: "Error",
        description: "Failed to cancel your subscription. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleResume = async (id: string) => {
    try {
      const updated = await resumeSubscription(id);
      setSubscriptions(prev => 
        prev.map(sub => sub.id === id ? { ...sub, cancelAtPeriodEnd: false } : sub)
      );
    } catch (error) {
      console.error("Failed to resume subscription", error);
      toast({
        title: "Error",
        description: "Failed to resume your subscription. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleResubscribe = async (id: string) => {
    try {
      const reactivated = await resubscribe(id);
      setSubscriptions(prev => 
        prev.map(sub => sub.id === id ? { ...sub, status: 'active', cancelAtPeriodEnd: false } : sub)
      );
    } catch (error) {
      console.error("Failed to reactivate subscription", error);
      toast({
        title: "Error",
        description: "Failed to reactivate your subscription. Please try again.",
        variant: "destructive"
      });
    }
  };

  const filteredSubscriptions = subscriptions.filter(sub => {
    if (filter === 'active') return sub.status === 'active';
    if (filter === 'canceled') return sub.status === 'canceled';
    return true;
  });

  return (
    <MainLayout>
      <div className="container mx-auto py-12 px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold">Your Subscriptions</h1>
          
          <div className="flex gap-2">
            <Button 
              variant={filter === 'all' ? "default" : "outline"} 
              onClick={() => setFilter('all')}
              size="sm"
            >
              All
            </Button>
            <Button 
              variant={filter === 'active' ? "default" : "outline"} 
              onClick={() => setFilter('active')}
              size="sm"
            >
              Active
            </Button>
            <Button 
              variant={filter === 'canceled' ? "default" : "outline"} 
              onClick={() => setFilter('canceled')}
              size="sm"
            >
              Canceled
            </Button>
          </div>
        </div>
        
        <div className="max-w-3xl">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-pulse">Loading subscriptions...</div>
            </div>
          ) : filteredSubscriptions.length > 0 ? (
            filteredSubscriptions.map(subscription => (
              <SubscriptionCard 
                key={subscription.id} 
                subscription={subscription}
                onCancel={handleCancel}
                onResume={handleResume}
                onResubscribe={handleResubscribe}
              />
            ))
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-xl font-medium mb-2">No subscriptions found</p>
                <p className="text-muted-foreground mb-6">
                  {filter !== 'all' 
                    ? `You don't have any ${filter} subscriptions` 
                    : "You haven't subscribed to any products yet"}
                </p>
                <Button asChild>
                  <a href="/products">Browse Subscription Options</a>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Subscriptions;
