import Vue from 'vue'
import http from './apis/http'
let global = {
  code: '',
  isNum (obj) {
    return (obj - parseFloat( obj ) + 1) >= 0
  },
  getCode () {
    return this.code || localStorage.getItem('code')
  },
  setCode (val) {
    this.code = val
    localStorage.setItem('code', val)
  }
}
Vue.prototype.$global = window.global = global
Vue.prototype.$http = window.http = http
export default global
