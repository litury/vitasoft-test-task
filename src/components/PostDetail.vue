<template>

  <div class="post-detail">

    <h2 class="post-detail__title">Детали записи</h2>

    <div v-if="editMode" class="post-detail__edit">
      <input class="post-detail__input" v-model="title" type="text"/>
      <textarea class="post-detail__textarea" v-model="content" rows="10"></textarea>

      <div class="post-detail__buttons">
        <button class="post-detail__button" @click="saveChanges">Сохранить</button>
        <button class="post-detail__button" @click="cancelChanges">Отменить</button>
      </div>
    </div>

    <div v-else class="post-detail__view">
      <h3 class="post-detail__title">{{ title }}</h3>
      <p class="post-detail__summary">{{ summary }}</p>
      <p class="post-detail__content">{{ content }}</p>
      <p class="post-detail__date">{{ date }}</p>

      <div class="post-detail__buttons">
        <button class="post-detail__button" @click="editPost">Редактировать</button>
        <button class="post-detail__button" @click="deletePost(id)">Удалить</button>
      </div>
    </div>

    <h4 class="post-detail__comments-title">Комментарии</h4>

    <CommentItem
        v-for="comment in comments"
        :key="comment.id"
        :name="comment.name"
        :email="comment.email"
        :text="comment.text"
        :date="comment.date"
    />

    <CommentForm/>

  </div>

</template>

<script setup>

import {ref, reactive, computed, watch, onMounted} from 'vue'
import {usePostsStore} from "../stores/postsStore";
import {useRoute} from 'vue-router'

import CommentItem from "./CommentItem.vue";
import CommentForm from "./CommentForm.vue";

// получаем доступ к хранилищу Pinia и текущему маршруту
const postsStore = usePostsStore()
const route = useRoute()

// создаем реактивное свойство и состояние
const post = ref({})
const comments = ref([])

const editMode = ref(false)

// создаем вычисляемые свойства
const id = computed(() => post.value.id)
const summary = computed(() => post.value.summary)
const title = computed(() => post.value.title)
const content = computed(() => post.value.content)
const date = computed(() => post.value.date)


// создаем методы
function fetchPost() {
  // здесь можно использовать Pinia для получения данных из хранилища
  // или Axios для отправки запросов к API

  // для простоты мы просто имитируем асинхронный запрос с помощью setTimeout
  setTimeout(() => {
    post.value = postsStore.getPost(Number(route.params.id))
    comments.value = postsStore.getCommentsByPostId(Number(route.params.id))

    console.log(post.value)
    console.log(comments.value)
  }, 1000)
}

function editPost() {
  editMode.value = true
}


// Функция удаления поста
function deletePost(id) {
  console.log(id)

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

<style>
.post-detail {
  padding: 20px;
}

.post-detail__title {
  color: black;
  text-shadow: 0 0 5px #00ff00;
  font-size: 24px;
  margin-bottom: 10px;
}

.post-detail__edit {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.post-detail__input {
  width: 80%;
  padding: 10px;
  border: 2px solid #00ff00;
  border-radius: 5px;
  font-size: 18px;
  margin-bottom: 10px;
}

.post-detail__textarea {
  width: 80%;
  padding: 10px;
  border: 2px solid #00ff00;
  border-radius: 5px;
  font-size: 16px;
  margin-bottom: 10px;
  resize: none;
}

.post-detail__view {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.post-detail__content {
  color: #000000;
  font-size: 16px;
  margin-bottom: 10px;
}

.post-detail__date {
  color: #999999;
  font-size: 14px;
  margin-bottom: 10px;
}

.post-detail__button {
  color: #ffffff;
  background-color: #00ff00;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color
}

.post-detail__button:hover {
  background-color: #008000
}

.post-detail__buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  gap: 20px;
}

.post-detail__comments-title {
  color: black;
  text-shadow: 0 0 5px #00ff00;
  font-size: 20px;
  margin-top: 20px;
  margin-bottom: 10px;
}
</style>