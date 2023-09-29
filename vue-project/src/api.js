import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://127.0.0.1:8000/api',
  timeout: 10000,
});

export default {
  getMovies() {
    return apiClient.get('/movies');
  },
};
