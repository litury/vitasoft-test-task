<template>

  <div class="post-detail">

    <h2>Детали записи</h2>

    <div v-if="editMode">

      <input v-model="title" type="text"/>

      <textarea v-model="content" rows="10"></textarea>

      <button @click="saveChanges">Сохранить</button>

      <button @click="cancelChanges">Отменить</button>

    </div>

    <div v-else>

      <h3>{{ title }}</h3>

      <p>{{ content }}</p>

      <p>{{ date }}</p>

      <button @click="editPost">Редактировать</button>

    </div>

    <h4>Комментарии</h4>

    <Comment
        v-for="comment in comments"
        :key="comment.id"
        :name="comment.name"
        :email="comment.email"
        :text="comment.text"
        :date="comment.date"
    />

    <CommentForm />

  </div>

</template>

<script setup>

import { ref, reactive, computed, watch, onMounted } from 'vue'
import { usePinia } from 'pinia'
import { useRoute } from 'vue-router'

import Comment from '@/components/Comment.vue'
import CommentForm from '@/components/CommentForm.vue'

// получаем доступ к хранилищу Pinia и текущему маршруту
const pinia = usePinia()
const route = useRoute()

// создаем реактивное свойство и состояние
const post = ref({})
const editMode = ref(false)

// создаем вычисляемые свойства
const id = computed(() => post.value.id)
const title = computed(() => post.value.title)
const content = computed(() => post.value.content)
const date = computed(() => post.value.date)
const comments = computed(() => post.value.comments)

// создаем методы
function fetchPost() {
  // здесь можно использовать Pinia для получения данных из хранилища
  // или Axios для отправки запросов к API

  // для простоты мы просто имитируем асинхронный запрос с помощью setTimeout
  setTimeout(() => {
    post.value = pinia.store.posts.getById(route.params.id)
  }, 1000)
}

function editPost() {
  editMode.value = true
}

function saveChanges() {
  // здесь можно использовать Pinia для обновления данных в хранилище
  // или Axios для отправки запросов к API

  // для простоты мы просто имитируем асинхронный запрос с помощью setTimeout
  setTimeout(() => {
    pinia.store.posts.updateById(id.value, {
      title: title.value,
      content: content.value
    })
    editMode.value = false
  }, 1000)
}

function cancelChanges() {
  editMode.value = false
}

// создаем наблюдатель
watch(route, () => {
  fetchPost()
})

// используем хук жизненного цикла
onMounted(() => {
  fetchPost()
})

</script>