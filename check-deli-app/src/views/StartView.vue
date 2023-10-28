<script>
export default {

}
</script>

<template>
  <div class="container">
    <h1 class="title">Раздели чек</h1>
      <v-btn block class="adding-v-btn" variant="outlined" @click="this.$router.push('/adding')">Начать!</v-btn>
  </div>
</template>

<style lang='scss' scoped>
.container{
  background-color: #FFBD00;
  margin: 0px auto;
  max-width: 600px;
  max-height: 200px;
  display:block;
  padding:15px;
  border-radius: 15px;

  
  .title{
    color:black;
    text-align: center;
  }
  
}
</style>