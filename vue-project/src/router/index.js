import { createRouter, createWebHistory } from 'vue-router'
import MoviesDetails from '@/components/MoviesDetails.vue'
import ActorDetails from '@/components/ActorDetails.vue'

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
    },
    {
      path: '/movie/:id',
      name: 'movie-details',
      component: MoviesDetails,
    },
    {
      path: '/actor/:id',
      name: 'actor-details',
      component: ActorDetails,
    }

  ]
})

export default router
