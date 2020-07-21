import axios from 'axios'
import Vue from 'vue'

const http = axios.create({
  baseURL: '/api',
  timeout: 1000
})

http.interceptors.request.use(config => {
  config.headers.Authorization = 'Bearer ' + localStorage.getItem('token') || ''
  return config
})

http.interceptors.response.use(response => {
  if (response.data.success) {
    return response.data.data
  } else {
    return Promise.reject(response.data)
  }
}, error => {
  if (error.response && error.response.status === 401) {
    window.location.href = '/signIn'
    return
  }
  Vue.prototype.$message.error(error.message || '系统错误，请重试')
  return Promise.reject(error)
})

function Post (url, data, ...options) {
  return http({
    url,
    method: 'POST',
    data,
    ...options
  })
}

export default Post
