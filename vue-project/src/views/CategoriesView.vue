<script setup>
import ApiService from '@/api.js';
import { onMounted, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { RouterLink } from 'vue-router';

const route = useRoute();
const categories = ref([]);
const searchQuery = ref('');

onMounted(() => {
  ApiService.getCategories()
    .then((response) => {
      categories.value = response.data['hydra:member'].map((category) => ({
        id: category.id,
        name: category.name,
      }))
    })
    .catch((error) => {
      console.error('Erreur lors de la récupération des catégories depuis l\'API:', error)
    })
});

const filteredCategories = computed(() => {
  return categories.value.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>


<template>
  <div class="category-list">
    <h1>Liste des catégories</h1> <br>
    <input
        type="text"
        v-model="searchQuery"
        placeholder="Rechercher une catégorie"
        class="input-custom"
      />
    <br>
    <ul class="category-items">
    <li class="category-detail" v-for="cat in filteredCategories" :key="cat.id">
        <div class="category-details">
          <h2>{{ cat.name }}</h2>
          <div class="movie-details">
          <RouterLink :to="{ name: 'category-details', params: { id: cat.id } }"> Voir les films de cette catégorie </RouterLink>
        </div>
        </div>

      </li>
    </ul>
  </div>
</template>
  
  
<style scoped>

.category-details {
  text-align: center;
  margin: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  width: 300px;
  background-color: #404040;
  font-size: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.movie-list {
  text-align: center;
  padding: 20px;
}

.category-items {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  color: rgb(255, 255, 255);
}
.input-custom {
  width: 20%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: rgb(92, 92, 92);
  color: white;
  margin-bottom: 20px;
  font-size: 16px;
  box-sizing: border-box;
}
</style>

