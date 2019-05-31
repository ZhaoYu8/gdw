import axios from 'axios'
let baseUrl = 'http://yww.kuguanwang.com/'

export default (type, url, metadata) => {
  let data = Object.assign(metadata || {})
  let Authorization = localStorage.getItem('Authorization')
  let config = {
    method: type,
    url: baseUrl + url,
    data: '',
    params: '',
    withCredentials: true,
    headers: {
      'Authorization': 'Bearer ' + Authorization
    }
  }
  if (type === 'post') {
    config.data = data
  } else if (type === 'get') {
    config.params = data
  } else if (type === 'getUrl') {
    return baseUrl
  }
  return new Promise(function (resolve) {
    axios(config)
    .then((response) => {
      resolve({ status: response.status, data: response.data })
    })
    .catch(function (error) {
      if (error.response.status === 401) {
        console.log(error)
      }
      resolve({ status: error.response.status, message: error.response.data.error.message })
    })
    // 拦截
    axios.interceptors.request.use(config => {
      return config
    },err => {
      return Promise.reject(err)
    })
    // 拦截 响应
    axios.interceptors.response.use(response => {
      return response
    },error => {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            break
          case 500:
            break
        }
      }
      return Promise.reject(error.response.data)   // 返回接口返回的错误信息
    })
  })
}
