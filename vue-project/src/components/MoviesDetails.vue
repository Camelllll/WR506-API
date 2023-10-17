<template>
    <div class="movie-details">
      <h1 class="movie-title">Détails du Film</h1>
      <div v-if="movie">
        <h2 class="movie-heading">{{ movie.title }}</h2>
        <p class="movie-description">{{ movie.description }}</p>
        <p class="movie-release-date">Durée du film : {{ movie.duration }} minutes</p>
        <p class="movie-release-date">Date de sortie : {{ formatDate(movie.releaseDate) }}</p>
        <p class="movie-release-date">Note : {{ movie.rating }}/5</p>
        <br>
        <RouterLink to="/movies">Retour</RouterLink>
      </div>
      <div v-else>
        <p class="loading-message">Chargement en cours...</p>
      </div>
    </div>
  </template>
  
  <script>
  import ApiService from '@/api.js';
  import moment from 'moment';
  import 'moment/locale/fr'; // Import the French locale
  
  export default {
    data() {
      return {
        movie: null,
      };
    },
    methods: {
      formatDate(date) {
        moment.locale('fr'); // Set the locale to French
        return moment(date).format('LL'); // Use 'LL' for a long date format in French
      },
    },
    mounted() {
      let movieId = this.$route.params.id;
  
      ApiService.getMovieById(movieId)
        .then((response) => {
          this.movie = response.data;
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération des détails du film depuis l\'API:', error);
        });
    },
  };
  </script>
  
  <style scoped>
  .movie-details {
    text-align: center;
    padding: 20px;
    color: rgb(255, 255, 255);
  }
  
  .movie-title {
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  .movie-heading {
    font-size: 20px;
    margin-bottom: 10px;
  }
  
  .movie-description {
    font-size: 16px;
    margin-bottom: 10px;
  }
  
  .movie-release-date {
    font-size: 16px;
  }
  
  .loading-message {
    font-size: 18px;
  }
  </style>
  