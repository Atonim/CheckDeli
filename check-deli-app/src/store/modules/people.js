export const people = {
  state: () => ({
    people: []
  }),
  getters: {
    allPeople(state) {
      return state.people;
    }
  },
  mutations: {
    setPeople(state, people) {
      state.people = people;
    }
  },
  actions: {

  },
  namespaced: true
}