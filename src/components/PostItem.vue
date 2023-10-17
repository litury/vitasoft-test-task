<template>
  <div class="post">
    <h3>{{ title }}</h3>
    <p>{{ content }}</p>
    <p>{{ formattedDate }}</p>
    <p>{{ comments.length }} комментариев</p>

    <router-link :to="{ name: 'PostDetail', params: { id } }">Подробнее</router-link>

    <div v-if="$route.name === 'PostDetail'">
      <button @click="$emit('edit', id)">Редактировать</button>
      <button @click="$emit('delete', id)">Удалить</button>
    </div>
  </div>
</template>

<script setup>

import { defineProps, defineEmits, computed } from 'vue'
import { useRouter } from 'vue-router'
import { format } from 'date-fns'

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
  content: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  comments: {
    type: Array,
    required: true
  }
})

// определяем эмиттеры
const emit = defineEmits(['edit', 'delete'])

// создаем вычисляемое свойство
const formattedDate = computed(() => {
  return format(props.date, 'dd.MM.yyyy')
})

// получаем доступ к роутеру
const router = useRouter()

</script>
