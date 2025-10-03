<!-- src/components/tasks/TaskItem.vue -->
<template>
  <div
    class="group flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-md"
    :class="{
      'opacity-60': task.completed,
      'border-l-4 border-l-red-500': task.priority === 'high' && !task.completed,
      'border-l-4 border-l-yellow-500': task.priority === 'medium' && !task.completed,
      'border-l-4 border-l-green-500': task.priority === 'low' && !task.completed
    }"
  >
    <div class="flex items-center space-x-3 flex-grow min-w-0">
      <input
        type="checkbox"
        :checked="task.completed"
        @change="handleToggle"
        class="h-5 w-5 text-indigo-600 bg-gray-100 dark:bg-gray-700 rounded border-gray-300 dark:border-gray-600 focus:ring-indigo-500 cursor-pointer transition-colors"
      />
      
      <div class="min-w-0 flex-grow">
        <div class="flex items-center space-x-2">
          <span
            class="text-gray-900 dark:text-gray-100 font-medium truncate"
            :class="task.completed ? 'line-through text-gray-500' : ''"
          >
            {{ task.name }}
          </span>
          
          <BaseBadge
            v-if="task.priority !== 'medium'"
            :type="task.priority === 'high' ? 'error' : task.priority === 'low' ? 'success' : 'warning'"
            size="sm"
          >
            {{ task.priority }}
          </BaseBadge>
        </div>
        
        <p
          v-if="task.description"
          class="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2"
        >
          {{ task.description }}
        </p>
        
        <div
          v-if="task.tags.length > 0"
          class="flex flex-wrap gap-1 mt-2"
        >
          <span
            v-for="tag in task.tags"
            :key="tag"
            class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
          >
            {{ tag }}
          </span>
        </div>
        
        <div
          v-if="task.dueDate"
          class="flex items-center space-x-1 mt-2 text-xs text-gray-500 dark:text-gray-400"
        >
          <span>📅</span>
          <span>{{ formatDueDate(task.dueDate) }}</span>
        </div>
      </div>
    </div>
    
    <div class="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
      <button
        @click="handleEdit"
        class="p-2 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        title="Edit task"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      </button>
      
      <button
        @click="handleDelete"
        class="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        title="Delete task"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatDistanceToNow } from 'date-fns';
import BaseBadge from '@/components/ui/BaseBadge.vue';
import type { Task } from '@/types';

interface Props {
  task: Task;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  toggle: [id: string];
  edit: [task: Task];
  delete: [id: string];
}>();

const handleToggle = (): void => {
  emit('toggle', props.task.id);
};

const handleEdit = (): void => {
  emit('edit', props.task);
};

const handleDelete = (): void => {
  emit('delete', props.task.id);
};

const formatDueDate = (date: Date): string => {
  const now = new Date();
  const dueDate = new Date(date);
  
  if (dueDate < now && !props.task.completed) {
    return `Overdue ${formatDistanceToNow(dueDate)} ago`;
  }
  
  return `Due ${formatDistanceToNow(dueDate)}`;
};
</script>