<script setup>
import { ref, computed, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import ApiService from '@/api.js';

const categories = ref([]);
const searchQuery = ref('');
const itemPerPage = 3;
const currentPage = ref(1);
const showModal = ref(false);
const category = ref({
  name: '',
});

const addCategory = async () => {
  try {
    const response = await ApiService.addCategory({ name: category.value.name });
    console.log('Category added successfully:', response.data);
    showModal.value = false;
  } catch (error) {
    console.error('Error adding the category:', error);
  }
};

const previousPage = computed(() => currentPage.value - 1);

onMounted(async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      this.$router.push('/');
      return;
    }

    const response = await ApiService.getCategories({
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });

    if (response.data && response.data['hydra:member']) {
      categories.value = response.data['hydra:member'].map((category) => ({
        id: category.id,
        name: category.name,
      }));
    }
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
});

const filteredCategories = computed(() => {
  return categories.value.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const paginatedCategories = computed(() => {
  const startIndex = (currentPage.value - 1) * itemPerPage;
  const endIndex = startIndex + itemPerPage;
  return filteredCategories.value.slice(startIndex, endIndex);
});
</script>


<template>
  <div class="category-list">
    <h1>Liste des catégories</h1> <br>
    <div class="search">
      <input type="text" v-model="search" placeholder="Rechercher un film" />
      <button @click="searchMovie">Rechercher</button>
    </div> <br>
    <button class="myButton" @click="showModal = true">Ajouter une catégorie</button>

    <!-- Modal -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <h2>Ajouter une catégorie</h2>
        <form>
          <label for="name">Nom de la catégorie :</label>
          <input type="text" id="name" v-model="category.name" />
          <button @click.prevent="addCategory">Ajouter</button>
          <button class="btn-close" @click="showModal = false">Fermer</button>
        </form>
      </div>
    </div>
    <ul class="category-items">
      <li class="category-detail" v-for="cat in paginatedCategories" :key="cat.id">
        <div class="category-details">
          <h2>{{ cat.name }}</h2>
          <div class="movie-details">
            <ul>
              <li v-for="movie in cat.movies" :key="movie.id">
                <RouterLink :to="{ name: 'movie-details', params: { id: movie.id } }">{{ movie.title }}</RouterLink>
              </li>
            </ul>
          </div>
        </div>
      </li>
    </ul>
    <div class="pagination">
      <button class="button-8" v-if="previousPage > 0" @click="currentPage--">Précédent </button>
      <button class="button-8" @click="currentPage++">Suivant</button>
    </div>
  </div>
</template>

  
  
<style scoped>

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
  color: white;
}
.category-list {
  margin-left: 50px;
  margin-top: 50px;
  text-align: center;
}
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

.category-items {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  color: rgb(255, 255, 255);
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
  margin-right: 15px;
  text-align: left; 
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

.button-8 {
  background-color: #e1ecf4;
  margin-left: 10px;
  border-radius: 3px;
  border: 1px solid #7aa7c7;
  box-shadow: rgba(255, 255, 255, .7) 0 1px 0 0 inset;
  box-sizing: border-box;
  color: #000000;
  cursor: pointer;
  display: inline-block;
  font-size: 13px;
  font-weight: 400;
  line-height: 1.15385;
  margin: 0;
  outline: none;
  padding: 8px .8em;
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;
  white-space: nowrap;
}

.button-8:hover,
.button-8:focus {
  background-color: #b3d3ea;
  color: #2c5777;
}

.button-8:focus {
  box-shadow: 0 0 0 4px rgba(0, 149, 255, .15);
}

.button-8:active {
  background-color: #a0c7e4;
  box-shadow: none;
  color: #2c5777;
}

.search input[type="text"] {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s, border-color 0.3s;
  width: 300px;
  margin-right: 15px;
}

.search input[type="text"]:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

.search button {
  padding: 10px 20px;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

.search button:hover {
  background-color: #0056b3;
}
</style>

