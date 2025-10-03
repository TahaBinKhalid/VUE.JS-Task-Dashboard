// src/stores/notificationStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Toast } from '@/types'

export const useNotificationStore = defineStore('notifications', () => {
  const toasts = ref<Toast[]>([])

  const addToast = (toast: Omit<Toast, 'id'>): void => {
    const id = crypto.randomUUID()
    const newToast: Toast = {
      id,
      duration: 5000,
      ...toast
    }

    toasts.value.push(newToast)

    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, newToast.duration)
    }
  }

  const removeToast = (id: string): void => {
    toasts.value = toasts.value.filter(toast => toast.id !== id)
  }

  const clearToasts = (): void => {
    toasts.value = []
  }

  return {
    toasts: readonly(toasts),
    addToast,
    removeToast,
    clearToasts
  }
})