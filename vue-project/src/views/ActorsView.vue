<template>
  <div class="actor-list">
    <h1>Liste des Acteurs</h1>
    <ul class="actor-items">
      <li v-for="actor in actors" :key="actor.id" class="actor-item">
        <div class="actor-image">
          <img :src="actor.image" :alt="actor.name" />
        </div>
        <div class="actor-details">
          <h2>{{ actor.name }}</h2>
          <p>{{ actor.bio }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      actors: [
        {
          id: 1,
          name: 'Acteur 1',
          bio: 'Biographie de l\'Acteur 1',
          image: '/images/actor1.jpg',
        },
        {
          id: 2,
          name: 'Acteur 2',
          bio: 'Biographie de l\'Acteur 2',
          image: '/images/actor2.jpg',
        },
        {
          id: 3,
          name: 'Acteur 3',
          bio: 'Biographie de l\'Acteur 3',
          image: '/images/actor3.jpg',
        },
      ],
    };
  },
};
</script>

<style scoped>
.actor-list {
  text-align: center;
  padding: 20px;
}

.actor-items {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.actor-item {
  margin: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  width: 300px;
  text-align: left;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.actor-item .actor-image img {
  max-width: 100%;
  height: auto;
}

.actor-item .actor-details h2 {
  margin-top: 0;
}

.actor-item .actor-details p {
  font-size: 14px;
}
</style>
