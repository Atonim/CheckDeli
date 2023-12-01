<template>
  <div class="wrap-container">
    <router-view></router-view>
  </div>
</template>

<script>
</script>

<style len="scss">
@import "@/scss/style.scss";

body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Advent Pro", sans-serif;
  /*font-size: 1.5rem;*/
  color: #fff;
}

/*а нужен ли*/
.wrap-container {
  max-width: 767px;
  margin: 0px auto;
  padding: 30px 10px;
}

.v-input_details {
  display: none;
}
</style>


