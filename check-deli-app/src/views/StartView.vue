<template>
  <div class="start">
    <h1 class="start-title">Раздели чек</h1>
    <v-btn block class="start-btn" @click="this.$router.push('/adding')"
      >Начать!</v-btn
    >
  </div>
</template>

<style lang="scss">
@import "@/scss/style.scss";

.start {
  background-color: $background-component-color;
  min-width: 40vw;
  padding: 15px;
  border-radius: 15px;

  &-title {
    color: $text-color;
    text-align: center;
    margin: 0 25px 50px 25px;
    font-family: "Advent Pro", sans-serif;
    line-height: 0.9em;
    @include adaptiveFont(96, 40);
  }
  &-btn {
    @include btn(none, none);
  }
}
</style>