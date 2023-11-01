<template>
  <div class="card">
    <h1 class="title">Раздели чек</h1>
    <v-btn block class="adding-v-btn" variant="outlined" @click="this.$router.push('/adding')">Начать!</v-btn>
  </div>
</template>

<style lang="scss">
  .card{
    background-color: #FFBD00;
    min-width: 40vw;
    padding:15px;
    border-radius: 15px;
    .title{
      color:black;
      text-align: center;
      margin-bottom: 30px;
    }
  }
</style>