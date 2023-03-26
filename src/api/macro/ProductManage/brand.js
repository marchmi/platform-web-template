import { macrozhengRequest } from '@/service/macrozheng.js'
const brandRequest = macrozhengRequest('', '/brand')

export const fetchList = (query) => {
  return brandRequest({
    url: '/list',
    type: 'get',
    query,
    $config: {
      showLoading: false
    }
  })
}