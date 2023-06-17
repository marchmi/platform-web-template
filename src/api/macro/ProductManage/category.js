import { macrozhengRequest } from '@/service/macrozheng'
const categoryRequest = macrozhengRequest('', '/productCategory')

export const fetchOptionsData = () => {
  return categoryRequest({
    url: '/list/withChildren',
    type: 'get',
    $config: {
      showLoading: false
    }
  })
}