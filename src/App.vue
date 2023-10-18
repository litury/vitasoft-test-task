<script setup>

</script>

<template>
  <div id="app">
    <h1 class="app__main-title">Мини-блог</h1>

    <nav class="app__nav nav">
      <router-link class="nav__link" to="/">Главная</router-link>
      <router-link class="nav__link" to="/new">Добавить запись</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<style scoped>

#app {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
  background-color: #f0f0f0;
  border: 5px solid #00ff00;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 255, 0, 0.5)
}

.app__main-title {
  text-align: center;
  color: black;
  text-shadow: 0 0 5px #00ff00;
  font-size: 36px;
  margin: 20px;
}

.app__nav {
  display: flex;
  margin-bottom: 20px;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  background-color: #000000;
}

.nav__link {
  color: #ffffff;
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;
  text-shadow: 0 0 5px #00ff00;
  transition: color 0.3s ease-in-out;
}

@media (max-width: 376px) {
  .nav__link {
    font-size: 16px;
  }
}

.nav__link:hover {
  color: #00ff00;
}


</style>
