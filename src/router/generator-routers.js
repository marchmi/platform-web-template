/**
 * 自动载入views目录下的文件，生成路由表
 */

 import { Layout, sortRoute, routeSortGather, combinedFileGather, RouteMenuTitles } from './constant'
 
 const undefined = void 0
  
 class GeneratorRouteClass {
   file = null
   path = undefined
   routeName = undefined
   fileName = undefined
   folderName = undefined
   folderNameGather = null
   route = {
     name: undefined,
     path: undefined,
     meta: {
       title: undefined,
       sort: 0,
       hidden: false
     },
     component: null
   }
 
   constructor(file, path){
     this.file = file
     this.path = path
     this.folderNameGather = path.split('/')
     this.fileName = this.folderNameGather.pop()
     this.folderName = this.folderNameGather[this.folderNameGather.length - 1]
     this.createRouteInstance()
   }
 
   // 获取当前路由挂载的目标
   getRouteAddToTarget (routes, folderNameGather) {
     let rtn = null
   
     folderNameGather.forEach(folderName => {
       if (!rtn) {
         rtn = routes[folderName].children
         return
       }
   
       const route = rtn.filter(item => { // 当路由嵌套的层级大于三层时才会执行，从多个子路由对象中找到当前folderName对应的子路由
         return item.name === folderName
       })[0]
   
       if (!route.children) { // 非空处理
         route.children = []
       }
   
       rtn = route.children
     })
   
     return rtn
   }
 
   // 获取路由名称
   getRouteName () {
     const { fileName, folderName } = this
     if (fileName === 'index' || fileName === 'Index') { // 文件名为index时，路由名称为文件所处的文件夹名称
       return folderName
     }
   
     if (combinedFileGather.includes(fileName)) { // 详情页，新增页面等，路由名称为文件所处的文件夹名称加首字母大写的文件名称
       return `${folderName}${fileName[0].toUpperCase() + fileName.substr(1)}`
     }
   
     return fileName // 路由名称同文件名称
   }
 
   // 创建文件对应的路由对象
   createRouteInstance () {
     const { folderNameGather, folderName, fileName } = this
     this.routeName = this.getRouteName()
     this.route.path = `/${folderNameGather.join('/').replace(folderName, this.routeName)}`
     this.route.name = this.routeName
     this.route.hidden = combinedFileGather.includes(fileName)
     this.route.component = this.file
     this.route.meta.title = RouteMenuTitles[this.routeName] || this.routeName
     this.route.meta.sort = routeSortGather.indexOf(this.routeName) === -1 ? 1000 : routeSortGather.indexOf(this.routeName)
     this.route.meta.configName = folderName
   }
 
   // 将当前文件对应的路由对象挂载到路由表中
   addInstanceToRoutersMap (routes) {
     const { folderNameGather } = this
   
     if (folderNameGather.length > 2) { // 文件夹名称集合的长度大于2，需要找到routes深层的目标对象挂载当前路由信息
       const paramGather = [...folderNameGather]
       paramGather.pop() // 要移除最后一级的文件夹
       const target = this.getRouteAddToTarget(routes, paramGather)
       target.push(this.route)
       target.sort(sortRoute)
       return
     }
   
     routes[folderNameGather[0]].children.push(this.route)
     routes[folderNameGather[0]].children.sort(sortRoute)
   }
 
 }
  
 /**
  * 路由表生成函数
  * @param {*} files 从views目录下读取的文件集合
  * @param {*} routes 路由表对象
  * @returns
  */
 function routeMapRegister (files, routes = {}) {
   Object.keys(files).forEach((key) => {
     const path = key.replace(/(.vue)/g, '').replace('../views/', '')
     const file = files[key]
     const routeName = path.split('/')[0]
     if (!routes[routeName]) { // 初始化第一层的route对象
       routes[routeName] = {
         path: `/${routeName}`,
         name: routeName,
         meta: { title: RouteMenuTitles[routeName] || routeName, sort: routeSortGather.indexOf(routeName) === -1 ? 1000 : routeSortGather.indexOf(routeName) },
         component: Layout,
         children: []
       }
     }
     const route = new GeneratorRouteClass(file, path)
     route.addInstanceToRoutersMap(routes)
   })
 
   return routes
 }
  
 export default () => {
   const modules = import.meta.glob('../views/**/*.vue')
   const routers = routeMapRegister(modules)
 
   return Object.keys(routers).map(key => {
     return routers[key]
   }).sort(sortRoute)
 }
  