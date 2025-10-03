// src/types/ui.ts
export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
}

export interface Modal {
  id: string;
  component: any;
  props?: Record<string, any>;
}

export interface LoadingState {
  global: boolean;
  tasks: boolean;
  settings: boolean;
}