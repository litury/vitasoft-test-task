<template>
  <div class="comment">
    <p><strong>{{ name }}</strong> ({{ email }})</p>
    <p>{{ text }}</p>
    <p>{{ formattedDate }}</p>

    <button @click="$emit('delete')">Удалить</button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue'
import { format } from 'date-fns'

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
    type: Date,
    required: true
  }
})

// определяем эмиттер
const emit = defineEmits(['delete'])

// создаем вычисляемое свойство
const formattedDate = computed(() => {
  return format(props.date, 'dd.MM.yyyy')
})
</script>

