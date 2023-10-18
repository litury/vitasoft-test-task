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

const id = route.params.id

const postId = ref(id)

// создаем реактивное состояние
const form = reactive({
  id: id,
  postId: postId.value,
  name: '',
  email: '',
  text: '',
  date: new Date().toISOString().slice(0, 10),
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

  // Имитируем асинхронный запрос с помощью setTimeout
  setTimeout(() => {

    // сбрасываем ошибки валидации
    errors.name = ''
    errors.email = ''
    errors.text = ''
    // проверяем валидность формы с помощью yup
    schema.value.validate(form, {abortEarly: false})
        .then(() => {
          // если форма валидна, добавляем комментарий в хранилище
          postsStore.addComment(form)

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
  padding: 16px;
  border: 1px solid #000;
  border-radius: 16px;
  background: #FFF2F2;
  margin-top: 32px;
  box-shadow: 3px 4px 4px 0px rgba(0, 0, 0, 0.29);
}

.comment-form__title {
  color: #001858;
  font-size: 24px;
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
  font-size: 16px;
  display: block;
  margin-bottom: 5px;
}

.comment-form__input {
  width: 100%;
  padding: 10px;
  border: 2px solid #8bd3dd;
  border-radius: 5px;
  font-size: 16px;
}

.comment-form__textarea {
  width: 100%;
  padding: 10px;
  border: 2px solid #8bd3dd;
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
  color: #001858;
  background-color: #f582ae;
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
