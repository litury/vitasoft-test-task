<template>
  <div class="post">
    <h3>{{ title }}</h3>
    <p>{{ content }}</p>
    <p>{{ formattedDate }}</p>
    <p>{{ comments.length }} комментариев</p>

    <router-link :to="{ name: 'PostDetail', params: { id } }">Подробнее</router-link>

    <div v-if="$route.name === 'PostDetail'">
      <button @click="$emit('edit', id)">Редактировать</button>
      <button @click="$emit('delete', id)">Удалить</button>
    </div>
  </div>
</template>

<script setup>


</script>
