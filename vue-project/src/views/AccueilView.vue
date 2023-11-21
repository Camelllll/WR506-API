<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <header>
    <h1>Bienvenue sur l'API ✨</h1>
    <h2>Vous pouvez accéder aux différentes pages grâce à la barre de navigation</h2>
  </header>

  <RouterView />
</template>

<style scoped>

h1 {
  width: 100%;
  font-size: 32px;
  text-align: center;
  margin-top: 150px;
}

h2 {
  width: 100%;
  font-size: 20px;
  text-align: center;
}
</style>
