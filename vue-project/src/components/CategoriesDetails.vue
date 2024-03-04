<template>
  <div class="category-details">
    <h1>Films de la catégorie {{ categoryName }}</h1>
    <ul class="movie-items">
      <li v-for="movie in movies" :key="movie.id" class="movie-item">
        <div class="movie-details">
          <h2>{{ movie.title }}</h2>
          <p v-for="actor in movie.actors" :key="actor.id">{{ actor.fullName }}</p>
        </div>
        <div class="movie-details">
          <RouterLink :to="{ name: 'movie-details', params: { id: movie.id } }">Voir les détails</RouterLink>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import ApiService from '@/api.js';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const movies = ref([]);
const categoryName = ref('');
const route = useRoute();

onMounted(async () => {
  try {
    const categoryId = route.params.id;

    const categoryResponse = await ApiService.getCategoriesById(categoryId);
    categoryName.value = categoryResponse.data.name;

    // Use the correct function name: getMovieByCategory
    const moviesResponse = await ApiService.getMovieByCategory(categoryId);
    movies.value = moviesResponse.data['hydra:member'];
  } catch (error) {
    console.error('Erreur lors de la récupération des données depuis l\'API:', error);
  }
});
</script>

<style scoped>
.movie-item {
  display: inline-block;
  width: 30%;
  margin: 1%;
  padding: 1%;
  border: 1px solid black;
  text-align: center;
  background-color: rgb(92, 92, 92);
}

.movie-items {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
