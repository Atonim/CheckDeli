<template>
  <v-form @submit="handleSubmit($event)" class="calculator">
    <div class="calculator-header">
      <v-btn block class="calculator-header-btn" @click="addPosition">
        Добавить позицию
      </v-btn>
    </div>

    <div class="calculator-main">
      <div v-if="this.bill.length">
        <v-slide-x-reverse-transition group>
          <div v-for="position in bill" :key="position.id">
            <v-container>
              <v-row>
                <v-col cols="12" md="12">
                  <v-expansion-panels variant="accordion">
                    <v-expansion-panel class="calculator-main-panel">
                      <v-expansion-panel-title
                        class="calculator-main-panel-title"
                      >
                        <v-row class="calculator-main-panel-title-row">
                          <v-col cols="12" md="6">
                            <v-text-field
                              @click.native.stop
                              clearable
                              hide-details="auto"
                              v-model="position.title"
                              label="Название"
                            />
                          </v-col>

                          <v-col cols="12" md="6">
                            <v-text-field
                              clearable
                              hide-details="auto"
                              @click.native.stop
                              v-model.number="position.price"
                              label="Цена"
                            />
                          </v-col>
                        </v-row>
                      </v-expansion-panel-title>

                      <v-expansion-panel-text
                        class="calculator-main-panel-text"
                      >
                        <v-row class="calculator-main-panel-text-row">
                          <v-col cols="12" md="6">
                            <v-select
                              clearable
                              label="Кто заплатил?"
                              :items="getPeople"
                              :item-props="true"
                              item-title="name"
                              item-value="id"
                              v-model.trim="position.payer"
                            />
                          </v-col>
                          <v-col cols="12" md="6">
                            <v-select
                              v-model.trim="position.customers"
                              :items="getPeople"
                              item-title="name"
                              item-value="id"
                              label="Кто делит?"
                              multiple
                            >
                              <template #prepend-item>
                                <v-list-item
                                  title="Выбрать всех"
                                  @click="toggle($event, position)"
                                >
                                  <template #prepend>
                                    <v-checkbox-btn
                                      :color="
                                        this.areSomeCustomers(position)
                                          ? 'indigo-darken-4'
                                          : undefined
                                      "
                                      :indeterminate="
                                        this.areSomeCustomers(position) &&
                                        !this.areAllCustomers(position)
                                      "
                                      :model-value="
                                        this.areSomeCustomers(position)
                                      "
                                    />
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
                              class="calculator-main-panel-text-btn"
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
        </v-slide-x-reverse-transition>
      </div>
      <div v-else>Список пуст</div>
    </div>

    <div class="calculator-results">
      <p>Сумма чека:</p>
      <p>{{ this.totalPrice }} ₽</p>
    </div>

    <div class="calculator-apply">
      <v-btn
        block
        type="submit"
        @keydown.enter="handleSubmit"
        class="calculator-apply-btn"
        :class="{ animated: this.btnAnimated }"
        >{{ this.selectedButtonText }}</v-btn
      >
    </div>
  </v-form>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      totalPrice: 0,
      bill: [],
      errorLength: false,
      errorContent: false,
      btnAnimated: false,
      selectedButtonText: "Рассчитать!",
    };
  },
  mounted() {
    this.removeAllDebts();
    if (localStorage.getItem("bill")) {
      try {
        this.bill = JSON.parse(localStorage.getItem("bill"));
      } catch (e) {
        localStorage.removeItem("bill");
      }
    }
  },
  methods: {
    ...mapMutations({
      removeAllDebts: "people/removeAllDebts",
    }),
    ...mapActions({
      setDebts: "people/setDebts",
    }),
    handleSubmit(e) {
      e.preventDefault();
      this.validation();
      if (!this.errorLength && !this.errorContent) this.apply();
      else this.triggerErrorButton();
    },
    validation() {
      this.bill.length ? (this.errorLength = false) : (this.errorLength = true);
      this.errorContent = false;
      this.bill.forEach((position) => {
        if (
          position.title === "" ||
          !position.price ||
          isNaN(position.price) ||
          !position.payer ||
          !position.customers.length
        ) {
          this.errorContent = true;
          return;
        }
      });
    },
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

    areAllCustomers(position) {
      return position.customers.length === this.getPeople.length;
    },
    areSomeCustomers(position) {
      return position.customers.length > 0;
    },
    apply() {
      localStorage.setItem("bill", JSON.stringify(this.bill));
      this.setDebts(this.bill);

      this.$router.push("/result");
    },
    toggle(event, position) {
      if (this.areAllCustomers(position)) {
        position.customers = [];
      } else {
        position.customers = this.getPeople;
      }
    },
    triggerErrorButton() {
      this.btnAnimated = true;
      if (this.errorContent) this.selectedButtonText = "Заполните поля!";
      else if (this.errorLength) this.selectedButtonText = "Добавьте позицию!";
      setTimeout(() => {
        this.btnAnimated = false;
        this.selectedButtonText = "Рассчитать!";
      }, 2000);
    },
  },
  computed: {
    ...mapGetters({
      getPeople: "people/getPeople",
    }),
  },
  watch: {
    bill: {
      handler(newValue) {
        let initPrice = 0;
        for (let i = 0; i < this.bill.length; i++) {
          if (typeof this.bill[i].price === "number") {
            initPrice += this.bill[i].price;
          }
        }
        this.totalPrice = initPrice;
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss">
@import "@/scss/style.scss";

.calculator {
  @include field;
  &-header {
    @include header;
    &-btn {
      @include btn(none, none);
    }
  }

  &-main {
    @include main(30vh, 57vh, 15px, 0);
    @include scrollbar;
    &-panel {
      background-color: $component-color;
      &-title {
        &-row {
          padding: 0 25px 0 0;
        }
      }
      &-text {
        &-row {
          padding: 10px 47px 0 0;
        }
        &-btn {
          @include btn(none, none);
        }
      }
    }
  }
  &-results {
    @include midresults;
  }

  &-apply {
    @include apply;
    &-btn {
      @include btn(none, none);
    }
  }

  @include btnAnimation;
}
</style>