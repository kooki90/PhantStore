
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Ban, CheckCircle } from 'lucide-react';
import AdminLayout from '@/layouts/AdminLayout';
import { useToast } from '@/hooks/use-toast';

// Mock data - would come from API in a real application
const users = [
  { id: 1, email: 'john@example.com', username: 'john_doe', status: 'active', joinDate: '2023-05-12' },
  { id: 2, email: 'jane@example.com', username: 'jane_smith', status: 'active', joinDate: '2023-07-18' },
  { id: 3, email: 'bob@example.com', username: 'bob_builder', status: 'banned', joinDate: '2023-03-22' },
  { id: 4, email: 'alice@example.com', username: 'alice_wonder', status: 'active', joinDate: '2023-09-05' },
];

const Users = () => {
  const { toast } = useToast();
  
  const handleToggleUserStatus = (userId: number, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'banned' : 'active';
    const action = newStatus === 'active' ? 'unbanned' : 'banned';
    
    // In a real app, you'd call an API to update the user
    toast({
      title: `User ${action}`,
      description: `User has been ${action} successfully.`,
    });
  };
  
  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">Users</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>View and manage user accounts</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Username</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={user.status === 'active' ? 'outline' : 'destructive'}>
                      {user.status === 'active' ? 'Active' : 'Banned'}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.joinDate}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToggleUserStatus(user.id, user.status)}
                    >
                      {user.status === 'active' ? (
                        <>
                          <Ban className="mr-2 h-4 w-4" />
                          Ban User
                        </>
                      ) : (
                        <>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Unban User
                        </>
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default Users;
