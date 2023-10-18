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
    <p class="comment__date">{{ date }}</p>
    <button class="comment__button" @click="$emit('delete')">Удалить</button>
  </div>
</template>

<script setup>
import {defineProps, defineEmits, computed} from 'vue'
import {format} from 'date-fns'

// определяем пропсы
const props = defineProps({
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

// создаем вычисляемое свойство
// const formattedDate = computed(() => {
//   return format(props.date, 'dd.MM.yyyy')
// })
</script>

<style>
.comment {
  padding: 10px;
  background-color: #ffffff;
  border-top: 1px solid #00ff00;
}

.comment__info {
  color: #000000;
  font-size: 14px;
  margin-bottom: 5px;
}

@media (max-width: 768px) {
  .comment__info {
    font-size: 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
}

.comment__name {
  color: black;
  text-shadow: 0 0 5px #00ff00;
  font-weight: bold;
  margin-right: 20px;
}

.comment__email {
  color: #999999;
}

.comment__text {
  color: #000000;
  font-size: 16px;
  margin-bottom: 5px;
}

.comment__date {
  color: #999999;
  font-size: 12px;
  margin-bottom: 5px;
}

.comment__button {
  color: #ffffff;
  background-color: #00ff00;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color
}

.comment__button:hover {
  background-color: #008000;
}
</style>
