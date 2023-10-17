<template>
  <div class="comment-form">
    <h5 class="comment-form__title">Добавить комментарий</h5>
    <form class="comment-form__form" @submit.prevent="submitForm">

      <div class="comment-form__group">
        <label class="comment-form__label" for="name">Имя</label>
        <input class="comment-form__input" id="name" v-model="form.name" type="text"/>
        <p v-if="errors.name" class="comment-form__error">{{ errors.name }}</p>
      </div>

      <div class="comment-form__group">
        <label class="comment-form__label" for="email">Email</label>
        <input class="comment-form__input" id="email" v-model="form.email" type="email"/>
        <p class="comment-form__error" v-if="errors.email">{{ errors.email }}</p>
      </div>

      <div class="comment-form__group">
        <label class="comment-form__label" for="text">Текст</label>
        <textarea class="comment-form__textarea" id="text" v-model="form.text" rows="5"></textarea>
        <p class="comment-form__error" v-if="errors.text">{{ errors.text }}</p>
      </div>
      <button class="comment-form__button" type="submit">Отправить</button>
    </form>
  </div>
</template>

<script setup>
import {ref, reactive, computed} from 'vue'
import {usePostsStore} from "../stores/postsStore";
import {useRoute} from 'vue-router'
import * as yup from 'yup'

// получаем доступ к хранилищу Pinia и текущему маршруту
const postsStore = usePostsStore()
const route = useRoute()

// создаем реактивное состояние
const form = reactive({
  name: '',
  email: '',
  text: ''
})

const errors = reactive({
  name: '',
  email: '',
  text: ''
})

// создаем вычисляемое свойство
const schema = computed(() => {
  return yup.object().shape({
    name: yup.string().required('Имя обязательно').max(50, 'Имя не должно превышать 50 символов'),
    email: yup.string().required('Email обязателен').email('Email невалиден').max(50, 'Email не должен превышать 50 символов'),
    text: yup.string().required('Текст обязателен').max(255, 'Текст не должен превышать 255 символов')
  })
})

// создаем метод
function submitForm() {
  // здесь можно использовать Pinia для добавления данных в хранилище
  // или Axios для отправки запросов к API
  // для простоты мы просто имитируем асинхронный запрос с помощью setTimeout
  setTimeout(() => {
    // сбрасываем ошибки валидации
    errors.name = ''
    errors.email = ''
    errors.text = ''
    // проверяем валидность формы с помощью yup
    schema.value.validate(form, {abortEarly: false})
        .then(() => {
          // если форма валидна, добавляем комментарий в хранилище
          pinia.store.posts.addComment(route.params.id, form)
          // очищаем форму
          form.name = ''
          form.email = ''
          form.text = ''
        })
        .catch(err => {
          // если форма невалидна, показываем ошибки валидации
          err.inner.forEach(error => {
            errors[error.path] = error.message
          })
        })
  }, 1000)
}
</script>

<style scoped>

.comment-form {
  padding: 10px;
  background-color: #ffffff;
  border-top: 1px solid #00ff00;
}

.comment-form__title {
  color: #00ff00;
  text-shadow: 0 0 5px #00ff00;
  font-size: 18px;
  margin-bottom: 10px;
}

.comment-form__form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.comment-form__group {
  width: 80%;
  margin-bottom: 10px
}

.comment-form__label {
  color: #000000;
  font-size: 14px;
  display: block;
  margin-bottom: 5px;
}

.comment-form__input {
  width: 100%;
  padding: 10px;
  border: 2px solid #00ff00;
  border-radius: 5px;
  font-size: 16px;
}

.comment-form__textarea {
  width: 100%;
  padding: 10px;
  border: 2px solid #00ff00;
  border-radius: 5px;
  font-size: 16px;
  resize: none;
}

.comment-form__error {
  color: #ff0000;
  font-size: 12px;
  margin-top: 5px;
}

.comment-form__button {
  color: #ffffff;
  background-color: #00ff00;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color;
}

.comment-form__button:hover {
  background-color: #008000;
}

</style>
