// src/composables/useToast.ts
import { useNotificationStore } from '@/stores/notificationStore';
import type { Toast } from '@/types';

export function useToast() {
  const notificationStore = useNotificationStore();

  const showToast = (toast: Omit<Toast, 'id'>): void => {
    notificationStore.addToast(toast);
  };

  const showSuccess = (title: string, message?: string): void => {
    showToast({ type: 'success', title, message });
  };

  const showError = (title: string, message?: string): void => {
    showToast({ type: 'error', title, message });
  };

  const showWarning = (title: string, message?: string): void => {
    showToast({ type: 'warning', title, message });
  };

  const showInfo = (title: string, message?: string): void => {
    showToast({ type: 'info', title, message });
  };

  return {
    showToast,
    showSuccess,
    showError,
    showWarning,
    showInfo
  };
}