import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://movieapi.camelientrn.fr/api',
  timeout: 10000,
});

export default {
  getMovies() {
    return apiClient.get('/movies');
  },

  updateMovie(movieId, movieData) {
    return apiClient.patch(`/movies/${movieId}`, movieData);
  },

  deleteMovie(movieId) {
    return apiClient.delete(`/movies/${movieId}`);
  },

  addCategory(categoryData) {
    return apiClient.post('/categories', categoryData);
  },

  getMovieById(movieId) {
    const url = `${'https://movieapi.camelientrn.fr/api'}/movies/${movieId}`;
    return axios.get(url);
  },

  getActors() {
    return apiClient.get('/actors');
  },

  getActorsById(actorId) {
    const url = `${'https://movieapi.camelientrn.fr/api'}/actors/${actorId}`; 
    return axios.get(url);
  },

  getCategories() {
    return apiClient.get('/categories');
  },

  getCategoriesById(categoryId) {
    const url = `${'https://movieapi.camelientrn.fr/api'}/categories/${categoryId}`;
    return axios.get(url);
  },
};
