<!-- src/components/tasks/TaskList.vue -->
<template>
  <div class="space-y-3">
    <!-- Loading State -->
    <div
      v-if="loading"
      class="space-y-3"
    >
      <div
        v-for="n in 3"
        :key="n"
        class="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg h-16"
      ></div>
    </div>

    <!-- Empty State -->
    <EmptyState
      v-else-if="tasks.length === 0"
      title="No tasks found"
      description="Try adjusting your filters or create a new task to get started."
      icon="📝"
    >
      <button
        @click="$emit('clear-filters')"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/30 hover:bg-indigo-200 dark:hover:bg-indigo-900/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Clear filters
      </button>
    </EmptyState>

    <!-- Task Items -->
    <transition-group
      v-else
      name="task-list"
      tag="div"
      class="space-y-3"
    >
      <TaskItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @toggle="(id) => $emit('toggle-task', id)"
        @edit="(task) => $emit('edit-task', task)"
        @delete="(id) => $emit('delete-task', id)"
      />
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue'
import type { Task } from '@/types'
import TaskItem from './TaskItem.vue'
import EmptyState from '@/components/common/EmptyState.vue'

interface Props {
  tasks: Task[]
  loading?: boolean
}

defineProps<Props>()

defineEmits<{
  'toggle-task': [id: string]
  'edit-task': [task: Task]
  'delete-task': [id: string]
  'clear-filters': []
}>()
</script>

<style scoped>
.task-list-enter-active,
.task-list-leave-active {
  transition: all 0.3s ease;
}

.task-list-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.task-list-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.task-list-leave-active {
  position: absolute;
}
</style>