export interface Task {
  id?: number;
  title: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'completed' | 'overdue';
  priority: 'low' | 'medium' | 'high';
  assignedTo?: number;
}

export interface User {
  userId: number;
  userName: string;
  role: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface TaskSummary {
  months: any[];
  compledtedCounts: any[];
  pendingCounts: any[];
  overdueCounts: any[];
}
