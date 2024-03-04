<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="background">
  <div class="grid-item">
    <h1 data-row-position="0" class="includeInScrollTracking">
      UNE MONTAGNE <br> DE DIVERTISSEMENT
    </h1>
    <div class="upsell-text">
      <strong>
        Vous voilà connecté à l'API <br>Bonne balade <br>
      </strong> 
      <strong>
        Inscrivez-vous maintenant et profitez de 7 jours GRATUITS.
      </strong>
    </div>
    <div class="hero__cta">
      <a href="/movies" class="button focusable buttonWindows button__extra-large js-cta-tracking " aa-link="upsell|top|s’abonner À paramount+|||||||||||||||" target="_self">
        <div class="button__text">
          S’ABONNER À PARAMOUNT+ ET VOIR LES FILMS
        </div>
      </a>
    </div>
  </div>
  <RouterView />
</div>
</template>

<style scoped>
.background {
  background-image: url("https://wwwimage-intl.pplusstatic.com/thumbnails/photos/w1920-q80/cbs_page_attribute/upsell_gen_hero1_weblandscape_2560x1280_012424_7.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
}
.includeInScrollTracking {
  margin-bottom: 20px;
  font-size: 60px;
  font-weight: 900;
  line-height: 1.2;
  margin-left: 70px;
  margin-top: 180px;
  color: #fff;
  text-align: left;
  text-transform: uppercase;
}

.upsell-text{
  margin-left: 70px;
  margin-top: 20px;
  font-size: 20px;
  font-weight: 400;
  line-height: 1.2;
  color: #fff;
  text-align: left;
  text-transform: uppercase;
}

.hero__cta{
  margin-left: 70px;
  margin-top: 20px;
  font-size: 20px;
  font-weight: 400;
  line-height: 1.2;
  color: #fff;
  text-align: left;
  text-transform: uppercase;
}

.button {
  background-color: #0064ff;
  border-radius: 3px;
  border: 1px solid #7aa7c7;
  box-shadow: rgba(255, 255, 255, .7) 0 1px 0 0 inset;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: table;
  justify-content: center;
  font-size: 13px;
  font-weight: 400;
  line-height: 1.15385;
  outline: none;
  padding: 8px .8em;
  position: relative;
}

/* Responsive */

@media (max-width: 768px) {
  .includeInScrollTracking {
    font-size: 40px;
    margin-left: 30px;
    margin-top: 120px;
  }

  .upsell-text, .hero__cta {
    margin-left: 30px;
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .includeInScrollTracking {
    font-size: 30px;
    margin-left: 20px;
    margin-top: 350px;
  }

  .upsell-text, .hero__cta {
    margin-left: 20px;
    font-size: 14px;
  }
}

</style>