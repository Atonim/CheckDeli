<script setup>
</script>

<template>
  <div class="wrap-container">
    <router-view></router-view>
  </div>
</template>

<style len="scss">
@import "@/scss/style.scss";
@import "@/scss/common/variables.scss";
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Advent Pro", sans-serif;
  font-size: 1.5rem;
  color: #fff;
}

/*а нужен ли*/
/*.wrap-container {
  max-width: 1200px;
  margin: 0px auto;
  padding: 0px 15px;
}*/
</style>
