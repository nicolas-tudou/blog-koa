import axios from 'axios'
import Vue from 'vue'

const http = axios.create({
  baseURL: 'localhost:3000',
  timeout: 1000
})

http.interceptors.response.use(response => {
  console.log('response', response)
  if (response.data.success) {
    return response.data.data
  } else {
    return Promise.reject(response.data)
  }
}, error => {
  console.log(error)
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
