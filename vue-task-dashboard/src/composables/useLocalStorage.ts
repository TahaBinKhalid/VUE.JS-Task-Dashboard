// src/composables/useLocalStorage.ts
import { ref, watch } from 'vue';
import { useEventListener } from '@vueuse/core';

export function useLocalStorage<T>(key: string, defaultValue: T) {
  const data = ref<T>(getValue());

  function getValue(): T {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return defaultValue;
    }
  }

  function setValue(value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      data.value = value;
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }

  function removeValue(): void {
    try {
      localStorage.removeItem(key);
      data.value = defaultValue;
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }

  // Sync across tabs
  useEventListener('storage', (event: StorageEvent) => {
    if (event.key === key && event.newValue) {
      data.value = JSON.parse(event.newValue);
    }
  });

  watch(data, setValue, { deep: true });

  return {
    data,
    setValue,
    removeValue
  };
}