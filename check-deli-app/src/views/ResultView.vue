<template>
  <div class="result">
    <div class="result-header">
      <h1>Результаты</h1>
    </div>

    <div class="result-main">
      <v-slide-x-reverse-transition group>
        <v-card
          v-for="person in this.getPeople"
          :key="person.id"
          class="result-main-card"
        >
          <v-card-title> Пользователь {{ person.name }} должен</v-card-title>
          <v-card-text v-if="person.debts.length">
            <p v-for="debt in person.debts" :key="debt.debtId">
              {{ debt.name }} - {{ debt.price }} ₽
            </p>
          </v-card-text>
          <v-card-text v-else> Ничего не должен! </v-card-text>
        </v-card>
      </v-slide-x-reverse-transition>
    </div>

    <div class="result-apply">
      <v-btn block class="result-apply-btn" @click="apply">Новый чек</v-btn>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      getPeople: "people/getPeople",
    }),
  },
  methods: {
    apply() {
      localStorage.clear();
      this.$router.push("/adding");
    },
  },
};
</script>

<style lang="scss">
@import "@/scss/style.scss";

.result {
  @include field;

  &-header {
    @include header;
    padding: 15px;
  }

  &-main {
    @include main(30vh, 70vh, 15px);
    @include scrollbar;
    &-card {
      @include card;
    }
  }

  &-apply {
    @include apply;
    &-btn {
      @include btn(none, none);
    }
  }
}
</style>