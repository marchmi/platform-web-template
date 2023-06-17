/**
 * 引入公共使用的组件
 */

 export const Layout = () => import('@/layout')

 /**
  * routeSortGather用于为路由表中的路由对象输出sort
  * 如查找到dashboard在数组中的下标是0，则dashboard的sort属性取值为0
  */
 export const routeSortGather = [
  'dashboard', // 'Dasshboard',
  'viewgroup', // '容器组件',
  'MTable', // 'Table组件',
  'MForm', // 'Form组件',
  'MFormDialog', // 'Form弹窗组件',
  'MOperation' // '操作按钮组件'
 ]
 
 // 需要和文件夹名称拼接name属性的文件名
 export const combinedFileGather = ['detail', 'create']
  
 // 数组sort方法callback函数
 export function sortRoute (a, b) {
   return (a.meta?.sort || 0) - (b.meta?.sort || 0)
 }

// 菜单名称
export const RouteMenuTitles = {
  viewgroup: '容器组件',
  MTable: 'Table组件',
  MForm: 'Form组件',
  MFormDialog: 'Form弹窗组件',
  MOperation: '操作按钮组件'
}