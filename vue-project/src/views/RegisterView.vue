<template>
  <div class="register-form">
    <h1>Veuillez vous inscrire :</h1>
    <form @submit.prevent="register" class="form">
      <div class="form-group">
        <label for="email">Email :</label>
        <input type="email" id="email" v-model="email" required class="input-field" />
      </div>
      <div class="form-group">
        <label for="password">Mot de passe :</label>
        <input type="password" id="password" v-model="password" required class="input-field" />
      </div>
      <div class="form-group">
        <button type="submit" class="submit-button">S'inscrire</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';

let email = ref('');
let password = ref('');

const register = async () => {
  try {
    const response = await axios.post('https://127.0.0.1:8000/api/register', {
      email: email.value,
      password: password.value,
    });
    console.log(response.data); 
    location.href = '/connexion';
  } catch (error) {
    console.error(error);
  }
};
</script>

<style scoped>
</style>
