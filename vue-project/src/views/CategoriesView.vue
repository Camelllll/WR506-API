<script setup>
import ApiService from '@/api.js';
import { onMounted, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { RouterLink } from 'vue-router';

const route = useRoute();
const categories = ref([]);
const searchQuery = ref('');
const category = ref({
    name: '',
});

const addCategory = () => {
    // Make an API call to add the category
    ApiService.addCategory(category.name)
      .then((response) => {
        const newCategory = {
          id: response.data.id,
          name: response.data.name,
        };
        categories.value.push(newCategory);
        category.name = ''; // Clear the input field
        showModal.value = true; // Close the modal
      })
      .catch((error) => {
        console.error('Error adding the category:', error);
      });
  };

onMounted(() => {
  ApiService.getCategories()
    .then((response) => {
      categories.value = response.data['hydra:member'].map((category) => ({
        id: category.id,
        name: category.name,
      }));
    })
    .catch((error) => {
      console.error('Erreur lors de la récupération des catégories depuis l\'API:', error)
    });
});

const filteredCategories = computed(() => {
  return categories.value.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const showModal = ref(false);

</script>

<template>
  <div class="category-list">
    <h1>Liste des catégories</h1> <br>
    <input
        type="text"
        v-model="searchQuery"
        placeholder="Rechercher une catégorie"
        class="input-custom"
      /> <br>
      <button class="myButton" @click="showModal = true">Ajouter une catégorie</button> <br>
    
      <!-- Modal -->
      <div v-if="showModal" class="modal">
        <div class="modal-content"> <br>
          <h2>Ajouter/Modifier/Supprimer une catégorie</h2>
          <form>
            <label for="name">Nom de la catégorie :</label>
            <input type="text" id="name" v-model="category.name" />
            <button @click.prevent="addCategory">Ajouter</button>
            <button class="btn-close" @click="showModal = false">Fermer</button>
          </form>
          
        </div>
      </div>
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

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  transition: all 0.3s ease-in-out;
}

.modal-content {
  background: #282828;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  width: 600px;
  text-align: center;
}

.modal h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

.modal label {
  display: block;
  font-weight: bold;
  margin-bottom: 10px;
}

.modal input[type="text"] {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.modal button {
  padding: 10px 20px;
  background-color: #4e824f;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.modal button:hover {
  background-color: #4e824f;
  transition: ease 0.3s;

}

.btn-close{
  margin-left: 10px;
  background-color: #323f32!important;
  transition: ease 0.3s;

}

.btn-close:hover{
  background-color: #305330!important;
  transition: ease 0.3s;
}

.myButton {
	box-shadow:inset 0px 1px 0px 0px #ffffff;
	background:linear-gradient(to bottom, #ffffff 5%, #f6f6f6 100%);
	background-color:#ffffff;
	border-radius:6px;
	border:1px solid #dcdcdc;
	display:inline-block;
	cursor:pointer;
	color:#666666;
	font-family:Arial;
	font-size:15px;
	font-weight:bold;
	padding:6px 24px;
	text-decoration:none;
	text-shadow:0px 1px 0px #ffffff;
}
.myButton:hover {
	background:linear-gradient(to bottom, #f6f6f6 5%, #ffffff 100%);
	background-color:#f6f6f6;
}
.myButton:active {
	position:relative;
	top:1px;
}
</style>

