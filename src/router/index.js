import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory('/threeDMap/'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/home.vue'),
    },
  ],
})

export default router
