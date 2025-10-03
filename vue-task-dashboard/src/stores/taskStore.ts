// src/stores/taskStore.ts
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Task, TaskCreateData, TaskUpdateData, TaskFilters, TaskStats } from '@/types';
import { taskApi } from '@/services/api/taskApi';
import { useNotificationStore } from './notificationStore';

export const useTaskStore = defineStore('tasks', () => {
  const notificationStore = useNotificationStore();

  // State
  const tasks = ref<Task[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const filters = ref<TaskFilters>({
    status: 'all',
    priority: 'all',
    tags: [],
    search: ''
  });

  // Getters
  const stats = computed((): TaskStats => {
    const total = tasks.value.length;
    const completed = tasks.value.filter(t => t.completed).length;
    const remaining = total - completed;
    const completionRate = total > 0 ? (completed / total) * 100 : 0;
    const overdue = tasks.value.filter(task => 
      task.dueDate && !task.completed && task.dueDate < new Date()
    ).length;

    const byPriority = {
      low: tasks.value.filter(t => t.priority === 'low').length,
      medium: tasks.value.filter(t => t.priority === 'medium').length,
      high: tasks.value.filter(t => t.priority === 'high').length
    };

    return {
      total,
      completed,
      remaining,
      completionRate: Math.round(completionRate),
      overdue,
      byPriority
    };
  });

  const filteredTasks = computed(() => {
    return tasks.value.filter(task => {
      const matchesStatus = filters.value.status === 'all' || 
        (filters.value.status === 'completed' && task.completed) ||
        (filters.value.status === 'pending' && !task.completed);
      
      const matchesPriority = filters.value.priority === 'all' || 
        task.priority === filters.value.priority;
      
      const matchesSearch = !filters.value.search || 
        task.name.toLowerCase().includes(filters.value.search.toLowerCase()) ||
        task.description?.toLowerCase().includes(filters.value.search.toLowerCase());
      
      const matchesTags = filters.value.tags.length === 0 ||
        filters.value.tags.some(tag => task.tags.includes(tag));

      return matchesStatus && matchesPriority && matchesSearch && matchesTags;
    });
  });

  const completedTasks = computed(() => 
    tasks.value.filter(task => task.completed)
  );

  const pendingTasks = computed(() => 
    tasks.value.filter(task => !task.completed)
  );

  const uniqueTags = computed(() => {
    const allTags = tasks.value.flatMap(task => task.tags);
    return [...new Set(allTags)];
  });

  // Actions
  const fetchTasks = async (): Promise<void> => {
    loading.value = true;
    error.value = null;
    try {
      tasks.value = await taskApi.getTasks();
      notificationStore.addToast({
        type: 'success',
        title: 'Tasks loaded',
        message: `Successfully loaded ${tasks.value.length} tasks`
      });
    } catch (err) {
      error.value = 'Failed to fetch tasks';
      notificationStore.addToast({
        type: 'error',
        title: 'Failed to load tasks',
        message: 'Please try again later'
      });
      console.error('Error fetching tasks:', err);
    } finally {
      loading.value = false;
    }
  };

  const addTask = async (taskData: TaskCreateData): Promise<Task | null> => {
    if (!taskData.name.trim()) return null;

    try {
      const newTask = await taskApi.createTask(taskData);
      tasks.value.unshift(newTask);
      
      notificationStore.addToast({
        type: 'success',
        title: 'Task created',
        message: `"${newTask.name}" has been added`
      });
      
      return newTask;
    } catch (err) {
      notificationStore.addToast({
        type: 'error',
        title: 'Failed to create task',
        message: 'Please try again'
      });
      console.error('Error creating task:', err);
      throw err;
    }
  };

  const updateTask = async (id: string, updates: TaskUpdateData): Promise<Task | null> => {
    try {
      const updatedTask = await taskApi.updateTask(id, updates);
      const index = tasks.value.findIndex(t => t.id === id);
      
      if (index !== -1) {
        tasks.value[index] = updatedTask;
      }

      notificationStore.addToast({
        type: 'success',
        title: 'Task updated',
        message: `"${updatedTask.name}" has been updated`
      });

      return updatedTask;
    } catch (err) {
      notificationStore.addToast({
        type: 'error',
        title: 'Failed to update task',
        message: 'Please try again'
      });
      console.error('Error updating task:', err);
      throw err;
    }
  };

  const toggleTask = async (id: string): Promise<void> => {
    const task = tasks.value.find(t => t.id === id);
    if (!task) return;

    await updateTask(id, { completed: !task.completed });
  };

  const deleteTask = async (id: string): Promise<void> => {
    const task = tasks.value.find(t => t.id === id);
    if (!task) return;

    try {
      await taskApi.deleteTask(id);
      tasks.value = tasks.value.filter(task => task.id !== id);
      
      notificationStore.addToast({
        type: 'success',
        title: 'Task deleted',
        message: `"${task.name}" has been removed`
      });
    } catch (err) {
      notificationStore.addToast({
        type: 'error',
        title: 'Failed to delete task',
        message: 'Please try again'
      });
      console.error('Error deleting task:', err);
      throw err;
    }
  };

  const updateFilters = (newFilters: Partial<TaskFilters>): void => {
    filters.value = { ...filters.value, ...newFilters };
  };

  const clearFilters = (): void => {
    filters.value = {
      status: 'all',
      priority: 'all',
      tags: [],
      search: ''
    };
  };

  return {
    // State
    tasks: readonly(tasks),
    loading: readonly(loading),
    error: readonly(error),
    filters: readonly(filters),
    
    // Getters
    stats,
    filteredTasks,
    completedTasks,
    pendingTasks,
    uniqueTags,
    
    // Actions
    fetchTasks,
    addTask,
    updateTask,
    toggleTask,
    deleteTask,
    updateFilters,
    clearFilters
  };
});