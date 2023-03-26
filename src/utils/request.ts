import axios from 'axios'
import { getToken } from '@/utils/auth'
import { useStore } from '@/store/index'
import { $_message } from './message'

let baseURL = 'http://sanic-kuwo.o8o8o8.com/api/v1/'

//创建axios实例
const axiosInstance = axios.create({
  baseURL: baseURL, // url = base url + request url
  timeout: 5000 // request timeout
})

//请求拦截器
axiosInstance.interceptors.request.use(
  (config: any) => {
    const store = useStore()
    if (store.token) {
      config.headers['token'] = getToken()
    }
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
      $_message({
        message: res.msg || 'Error',
        type: 'error'
      })
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    $_message({
      message: error.message,
      type: 'error'
    })
    return Promise.reject(error)
  }
)

export default axiosInstance
