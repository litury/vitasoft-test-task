<script setup>

</script>

<template>
  <div id="app">
    <h1 class="main-title">Мини-блог</h1>
    <nav class="nav">
      <router-link to="/">Главная</router-link>
      <router-link to="/add">Добавить запись</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>
<style scoped>

.main-title {
  text-align: center;
  margin-bottom: 20px;
}

.nav {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  justify-content: center;
}


</style>
