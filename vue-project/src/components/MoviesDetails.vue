<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import moment from 'moment';
import 'moment/locale/fr';
import axios from 'axios';

const route = useRoute();
const movie = ref(null);
const showModal = ref(false);

const formatDate = (date) => {
  moment.locale('fr');
  return moment(date).format('LL');
};

onMounted(async () => {
  try {
    const movieId = route.params.id;
    const responseMovie = await axios.get(`https://127.0.0.1:8000/api/movies/${movieId}`);
    movie.value = responseMovie.data;

  } catch (error) {
    console.error('Erreur lors de la récupération des détails du film ou de la catégorie depuis l\'API:', error);
  }
});

const updateMovie = async () => {
  try {
    const updatedMovie = {
      title: movie.value.title,
      description: movie.value.description,
      duration: parseInt(movie.value.duration),
      poster: movie.value.poster,
      releaseDate: movie.value.releaseDate 
    };

    const movieId = route.params.id;
    const response = await axios.patch(`https://127.0.0.1:8000/api/movies/${movieId}`, updatedMovie);
    console.log('Film mis à jour avec succès !', response.data);
    showModal.value = false;
  } catch (error) {
    console.error('Erreur lors de la mise à jour du film:', error);
  }
};
</script>

<template>
  <div class="movie-details">
    <h1 class="movie-title">Détails du Film</h1>
    <div v-if="movie">
        <div v-if="showModal" class="modal">
          <div class="modal-content">
            <form @submit.prevent="updateMovie">
              <label for="title">Titre du film {{ movie.title }}</label>
              <input type="text" id="title" v-model="movie.title" required class="input-field" />
              <label for="description">Description du film :</label>
              <input type="text" id="description" v-model="movie.description" required class="input-field" />
              <label for="duration">Durée du film :</label>
              <input type="number" id="duration" v-model="movie.duration" required class="input-field" />
              <br>
              <div class="align-btn">
                <button type="submit" class="btn-close">Enregistrer</button>
                <button class="btn-close" @click="showModal = false">Fermer</button>
              </div>
            </form>
          </div>
        </div>
      <h2 class="movie-heading">{{ movie.title }}</h2>
      <p class="movie-description">{{ movie.description }}</p>
      <p class="movie-release-date">Durée du film : {{ movie.duration }} minutes</p>
      <p class="movie-release-date">Date de sortie : {{ formatDate(movie.releaseDate) }}</p>
      <br>
      <img :src="movie.poster" alt="Affiche du film" />
      <button class="btn-close" @click="showModal = true">Modifier</button>
      <br>
      <RouterLink to="/movies">Retour</RouterLink>
    </div>
    <div v-else>
      <p class="loading-message">Chargement en cours...</p>
    </div>
  </div>
</template>

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

  img {
    width: 300px;
    height: 450px;
    margin: 20px;
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

  /* CSS DU MODAL */

.modal {
  display: block;
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #415b4b;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 50%;
  color: white;
  border-radius: 20px;
}

.modal-content h2 {
  text-align: center;
}

.modal-content form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.modal-content form label {
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
}

.modal-content form input[type="text"] {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.modal-content form button {
  padding: 10px 20px;
  background-color: #4e824f;
  color: white;
  border: none;
  margin-left: 10px;
  border-radius: 3px;
  cursor: pointer;
  transition: 0.3s ease-in-out;
}

.modal-content form button:hover {
  background-color: #03bd7e;
  transition: ease 0.3s;
}

.btn-close {
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

.align-btn {
  display: flex;
  justify-content: space-between;
}

input[type="date"] {
      padding: 8px;
      font-size: 16px;
      border: 1px solid #ccc;
      border-radius: 4px;
      outline: none;
      width: 200px; 
    }

    input[type="date"]::placeholder {
      color: #999;
    }

    input[type="date"]::-webkit-datetime-edit-text {
      color: #333;
    }

    input[type="date"]::-webkit-calendar-picker-indicator {
      color: #333;
      cursor: pointer;
      font-size: 14px;
    }

    input[type="date"]:focus {
      border-color: dodgerblue;
      box-shadow: 0 0 5px rgba(30, 144, 255, 0.5);
    }

</style>
  