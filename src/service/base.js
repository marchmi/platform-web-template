/**
 * Created By: Marchmi
 * CreateTime: 2023-3-16 21:25
 * LastEditTime: 2023-3-16 21:25 
 */

 import axios from 'axios'
 import { clearEmpty, getToken } from '@/utils'
 import { errorMsg, createLoading } from '@/utils/interaction'
 
 const axiosInstance = axios.create({
   timeout: 50000
 })
 
 let loadingInstance = null // loading 实例
 let loadingCount = 0 // 开起loading视图的请求的计数器
 
 /**
  * 开启Loading
  */
 function startLoading () {
   if (loadingCount === 0) {
     loadingInstance = createLoading()
   }
   loadingCount++
 }
 
 /**
  * 关闭Loading
  */
 function endLoading () {
   setTimeout(() => {
     if (loadingCount <= 0) return
     loadingCount--
     if (loadingCount === 0) {
       loadingInstance.close ? loadingInstance.close() : ''
     }
   }, 200)
 }
 
 // request拦截器
 axiosInstance.interceptors.request.use((config) => {
   // 默认开启loading
   if (config.showLoading) {
     startLoading()
   }
   // 接口返回文件流时，将请求的responseType设置为'arraybuffer'
   if (config.arraybuffer) {
     config.responseType = 'arraybuffer'
   }
   // 过滤空参数
   if (config.method === 'get' || config.method === 'delete') {
     config.params = clearEmpty(config.params)
   } else {
     config.data = clearEmpty(config.data)
   }
 
   config.headers = {
     Authorization: getToken(),
     ...config.headers
   }
 
   return config
 }, (error) => {
   endLoading()
   errorMsg(error.message)
   return Promise.reject(error)
 })
 
 // 配置response拦截器
 axiosInstance.interceptors.response.use((response) => {
   const { showLoading } = response.config
   showLoading && endLoading()
   const { data: {code , data, message} } = response
   // 请求异常时的处理逻辑，responseType为arraybuffer时响应数据为二进制数据
   if (code!==200 && response.config.responseType !== 'arraybuffer') {
     errorMsg(message)
     return Promise.reject(data)
   }
   // 响应为文件流时的处理函数
   if (response.config.responseType === 'arraybuffer') {
     // 这里可以添加判断响应文件流数据的请求是否正常的逻辑
     return data
   } else {
     return data
   }
 }, (error) => {
   endLoading()
   errorMsg(error.message)
   return Promise.reject(error)
 })
 
 export default axiosInstance
 