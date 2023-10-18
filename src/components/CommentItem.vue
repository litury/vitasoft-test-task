<template>
  <div class="comment">
    <p class="comment__info">
      <strong class="comment__name">
        {{ name }}
      </strong>
      <span class="comment__email">
        {{ email }}
      </span>
    </p>
    <p class="comment__text">{{ text }}</p>
    <p class="comment__date">{{ formattedDate }}</p>

    <button class="comment__button" @click="deleteComment(id)">Удалить</button>
  </div>
</template>

<script setup>
import {defineProps, defineEmits, computed} from 'vue'
import {format, parseISO} from 'date-fns'

import {usePostsStore} from "../stores/postsStore";

// определяем пропсы
const props = defineProps({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  }
})

// определяем эмиттер
const emit = defineEmits(['delete'])

// получаем доступ к хранилищу Pinia
const postsStore = usePostsStore()


// функция удаления комментария
const deleteComment = (id) => {

  // вызываем мутацию удаления комментария
  postsStore.deleteComment(id)

  // вызываем эмиттер
  emit('delete')
}


const formattedDate = computed(() => {

  const dateObject = parseISO(props.date)

  return format(dateObject, 'dd.MM.yyyy')
})
</script>

<style>
.comment {
  padding: 10px;
  background: #fef6e4;
  border-top: 1px solid #8bd3dd;
  margin-bottom: 8px;
  border-radius: 16px;
}

.comment__info {
  color: #000000;
  font-size: 14px;
  margin-bottom: 5px;
}


.comment__name {
  color: #001858;
  font-size: 12px;
  font-weight: bold;
  margin-right: 20px;
}

.comment__email {
  color: #001858;
  font-size: 12px;
}

.comment__text {
  color: #001858;
  font-size: 16px;
  margin-bottom: 5px;
}

.comment__date {
  color: #999999;
  font-size: 12px;
  margin-bottom: 5px;
}

.comment__button {


  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  color: #001858;
  background-color: #f582ae;
}

.comment__button:hover {
  background-color: #008000;
}
</style>
