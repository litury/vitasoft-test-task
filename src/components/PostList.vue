<template>
  <div class="home">
    <h2>Список записей</h2>
    <div class="posts">
      <PostItem
          v-for="post in sortedPosts"
          :key="post.id"
          :id="post.id"
          :title="post.title"
          :content="post.content"
          :date="post.date"
          :comments="post.comments"
      />
    </div>
  </div>
</template>

<script setup>
import PostItem from "./PostItem.vue";

import { ref, computed, onMounted } from 'vue'
import { usePinia } from 'pinia'

// получаем доступ к хранилищу Pinia
const pinia = usePinia()

// создаем реактивное свойство
const posts = ref([])

// создаем вычисляемое свойство для сортировки постов по дате
const sortedPosts = computed(() => {
  return posts.value.sort((a, b) => b.date - a.date)
})

// создаем метод
function fetchPosts() {
  // здесь можно использовать Pinia для получения данных из хранилища
  // или Axios для отправки запросов к API
  // для простоты мы просто имитируем асинхронный запрос с помощью setTimeout
  setTimeout(() => {
    posts.value = pinia.store.posts.getAll()
  }, 1000)
}

// используем хук жизненного цикла
onMounted(() => {
  fetchPosts()
})
</script>
