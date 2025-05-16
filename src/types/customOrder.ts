
export type CustomOrder = {
  id: string;
  userId: string;
  title: string;
  description: string;
  type: 'discord_bot' | 'minecraft_plugin' | 'website' | 'other';
  budget: number;
  timeline: string;
  requirements: string;
  status: 'pending' | 'approved' | 'in_progress' | 'completed' | 'rejected';
  createdAt: string;
  updatedAt: string;
  adminNotes?: string;
  priceEstimate?: number;
  attachments?: {
    id: string;
    name: string;
    url: string;
    size: number;
  }[];
};
