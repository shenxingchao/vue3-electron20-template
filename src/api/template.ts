import request from '@/utils/request'

export function get(params = {}) {
  return request({
    url: 'xxx/getXXX',
    method: 'get',
    params: params
  })
}

export function add(data = {}) {
  return request({
    url: 'xxx/getXXX',
    method: 'post',
    data: data
  })
}
