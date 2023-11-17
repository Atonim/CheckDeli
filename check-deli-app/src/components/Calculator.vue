<script>
import { mapState, mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      totalPrice: 0,
      isAllCustomersIncluded: false,
      bill: [],
    };
  },
  computed: {
    ...mapState({
      people: (state) => state.people.people,
    }),
    ...mapGetters({
      allPeople: "people/allPeople",
    }),

    //updateTotalPrice(){
    //  if (this.bill.length){
    //    const initialValue = 0;
    //    return this.bill.reduce((accumulator, currentValue) => accumulator.price + currentValue.price, initialValue);
    //  }
    //  else return 0;
    //}
  },
  methods: {
    ...mapMutations({
      setDebts: "people/setDebts",
    }),
    addPosition() {
      const newPosition = {
        id: Date.now(),
        title: "",
        price: null,
        payer: null,
        customers: [],
      };
      this.bill.push(newPosition);
    },
    removePosition(position) {
      this.bill = this.bill.filter((p) => p.id !== position.id);
    },
    addedAllCustomers(position) {
      return position.customers.length === this.allPeople.length;
    },
    addedSomeCustomers(position) {
      return position.customers.length > 0;
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
    apply() {
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
      this.$router.push("/result");
    },
    toggle(event, position) {
      if (this.addedAllCustomers(position)) {
        position.customers = [];
      } else {
        position.customers = this.allPeople.slice();
      }
    },
  },
  watch: {
    bill: {
      handler(newValue) {
        let initPrice = 0;
        for (let i = 0; i < this.bill.length; i++) {
          if (typeof this.bill[i].price === "number") {
            //console.log(this.bill[i].price);
            initPrice += this.bill[i].price;
          }
        }
        this.totalPrice = initPrice;
        //console.log(this.totalPrice);
      },
      deep: true,
    },
  },
};
</script>


<template>
  <div class="calculator">
    <div class="calculator-header">
      <v-btn class="calculator-header-btn" @click="addPosition">
        Добавить позицию
      </v-btn>
    </div>

    <div class="calculator-main">
      <v-slide-x-reverse-transition group>
        <div v-if="this.bill.length">
          <div v-for="position in bill" :key="position.id">
            <v-container>
              <v-row>
                <v-col cols="12" md="12">
                  <v-expansion-panels variant="accordion">
                    <v-expansion-panel class="calculator-main-panel">
                      <v-expansion-panel-title>
                        <v-col cols="12" md="6">
                          <v-text-field
                            @click.native.stop
                            clearable
                            hide-details="auto"
                            v-model="position.title"
                            label="Название"
                          >
                          </v-text-field>
                        </v-col>

                        <v-col cols="12" md="6">
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
                          <v-col cols="12" md="6">
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
                          <v-col cols="12" md="6">
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
                                      :color="
                                        this.addedSomeCustomers(position)
                                          ? 'indigo-darken-4'
                                          : undefined
                                      "
                                      :indeterminate="
                                        this.addedSomeCustomers(position) &&
                                        !this.addedAllCustomers(position)
                                      "
                                      :model-value="
                                        this.addedSomeCustomers(position)
                                      "
                                    ></v-checkbox-btn>
                                  </template>
                                </v-list-item>
                                <v-divider class="mt-2"></v-divider>
                              </template>
                            </v-select>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col>
                            <v-btn
                              block
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

        <div v-else>Список пуст</div>
      </v-slide-x-reverse-transition>
    </div>

    <div class="calculator-results">
      <p>Сумма чека:</p>
      <p>{{ this.totalPrice }} ₽</p>
    </div>

    <div class="calculator-apply">
      <v-btn class="calculator-apply-btn" @click="apply">Рассчитать!</v-btn>
    </div>
  </div>
</template>

<style lang="scss">
@import "@/scss/style.scss";

.calculator {
  @include field;
  &-header {
    @include header;
    &-btn {
      @include btn(30vh, 25px);
    }
  }

  &-main {
    @include main(30vh, 70vh, 15px, 0);
    @include scrollbar;
    &-panel {
      background-color: $component-color;
    }
  }

  &-results {
    @include midresults;
  }

  &-apply {
    @include apply;
    &-btn {
      @include btn(30vh, 10px);
    }
  }
}
</style>