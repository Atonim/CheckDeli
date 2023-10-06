<script>
export default {
  data() {
    return {
      people: []
    }
  },
  methods: {
    addPerson() {
      this.people.push('Person');
    },
    removePerson() {
      this.people.pop();
    }
  }
}
</script>

<template>
  <div class="container">
    <div class="main">
      <div class="list-container">
        <div class="v-btn-container">
          <v-btn class="adding-v-btn" variant="outlined" @click="addPerson">Добавить человека</v-btn>
        </div>
        <div class="list">
          <div v-for="person in people" class="person-container">
            <v-avatar color="surface-variant" size="50"></v-avatar>
            <v-text-field clearable class="v-text"></v-text-field>

          </div>
        </div>
      </div>
      <v-btn class="approve-v-btn" variant="outlined">Вперед</v-btn>
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

.main {
  background-color: #FFBD00;
  text-align: center;
  padding: 25px;
  border-radius: 15px;
}

.list {
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

.v-btn-container {
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