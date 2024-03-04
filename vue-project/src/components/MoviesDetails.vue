<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import moment from 'moment';
import 'moment/locale/fr';
import axios from 'axios';
import ApiService from '@/api.js';


const route = useRoute();
const movie = ref(null);
const showModal = ref(false);
const editedMovie = ref({});

const formatDate = (date) => {
  moment.locale('fr');
  return moment(date).format('LL');
};

onMounted(async () => {
  try {
    const movieId = route.params.id;
    const responseMovie = await axios.get(`https://127.0.0.1:8000/api/movies/${movieId}`);
    movie.value = responseMovie.data;

    editedMovie.value.title = movie.value.title;
    editedMovie.value.description = movie.value.description;

  } catch (error) {
    console.error('Erreur lors de la récupération des détails du film ou de la catégorie depuis l\'API:', error);
  }
});

const updateMovie = async () => {
  try {
    const response = await axios.patch(`https://127.0.0.1:8000/api/movies/${movie.value.id}`, {
      'title': `${editedMovie.value.title}`,
      'description': `${editedMovie.value.description}`,
    }, {
      headers: {
        'Content-Type': 'application/merge-patch+json'
      }
    });
    console.log('Film mis à jour avec succès !', response.data);
    showModal.value = false;
  } catch (error) {
    console.error('Erreur lors de la mise à jour du film:', error);
  }
};
</script>


<template>
  
  <!-- Modal pour modifier les détails du film -->
  <transition name="modal">
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <form @submit.prevent="updateMovie">
          <label for="title">Titre du film :</label>
          <input type="text" id="title" v-model="editedMovie.title" required class="input-field" />
          
          <label for="description">Description du film :</label>
          <input type="text" id="description" v-model="editedMovie.description" required class="input-field" />
          <div class="align-btn">
            <button type="submit" class="btn-close">Enregistrer</button>
            <button class="btn-close" @click="showModal = false">Fermer</button>
          </div>
        </form>
      </div>
    </div>
  </transition>


  <div class="movie-details">
    <h1 class="movie-title">Détails du Film</h1>
    <div v-if="movie" class="details">
      <div>
      <h2 class="movie-heading">{{ movie.title }}</h2>
      <p class="movie-description">{{ movie.description }}</p> <br>
      <p class="movie-release-date">Durée du film : {{ movie.duration }} minutes</p>
      <br>
      </div>
      <div>
      <img :src="movie.poster" alt="Affiche du film" />
      <button class="btn-close" @click="showModal = true">Modifier</button>
      <br>
      <RouterLink to="/movies">Retour</RouterLink>
    </div>
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

  .details {
    display: flex;
    margin-left: 300px;
    margin-top: 50px;
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
    width: 470px;
  }
  
  .movie-release-date {
    font-size: 16px;
  }
  
  .loading-message {
    font-size: 18px;
  }

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
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #0251a5;
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

.modal-content form input[type="text"], input[type="number"] {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.modal-content form button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  margin-left: 10px;
  border-radius: 3px;
  cursor: pointer;
  transition: 0.3s ease-in-out;
}

.modal-content form button:hover {
  background-color: #0056b3;
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

@media (max-width: 768px) {
  .details {
    flex-direction: column;
    align-items: center;
    margin-left: 0;
    margin-top: 20px;
  }

  img {
    width: 80%;
    height: auto;
  }

  .movie-description {
    width: 90%;
  }

  .modal-content {
    width: 90%;
  }
}

</style>