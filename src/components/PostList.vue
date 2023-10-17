<template>
  <div>
    <ul>
      <li v-for="post in posts" :key="post.id">
        <PostItem :post="post" />
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from 'vue';
import PostItem from './PostItem.vue';

export default {
  name: 'PostList',
  components: {
    PostItem
  },
  setup() {
    const posts = ref([]);  // Замените это настоящими данными из вашего магазина Pinia
    return { posts };
  }
}
</script>
