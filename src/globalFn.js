import Vue from 'vue'
import http from './apis/http'
let global = {
  isNum (data) {
    let re = /^(-)?([1-9][0-9]*)+(.[0-9]{1,5})?$/
    let result = !re.test(data)
    return result
  }
}
Vue.prototype.$global = window.global = global
Vue.prototype.$http = window.http = http
export default global
