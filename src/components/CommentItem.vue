<template>
  <div>
    <p>{{ comment.text }}</p>
    <!-- Добавьте здесь другие элементы, например, информацию об авторе комментария -->
  </div>
</template>

<script>
export default {
  name: 'CommentItem',
  props: {
    comment: {
      type: Object,
      required: true
    }
  }
}
</script>
