import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import './assets/css/global.styl'
import globalFn from './globalFn'
Vue.use(globalFn)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
