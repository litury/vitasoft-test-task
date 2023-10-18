<template>
  <div class="post">
    <h3 class="post__title">{{ title }}</h3>
    <p class="post__content">{{ summary }}</p>
    <p class="post__date">{{ formattedDate }}</p>

    <p class="post__comments">{{ filteredComments.length }} комментариев</p>

    <router-link class="post__link" :to="{ name: 'PostDetail', params: { id } }">Подробнее</router-link>
  </div>
</template>

<script setup>

import {defineProps, defineEmits, computed, onMounted} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import {format, parseISO} from 'date-fns'

// определяем пропсы
const props = defineProps({
  id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  comments: {
    type: Array,
    required: true
  }
})

const filteredComments = computed(() => {

  return props.comments.filter(comment => comment.postId == props.id)
})

// создаем вычисляемое свойство
const formattedDate = computed(() => {

  const dateObject = parseISO(props.date)

  return format(dateObject, 'dd.MM.yyyy')
})

console.log(props.date)

// получаем доступ к роутеру
const router = useRouter()

// получаем доступ к текущему роуту
const route = useRoute()

console.log(route.name)

function nameRouter() {
  const r = route.name === 'PostDetail'
}

onMounted(() => {
  console.log('mounted')
})


</script>

<style>
.post {
  padding: 16px;
  border-radius: 16px;
  border: 1px solid #000;

  background: #FFF2F2;

  box-shadow: 3px 4px 4px 0px rgba(0, 0, 0, 0.29);
}

.post__title {
  color: #001858;
  font-size: 24px;
  margin-top: 0;
}

.post__content {
  color: #001858;
  font-size: 16px;
  margin: 10px;
}

.post__date {
  color: #999999;
  font-size: 14px;
  margin-bottom: 10px;
}

.post__comments {
  color: #999999;
  font-size: 14px;
  margin-bottom: 10px;
}

.post__link {
  color: #f582ae;
  text-decoration: none;
  font-size: 16px;
  font-weight: bold;
  transition: color 0.3s ease-in-out;
}

.post__link:hover {
  color: #ffffff;
  background-color: #00ff00;
  border-radius: 5px;
  padding: 2px;
}

.post__button {
  color: #ffffff;
  background-color: #00ff00;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color
}

.post__button:hover {
  background-color: #008000
}
</style>
