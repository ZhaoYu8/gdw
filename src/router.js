import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/detail',
      name: 'detail',
      component: () => import('./views/Detail.vue')
    },
    {
      path: '/add',
      name: 'add',
      component: () => import('./views/Add.vue')
    }
  ]
})
