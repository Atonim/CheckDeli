import StartView from '@/views/StartView.vue';
import ErrorView from '@/views/ErrorView.vue';
import AddingView from '@/views/AddingView.vue';
import CalculatorView from '@/views/CalculatorView.vue';
import ResultView from '@/views/ResultView.vue';
import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';


const routes = [
  {
    path: '/',
    name: 'main',
    component: StartView
  },
  {
    path: '/adding',
    name: 'adding',
    component: AddingView,

  },
  {
    path: '/calculator',
    name: 'calculator',
    component: CalculatorView,
    beforeEnter(to, from, next) {
      store.getters['people/getPeople'] ? next() : next({ name: 'adding' })
    }
  },
  {
    path: '/result',
    name: 'result',
    component: ResultView,
    beforeEnter(to, from, next) {
      from.name === 'calculator' ? next() : next('adding')
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: ErrorView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

//router.beforeEach((to, from, next) => {
//  console.log()
//  if (!localStorage.getItem('bill') && store.getters['people/getPeople'] && to.name === "result") {
//    next({ name: 'calculator' })
//  }
//  else if (!localStorage.getItem('bill') && !store.getters['people/getPeople'] && (to.name === "result" || to.name === "calculator")) {
//    next({ name: 'adding' })
//  }
//  else
//    next();
//})

export default router;