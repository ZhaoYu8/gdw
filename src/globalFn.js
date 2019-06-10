import Vue from 'vue'
import http from './apis/http'
let global = {
  isNum (obj) {
    return (obj - parseFloat( obj ) + 1) >= 0
  }
}
Vue.prototype.$global = window.global = global
Vue.prototype.$http = window.http = http
export default global
