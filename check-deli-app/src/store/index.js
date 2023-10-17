import { createStore } from 'vuex';
import { people } from './modules/people.js';

export default createStore({
  modules: {
    people: people
  }
});