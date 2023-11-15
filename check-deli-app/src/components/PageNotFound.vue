<template>
  <div class="not-found">
    <h2>404</h2>
    <p>Страница не найдена :(</p>
  </div>
</template>

<script>
export default {
  data() {
    return;
  },
};
</script>

<style lang="scss">
@import "@/scss/style.scss";

.not-found {
  color: $component-color;
  text-align: center;
  h2 {
    font-size: 6rem;
    animation: grow 1s ease-in-out infinite alternate;
  }
  p {
    font-size: 2rem;
  }
}

@keyframes grow {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.5);
  }
}
</style>