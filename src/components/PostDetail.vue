<template>
  <div>
    <h1>{{ post.title }}</h1>
    <p>{{ post.summary }}</p>
    <p>{{ post.content }}</p>
    <!-- Добавьте здесь другие элементы, например, CommentList и CommentForm -->
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'PostDetail',
  setup() {
    const post = ref({});  // Замените это настоящими данными из вашего магазина Pinia
    return { post };
  }
}
</script>
