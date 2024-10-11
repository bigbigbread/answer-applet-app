import ajax from 'uni-ajax'

const api = ajax.create({
  baseURL: 'http://localhost:4000',
  // baseURL: 'http://7572ce5e.r2.cpolar.cn',
  timeout: 5000,
  withCredentials: true,
})

// 添加请求拦截器
api.interceptors.request.use(
  config => {
    // 在发送请求前做些什么
    // 如果有token就携带token
    if (uni.getStorageSync('token')) {
      config.header.Authorization = uni.getStorageSync('token')
    } else {
      console.log('获取token出错')
    }
    return config
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
api.interceptors.response.use(
  response => {
    // 对响应数据做些什么
    return response
  },
  error => {
    // 对响应错误做些什么
    return Promise.reject(error)
  }
)

// 导出 create 创建后的实例
export default api