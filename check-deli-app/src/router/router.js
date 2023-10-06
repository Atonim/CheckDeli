import StartView from '@/views/StartView.vue';
import ErrorView from '@/views/ErrorView.vue';
import AddingView from '@/views/AddingView.vue';
import CalculatorView from '@/views/CalculatorView.vue';
import { createRouter, createWebHistory } from 'vue-router';


const routes = [
  {
    path: '/',
    component: StartView
  },
  {
    path: '/adding',
    component: AddingView
  },
  {
    path: '/calculator',
    component: CalculatorView
  },
  {
    path: '/:pathMatch(.*)*',
    component: ErrorView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;