<script setup>
import ApiService from '@/api.js';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { RouterLink } from 'vue-router';

const actor = ref({});
const route = useRoute();


</script>

<template>
    <div class="actor-details">
      <h1>Voici les catégories</h1>
    </div>
  </template>
  
  
<style scoped>


</style>
