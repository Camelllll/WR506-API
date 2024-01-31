<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';

const movies = ref([]);
const search = ref('');
const currentPage = ref(1);

onMounted(async () => {
  await getMovies(currentPage.value);
});

const getMovies = async (pageNumber) => {
  try {
    const response = await axios.get(`https://127.0.0.1:8000/api/movies?page=${pageNumber}&title=${search.value}`);
    movies.value = response.data['hydra:member'];
  } catch (error) {
    console.error('Erreur lors de la récupération des films:', error);
  }
}

  const nextPage = () => {
    currentPage.value++;
    getMovies(currentPage.value);
  }

  const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    getMovies(currentPage.value);
  }
}

  const searchMovie = () => {
    currentPage.value = 1;
    getMovies(currentPage.value);
};
</script>

<template>
  <div class="movie-list">
    <h1>Liste des Films</h1>
    <br> <br>
    <div class="search">
      <input type="text" v-model="search" placeholder="Rechercher un film" />
      <button @click="searchMovie">Rechercher</button>
    </div>
    <br>
    <div v-if="search">
      <h2>Recherche : {{ search }}</h2>
    </div>

    <ul class="movie-items">
      <li v-for="movie in movies" :key="movie.id" class="movie-item">
        <div class="movie-details">
          <h2>{{ movie.title }}</h2>
        </div>
        <div class="movie-details">
          <RouterLink :to="{ name: 'movie-details', params: { id: movie.id } }">Voir les détails</RouterLink>
        </div>
        <br>
      </li>
    </ul>
    <div class="pagination">
      <button class="buttonprev" @click="previousPage">Page précédente</button>
      <button class="buttonnext" @click="nextPage">Page suivante</button>
    </div>
    <br>
  </div>
</template>

<style scoped>

.pagination{
  text-align: center;
  display: flex;
}

.buttonprev{
  background-color: #e1ecf4;
  margin-left: 10px;
  border-radius: 3px;
  border: 1px solid #7aa7c7;
  box-shadow: rgba(255, 255, 255, .7) 0 1px 0 0 inset;
  box-sizing: border-box;
  color: #000000;
  cursor: pointer;
  display: table;
  justify-content: center;
  font-size: 13px;
  font-weight: 400;
  line-height: 1.15385;
  outline: none;
  padding: 8px .8em;
  position: relative;
}

.buttonnext{
  background-color: #e1ecf4;
  margin-left: 10px;
  border-radius: 3px;
  border: 1px solid #7aa7c7;
  box-shadow: rgba(255, 255, 255, .7) 0 1px 0 0 inset;
  box-sizing: border-box;
  color: #000000;
  cursor: pointer;
  display: table;
  justify-content: center;
  font-size: 13px;
  font-weight: 400;
  line-height: 1.15385;
  outline: none;
  padding: 8px .8em;
  position: relative;
}
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

.btn-openModal {
  background-color: #e1ecf4;
  margin-left: 10px;
  border-radius: 3px;
  border: 1px solid #7aa7c7;
  box-shadow: rgba(255, 255, 255, .7) 0 1px 0 0 inset;
  box-sizing: border-box;
  color: #000000;
  cursor: pointer;
  display: table;
  justify-content: center;
  font-size: 13px;
  font-weight: 400;
  line-height: 1.15385;
  margin: auto;
  outline: none;
  padding: 8px .8em;
  position: relative;
}
</style>
