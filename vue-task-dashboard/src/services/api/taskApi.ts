// src/services/api/taskApi.ts
import { httpClient } from './httpClient';
import type { Task, TaskCreateData, TaskUpdateData } from '@/types';

class TaskApiService {
  private basePath = '/tasks';

  async getTasks(): Promise<Task[]> {
    // In a real app, this would be an API call
    // For now, we'll use localStorage with simulated delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const stored = localStorage.getItem('vue-task-dashboard-tasks');
    if (stored) {
      const tasks = JSON.parse(stored);
      return tasks.map((task: any) => ({
        ...task,
        dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
        createdAt: new Date(task.createdAt),
        updatedAt: new Date(task.updatedAt)
      }));
    }

    // Return default tasks
    return this.getDefaultTasks();
  }

  async createTask(taskData: TaskCreateData): Promise<Task> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const tasks = await this.getTasks();
    const newTask: Task = {
      id: crypto.randomUUID(),
      name: taskData.name,
      description: taskData.description,
      completed: false,
      priority: taskData.priority || 'medium',
      dueDate: taskData.dueDate,
      tags: taskData.tags || [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    tasks.unshift(newTask);
    this.saveTasks(tasks);

    return newTask;
  }

  async updateTask(id: string, updates: TaskUpdateData): Promise<Task> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const tasks = await this.getTasks();
    const index = tasks.findIndex(task => task.id === id);
    
    if (index === -1) {
      throw new Error('Task not found');
    }

    const updatedTask = { 
      ...tasks[index], 
      ...updates, 
      updatedAt: new Date() 
    };
    
    tasks[index] = updatedTask;
    this.saveTasks(tasks);

    return updatedTask;
  }

  async deleteTask(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const tasks = await this.getTasks();
    const filteredTasks = tasks.filter(task => task.id !== id);
    this.saveTasks(filteredTasks);
  }

  private saveTasks(tasks: Task[]): void {
    localStorage.setItem('vue-task-dashboard-tasks', JSON.stringify(tasks));
  }

  private getDefaultTasks(): Task[] {
    const defaultTasks: Task[] = [
      {
        id: '1',
        name: 'Learn Vue.js reactivity system',
        description: 'Understand the composition API and reactivity fundamentals',
        completed: false,
        priority: 'high',
        tags: ['vue', 'learning'],
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15')
      },
      {
        id: '2',
        name: 'Set up Pinia store architecture',
        description: 'Implement centralized state management for the application',
        completed: true,
        priority: 'high',
        tags: ['pinia', 'state-management'],
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-01-12')
      },
      {
        id: '3',
        name: 'Style with Tailwind CSS',
        description: 'Create responsive and accessible UI components',
        completed: false,
        priority: 'medium',
        tags: ['tailwind', 'styling'],
        createdAt: new Date('2024-01-08'),
        updatedAt: new Date('2024-01-08')
      }
    ];

    this.saveTasks(defaultTasks);
    return defaultTasks;
  }
}

export const taskApi = new TaskApiService();