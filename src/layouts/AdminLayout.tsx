
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  Receipt, 
  Tag, 
  Settings,
  LogOut,
  ChevronLeft
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // We remove the admin check to allow all authenticated users access
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-card border-r border-border">
        <div className="p-4 flex flex-col h-full">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold">Admin Panel</h2>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate('/')}
              className="md:hidden"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>
          
          <nav className="space-y-1 flex-grow">
            <Button 
              variant="ghost" 
              className="w-full justify-start mb-1" 
              onClick={() => navigate('/admin')}
            >
              <LayoutDashboard className="mr-2 h-5 w-5" />
              Dashboard
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full justify-start mb-1" 
              onClick={() => navigate('/admin/products')}
            >
              <Package className="mr-2 h-5 w-5" />
              Products
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full justify-start mb-1" 
              onClick={() => navigate('/admin/users')}
            >
              <Users className="mr-2 h-5 w-5" />
              Users
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full justify-start mb-1" 
              onClick={() => navigate('/admin/orders')}
            >
              <Receipt className="mr-2 h-5 w-5" />
              Orders
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full justify-start mb-1" 
              onClick={() => navigate('/admin/coupons')}
            >
              <Tag className="mr-2 h-5 w-5" />
              Coupons
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full justify-start" 
              onClick={() => navigate('/admin/settings')}
            >
              <Settings className="mr-2 h-5 w-5" />
              Settings
            </Button>
          </nav>
          
          <Button
            variant="ghost" 
            className="w-full justify-start mt-auto border-t pt-4"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-5 w-5" />
            Logout
          </Button>
          
          <div className="mt-4 text-xs text-muted-foreground">
            <Button 
              variant="outline" 
              size="sm"
              className="w-full"
              onClick={() => navigate('/')}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Store
            </Button>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 p-6 overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
