import { createRouter, createWebHistory } from 'vue-router'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/actors',
      name: 'actors',
      component: () => import('@/views/ActorsView.vue')
    },
    {
      path: '/movies',
      name: 'movies',
      component: () => import('@/views/MoviesView.vue')
    }
  ]
})

export default router
