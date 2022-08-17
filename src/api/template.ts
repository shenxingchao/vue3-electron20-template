import axiosInstance from '@/utils/request'

//xxx = await get<Type>();
export function get<T>(params = {}): Promise<T[]> {
  return axiosInstance.request({
    url: 'xxx/getXXX',
    method: 'get',
    params: params
  })
}

export function add(data = {}): Promise<any> {
  return axiosInstance.request({
    url: 'xxx/getXXX',
    method: 'post',
    data: data
  })
}
