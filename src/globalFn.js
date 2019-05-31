import Vue from 'vue'
import http from './apis/http'
let global = {
  async httpPublic (datas, location) { // 公共调用接口方法
    let _location = 'api/services/' + location
    let data = await window.http('post', _location, datas)
    if (data.data.success === true ) {
      return data.data
    } else {
      this.toast(data.data.error.message, 'error', 2000)
    }
  }
}
Vue.prototype.$global = window.global = global
Vue.prototype.$http = window.http = http
export default global
