/**
 * Created By: Marchmi
 * CreateTime: unknow
 * LastEditTime: 2023-3-11 19:57 
 */

 import { formatDate } from './timeUtils'
 import { commafy } from './numberUtils'
 
 const token = 'token'
 
 export function getToken(){
   return localStorage.getItem(token)
 }
 export function setToken(val=''){
   localStorage.setItem(token,val)
 }
 export function clearToken(){
   localStorage.setItem(token,'')
 }
 
 /**
  * 格式化函数
  */
 const formatUtils = {
   formatDate,
   commafy
 }
 
 /**
  * 
  * @param {*} value 要转换的值
  * @param {*} format 转换值时调用的方法名
  * @param  {...any} args rest参数
  * @returns 
  */
 export const formatValue = (value, format, ...args) => {
   if(value === null || value === undefined){
     return '-'
   }
   if(!format){
     return value
   }
   if(!formatUtils[format]){
     return `${format}方法未定义`
   }
   return formatUtils[format](value,...args)
 }
 
 export const clearEmpty = (obj) => {
   var newObj = {}
   if (typeof obj === 'string') {
     obj = JSON.parse(obj)
   }
   if (obj instanceof Array) {
     newObj = []
   }
   if (obj instanceof Object) {
     for (var attr in obj) {
       // 属性值不为'',null,undefined才加入新对象里面(去掉'',null,undefined)
       if (obj.hasOwnProperty(attr) && obj[attr] !== '' && obj[attr] !== null && obj[attr] !== undefined) {
         if (obj[attr] instanceof Object) {
           // 空数组或空对象不加入新对象(去掉[],{})
           if(JSON.stringify(obj[attr]) === '{}' || JSON.stringify(obj[attr]) === '[]') {
               continue
           }
           // 属性值为对象,则递归执行去除方法
           newObj[attr] = clearEmpty(obj[attr])
         } else if (
           typeof obj[attr] === 'string' &&
           ((obj[attr].indexOf('{') > -1 && obj[attr].indexOf('}') > -1) ||
             (obj[attr].indexOf('[') > -1 && obj[attr].indexOf(']') > -1))
         ) {
           // 属性值为JSON时
           try {
             var attrObj = JSON.parse(obj[attr])
             if (attrObj instanceof Object) {
               newObj[attr] = clearEmpty(attrObj)
             }
           } catch (e) {
             newObj[attr] = obj[attr]
           }
         } else {
           newObj[attr] = obj[attr]
         }
       }
     }
   }
   return newObj
 }
 
 export const enumToArray = (obj) => {
   return Object.keys(obj).map(key=>{
     const kToNumber = key - 0
     return { name: obj[key], code: isNaN(kToNumber) ? key : kToNumber}
   })
 }

 /**
 * @desc  函数防抖，用于将多次执行变为最后一次执行
 * @param {function} func - 需要使用函数防抖的被执行的函数。必传
 * @param {Number} delay - 多少毫秒之内触发，只执行第一次，默认1000ms。可以不传
 */
export const debounce = (fn, delay) => {
  delay = delay || 1000; //默认1s后执行
  let timer = null
  return function () {
    let context = this
    let arg = arguments
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(context, arg)
    }, delay)
  };
}

export const Storage = window.localStorage
