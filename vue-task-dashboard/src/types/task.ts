// src/types/task.ts
export interface Task {
  id: string;
  name: string;
  description?: string;
  completed: boolean;
  priority: TaskPriority;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
}

export type TaskPriority = 'low' | 'medium' | 'high';

export interface TaskCreateData {
  name: string;
  description?: string;
  priority?: TaskPriority;
  dueDate?: Date;
  tags?: string[];
}

export interface TaskUpdateData {
  name?: string;
  description?: string;
  completed?: boolean;
  priority?: TaskPriority;
  dueDate?: Date;
  tags?: string[];
}

export interface TaskStats {
  total: number;
  completed: number;
  remaining: number;
  completionRate: number;
  overdue: number;
  byPriority: {
    low: number;
    medium: number;
    high: number;
  };
}

export interface TaskFilters {
  status: 'all' | 'completed' | 'pending';
  priority: TaskPriority | 'all';
  tags: string[];
  search: string;
}