<template>
  <div>
    <h1>Liste des Films</h1>
    <ul>
      <li v-for="movie in movies" :key="movie.id">{{ movie.title }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      movies: [
        { id: 1, title: 'Film 1' },
        { id: 2, title: 'Film 2' },
        { id: 3, title: 'Film 3' },
      ],
    };
  },
};
</script>

<style scoped>
</style>
