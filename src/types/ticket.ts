
export type Ticket = {
  id: string;
  userId: string;
  subject: string;
  description: string;
  status: 'new' | 'open' | 'pending' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'general' | 'technical' | 'billing' | 'refund' | 'feature';
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
  productId?: string;
  orderNumber?: string;
};

export type TicketMessage = {
  id: string;
  ticketId: string;
  userId: string;
  isAdmin: boolean;
  message: string;
  createdAt: string;
  attachments?: {
    id: string;
    name: string;
    url: string;
    size: number;
  }[];
};
