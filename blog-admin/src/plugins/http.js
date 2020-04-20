import axios from 'axios'
import Vue from 'vue'

const http = axios.create({
  baseURL: '/api/admin/',
  timeout: 1000
})

http.interceptors.request.use(config => {
  return config
})

http.interceptors.response.use(response => {
  if (response.data.success) {
    return response.data.data
  } else {
    if (response.data.errorCode === 1000) {
      Vue.prototype.$router.push({
        name: 'signIn'
      })
      window.location.reload()
    }
  }
}, error => {
  console.log(error)
  Vue.prototype.error(error.message || '系统错误，请重试')
})

function Post (url, data, ...options) {
  return http({
    url,
    data,
    ...options
  })
}

export default {
  Post
}
