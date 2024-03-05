<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router'

const router = useRouter()

const openMovieDetails = (id) => {
  router.push({ name: 'movie-details', params: { id } })
}

const movies = ref([]);
const search = ref('');
const currentPage = ref(1);

onMounted(async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    router.push('/login');
    return;
  }
  await getMovies(currentPage.value);
});

const getMovies = async (pageNumber) => {
  try {
    const response = await axios.get(`https://movieapi.camelientrn.fr/api/movies?page=${pageNumber}&title=${search.value}`);
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
          <img :src="movie.poster" @click="openMovieDetails(movie.id)" />
        </div>
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

.pagination {
  display: flex;
  justify-content: space-between;
  padding: 20px;
}

.buttonprev, .buttonnext {
  background-color: #1e4dce;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.buttonprev:hover, .buttonnext:hover {
  background-color: #070fb2;
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
  justify-content: space-between;
  color: rgb(255, 255, 255);
}

img {
  width: 200px; 
  height: 300px; 
  margin-left: 5px;
  object-fit: cover;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 50px;
  transition: transform 0.3s ease; 
}

img:hover {
  transform: scale(1.05);
}

img:active {
  transform: scale(0.95);
}

.movie-item .movie-details h2 {
  margin-top: 0;
}

.movie-item .movie-details p {
  font-size: 14px;
}
.search input[type="text"] {
  padding: 10px;
  margin-right: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s, border-color 0.3s;
  width: 300px;
}

.search input[type="text"]:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

.search button {
  padding: 10px 20px;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

.search button:hover {
  background-color: #0056b3;
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

@media (max-width: 768px) {
  .movie-items {
    flex-direction: column;
    align-items: center;
  }

  img {
    width: 100%;
    height: auto;
  }

  .search input[type="text"] {
    width: 100%;
  }
}
</style>
