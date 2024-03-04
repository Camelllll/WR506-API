<script setup>
import axios from 'axios';
import { ref } from 'vue';

let email = ref('');
let password = ref('');

const login = async () => {
    const response = await axios(`https://127.0.0.1:8000/api/login_check`, {
      method: 'POST',
      data: {
        email: email.value,
        password: password.value,
      },
  })
    localStorage.setItem('token', response.data.token)
    console.log(response.data.token)
    location.href = '/accueil'
  };

</script>

<template>
<div class="login-page">
  <div class="login-form">
    <h1>Veuillez vous identifier :</h1>
    <form @submit.prevent="login" class="form">
      <div class="form-group">
        <label for="email">Nom d'utilisateur :</label>
        <input type="text" id="email" v-model="email" required class="input-field" />
      </div>
      <div class="form-group">
        <label for="password">Mot de passe :</label>
        <input type="password" id="password" v-model="password" required class="input-field" />
      </div>
      <div class="form-group">
        <button type="submit" @click="login" class="submit-button">Se connecter</button>
      </div>
    </form>
  </div>
</div>
</template>

<style scoped>

.login-page {
  background-image: url("https://wwwimage-intl.pplusstatic.com/thumbnails/photos/w1920-q80/cbs_page_attribute/upsell_gen_hero1_weblandscape_2560x1280_012424_7.jpg");
  background-size: cover;
  background-position: center;
  height: 100vh;
}
.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 350px;
}

.form {
  width: 300px;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
}

.input-field {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
  background-color: #e3e3e3;
}

.submit-button {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 3px;
  background-color: #1e4b37;
  cursor: pointer;
  color: white;
  transition: background-color 0.3s ease-in-out;
}

.submit-button:hover {
  background-color: #03bd7e;
}


</style>