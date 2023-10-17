<script>
import { mapState, mapGetters } from 'vuex'
export default {
  data() {
    return {
      totalPrice: 0,
      isAllCustomersIncluded: false,
      bill:[]
    }
    
  },
  computed: {
    ...mapState({
      people: state => state.people.people
    }),
    ...mapGetters({
      allPeople: 'people/allPeople'
    }),
    //updateTotalPrice(){
    //  if (this.bill.length){
    //    const initialValue = 0;
    //    return this.bill.reduce((accumulator, currentValue) => accumulator.price + currentValue.price, initialValue);
    //  }
    //  else return 0;
    //}
  },
  methods:{
    addPosition(){
      const newPosition = {
        id: Date.now(),
        title: '',
        price: null,
        payer: '',
        customers: []
      }
      this.bill.push(newPosition);
      console.log(this.bill);
    },
    removePosition(position){
      this.bill = this.bill.filter(p => p.id !== position.id)
    },
    addCustomer(event, person, position){
      console.log('add');
      console.log(event);
      if (!position.customers.map(c => c.id).includes(person.id)){
        position.customers.push(person);
      }
    },
    removeCustomer(event, person, position){
      console.log('remove');
      console.log(event);
      position.customers = position.customers.filter(p => p.id !== person.id)
    },
    addAllCustomers(event, position){
      position.customers = [];
      console.log('add all');
      this.allPeople.forEach((person) => {
        position.customers.push(person);
      });
      this.isAllCustomersIncluded = true;
    },
    removeAllCustomers(event, position){
      console.log('remove all');
      position.customers = [];
      this.isAllCustomersIncluded = false;
    }
  },
  watch: {
    bill:{
      handler(newValue){
        let initPrice = 0;
        for (let i = 0; i < this.bill.length; i++){
          initPrice += this.bill[i].price;
        }
        this.totalPrice = initPrice;
      },
      deep: true
    }
  }
}
</script>


<template>
  <div class="container">
    <div class="calculating-field">

      <div class="calculating-header">
        <v-btn 
          class="adding-v-btn" 
          variant="outlined" 
          @click="addPosition"
          >
          Добавить позицию
        </v-btn>
      </div>

      <div class="calculating-main">
        <v-slide-x-reverse-transition group>
          <div v-if="this.bill.length">
            <div 
              v-for="position in bill"
              :key="position.id"
              >
         
              <v-text-field 
                clearable 
                hide-details="auto"  
                variant="solo"  
                v-model="position.title" 
                label="Название"
              >
              </v-text-field>

              <v-text-field 
                clearable 
                hide-details="auto"  
                variant="solo"  
                type="number" 
                v-model.number="position.price" 
                label="Цена"
              >
              </v-text-field>
          
              <v-select
                clearable
                label="Кто заплатил?"
                :items="allPeople"
                item-title="name"
                v-model="position.payer"
                variant="solo"
              >
              </v-select>
              <v-btn 
                variant="outlined" 
                @click="removePosition(position)"
              >
                Удалить позицию
              </v-btn>
              <v-item-group multiple>
                <v-container>
                  <v-row>
                    <v-col>
                      <v-item
                        v-slot="{ isSelected, toggle }"
                      >
                        <v-card 
                        :color="isSelected ? 'primary' : ''"
                          class="d-flex align-center"
                          dark
                          @click="toggle($event), !isSelected ? addAllCustomers($event, position) : removeAllCustomers($event, position)">
                          <v-scroll-y-transition>
                            <div
                              class="pa-2 flex-grow-1 text-center"
                            >
                              Все
                            </div>
                          </v-scroll-y-transition>
                        </v-card>
                      </v-item>
                    </v-col>
                    <v-col
                      v-for="person in allPeople"
                      :key="person.name"
                      cols="auto"
                    >
                      <v-item 
                        v-slot="{ isSelected, toggle }"
                      >
                        <v-card
                          :color="this.isAllCustomersIncluded ?  'primary': (isSelected ? 'primary' : '')"
                          class="d-flex align-center"
                          dark
                          @click="toggle($event), !isSelected ? addCustomer($event, person, position) : removeCustomer($event, person, position)"
                        >
                          <v-scroll-y-transition>
                            <div
                              class="pa-2 flex-grow-1 text-center"
                            >
                              {{ person.name }}
                            </div>
                          </v-scroll-y-transition>
                        </v-card>
                      </v-item>
                    </v-col>
                  </v-row>
                </v-container>
              </v-item-group>
              <v-divider class="border-opacity-100"></v-divider>
            </div>
          </div>
        </v-slide-x-reverse-transition>
       
        <!--<div v-for="person in this.allPeople">
          {{ person.name }}
        </div>-->
      </div>
      <div class="calculating-results">
        <p>Сумма чека:</p>
        <p>{{this.totalPrice}}</p>
      </div>
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
  width:50vw;
}
.calculating-main{
  min-height: 30vh;
  max-height: 70vh;
  overflow: scroll;
  overflow-x:hidden; 
}
.input-container{
  display: flex;
  justify-content: space-evenly;
  gap: 10px;
  margin-top: 10px;
}
.calculating-results{
  min-height: 50px;
}
.v-text {
  max-width: 30vw;
}
.person-container{
  display:flex
}
</style>