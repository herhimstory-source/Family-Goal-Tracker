
export interface User {
  username: string;
  displayName: string;
  avatar: string;
  color: string;
}

export type GoalStatus = 'pending' | 'completed';

export interface Goal {
  id: string;
  title: string;
  description: string;
  assignee: string; // username
  category: string;
  dueDate: string; // YYYY-MM-DD
  dueTime: string; // HH:mm
  status: GoalStatus;
  createdAt: string; // ISO string
  completedAt?: string; // ISO string
}

export interface GoalFormData {
  title: string;
  description: string;
  assignee: string;
  category: string;
  dueDate: string; // YYYY-MM-DD
  dueTime: string; // HH:mm
}

export type ViewType = 'goals' | 'calendar' | 'achievements';

export interface DailyCompletionData {
  day: string; // YYYY-MM-DD
  dayName: string; // e.g., '월'
  count: number;
}

export interface CategoryStatsData {
  category: string;
  count: number;
  color: string;
}

export interface Category {
  name: string;
  icon: string;
  color: string;
}
