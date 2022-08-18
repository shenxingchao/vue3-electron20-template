import axiosInstance from '@/utils/request'

//xxx = await get<Type>();
//Promise<{ list: T[] }>
export function getUser<T>(params = {}): Promise<T[]> {
  return axiosInstance.request({
    url: 'User/getUser',
    method: 'get',
    params: params
  })
}

export function addUser(data = {}): Promise<any> {
  return axiosInstance.request({
    url: 'User/addUser',
    method: 'post',
    data: data
  })
}
