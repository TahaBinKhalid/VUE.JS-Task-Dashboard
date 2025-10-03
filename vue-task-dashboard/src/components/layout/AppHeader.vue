<!-- src/components/layout/AppHeader.vue -->
<template>
  <header class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <div class="flex items-center space-x-3">
          <AppLogo class="h-8 w-8" />
          <h1 class="text-xl font-bold text-gray-900 dark:text-gray-100">
            Vue Task Dashboard
          </h1>
        </div>

        <!-- Navigation -->
        <nav class="hidden md:flex space-x-1">
          <RouterLink
            v-for="link in navigationLinks"
            :key="link.name"
            :to="link.path"
            class="nav-link px-4 py-2 rounded-lg font-medium transition-all duration-200"
            :class="{
              'bg-indigo-600 text-white shadow-lg': $route.name === link.name,
              'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700': $route.name !== link.name
            }"
          >
            {{ link.label }}
          </RouterLink>
        </nav>

        <!-- Right side actions -->
        <div class="flex items-center space-x-3">
          <ThemeToggle />
          <!-- Mobile menu button -->
          <button
            @click="uiStore.toggleSidebar"
            class="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile sidebar -->
    <div
      v-if="uiStore.sidebarOpen"
      class="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50"
      @click="uiStore.toggleSidebar"
    >
      <div
        class="fixed top-0 right-0 bottom-0 w-64 bg-white dark:bg-gray-800 shadow-xl transform transition-transform"
        @click.stop
      >
        <div class="p-4 border-b border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100">Menu</h2>
            <button
              @click="uiStore.toggleSidebar"
              class="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        <nav class="p-4 space-y-2">
          <RouterLink
            v-for="link in navigationLinks"
            :key="link.name"
            :to="link.path"
            @click="uiStore.toggleSidebar"
            class="block px-4 py-2 rounded-lg font-medium transition-colors"
            :class="{
              'bg-indigo-600 text-white': $route.name === link.name,
              'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700': $route.name !== link.name
            }"
          >
            {{ link.label }}
          </RouterLink>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useUiStore } from '@/stores/uiStore'
import AppLogo from '@/components/common/AppLogo.vue'
import ThemeToggle from '@/components/common/ThemeToggle.vue'

const uiStore = useUiStore()

const navigationLinks = [
  { name: 'dashboard', path: '/', label: 'Dashboard' },
  { name: 'settings', path: '/settings', label: 'Settings' },
  { name: 'about', path: '/about', label: 'About' }
]
</script>