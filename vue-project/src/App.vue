<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="background">
    <header>
      <RouterLink to="/accueil" class="deletBc">
        <img alt="Paramount Logo" class="logo" src="@/assets/para.png" width="130" height="100" />
      </RouterLink> 
      ｜ 
      <p class="title1">Regardez Maintenant</p>

      <nav class="align-class">
        <RouterLink to="/actors">Acteurs</RouterLink>
        <RouterLink to="/movies">Films</RouterLink>
        <RouterLink to="/categories">Catégories</RouterLink>
        <RouterLink to="/login" class="btn-login">Connexion</RouterLink>
        <RouterLink to="/accueil"></RouterLink>
      </nav>
    </header>

    <RouterView />
  </div>
</template>

<style scoped>

.btn-login{
  -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    background-color: transparent;
    background-image: -webkit-linear-gradient(-225deg,#0037c5,#0064ff);
    background-image: linear-gradient(-225deg,#0037c5,#0064ff);
    border-image: linear-gradient(-225deg,#0037c5,#0064ff);
    border-style: inset;
    border-width: 0;
    color: #fff;
    display: inline-block;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    font-family: Proxima Nova SemiBold,sans-serif;
    font-size: 15px;
    font-weight: 400;
    -webkit-justify-content: flex-start;
    justify-content: flex-start;
    letter-spacing: .4px;
    line-height: 16px;
    margin-left: 0;
    margin-top: 0;
    min-height: 14px;
    padding: 16px 40px 14px;
    position: relative;
    text-align: center;
    text-decoration: none;
    text-transform: uppercase;
    white-space: nowrap;
}

header {
  line-height: 1.5;
  max-height: 100vh;
  margin-left: -50px;
  margin-top: -30px;
}

.deletBc:hover{
  background-color: transparent;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

.align-class {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 225px;
}
nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
  color: white;
}

nav a:first-of-type {
  border: 0;
}

nav a:hover {
  background-color: transparent;
  color: rgb(0, 81, 255);
}

.title1 {
  font-size: 14px;
  color: #ffffff;
  font-weight: bold;
  margin-left: 10px;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  nav {
    text-align: right;
    font-size: 1rem;
    margin-left: 615px;
    padding: 1rem 0;
  }
}
</style>