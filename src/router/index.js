
import { createRouter, createWebHistory } from 'vue-router'
import generatorRouters from './generator-routers'
export const loadRoutes = generatorRouters()


const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  ...loadRoutes,
  {
    path: '/404',
    name: '404',
    meta: {
      title: '找不到页面'
    },
    component: () => import('../layout/404.vue')
  },
  {
    path: '/403',
    name: '403',
    meta: {
      title: '没有权限'
    },
    component: () => import('../layout/403.vue')
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录'
    },
    component: () => import('../layout/Login.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | vue-easy-admin`
  const role = localStorage.getItem('ms_username')
  if (!to.matched.length) {
    next('/404')
  }
  if (!role && to.path !== '/login') {
    next('/login')
  } else if (to.meta.permission) {
    // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
    role === 'admin'
      ? next()
      : next('/403')
  } else {
    next()
  }
})

export function setupRouter (app) {
  app.use(router)
}

export default router
