import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import './assets/css/global.styl'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
