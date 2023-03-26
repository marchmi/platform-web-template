import qs from 'qs'
import { SERVICE } from '@/env'
import axiosInstance from './base'
import { clearEmpty } from '@/utils'

/**
 * 获取base url
 * @param serviceName
 * @param basePath
 * @param isProxy
 * @returns {string}
 */
export function getBaseURL (serviceName, basePath, isProxy = false) {
  // 不通过网关调用时走vite.config.js对应服务名代理
  return (!isProxy ? SERVICE.commonRequestHost : '') + (serviceName ? `/${serviceName}` : '') + basePath
}

/**
 * axios请求
 * @param type
 * @param url 请求地址
 * @param query query参数
 * @param body body参数
 * @param $config 扩展配置
 * @returns {*}
 */
export function commonRequest ({ type, url, query = {}, body = {}, $config = {} }) {
  type = type.toLowerCase()

  const config = Object.assign({
  	interceptError: true, // 是否需要统一拦截错误
  	showLoading: true, // 是否展示Loading
  	arraybuffer: false // 是否为文件下载
  }, $config)

  // 部分post请求也有query参数
  query = clearEmpty(query)
  let queryUrl = url
  if (Object.keys(query).length > 0) {
  	queryUrl += '?' + qs.stringify(query)
  }

  if (type === 'get' || type === 'delete') {
  	return axiosInstance[type](queryUrl, config)
  } else if (type === 'post' || type === 'put') {
  	return axiosInstance[type](queryUrl, body, config)
  }
}

/**
 * 获取请求
 * @param serviceName
 * @param basePath
 * @param isProxy
 * @returns {function({type: *, url: *, query: *, body: *, $config: *}): *}
 */
export function macrozhengRequest (serviceName, basePath, isProxy = false) {
  const baseUrl = getBaseURL(serviceName, basePath, isProxy)
  return ({ type, url, query, body, $config }) => {
    return commonRequest({ type, url: baseUrl + url, query, body, $config })
  }
}
