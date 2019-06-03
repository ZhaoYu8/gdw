
let baseUrl = 'http://gendanwang.com/api/'
export default (type = 'GET', url, data = {}) => {
  url = baseUrl + url
  if (type === 'GET' && JSON.stringify(data) !== '{}') {
    let query = '?'
    Object.keys(data).forEach((key) => {
      query+=`${key}=${data[key]}&`
    })
    query = query.slice(0, query.length-1)
    url += query
  }
  const promise = new Promise((resolve) => {
    const handler = function() {
      if (this.readyState !== 4) {
        return
      }
      if (this.status === 200) {
        resolve(this.response)
      } else {
        console.log(new Error(this.statusText))
      }
    }
    const client = new XMLHttpRequest()
    client.open(type, url,true)
    client.onreadystatechange = handler
    client.responseType = "json"
    client.setRequestHeader("Accept", "application/json")
    client.send()
  })
  return promise
}