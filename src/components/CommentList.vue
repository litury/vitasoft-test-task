<template>
  <ul>
    <li v-for="comment in comments" :key="comment.id">
      <CommentItem :comment="comment" />
    </li>
  </ul>
</template>

<script>
import { ref } from 'vue';
import CommentItem from './CommentItem.vue';

export default {
  name: 'CommentList',
  components: {
    CommentItem
  },
  setup() {
    const comments = ref([]);  // Замените это настоящими данными из вашего магазина Pinia
    return { comments };
  }
}
</script>
