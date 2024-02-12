<script setup>
import ApiService from '@/api.js';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { RouterLink } from 'vue-router';

const actor = ref({});
const route = useRoute();

onMounted(() => {
  const actorId = route.params.id;
  ApiService.getActorsById(actorId)
    .then((response) => {
      actor.value = {
        ...response.data,
        movies: response.data.movies.map(movie => ({
          id: movie.id,
          title: movie.title,
        })),
      };
    })
    .catch((error) => {
      console.error('Erreur lors de la récupération des détails de l\'acteur depuis l\'API:', error);
    });
});

</script>

<template>
    <div class="actor-details">
      <h1>Détails de l'Acteur</h1>
      <div class="actor-details">
        <h1>{{ actor.firstName }} {{ actor.lastName }}</h1>
        <h3>Films dans lesquels l'acteur joue :</h3>
        <br>
        <ul>
          <template v-if="actor.movies && actor.movies.length">
            <li v-for="movie in actor.movies" :key="movie.id">
              <RouterLink :to="{ name: 'movie-details', params: { id: movie.id } }">
                {{ movie.title }}
              </RouterLink>
            </li>
          </template>
          <template v-else>
            <li>Aucun film trouvé pour cet acteur.</li>
          </template>
        </ul>
      </div>
    </div>
  </template>
  
  
<style scoped>
.actor-details {
  text-align: center;
  padding: 20px;
}

.actor-details h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.actor-details h2 {
  font-size: 20px;
  margin-top: 10px;
}

.actor-details h3 {
  font-size: 18px;
  margin-top: 20px;
}

.actor-details ul {
  list-style: none;
  padding: 0;
}

.actor-details li {
  font-size: 16px;
  margin-top: 5px;
  color: #ffffff;
}
</style>
