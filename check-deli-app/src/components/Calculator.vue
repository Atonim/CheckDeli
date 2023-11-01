<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  data() {
    return {
      totalPrice: 0,
      isAllCustomersIncluded: false,
      bill:[],
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
    ...mapMutations({
      setDebts: 'people/setDebts'
    }),
    addPosition(){
      const newPosition = {
        id: Date.now(),
        title: '',
        price: null,
        payer: null,
        customers: []
      }
      this.bill.push(newPosition);
    },
    removePosition(position){
      this.bill = this.bill.filter(p => p.id !== position.id)
    },
    addedAllCustomers (position) {
        return position.customers.length === this.allPeople.length
    },
    addedSomeCustomers (position) {
        return position.customers.length > 0
    },
    //addCustomer(event, person, position){
    //  if (!position.customers.map(c => c.id).includes(person.id)){
    //    position.customers.push(person);
    //  }
    //},
    //removeCustomer(event, person, position){
    //  position.customers = position.customers.filter(p => p.id !== person.id)
    //},
    //addAllCustomers(event, position){
    //  position.customers = [];
    //  this.allPeople.forEach((person) => {
    //    position.customers.push(person);
    //  });
    //  this.isAllCustomersIncluded = true;
    //},
    //removeAllCustomers(event, position){
    //  position.customers = [];
    //  this.isAllCustomersIncluded = false;
    //},
    apply(){
      //for (let i = 0; i < this.bill.length;i++){

      //  for (let j = 0; j < this.allPeople.length; j++) {

      //    if (this.bill[i].customers.includes(this.allPeople[j])){
      //      //console.log('in bill');
      //      const debtName = this.bill[i].payer;
      //      const debtPrice = this.bill[i].price / this.bill[i].customers.length;
      //      const newDebt = {
      //        id: Date.now(),
      //        name: debtName,
      //        price: debtPrice
      //      }
      //      console.log('---------');
      //      console.log(j);
      //      console.log(newDebt);
      //      console.log('---------');
      //      this.setDebts(JSON.stringify(this.newDebt));
      //      //person.debts.push(newDebt);
      //      //console.log(person);
      //    }
      //  }
      //}
      this.setDebts(this.bill);
      this.$router.push('/result');
    },
    toggle (event, position) {
        if (this.addedAllCustomers(position)) {
          position.customers = []
        } else {
          position.customers = this.allPeople.slice()
        }
      },
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
              <v-container>
                <v-row>
                  
                  <v-col
                    cols="12"
                    md="12"
                  >
                    <v-expansion-panels variant="accordion">
                      <v-expansion-panel class="panel">
                      <v-expansion-panel-title>
                        <v-col
                          cols="12"
                          md="6"
                        >
                          <v-text-field 
                          @click.native.stop
                            clearable 
                            hide-details="auto"   
                            v-model="position.title" 
                            label="Название"
                          >
                          </v-text-field>
                        </v-col>

                        <v-col
                          cols="12"
                          md="6"
                        >
                          <v-text-field 
                            clearable 
                            hide-details="auto"  
                            @click.native.stop
                            type="number" 
                            v-model.number="position.price" 
                            label="Цена"
                          >
                          </v-text-field>
                        </v-col>
                     
                      </v-expansion-panel-title>
                      <v-expansion-panel-text>
                        <v-row>
                          <v-col
                            cols="12"
                            md="6"
                          >
                            <v-select
                              clearable
                              label="Кто заплатил?"
                              :items="allPeople"
                              :item-props="true"
                              item-title="name"
                              item-value="id"
                              v-model="position.payer"

                            >
                            </v-select>
                          </v-col>
                          <v-col
                            cols="12"
                            md="6"
                          >
                          <!--v-model="selectedCustomers"-->
                            <v-select
                              v-model="position.customers"
                              :items="allPeople"
                              item-title="name"
                              label="Кто ел/пил?"
                              multiple
                            >
                              <template v-slot:prepend-item>
                                <v-list-item
                                  title="Выбрать всех"
                                  @click="toggle($event, position)"
                                >
                                  <template v-slot:prepend>
                                    <v-checkbox-btn
                                      :color="this.addedSomeCustomers(position) ? 'indigo-darken-4' : undefined"
                                      :indeterminate="this.addedSomeCustomers(position) && !this.addedAllCustomers(position)"
                                      :model-value="this.addedSomeCustomers(position)"
                                    ></v-checkbox-btn>
                                  </template>
                                </v-list-item>

                                <v-divider class="mt-2"></v-divider>
                              </template>

                              <!--<template v-slot:append-item>
                                <v-divider class="mb-2"></v-divider>

                                <v-list-item
                                  :subtitle="subtitle"
                                  :title="title"
                                  disabled
                                >
                                  <template v-slot:prepend>
                                    <v-avatar icon="mdi-food-apple" color="primary">
                                      mdi-food-apple
                                    </v-avatar>
                                  </template>
                                </v-list-item>
                              </template>-->

                            </v-select>
                          </v-col>
                          
                        </v-row>

                        <!--<v-row>
                          <v-item-group multiple>
                            <v-container>
                              <v-row>-->
                            <!--<v-col>
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
                            </v-col>-->
                                <!--<v-col
                                  v-for="person in allPeople"
                                  :key="person.name"
                                  cols="auto"
                                >
                                  <v-item 
                                    v-slot="{ isSelected, toggle }"
                                  >
                                    <v-card
                                      :color="this.isAllCustomersIncluded ?  'outlined': (isSelected ? 'primary' : '')"
                                      class="d-flex align-center"

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
                        </v-row>-->
                        <v-row>
                          <v-col
                            
                          >
                            <v-btn block
                            variant="outlined" 
                            class="remove"
                            @click="removePosition(position)"
                            >
                            Удалить позицию
                            </v-btn>
                          </v-col>
                        </v-row>


                      </v-expansion-panel-text>
                      </v-expansion-panel>
                    </v-expansion-panels>
                  </v-col>
                  
               

                </v-row>
              </v-container>
            </div>
          </div>
          <div v-else>
            Список пуст
          </div>
        </v-slide-x-reverse-transition>
      </div>

      <div class="calculating-results">
        <p>Сумма чека:</p>
        <p>{{this.totalPrice}} ₽</p>
      </div>

      <div class="calculating-apply">
        <v-btn class="apply-v-btn" variant="outlined" @click="apply">Рассчитать!</v-btn>
      </div>
    </div>
</template>

<style lang="scss">
//@import '@/scss/style.scss';

.calculating-field {
  text-align: center;
  width:50vw;
  scrollbar-color: black #FFBD00;

  .calculating-header {
    border-bottom: 3px solid #0E141B;
    border-radius: 15px 15px 0 0;
    background-color: #FFBD00;
    .adding-v-btn {
      //@include btn(30vh, 25px);
      width: 30vh;
      margin: 25px;
    }
  }

  .calculating-main{
    min-height: 30vh;
    max-height: 70vh;
    overflow: scroll;
    overflow-x:hidden; 
    border-radius: 0 0 15px 15px;
    background-color: #FFBD00;
    padding: 15px 0;
    .icon{
      align-items: center;
    }
    .panel{
      background-color:#f0b000
    }

  }
  .calculating-main::-webkit-scrollbar {
    width: 5px;
  }
  .calculating-main::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: #0E141B;
  }
  .calculating-main::-webkit-scrollbar-track {
    border-radius: 5px;
    background-color: #FFBD00;
    margin: 15px 0;
    height: 90%;
  }

  .calculating-results{
    margin-top:15px;
    min-height: 50px;
    border-radius: 15px;
    background-color: #FFBD00;
    padding: 10px;
  }

  .calculating-apply{
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