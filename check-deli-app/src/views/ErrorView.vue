<template>
  <div class="not-found">
    <h2>404</h2>
    <p>Страница не найдена</p>
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
    @include growingAnimation();
    font-size: 6rem;
    color: $component-color;
  }
  p {
    @include adaptiveFont(40, 24);
    color: $component-color;
  }
  &-btn {
    @include btn(none, 25px);
  }
}
</style>