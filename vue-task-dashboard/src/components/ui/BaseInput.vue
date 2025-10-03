<!-- src/components/ui/BaseInput.vue -->
<template>
  <div class="relative">
    <label
      v-if="label"
      :for="id"
      class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
    >
      {{ label }}
    </label>
    
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      :class="inputClasses"
      @input="handleInput"
      @blur="handleBlur"
    />
    
    <div
      v-if="error"
      class="absolute -bottom-6 left-0 text-sm text-red-600 dark:text-red-400"
    >
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  modelValue: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'date';
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  id?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  id: () => `input-${Math.random().toString(36).substr(2, 9)}`
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
  blur: [];
}>();

const inputClasses = computed(() => [
  'w-full px-3 py-2 border rounded-lg shadow-sm transition-colors duration-200',
  'bg-white dark:bg-gray-700 text-gray-900 dark:text-white',
  'border-gray-300 dark:border-gray-600',
  'placeholder-gray-500 dark:placeholder-gray-400',
  'focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500',
  'disabled:opacity-50 disabled:cursor-not-allowed',
  props.error ? 'border-red-500 dark:border-red-400' : ''
]);

const handleInput = (event: Event): void => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};

const handleBlur = (): void => {
  emit('blur');
};
</script>