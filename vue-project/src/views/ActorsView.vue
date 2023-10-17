<script setup>
import ApiService from '@/api.js'
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

const actors = ref([])

onMounted(() => {
  ApiService.getActors()
    .then((response) => {
      actors.value = response.data['hydra:member'].map((actor) => ({
        id: actor.id,
        firstName: actor.firstName,
        lastName: actor.lastName, 
      }))
    })
    .catch((error) => {
      console.error('Erreur lors de la récupération des acteurs depuis l\'API:', error)
    })
})
</script>


<template>
  <div class="actor-list">
    <h1>Liste des Acteurs</h1>
   <br>
    <ul class="actor-items">
      <li v-for="actor in actors" :key="actor.id" class="actor-item">
        <div class="actor-details">
          <h2>{{ actor.firstName }} {{ actor.lastName }}</h2> <!-- Affichez le prénom et le nom de famille -->
        </div>
        <RouterLink :to="{ name: 'actor-details', params: { id: actor.id } }">Voir les détails</RouterLink>
      </li>
    </ul>
  </div>
</template>


<style scoped>
.actor-list {
  text-align: center;
  padding: 20px;
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
}

.actor-item .actor-details p {
  font-size: 14px;
  margin-top: 10px;
  color: #333;
}
</style>
