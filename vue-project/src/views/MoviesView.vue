<template>
  <div class="movie-list">
    <h1>Liste des Films</h1>
    <ul class="movie-items">
      <li v-for="movie in movies" :key="movie.id" class="movie-item">
        <div class="movie-details">
          <h2>{{ movie.title }}</h2>
          <p>{{ movie.description }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import ApiService from '@/api.js';

export default {
  data() {
    return {
      movies: [],
    };
  },
  mounted() {
    ApiService.getMovies()
      .then((response) => {
        this.movies = response.data['hydra:member'].map((movie) => ({
          id: movie.id,
          title: movie.title,
          description: movie.description,
        }));
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des films depuis l\'API:', error);
      });
  },
};
</script>

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
</style>
