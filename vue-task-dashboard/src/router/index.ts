// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  // Update document title
  document.title = `Task Dashboard - ${to.meta.title || 'App'}`

  // Add authentication guards here if needed
  if (to.meta.requiresAuth) {
    // Check if user is authenticated
    // const isAuthenticated = checkAuth()
    // if (!isAuthenticated) next('/login')
    // else next()
    next()
  } else {
    next()
  }
})

export default router