<script>
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      people: [],
      checkname: true,
      //rules: [
      //  value => !!value || 'Обязательное поле',
      //],
    }
  },
  methods: {
    ...mapMutations({
      setPeople: 'people/setPeople'
    }),
    apply() {
      this.checkNames()
      if(this.people.length > 1 && this.checkname){
        this.setPeople(this.people);
        this.$router.push('/calculator');
      }
      
    },
    checkNames(){
      this.people.forEach(person => {
        if(!person.name) {
          this.checkname = false;
          return
        }
        this.checkname = true;
      });
    },
    addPerson() {
      const newPerson = {
        id: Date.now(),
        name: '',
        debts: []
      }
      this.people.push(newPerson);
    },
    removePerson(person) {
      this.people = this.people.filter(p => p.id !== person.id)
    },
    //inputName(event) {
    //  this.person.name = event.target.value;
    //}
  },
  computed:{
    
  }
}
</script>

<template>
    <div class="adding-person-field">
      
      <div class="adding-person-header">
        <v-btn 
          class="adding-v-btn" 
          variant="outlined" 
          @click="addPerson"
        >
        Добавить человека
        </v-btn>
      </div>

      <div v-if="people.length" class="adding-person-main">
          <v-slide-x-reverse-transition group>
          <div v-for="person in people" :key="person.id" class="person-container">
            <v-text-field 
            clearable 
            hide-details="auto" 
            v-model="person.name" 
            label="Имя" 
            
            :append-icon="'mdi-delete'"
            @click:append="removePerson(person)"
            ></v-text-field>
          </div>
        </v-slide-x-reverse-transition>
        <!--:rules="rules"-->
      </div>
      <div v-else class="adding-person-main">
        Список пуст
      </div>
     
      <div class="adding-person-apply">
        <v-btn class="apply-v-btn" variant="outlined" @click="apply">{{ checkname ? 'Чек' : 'Введите имена'}}</v-btn>
      </div>
    </div>
</template>



<style lang="scss">
//@import '@/scss/style.scss';
.adding-person-field {
  text-align: center;
  padding: 25px;
  scrollbar-color: black #FFBD00;

  .adding-person-header {
    border-bottom: 3px solid #0E141B;
    border-radius: 15px 15px 0 0;
    background-color: #FFBD00;
    .adding-v-btn {
      //@include btn(30vh, 25px);
      width: 30vh;
      margin: 25px;
    }
  }

  .adding-person-main {
    border-radius: 0 0 15px 15px;
    background-color: #FFBD00;
    color: #0E141B;
    padding: 10px;
    max-height: 50vh;
    width: 50vh;
    overflow: scroll;
    overflow-x:hidden;    

    .person-container {
      display: flex;
      justify-content: space-evenly;
      padding: 10px;
    }
  }
  .adding-person-main::-webkit-scrollbar {
    width: 5px;
  }
  .adding-person-main::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: #0E141B;
  }
  .adding-person-main::-webkit-scrollbar-track {
    border-radius: 5px;
    background-color: #FFBD00;
    margin: 15px 0;
    height: 90%;
  }

  .adding-person-apply{
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