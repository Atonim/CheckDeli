import { createApp } from 'vue'
import './style.scss'
import { vuetify } from './plugins';
import App from './App.vue'
import router from '@/router/router'

createApp(App)
  .use(vuetify)
  .use(router)
  .mount('#app')
