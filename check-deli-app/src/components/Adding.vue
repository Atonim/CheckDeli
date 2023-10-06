<script>
export default {
  data() {
    return {
      people: []
    }
  },
  methods: {
    addPerson() {
      this.people.push({ name: '' });
    },
    removePerson() {
      this.people.pop();
    },
    inputName(event) {
      this.person.name = event.target.value;
    }
  }
}
</script>

<template>
  <div class="container">
    <div class="adding-person-field">
      <div class="adding-person-header">
        <v-btn class="adding-v-btn" variant="outlined" @click="addPerson">Добавить человека</v-btn>
      </div>
      <div class="adding-person-main">
        <div v-for="person in people" class="person-container">
          <v-avatar color="surface-variant" size="50"></v-avatar>
          <!--убрал v-bind-->
          <v-text-field clearable hide-details="auto" class="v-text" v-model="person.name" label="Имя"></v-text-field>
        </div>
      </div>
      <div class="adding-person-apply">
        <v-btn class="approve-v-btn" variant="outlined" @click="$router.push('/calculator')">Вперед</v-btn>
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
}

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