<template>
  <div class="movie-list">
    <h1>Liste des Films</h1>
    <ul class="movie-items">
      <li v-for="movie in movies" :key="movie.id" class="movie-item">
        <div class="movie-image">
          <img :src="movie.poster" :alt="movie.title" />
        </div>
        <div class="movie-details">
          <h2>{{ movie.title }}</h2>
          <p>{{ movie.description }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      movies: [
        {
          id: 1,
          title: 'Film 1',
          description: 'Description du Film 1',
          poster: '/images/movie1.jpg',
        },
        {
          id: 2,
          title: 'Film 2',
          description: 'Description du Film 2',
          poster: '/images/movie2.jpg',
        },
        // Ajoutez d'autres films ici
      ],
    };
  },
};
</script>

<style scoped>
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
}

.movie-item {
  margin: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  width: 300px;
  text-align: left;
  background-color: #fff;
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
