<template>
  <div class="post">
    <h3 class="post__title">{{ title }}</h3>
    <p class="post__content">{{ summary }}</p>
    <p class="post__date">{{ date }}</p>

    <p class="post__comments">{{ comments.length }} комментариев</p>

    <router-link class="post__link" :to="{ name: 'PostDetail', params: { id } }">Подробнее</router-link>

  </div>
</template>

<script setup>

import {defineProps, defineEmits, computed} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import {format} from 'date-fns'

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

// определяем эмиттеры
const emit = defineEmits(['edit', 'delete'])

// // создаем вычисляемое свойство
// const formattedDate = computed(() => {
//   return format(props.date, 'dd.MM.yyyy')
// })

// получаем доступ к роутеру
const router = useRouter()

// получаем доступ к текущему роуту
const route = useRoute()

console.log(route.name)

function nameRouter() {
  const r = route.name === 'PostDetail'
}

</script>

<style>
.post {
  padding: 15px;
  background-color: #ffffff;
  border: 2px solid #00ff00;
  border-radius: 5px;
  box-shadow: inset 0 0 5px rgba(0, 255, 0, 0.3);
}

.post__title {
  color: black;
  text-shadow: 0 0 5px #00ff00;
  font-size: 18px;
  margin-top: 0;
}

.post__content {
  color: #000000;
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
  color: #00ff00;
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
