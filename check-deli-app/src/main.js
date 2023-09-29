import { createApp } from 'vue'
import './style.css'
import { vuetify } from './plugins';
import App from './App.vue'

createApp(App)
  .use(vuetify)
  .mount('#app')
