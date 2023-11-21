<script setup>
import { onMounted, ref, computed } from 'vue';
import { RouterLink } from 'vue-router';
import ApiService from '@/api.js'
import axios from 'axios';

const movies = ref([]);
const itemPerPage = 3;
const currentPage = ref(1);
const previousPage = computed(() => currentPage.value - 1);

onMounted(async () => {
  try {


    const token = localStorage.getItem('token');
    if (!token) {
      this.$router.push('/');
      return;
    }

    const response = await ApiService.getMovies({
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });

    if (response.data && response.data['hydra:member']) {
      movies.value = response.data['hydra:member'].map((movie) => ({
        id: movie.id,
        title: movie.title,
        description: movie.description,
        releaseDate: movie.releaseDate,
      }));
    }
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
});

const paginatedMovies = computed(() => {
  const startIndex = (currentPage.value - 1) * itemPerPage;
  const endIndex = startIndex + itemPerPage;
  return movies.value.slice(startIndex, endIndex);
});

</script>

<template>
  <div class="movie-list">
    <h1>Liste des Films</h1> <br> <br>
    <ul class="movie-items">
      <li v-for="movie in paginatedMovies" :key="movie.id" class="movie-item">
        <div class="movie-details">
          <h2>{{ movie.title }}</h2>
          <p>{{ movie.description }}</p>
        </div>      
        <div class="movie-details">
          <RouterLink :to="{ name: 'movie-details', params: { id: movie.id } }">Voir les détails</RouterLink>
        </div>
      </li>
    </ul>
    <br>
    <div class="pagination">
      <button class="button-8" v-if="previousPage> 0" @click="currentPage--">Précédent </button>
      <button class="button-8" @click="currentPage++">Suivant</button>
    </div>
  </div>
</template>


<style scoped>
.movie-details {
  text-align: center;
}
.movie-list {
  text-align: center;
  padding: 20px;
}

.movie-items {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  color: rgb(255, 255, 255);
}

.movie-item {
  margin: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  width: 300px;
  text-align: left;
  background-color: #404040;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.movie-item .movie-image img {
  max-width: 100%;
  height: auto;
}

.movie-item .movie-details h2 {
  margin-top: 0;
}

.movie-item .movie-details p {
  font-size: 14px;
}
.button-8 {
  background-color: #e1ecf4;
  margin-left: 10px;
  border-radius: 3px;
  border: 1px solid #7aa7c7;
  box-shadow: rgba(255, 255, 255, .7) 0 1px 0 0 inset;
  box-sizing: border-box;
  color: #000000;
  cursor: pointer;
  display: inline-block;
  font-size: 13px;
  font-weight: 400;
  line-height: 1.15385;
  margin: 0;
  outline: none;
  padding: 8px .8em;
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;
  white-space: nowrap;
}

.button-8:hover,
.button-8:focus {
  background-color: #b3d3ea;
  color: #2c5777;
}

.button-8:focus {
  box-shadow: 0 0 0 4px rgba(0, 149, 255, .15);
}

.button-8:active {
  background-color: #a0c7e4;
  box-shadow: none;
  color: #2c5777;
}

</style>
