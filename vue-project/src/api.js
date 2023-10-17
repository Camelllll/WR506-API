import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://127.0.0.1:8000/api',
  timeout: 10000,
});

export default {
  getMovies() {
    return apiClient.get('/movies');
  },

  getMovieById(movieId) {
    const url = `${'https://127.0.0.1:8000/api'}/movies/${movieId}`;
    return axios.get(url);
  },

  getActors() {
    return apiClient.get('/actors');
  },

  getActorsById(actorId) {
    const url = `${'https://127.0.0.1:8000/api'}/actors/${actorId}`; 
    return axios.get(url);
  },
  getCategories() {
    return apiClient.get('/categories');
  },
  getCategoriesById(categoryId) {
    const url = `${'https://127.0.0.1:8000/api'}/categories/${categoryId}`;
    return axios.get(url);
  }, 
};
