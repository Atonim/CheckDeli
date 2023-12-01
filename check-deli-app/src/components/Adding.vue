<template>
  <v-form @submit="handleSubmit($event)" class="adding">
    <div class="adding-header">
      <v-btn class="adding-header-btn" block @click="addPerson">
        Добавить человека
      </v-btn>
    </div>

    <div v-if="people.length" class="adding-main">
      <v-slide-x-reverse-transition group>
        <div
          v-for="person in people"
          :key="person.id"
          class="adding-main-person"
        >
          <v-text-field
            clearable
            hide-details="auto"
            v-model.trim="person.name"
            label="Имя"
            :append-icon="'mdi-delete'"
            @click:append="removePerson(person)"
          ></v-text-field>
        </div>
      </v-slide-x-reverse-transition>
    </div>
    <div v-else class="adding-main">Список пуст</div>

    <div class="adding-apply">
      <v-btn
        block
        type="submit"
        @keydown.enter="handleSubmit"
        class="adding-apply-btn"
        :class="{ animated: this.btnAnimated }"
      >
        {{ this.selectedButtonText }}</v-btn
      >
    </div>
  </v-form>
</template>



<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      people: [],
      errorLength: false,
      errorContent: false,
      btnAnimated: false,
      selectedButtonText: "К чекам!",
    };
  },
  mounted() {
    if (localStorage.getItem("people")) {
      try {
        this.people = JSON.parse(localStorage.getItem("people"));
      } catch (e) {
        localStorage.removeItem("people");
      }
    }
  },
  methods: {
    ...mapMutations({
      setPeople: "people/setPeople",
    }),
    handleSubmit(e) {
      e.preventDefault();
      this.validation();
      if (!this.errorLength && !this.errorContent) this.apply();
      else this.triggerErrorButton();
    },
    validation() {
      this.people.length < 2
        ? (this.errorLength = true)
        : (this.errorLength = false);
      this.errorContent = false;
      this.people.forEach((person) => {
        if (person.name === "") {
          this.errorContent = true;
          return;
        }
      });
    },
    apply() {
      this.setPeople(this.people);
      this.$router.push("/calculator");
    },
    addPerson() {
      const newPerson = {
        id: Date.now(),
        name: "",
        debts: [],
      };
      this.people.push(newPerson);
    },
    removePerson(person) {
      this.people = this.people.filter((p) => p.id !== person.id);
    },
    triggerErrorButton() {
      this.btnAnimated = true;
      if (this.errorContent) this.selectedButtonText = "Заполните поля!";
      else if (this.errorLength)
        this.selectedButtonText = "Нужно больше людей!";
      setTimeout(() => {
        this.btnAnimated = false;
        this.selectedButtonText = "К чекам!";
      }, 2000);
    },
  },
};
</script>





<style lang="scss">
@import "@/scss/style.scss";

.adding {
  @include field;
  &-header {
    @include header;
    &-btn {
      @include btn(none, none);
    }
  }

  &-main {
    @include main(none, 70vh, 10px);
    @include scrollbar;
    &-person {
      padding: 10px;
    }
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