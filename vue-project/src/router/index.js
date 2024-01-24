import { createRouter, createWebHistory } from 'vue-router'
import MoviesDetails from '@/components/MoviesDetails.vue'
import ActorDetails from '@/components/ActorDetails.vue'
import CategoriesDetails from '@/components/CategoriesDetails.vue'

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
    },
    {
      path: '/categories',
      name: 'categories',
      component: () => import('@/views/CategoriesView.vue')
    },
    {
      path: '/categories/:id',
      name: 'category-details',
      component: CategoriesDetails, 
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/RegisterView.vue')
    },
    {
      path: '/accueil',
      name: 'accueil',
      component: () => import('@/views/AccueilView.vue')
    }
  ]
})

export default router
