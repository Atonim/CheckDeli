<script>
import { mapGetters } from 'vuex'
export default {
  computed:{
    ...mapGetters({
      allPeople: 'people/allPeople'
    })
  }
}
</script>


<template>
    <div class="result-field">

      <div class="result-header">
        <h1>Результаты</h1>
      </div>

      <div class="result-main">
        <v-slide-x-reverse-transition group>
          <v-card v-for="person in this.allPeople" :key="person.id" variant="outlined" class="result-card">
            <v-card-title> Пользователь {{person.name}} должен</v-card-title>
            <v-card-text v-if="person.debts.length">
              <p v-for="debt in person.debts" :key="debt.debtId">{{debt.name}} - {{debt.price}} ₽</p>
            </v-card-text>
            <v-card-text v-else>
              Ничего не должен!
            </v-card-text>
          </v-card>
        </v-slide-x-reverse-transition>
      </div>
      
      <div class="result-apply">
        <v-btn class="apply-v-btn" variant="outlined" @click="this.$router.push('/')">Новый чек</v-btn>
      </div>
    </div>
</template>

<style lang="scss">
//@import '@/scss/style.scss';

.result-field {
  text-align: center;
  padding: 25px;
  width:50vw;
  scrollbar-color: black #FFBD00;

  .result-header{
    padding: 15px;
    border-bottom: 3px solid #0E141B;
    border-radius: 15px 15px 0 0;
    background-color: #FFBD00;
  }

  .result-main{
  min-height: 30vh;
  max-height: 70vh;
  overflow: scroll;
  overflow-x:hidden; 
  background-color: #FFBD00;
  border-radius: 0 0 15px 15px;
  padding: 15px;
  .result-card {
      border-radius: 15px;
      margin-bottom: 15px;
      background-color:#f0b000
    }
    .result-card:hover {
      transform: scale(1.01);
    }
  }
  .result-main::-webkit-scrollbar {
    width: 5px;
  }
  .result-main::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: #0E141B;
  }
  .result-main::-webkit-scrollbar-track {
    border-radius: 5px;
    background-color: #FFBD00;
    margin: 15px 0;
    height: 90%;
  }

  .result-apply{
    margin-top:15px;
    border-radius: 15px;
    background-color: #FFBD00;
    .apply-v-btn{
      //@include btn(30vh, 10px);
      margin: 10px;
      width: 30vh;
    }
  }
}

</style>