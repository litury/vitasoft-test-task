<template>

  <div class="post-detail">

    <h2 class="post-detail__title">Детали записи</h2>


    <div v-if="editMode" class="post-detail__edit">
      <input class="post-detail__input" v-model="title" type="text"/>
      <textarea class="post-detail__textarea" v-model="content" rows="10"></textarea>

      <div class="post-detail__buttons">
        <button class="post-detail__button" @click="saveChanges(id)">Сохранить</button>
        <button class="post-detail__button" @click="cancelChanges">Отменить</button>
      </div>
    </div>

    <div v-else class="post-detail__view">
      <h3 class="post-detail__title">{{ title }}</h3>
      <p class="post-detail__summary">{{ summary }}</p>
      <p class="post-detail__content">{{ content }}</p>
      <p class="post-detail__date">{{ date }}</p>

      <Loader v-if="loading"/>
      <div class="post-detail__buttons">
        <button class="post-detail__button" @click="editPost">Редактировать</button>
        <button class="post-detail__button" @click="deletePostById(id)">Удалить</button>
      </div>
    </div>

    <h4 class="post-detail__comments-title">Комментарии</h4>

    <CommentItem
        v-for="comment in comments"
        :key="comment.id"
        :id="comment.id"
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
import {useRoute, useRouter} from 'vue-router'

import CommentItem from "./CommentItem.vue";
import CommentForm from "./CommentForm.vue";
import Loader from "./Loader.vue";

// получаем доступ к хранилищу Pinia и текущему маршруту
const postsStore = usePostsStore()
const route = useRoute()
const router = useRouter()

// создаем реактивное свойство и состояние
const post = ref({})
// const comments = ref([])

const comments = computed(() => {
  return postsStore.getCommentsByPostId(Number(route.params.id))
})

const editMode = ref(false)


const loading = ref(false)

// создаем вычисляемые свойства
const id = computed(() => post.value.id)

const title = ref('')
const summary = ref('')
const content = ref('')

const date = computed(() => post.value.date)

// создаем методы
function fetchPost() {
  // здесь можно использовать Pinia для получения данных из хранилища
  // или Axios для отправки запросов к API

  loading.value = true
  // для простоты мы просто имитируем асинхронный запрос с помощью setTimeout
  setTimeout(() => {
    post.value = postsStore.getPost(Number(route.params.id))

    title.value = post.value.title
    summary.value = post.value.summary
    content.value = post.value.content

    loading.value = false

  }, 2000)
}



function editPost() {
  editMode.value = true
}


// Функция удаления поста
async function deletePostById(id) {
 await postsStore.deletePost(id)
  console.log('удален')

  // переходим на главную страницу
  router.push('/')
}



function saveChanges(id) {

  console.log(id)
  // здесь можно использовать Pinia для обновления данных в хранилище
  // или Axios для отправки запросов к API

  // для простоты мы просто имитируем асинхронный запрос с помощью setTimeout
  setTimeout(() => {
    postsStore.editPost(id, {
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
  padding: 24px;
}

.post-detail__title {
  color: #001858;
  font-size: 24px;
  margin-bottom: 10px;
}

.post-detail__summary {
  color: #001858;
  font-size: 16px;
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
  border: 2px solid #8bd3dd;
  border-radius: 5px;
  font-size: 18px;
  margin-bottom: 10px;
}

.post-detail__textarea {
  width: 80%;
  padding: 10px;
  border: 2px solid #8bd3dd;
  border-radius: 5px;
  font-size: 16px;
  margin-bottom: 10px;
  resize: none;
}

.post-detail__view {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  border: 1px solid #000;
  border-radius: 16px;
  background: #FFF2F2;

  box-shadow: 3px 4px 4px 0px rgba(0, 0, 0, 0.29);
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
  color: #001858;
  background-color: #f582ae;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color;
  font-size: 12px;
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
  color: #8bd3dd;

  font-size: 16px;
  margin-top: 20px;
  margin-bottom: 10px;
}
</style>