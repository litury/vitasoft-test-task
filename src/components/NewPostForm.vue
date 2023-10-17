<template>
  <div class="post-form">
    <h2 class="post-form__title">Добавить запись</h2>

    <form class="post-form__form" @submit.prevent="submitForm">
      <div class="post-form__group">
        <label class="post-form__label" for="title">Заголовок</label>

        <input class="post-form__input" id="title" v-model="form.title" type="text"/>

        <p v-if="errors.title" class="post-form__error">{{ errors.title }}</p>
      </div>

      <div class="post-form__group">
        <label class="post-form__label" for="short">Краткое описание</label>
        <input class="post-form__input" id="short" v-model="form.short" type="text"/>

        <p v-if="errors.short" class="post-form__error">{{ errors.short }}</p>
      </div>

      <div class="post-form__group">
        <label class="post-form__label" for="full">Полное описание</label>
        <textarea class="post-form__textarea" id="full" v-model="form.full" rows="10"></textarea>

        <p v-if="errors.full" class="post-form__error">{{ errors.full }}</p>
      </div>

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
  title: '',
  short: '',
  full: ''
})
const errors = reactive({
  title: '',
  short: '',
  full: ''
})

// создаем вычисляемое свойство
const schema = computed(() => {
  return yup.object().shape({
    title: yup.string().required('Заголовок обязателен').max(50, 'Заголовок не должен превышать 50 символов'),
    short: yup.string().required('Краткое описание обязательно').max(100, 'Краткое описание не должно превышать 100 символов'),
    full: yup.string().max(255, 'Полное описание не должно превышать 255 символов')
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
    errors.short = ''
    errors.full = ''

    // проверяем валидность формы с помощью yup
    schema.value.validate(form, {abortEarly: false})

        .then(() => {

          // если форма валидна, добавляем запись в хранилище
          pinia.store.posts.add(form)

          // очищаем форму
          form.title = ''
          form.short = ''
          form.full = ''

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
  background-color: #ffffff;
  border-top: 1px solid #00ff00;
}

.post-form__title {
  color: #00ff00;
  text-shadow: 0 0 5px #00ff00;
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
  border: 2px solid #00ff00;
  border-radius: 5px;
  font-size: 16px;
}

.post-form__textarea {
  width: 100%;
  padding: 10px;
  border: 2px solid #00ff00;
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
  color: #ffffff;
  background-color: #00ff00;
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