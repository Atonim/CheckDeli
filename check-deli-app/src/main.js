import { createApp } from 'vue';
import '@/scss/style.scss';
import { vuetify } from './plugins';
import App from './App.vue';
import router from '@/router/router'
import store from '@/store';

createApp(App)
  .use(vuetify)
  .use(router)
  .use(store)
  .mount('#app')
