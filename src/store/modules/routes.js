import { defineStore } from 'pinia'
import { loadRoutes } from '@/router'

function getMenuTree(arr){
  const rtn = []
  arr.forEach( (item) => {
    if(item.hidden){
      return
    }
    const temp = { 
      icon: item.meta.icon || undefined,
      title: item.meta.title,
      index: item.path
    }
    if(item.children){
      temp.subs = getMenuTree(item.children)
    }
    rtn.push(temp)
  })
  return rtn
}

export const routesStore = defineStore('routes', {
  state: () => {
    return {
      routes: loadRoutes // 通过鉴权后用户可以访问的路由，菜单的选项会通过该属性生成
    }
  },
  getters: {
  },
  actions: {
    handleUpdateRoutes(routes) {
      this.routes = routes
    },
    getMenus() {
      return getMenuTree(this.routes)
    }
  }
})