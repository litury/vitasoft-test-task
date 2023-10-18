<template>

  <!-- Форма добавления записи -->
  <div class="post-form">

    <h2 class="post-form__title">Добавить запись</h2>

    <form class="post-form__form" @submit.prevent="submitForm">

      <!-- Блок для заголовка -->
      <div class="post-form__group">
        <label class="post-form__label" for="title">Заголовок</label>
        <input class="post-form__input" id="title" v-model="form.title" type="text"/>

        <p v-if="errors.title" class="post-form__error">{{ errors.title }}</p>
      </div>

      <!-- Блок для краткого описания -->
      <div class="post-form__group">
        <label class="post-form__label" for="short">Краткое описание</label>
        <input class="post-form__input" id="short" v-model="form.summary" type="text"/>

        <p v-if="errors.summary" class="post-form__error">{{ errors.summary }}</p>
      </div>

      <!-- Блок для полного описания -->
      <div class="post-form__group">
        <label class="post-form__label" for="full">Полное описание</label>
        <textarea class="post-form__textarea" id="full" v-model="form.content" rows="10"></textarea>

        <p v-if="errors.content" class="post-form__error">{{ errors.content }}</p>
      </div>

      <!-- Кнопка отправки -->
      <button class="post-form__button" type="submit">Отправить</button>
    </form>
  </div>

</template>

<script setup>
import {ref, reactive, computed} from 'vue'
import {usePostsStore} from "../stores/postsStore";
import {useRouter} from 'vue-router'
import * as yup from 'yup'

// получаем доступ к хранилищу Pinia и роутеру
const postsStore = usePostsStore()
const router = useRouter()

// создаем реактивное состояние
const form = reactive({
  id: new Date().getTime() + Math.floor(Math.random() * 1000),
  title: '',
  summary: '',
  content: '',
  date: new Date().toISOString().slice(0, 10),
})

const errors = reactive({
  title: '',
  summary: '',
  content: ''
})

// создаем вычисляемое свойство
const schema = computed(() => {
  return yup.object().shape({
    title: yup.string().required('Заголовок обязателен').max(50, 'Заголовок не должен превышать 50 символов'),
    summary: yup.string().required('Краткое описание обязательно').max(100, 'Краткое описание не должно превышать 100 символов'),
    content: yup.string().max(255, 'Полное описание не должно превышать 255 символов')
  })
})

// создаем метод
function submitForm() {
  // здесь можно использовать Pinia для добавления данных в хранилище
  // или Axios для отправки запросов к API
  // для простоты мы просто имитируем асинхронный запрос с помощью setTimeout
  setTimeout(() => {

    // сбрасываем ошибки валидации
    errors.title = ''
    errors.summary = ''
    errors.content = ''

    // проверяем валидность формы с помощью yup
    schema.value.validate(form, {abortEarly: false})

        .then(() => {

          // если форма валидна, добавляем запись в хранилище
          postsStore.addPost(form)

          // очищаем форму
          form.title = ''
          form.summary = ''
          form.content = ''

          // переходим на главную страницу
          router.push('/')
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
.post-form {
  padding: 20px;
  background: #FFF2F2;
  border-radius: 32px;
}

.post-form__title {
  color: #001858;

  font-size: 24px;
  margin-bottom: 10px;
}

.post-form__form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.post-form__group {
  width: 80%;
  margin-bottom: 10px;
}

.post-form__label {
  color: #000000;
  font-size: 14px;
  display: block;
  margin-bottom: 5px;
}

.post-form__input {
  width: 100%;
  padding: 10px;
  border: 2px solid #8bd3dd;
  border-radius: 5px;
  font-size: 16px;
}

.post-form__textarea {
  width: 100%;
  padding: 10px;
  border: 2px solid #8bd3dd;
  border-radius: 5px;
  font-size: 16px;
  resize: none;
}

.post-form__error {
  color: #ff0000;
  font-size: 12px;
  margin-top: 5px;
}

.post-form__button {
  color: #001858;
  background-color: #f582ae;

  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color;
}

.post-form__button:hover {
  background-color: #008000;
}

</style>