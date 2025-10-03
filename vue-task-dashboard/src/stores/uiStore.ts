// src/stores/uiStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Modal, LoadingState } from '@/types'

export const useUiStore = defineStore('ui', () => {
  const modals = ref<Modal[]>([])
  const loading = ref<LoadingState>({
    global: false,
    tasks: false,
    settings: false
  })
  const sidebarOpen = ref(false)

  const showModal = (modal: Modal): void => {
    modals.value.push(modal)
  }

  const closeModal = (id: string): void => {
    modals.value = modals.value.filter(modal => modal.id !== id)
  }

  const closeAllModals = (): void => {
    modals.value = []
  }

  const setLoading = (key: keyof LoadingState, value: boolean): void => {
    loading.value[key] = value
  }

  const toggleSidebar = (): void => {
    sidebarOpen.value = !sidebarOpen.value
  }

  return {
    modals: readonly(modals),
    loading: readonly(loading),
    sidebarOpen: readonly(sidebarOpen),
    showModal,
    closeModal,
    closeAllModals,
    setLoading,
    toggleSidebar
  }
})