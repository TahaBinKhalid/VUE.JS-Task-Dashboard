<!-- src/components/common/AppNotifications.vue -->
<template>
  <div class="fixed top-4 right-4 z-50 space-y-2 max-w-sm w-full">
    <transition-group name="toast">
      <div
        v-for="toast in notificationStore.toasts"
        :key="toast.id"
        class="p-4 rounded-lg shadow-lg border transform transition-all duration-300"
        :class="toastClasses(toast.type)"
        @click="notificationStore.removeToast(toast.id)"
      >
        <div class="flex items-start space-x-3">
          <div class="flex-shrink-0">
            <div
              class="w-5 h-5 rounded-full flex items-center justify-center text-white"
              :class="iconBgClasses(toast.type)"
            >
              <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  v-if="toast.type === 'success'"
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
                <path
                  v-else-if="toast.type === 'error'"
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
                <path
                  v-else-if="toast.type === 'warning'"
                  fill-rule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                />
                <path
                  v-else
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>
          <div class="flex-1">
            <h4 class="text-sm font-medium" :class="titleClasses(toast.type)">
              {{ toast.title }}
            </h4>
            <p v-if="toast.message" class="text-sm mt-1" :class="messageClasses(toast.type)">
              {{ toast.message }}
            </p>
          </div>
          <button
            @click.stop="notificationStore.removeToast(toast.id)"
            class="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { useNotificationStore } from '@/stores/notificationStore'

const notificationStore = useNotificationStore()

const toastClasses = (type: string) => {
  const base = 'cursor-pointer transform hover:scale-105 transition-transform'
  switch (type) {
    case 'success':
      return `${base} bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800`
    case 'error':
      return `${base} bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800`
    case 'warning':
      return `${base} bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800`
    default:
      return `${base} bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800`
  }
}

const iconBgClasses = (type: string) => {
  switch (type) {
    case 'success':
      return 'bg-green-500'
    case 'error':
      return 'bg-red-500'
    case 'warning':
      return 'bg-yellow-500'
    default:
      return 'bg-blue-500'
  }
}

const titleClasses = (type: string) => {
  switch (type) {
    case 'success':
      return 'text-green-800 dark:text-green-200'
    case 'error':
      return 'text-red-800 dark:text-red-200'
    case 'warning':
      return 'text-yellow-800 dark:text-yellow-200'
    default:
      return 'text-blue-800 dark:text-blue-200'
  }
}

const messageClasses = (type: string) => {
  switch (type) {
    case 'success':
      return 'text-green-600 dark:text-green-300'
    case 'error':
      return 'text-red-600 dark:text-red-300'
    case 'warning':
      return 'text-yellow-600 dark:text-yellow-300'
    default:
      return 'text-blue-600 dark:text-blue-300'
  }
}
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>