/**
 * 引入公共使用的组件
 */

 export const Layout = () => import('@/layout/index.vue')

 /**
  * routeSortGather用于为路由表中的路由对象输出sort
  * 如查找到dashboard在数组中的下标是0，则dashboard的sort属性取值为0
  */
 export const routeSortGather = [
   'dashboard', // 'Dasshboard',
 
   'pms', //'商品信息管理',
   'brand', //'品牌管理',
   'brandDetail', //'品牌详情',
   'brandCreate', //'新增品牌',
 
   'oms', // '订单信息管理',
   'order', // '订单管理',
 
   'demo', // 'Demo',
   'componentDemo', // '自定义组件示例',
   'filterDemo', // '筛选条件示例',
   'requestDemo', // '查询示例',
   'tableDemo', // '表格示例'
   'ColumnSettings', // '列设置示例'
 
   'dynamicRoute', // '动态生成路由表示例',
   'first', // '示例页面一',
   'test', // 'TEST',
   'deep', // 'DEEP',
   'second', // '示例页面二',
   'third', // '示例页面三',
   'fourth', // '示例页面四',
 
 ]
 
 // 需要和文件夹名称拼接name属性的文件名
 export const combinedFileGather = ['detail', 'create']
  
 // 数组sort方法callback函数
 export function sortRoute (a, b) {
   return (a.meta?.sort || 0) - (b.meta?.sort || 0)
 }
  