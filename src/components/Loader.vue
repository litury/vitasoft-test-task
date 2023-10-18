<template>
  <div class="loader">
    <div class="segment" v-for="i in 8" :key="i" :style="segmentStyle(i)"></div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  name: 'Loader',

  setup() {
    const segmentStyle = (i) => {
      const rotation = i * 45;
      return {
        transform: `rotate(${rotation}deg) translate(0, -50%)`
      };
    };

    return { segmentStyle };
  }
}
</script>

<style scoped>
.loader {
  position: relative;
  width: 50px;
  height: 50px;
  margin: auto;
}

.segment {
  position: absolute;
  bottom: 50%;
  left: 50%;
  width: 10%;
  height: 25%;
  background-color: #00f;
  border: 1px solid #00f;
  transform-origin: 50% 100%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg) translate(0, -50%);
  }
  100% {
    transform: rotate(360deg) translate(0, -50%);
  }
}
</style>
