<script setup>
import ApiService from '@/api.js';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const movies = ref([]);
const route = useRoute();

onMounted(async () => {
  try {
    const categoryId = route.params.id;
    const moviesResponse = await ApiService.getMovies({ category: categoryId });
    movies.value = moviesResponse.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des données depuis l\'API:', error);
  }
});
</script>


<template>
  <div class="category-details">
    <h1>Films de la catégorie choisie</h1>
    <ul class="movie-items">
        <li v-for="movie in movies" :key="movie.id" class="movie-item">
          <div class="movie-details">
            <h2>{{ movie.title }}</h2>
          </div>      
          <div class="movie-details">
            <RouterLink :to="{ name: 'movie-details', params: { id: movie.id } }">Voir les détails</RouterLink>
          </div>
        </li>
    </ul>
  </div>
</template>

<style scoped>
.movie-item{
    display: inline-block;
    width: 30%;
    margin: 1%;
    padding: 1%;
    border: 1px solid black;
    text-align: center;
    background-color: rgb(92, 92, 92);
}

.movie-items{
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
</style>
