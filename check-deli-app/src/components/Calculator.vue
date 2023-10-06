<script>
export default {
  props: {
    people: {
      type: Array,
      //required: true
    }
  }
}
</script>


<template>
  <div class="container">
    <div class="calculating-field">
      <div class="calculating-header">
        <v-btn class="adding-v-btn" variant="outlined">Добавить позицию</v-btn>
      </div>
      <div class="calculating-main"></div>
      <div class="calculating-results"></div>
      <div class="calculating-apply">
        <v-btn class="adding-v-btn" variant="outlined">Рассчитать!</v-btn>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;
  background-color: #0E141B;
}

.calculating-field {
  background-color: #FFBD00;
  text-align: center;
  padding: 25px;
  border-radius: 15px;
}
</style>