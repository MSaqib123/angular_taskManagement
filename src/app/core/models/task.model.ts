export interface Task {
  id: string;
  title: string;
  description?: string;
  isCompleted: boolean;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category?: string;
  status?: string;
  recurrence?: 'none' | 'daily' | 'weekly' | 'monthly';
  dueDate?: Date;
  orderIndex: number;
  createdAt: Date;
  startTime?: string;
  endTime?: string;
}



