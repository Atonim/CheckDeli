<template>
  <div class="not-found">
    <h2>404</h2>
    <p>Страница не найдена :(</p>
    <v-btn class="not-found-btn" @click="this.$router.push('/')">
      На главную
    </v-btn>
  </div>
</template>

<style lang="scss">
@import "@/scss/style.scss";

.not-found {
  text-align: center;
  h2 {
    font-size: 6rem;
    animation: grow 1s ease-in-out infinite alternate;
    color: $component-color;
  }
  p {
    font-size: 2rem;
    color: $component-color;
  }
  &-btn {
    @include btn(none, 25px);
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