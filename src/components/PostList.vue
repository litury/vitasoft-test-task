<template>
  <div class="home">
    <h2 class="home__title">Список записей</h2>

    <div class="home__posts posts">
      <PostItem
          v-for="post in sortedPosts"
          :key="post.id"
          :id="post.id"
          :title="post.title"
          :summary="post.summary"
          :date="post.date"

          :comments="comments"
      />
    </div>
  </div>
</template>

<script setup>
import PostItem from "./PostItem.vue";

import {ref, computed, onMounted} from 'vue'
import {usePostsStore} from "../stores/postsStore";

// получаем доступ к хранилищу Pinia
const postsStore = usePostsStore()

// создаем реактивное свойство
const posts = ref([])
const comments = ref([])

// создаем вычисляемое свойство для сортировки постов по дате
const sortedPosts = computed(() => {
  return posts.value.sort((a, b) => b.date - a.date)
})

// создаем метод
function fetchPosts() {
  console.log(posts.value)
  console.log(comments.value)

  // Имитируем асинхронный запрос с помощью setTimeout
  setTimeout(() => {
    posts.value = postsStore.getPosts
    comments.value = postsStore.getComments

    console.log(posts.value)
    console.log(comments.value.length)
  }, 1000)
}

// используем хук жизненного цикла
onMounted(() => {
  fetchPosts()
})
</script>

<style scoped>
.home {
  padding: 20px;
}

.home__title {
  color: black;
  text-shadow: 0 0 5px #00ff00;
  font-size: 24px;
  margin-bottom: 10px;
}

.home__posts {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 20px;
}

@media (max-width: 576px) {
  .home__posts {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}
</style>
