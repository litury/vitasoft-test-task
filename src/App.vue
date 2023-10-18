<script setup>

</script>

<template>
  <div id="app">
    <h1 class="app__main-title">Minni-Blog</h1>

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
  border-radius: 50px;
  background: #FFF2F2;
  box-shadow: -22px 21px 32px 0px rgba(0, 0, 0, 0.40);
}

.app__main-title {
  text-align: center;
  color: #001858;
  padding-top: 20px;
  font-size: 48px;

}

.app__nav {
  display: flex;
  margin-bottom: 20px;
  justify-content: space-around;
  align-items: center;
  padding: 10px;

}

.nav__link {
  color: #001858;

  font-size: 16px;
  font-weight: bold;
  text-decoration: underline;
  transition: color 0.3s ease-in-out;
}

@media (max-width: 376px) {
  .nav__link {
    font-size: 16px;
  }
}

.nav__link:hover {
  color: #f582ae;
}


</style>
