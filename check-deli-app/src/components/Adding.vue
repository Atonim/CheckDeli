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
        name: ''
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
  <div class="container">
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
        <!--<transition-group>-->
          <v-slide-x-reverse-transition group>
          <div v-for="person in people" :key="person.id" class="person-container">
          <!--<v-avatar color="surface-variant" size="50"></v-avatar>-->
          <!--убрал v-bind-->
            <v-text-field 
            clearable 
            hide-details="auto" 
            class="v-text" 
            v-model="person.name" 
            label="Имя" 
            
            :append-icon="'mdi-black-mesa'"
            @click:append="removePerson(person)"
            ></v-text-field>
          </div>
        </v-slide-x-reverse-transition>
        <!--:rules="rules"-->
        <!--</transition-group>-->
      </div>
      <div v-else>
        Список пуст
      </div>
     
      <div class="adding-person-apply">
        <v-btn class="approve-v-btn" variant="outlined" @click="apply">{{ checkname ? 'Вперед' : 'Введите имена'}}</v-btn>
      </div>
    </div>
  </div>
</template>



<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;
  background-color: #0E141B;
}

.adding-person-field {
  background-color: #FFBD00;
  text-align: center;
  padding: 25px;
  border-radius: 15px;
}

.adding-person-main {
  color: #003049;
  max-height: 50vh;
  width: 50vh;
  overflow: scroll;
  overflow-x:hidden; 
}

//SCROLLBAR для Google

.adding-person-main::-webkit-scrollbar {
  width: 5px;
  background-color: #FFBD00;;
}

.adding-person-main::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: #0E141B;
}

.adding-person-main::-webkit-scrollbar-track {
  border-radius: 5px;
  background-color: #FFBD00;;
}

//SCROLLBAR для Google

.adding-v-btn,
.approve-v-btn {
  background-color: #eae2b7;
  width: 30vh;
  margin: 25px;
}

.adding-person-header {
  border-bottom: 3px solid #003049;
}

.person-container {
  display: flex;
  justify-content: space-evenly;
  padding: 10px;
}

.v-text {
  max-width: 30vw;
}
</style>