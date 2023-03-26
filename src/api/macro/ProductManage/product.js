import { macrozhengRequest } from '@/service/macrozheng.js'
const productRequest = macrozhengRequest('', '/product')

export const fetchList = (query) => {
  return productRequest({
    url: '/list',
    type: 'get',
    query
  })
}

export const deleteOne = (query) => {
  return productRequest({
    url: '/update/deleteStatus',
    type: 'post',
    query,
  })
}