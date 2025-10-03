<!-- src/views/DashboardView.vue -->
<template>
  <div class="space-y-6">
    <!-- Stats Panel -->
    <section>
      <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Task Management Overview
      </h2>
      <TaskStats :stats="taskStore.stats" :loading="taskStore.loading" />
    </section>

    <!-- Task Filters -->
    <section>
      <TaskFilters
        :filters="taskStore.filters"
        :unique-tags="taskStore.uniqueTags"
        @update-filters="taskStore.updateFilters"
        @clear-filters="taskStore.clearFilters"
      />
    </section>

    <!-- Add Task Form -->
    <section>
      <TaskForm @task-added="handleTaskAdded" />
    </section>

    <!-- Task List -->
    <section>
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Tasks ({{ taskStore.filteredTasks.length }})
        </h3>
        <div class="flex items-center space-x-4">
          <span class="text-sm text-gray-500 dark:text-gray-400">
            Showing {{ taskStore.filteredTasks.length }} of {{ taskStore.tasks.length }} tasks
          </span>
        </div>
      </div>

      <TaskList
        :tasks="taskStore.filteredTasks"
        :loading="taskStore.loading"
        @toggle-task="taskStore.toggleTask"
        @edit-task="handleEditTask"
        @delete-task="taskStore.deleteTask"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import { useTaskStore } from '@/stores/taskStore'
import { useToast } from '@/composables/useToast'
import TaskStats from '@/components/tasks/TaskStats.vue'
import TaskFilters from '@/components/tasks/TaskFilters.vue'
import TaskForm from '@/components/tasks/TaskForm.vue'
import TaskList from '@/components/tasks/TaskList.vue'

const taskStore = useTaskStore()
const { showSuccess } = useToast()

const handleTaskAdded = (): void => {
  showSuccess('Task added successfully!')
}

const handleEditTask = (task: any): void => {
  // Implement edit functionality
  console.log('Edit task:', task)
}
</script>