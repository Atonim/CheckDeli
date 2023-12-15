<template>
  <div class="wrap-container">
    <router-view />
  </div>
</template>

<style len="scss">
@import "@/scss/style.scss";

body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Advent Pro", sans-serif;
  color: #fff;
}

.wrap-container {
  max-width: 767px;
  margin: 0px auto;
  padding: 30px 10px 10px 10px;
}
</style>


