<!-- src/views/AboutView.vue -->
<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          About This Application
        </h2>
      </div>

      <div class="p-6 space-y-6">
        <!-- Introduction -->
        <div class="prose dark:prose-invert max-w-none">
          <p class="text-lg text-gray-600 dark:text-gray-400">
            This is a professional task management dashboard built with modern web technologies to demonstrate
            best practices in Vue.js development.
          </p>
        </div>

        <!-- Features -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <h3 class="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
              🚀 Modern Architecture
            </h3>
            <ul class="text-blue-800 dark:text-blue-200 space-y-1 text-sm">
              <li>• Vue 3 Composition API</li>
              <li>• TypeScript for type safety</li>
              <li>• Pinia for state management</li>
              <li>• Vue Router for navigation</li>
            </ul>
          </div>

          <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
            <h3 class="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
              🎨 Beautiful UI
            </h3>
            <ul class="text-green-800 dark:text-green-200 space-y-1 text-sm">
              <li>• Tailwind CSS for styling</li>
              <li>• Dark/Light theme support</li>
              <li>• Fully responsive design</li>
              <li>• Accessible components</li>
            </ul>
          </div>

          <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
            <h3 class="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-2">
              ⚡ Features
            </h3>
            <ul class="text-purple-800 dark:text-purple-200 space-y-1 text-sm">
              <li>• Task creation and management</li>
              <li>• Priority levels and due dates</li>
              <li>• Advanced filtering</li>
              <li>• Real-time statistics</li>
            </ul>
          </div>

          <div class="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
            <h3 class="text-lg font-semibold text-orange-900 dark:text-orange-100 mb-2">
              🛠 Development
            </h3>
            <ul class="text-orange-800 dark:text-orange-200 space-y-1 text-sm">
              <li>• Vite for fast development</li>
              <li>• ESLint for code quality</li>
              <li>• Vitest for unit testing</li>
              <li>• Cypress for E2E testing</li>
            </ul>
          </div>
        </div>

        <!-- Technical Details -->
        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
            Technical Stack
          </h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <h4 class="font-medium text-gray-900 dark:text-gray-100">Frontend</h4>
              <ul class="text-gray-600 dark:text-gray-400 mt-1 space-y-1">
                <li>Vue 3.3</li>
                <li>TypeScript</li>
                <li>Vue Router</li>
                <li>Pinia</li>
              </ul>
            </div>
            <div>
              <h4 class="font-medium text-gray-900 dark:text-gray-100">Styling</h4>
              <ul class="text-gray-600 dark:text-gray-400 mt-1 space-y-1">
                <li>Tailwind CSS</li>
                <li>PostCSS</li>
                <li>Autoprefixer</li>
              </ul>
            </div>
            <div>
              <h4 class="font-medium text-gray-900 dark:text-gray-100">Build Tools</h4>
              <ul class="text-gray-600 dark:text-gray-400 mt-1 space-y-1">
                <li>Vite</li>
                <li>Vitest</li>
                <li>ESLint</li>
              </ul>
            </div>
            <div>
              <h4 class="font-medium text-gray-900 dark:text-gray-100">Testing</h4>
              <ul class="text-gray-600 dark:text-gray-400 mt-1 space-y-1">
                <li>Vitest</li>
                <li>Vue Test Utils</li>
                <li>Cypress</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Version Info -->
        <div class="text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-4">
          <p>Version {{ appVersion }} - Built with ❤️ using Vue.js</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const appVersion = import.meta.env.VITE_APP_VERSION || '1.0.0'
</script>