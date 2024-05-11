import { createApp } from 'vue';
import { vuetify } from './plugins';
import App from './App.vue';
import router from '@/router/router'
import store from '@/store';

const app = createApp(App)
  .use(vuetify)
  .use(store)
  .use(router)
  .mount('#app')
