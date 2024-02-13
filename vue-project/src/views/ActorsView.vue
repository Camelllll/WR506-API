<script setup>
import ApiService from '@/api.js'
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

const actors = ref([])
const currentPage = ref(1);

onMounted(async () => { 
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      this.$router.push('/');
      return;
    }

    const response = await ApiService.getActors({
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });

    if (response.data && response.data['hydra:member']) {
      actors.value = response.data['hydra:member'].map((actor) => ({
        id: actor.id,
        firstName: actor.firstName,
        lastName: actor.lastName,
        image: actor.image,
      }));
    }
  } catch (error) {
    console.error('Error fetching actors:', error);
  }
});

const nextPage = () => {
  currentPage.value++;
  getActors(currentPage.value);
};

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    getActors(currentPage.value);
  }
};

</script>


<template>
  <div class="main">
  <div class="actor-list">
    <h1>Liste des Acteurs</h1>
   <br>
    <ul class="actor-items">
      <li v-for="actor in actors" :key="actor.id" class="actor-item">
        <div class="actor-details">
          <h2>{{ actor.firstName }} {{ actor.lastName }}</h2> <br>
          <img :src="actor.image" alt="Image" />
        </div>
        <RouterLink :to="{ name: 'actor-details', params: { id: actor.id } }">Voir les détails</RouterLink>
      </li>
    </ul>
  </div>
</div>
<div class="pagination">
  <button class="buttonprev" @click="previousPage">Page précédente</button>
  <button class="buttonnext" @click="nextPage">Page suivante</button>
</div>
</template>


<style scoped>
.actor-list {
  text-align: center;
  padding: 20px;
}

.actor-item img {
  width: 100%;
  height: 300px; 
  object-fit: cover; 
  border-radius: 5px; 
}
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #181818;
}
.actor-items {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
}

.actor-item {
  margin: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  color: white;
  width: 300px;
  text-align: center;
  background-color: #404040;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.actor-item .actor-image img {
  max-width: 100%;
  height: auto;
}

.actor-item .actor-details h2 {
  margin-top: 0;
  font-size: 18px;
  font-weight: 600;
}

.actor-item .actor-details p {
  font-size: 14px;
  margin-top: 10px;
  color: #333;
}
</style>
