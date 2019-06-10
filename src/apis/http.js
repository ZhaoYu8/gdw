
let baseUrl = 'http://gendanwang.com/api/'
export default (type = 'GET', url, data = {}) => {
  let sendData, formData = new FormData()
  url = baseUrl + url
  type = type.toUpperCase()
  if (type == 'GET') {
    let _data = []
    Object.keys(data).forEach(key => {
      _data.push(key + '=' + data[key])
    })
    url = url + '?' + _data.join('&')
  } else {
    Object.keys(data).forEach(r => {
      if (data[r] instanceof Object) {
        formData.append(r, JSON.stringify(data[r]))        
      } else {
        formData.append(r, data[r])
      }
    })
    sendData = formData
  }
  const promise =  new Promise((resolve, reject) => {
    let reqObj = new XMLHttpRequest()
    reqObj.open(type, url, true)
    reqObj.setRequestHeader("Accept", "application/json")
    reqObj.send(sendData)
    reqObj.onreadystatechange = () => {
      if (reqObj.readyState == 4) {
        if (reqObj.status == 200) {
          let res = reqObj.response
          if (typeof res !== 'object') {
            res = JSON.parse(res)
          }
          resolve(res)
        } else {
          reject(reqObj)
        }
      }
    }
  })
  return promise
}