<!-- src/views/SettingsView.vue -->
<template>
  <div class="max-w-4xl mx-auto space-y-6">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Application Settings
        </h2>
        <p class="text-gray-600 dark:text-gray-400 mt-1">
          Manage your theme preferences, notifications, and default task view.
        </p>
      </div>

      <div class="p-6 space-y-6">
        <!-- Theme Settings -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">Theme</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label
              v-for="theme in themeOptions"
              :key="theme.value"
              class="relative flex cursor-pointer rounded-lg border bg-white dark:bg-gray-700 p-4 shadow-sm focus:outline-none"
              :class="{
                'border-indigo-600 ring-2 ring-indigo-600': settings.theme === theme.value,
                'border-gray-300 dark:border-gray-600': settings.theme !== theme.value
              }"
            >
              <input
                type="radio"
                :value="theme.value"
                v-model="settings.theme"
                class="sr-only"
              />
              <div class="flex flex-1">
                <div class="flex flex-col">
                  <span class="block text-sm font-medium text-gray-900 dark:text-gray-100">
                    {{ theme.label }}
                  </span>
                  <span class="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-400">
                    {{ theme.description }}
                  </span>
                </div>
              </div>
              <div
                class="flex-shrink-0 text-indigo-600"
                :class="{ 'invisible': settings.theme !== theme.value }"
              >
                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.236 4.53L6.53 10.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
                </svg>
              </div>
            </label>
          </div>
        </div>

        <!-- Notification Settings -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">Notifications</h3>
          <div class="space-y-3">
            <label class="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div>
                <span class="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Email notifications
                </span>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Receive task reminders via email
                </p>
              </div>
              <input
                type="checkbox"
                v-model="settings.notifications.email"
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
            </label>
            <label class="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div>
                <span class="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Weekly summary
                </span>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Get a weekly report of your task progress
                </p>
              </div>
              <input
                type="checkbox"
                v-model="settings.notifications.weeklySummary"
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
            </label>
          </div>
        </div>

        <!-- Task Defaults -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">Task Defaults</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Default Priority
              </label>
              <select
                v-model="settings.taskDefaults.priority"
                class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Default Due Days
              </label>
              <input
                type="number"
                v-model.number="settings.taskDefaults.defaultDueDays"
                min="1"
                max="30"
                class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            @click="resetSettings"
            class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Reset to Defaults
          </button>
          <button
            @click="saveSettings"
            class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useSettingsStore } from '@/stores/settingsStore'
import { useToast } from '@/composables/useToast'
import type { AppSettings, ThemeMode } from '@/types'

const settingsStore = useSettingsStore()
const { showSuccess } = useToast()

const settings = ref<AppSettings>({ ...settingsStore.settings })
const originalSettings = ref<AppSettings>({ ...settingsStore.settings })

const themeOptions = [
  {
    value: 'light' as ThemeMode,
    label: 'Light',
    description: 'Always use light theme'
  },
  {
    value: 'dark' as ThemeMode,
    label: 'Dark',
    description: 'Always use dark theme'
  },
  {
    value: 'auto' as ThemeMode,
    label: 'Auto',
    description: 'Follow system preference'
  }
]

const saveSettings = (): void => {
  settingsStore.saveSettings(settings.value)
  originalSettings.value = { ...settings.value }
  showSuccess('Settings saved successfully!')
}

const resetSettings = (): void => {
  settings.value = { ...originalSettings.value }
}

// Auto-save when settings change
watch(settings, (newSettings) => {
  settingsStore.saveSettings(newSettings)
}, { deep: true, immediate: true })
</script>