<script setup>
import ApiService from '@/api.js'
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

const actors = ref([])
const currentPage = ref(1);
const router = useRouter()
const actorsPerPage = 4;
const pages = computed(() => {
  const pages = [];
  for (let i = 0; i < actors.value.length; i += actorsPerPage) {
    pages.push(actors.value.slice(i, i + actorsPerPage));
  }
  return pages;
});

const displayedActors = computed(() => {
  return pages.value[currentPage.value - 1] || [];
});

const getActors = async (page) => { 
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/');
      return;
    }

    const response = await ApiService.getActors(page, {
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
};

onMounted(() => getActors(currentPage.value));

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
        <li v-for="actor in displayedActors" :key="actor.id" class="actor-item">
          <div class="actor-details">
            <h2>{{ actor.firstName }} {{ actor.lastName }}</h2> <br>
            <img :src="actor.image" alt="Image" />
          </div> <br>
          <RouterLink :to="{ name: 'actor-details', params: { id: actor.id } }" class="myButton">Voir les détails</RouterLink> <br>
        </li>
      </ul>
    </div>
  </div>
  <div class="pagination">
    <button @click="previousPage" :disabled="currentPage.value === 1">Précédent</button>
    <button @click="nextPage">Suivant</button>
  </div>
</template>


<style scoped>
.actor-list {
  text-align: center;
  padding: 20px;
}

.myButton:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

.myButton {
  padding: 10px 20px;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-bottom: 20px;
}

.myButton:hover {
  background-color: #0056b3;
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

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination button {
  padding: 10px 20px;
  margin: 0 10px;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.pagination button:hover:not(:disabled) {
  background-color: #0056b3;
}
</style>
