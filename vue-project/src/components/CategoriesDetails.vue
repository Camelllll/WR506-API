<script setup>
import ApiService from '@/api.js';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { RouterLink } from 'vue-router';

const movies = ref([]);
const route = useRoute();

onMounted(async () => {
  try {
    const response = await ApiService.getMoviesInCategory(route.params.id);
    movies.value = response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des films depuis l\'API:', error);
  }
});
</script>

<template>
  <div class="category-details">
    <h1>Détails des films de la catégorie</h1>
    <ul class="movie-items">
      <li v-for="movie in movies" :key="movie.id" class="movie-item">
        <div class="movie-details">
          <h2>{{ movie.title }}</h2>
          <p>{{ movie.description }}</p>
        </div>
        <div class="movie-details">
          <RouterLink :to="{ name: 'movie-details', params: { id: movie.id } }">Voir les détails</RouterLink>
        </div>
      </li>
    </ul>
  </div>
</template>
