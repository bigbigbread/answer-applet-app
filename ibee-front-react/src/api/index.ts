import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:4001',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

//请求拦截器
api.interceptors.request.use(
  (config) => {
    // 1. loading组件 的加载
    // 2. token 的携带
    if (localStorage.getItem('token')) {
      config.headers.Authorization = localStorage.getItem('token')
    } else {
      config.headers.Authorization = ''
    }
    // 3. params/data 序列化的操作
    return config
  },
  (error) => {
    // return Promise.reject(error)
    if (error && error.response) {
      const status = error.response.status
      switch (status) {
        case 400:
          error.message = '请求错误'
          break
        case 401:
          error.message = '未授权的访问'
          break
        case 403:
          error.message = '被禁止访问'
          break
        case 404:
          error.message = '请求的资源不存在'
          break
        case 500:
          error.message = '服务器错误'
          break
      }
    }
  }
)

//响应拦截器
api.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default api
