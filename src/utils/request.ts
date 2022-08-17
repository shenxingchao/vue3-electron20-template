import axios from 'axios'
import { ElMessage } from 'element-plus'

let baseURL = 'http://sanic-kuwo.o8o8o8.com/api/v1/'

//创建axios实例
const axiosInstance = axios.create({
  baseURL: baseURL, // url = base url + request url
  timeout: 5000 // request timeout
})

//请求拦截器
axiosInstance.interceptors.request.use(
  config => {
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

//响应拦截器
axiosInstance.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code && res.code != 200) {
      ElMessage({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000,
        offset: 68
      })
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    ElMessage({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default axiosInstance
