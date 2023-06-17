import { macrozhengRequest } from '@/service/macrozheng'
const adminRequest = macrozhengRequest('', '/admin')

export const login = (body) => adminRequest({
  url: '/login',
  type: 'post',
  body
})

export const getInfo = () => adminRequest({
  url: '/info',
  type: 'get'
})

export const logout = () => adminRequest({
  url: '/logout',
  type: 'post'
})
