
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Users, Receipt, TrendingUp } from 'lucide-react';
import AdminLayout from '@/layouts/AdminLayout';

// Mock data - would come from API in a real application
const statsData = {
  totalProducts: 42,
  totalUsers: 156,
  totalOrders: 73,
  totalRevenue: 12486.99
};

const Dashboard = () => {
  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{statsData.totalProducts}</div>
              <div className="p-2 bg-primary/10 text-primary rounded-full">
                <Package className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{statsData.totalUsers}</div>
              <div className="p-2 bg-primary/10 text-primary rounded-full">
                <Users className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{statsData.totalOrders}</div>
              <div className="p-2 bg-primary/10 text-primary rounded-full">
                <Receipt className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">${statsData.totalRevenue.toLocaleString()}</div>
              <div className="p-2 bg-primary/10 text-primary rounded-full">
                <TrendingUp className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 mt-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest 5 orders from customers</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">No orders yet</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Popular Products</CardTitle>
            <CardDescription>Top 5 selling products</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">No products yet</p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
