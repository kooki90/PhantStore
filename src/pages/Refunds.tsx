
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { AlertTriangle, ArrowRight, CheckCircle, HelpCircle } from 'lucide-react';

const RefundPolicy = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Refund Policy</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Our refund policy is designed to be fair to both customers and creators while maintaining the integrity of our digital marketplace.
          </p>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                Important Notice
              </CardTitle>
              <CardDescription>
                Please read our refund policy carefully before making a purchase
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Due to the digital nature of our products, all sales are generally considered final. However, we understand that issues may arise, and we are committed to ensuring customer satisfaction.
              </p>
            </CardContent>
          </Card>

          <h2 className="text-2xl font-semibold mb-4">Eligibility for Refunds</h2>
          <div className="space-y-6 mb-8">
            <div className="flex gap-3">
              <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium">Product Does Not Work as Described</h3>
                <p className="text-muted-foreground">
                  If the product significantly fails to perform as described in its listing, you may be eligible for a refund within 7 days of purchase.
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium">Technical Issues</h3>
                <p className="text-muted-foreground">
                  If you experience technical issues that make the product unusable and our support team cannot resolve them within a reasonable timeframe.
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium">Double Purchase</h3>
                <p className="text-muted-foreground">
                  If you accidentally purchased the same product twice, you may request a refund for the duplicate purchase.
                </p>
              </div>
            </div>
          </div>
          
          <Separator className="my-8" />
          
          <h2 className="text-2xl font-semibold mb-4">Non-Refundable Situations</h2>
          <div className="space-y-6 mb-8">
            <div className="flex gap-3">
              <ArrowRight className="h-6 w-6 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium">Change of Mind</h3>
                <p className="text-muted-foreground">
                  Refunds are not provided if you simply change your mind or no longer need the product.
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <ArrowRight className="h-6 w-6 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium">Incompatibility Issues</h3>
                <p className="text-muted-foreground">
                  If the product doesn't work due to incompatibility with your system, but these requirements were clearly stated in the product description.
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <ArrowRight className="h-6 w-6 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium">After Modification</h3>
                <p className="text-muted-foreground">
                  If you've modified the product code or files and then encounter issues, refunds may not be granted.
                </p>
              </div>
            </div>
          </div>
          
          <Separator className="my-8" />
          
          <h2 className="text-2xl font-semibold mb-4">Refund Process</h2>
          <div className="space-y-6 mb-8">
            <ol className="list-decimal pl-5 space-y-3">
              <li>
                <strong>Submit a Ticket</strong> - Contact our support team through the contact page, explaining the issue and providing your order details.
              </li>
              <li>
                <strong>Review Period</strong> - Our team will review your request within 3-5 business days.
              </li>
              <li>
                <strong>Resolution</strong> - If approved, refunds will be processed using the original payment method and may take 5-10 business days to appear on your account.
              </li>
            </ol>
          </div>
          
          <Card className="mb-8 border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-900">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-blue-500" />
                Need Help?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                If you have any questions about our refund policy or need assistance with a refund request, please don't hesitate to contact our support team.
              </p>
              <a href="/contact" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
                Contact Support →
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default RefundPolicy;
