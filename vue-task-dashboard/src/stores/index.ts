// src/stores/index.ts
import { createPinia } from 'pinia';
import { markRaw } from 'vue';
import type { Router } from 'vue-router';

declare module 'pinia' {
  export interface PiniaCustomProperties {
    router: Router;
  }
}

export const pinia = createPinia();

export function setupStores(router: Router): void {
  pinia.use(({ store }) => {
    store.router = markRaw(router);
  });
}

export * from './taskStore';
export * from './settingsStore';
export * from './uiStore';
export * from './notificationStore';