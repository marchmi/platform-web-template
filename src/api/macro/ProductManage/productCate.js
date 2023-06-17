import { macrozhengRequest } from '@/service/macrozheng'
const productCateRequest = macrozhengRequest('', '/productCategory')

export const fetchList = (query) => {
  return productCateRequest({
    url: '/list/0',
    type: 'get',
    query
  })
}

export const deleteOne = (rowId) => {
  return productRequest({
    url: `/update/delete/${rowId}`,
    type: 'post'
  })
}