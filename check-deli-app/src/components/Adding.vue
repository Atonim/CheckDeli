<template>
  <v-form @submit.prevent class="adding">
    <div class="adding-header">
      <v-btn class="adding-header-btn" @click="addPerson">
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
            v-model="person.name"
            label="Имя"
            :append-icon="'mdi-delete'"
            @click:append="removePerson(person)"
          ></v-text-field>
        </div>
      </v-slide-x-reverse-transition>
      <!--:rules="rules"-->
    </div>
    <div v-else class="adding-main">Список пуст</div>

    <div class="adding-apply">
      <v-btn type="submit" class="adding-apply-btn" @click="apply">
        {{ this.buttontext[2] }}</v-btn
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
      checkResult: null,
      buttontext: [
        "К чекам!",
        "Заполните все поля!",
        "Добавьте еще кого-нибудь!",
      ],
    };
  },
  methods: {
    ...mapMutations({
      setPeople: "people/setPeople",
    }),
    apply() {
      if (this.checkNames()) {
        this.setPeople(this.people);
        this.$router.push("/calculator");
      }
    },
    checkNames() {
      if (this.people.length < 2) return false;
      this.people.forEach((person) => {
        if (!person.name) {
          return false;
        }
      });
      return true;
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
    //inputName(event) {
    //  this.person.name = event.target.value;
    //}
  },
  computed: {
    selectedButtonText: {
      get() {
        return;
      },
      set() {},
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
      @include btn(40vh, 25px);
    }
  }

  &-main {
    @include main(none, 50vh, 10px);
    @include scrollbar;
    &-person {
      padding: 10px;
    }
  }

  &-apply {
    @include apply;
    &-btn {
      @include btn(40vh, 10px);
    }
  }
}
</style>