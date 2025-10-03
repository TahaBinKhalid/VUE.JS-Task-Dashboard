<!-- src/views/NotFoundView.vue -->
<template>
  <div class="min-h-[50vh] flex items-center justify-center">
    <div class="text-center">
      <div class="text-6xl mb-4">😕</div>
      <h1 class="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        404 - Page Not Found
      </h1>
      <p class="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <router-link
        to="/"
        class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
      >
        Go back home
      </router-link>
    </div>
  </div>
</template>