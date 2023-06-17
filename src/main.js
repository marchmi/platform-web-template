import { createApp } from 'vue'
import App from './App'
import installUI from './plugins/element'
import setupDirective from '@/directives'
// import installUI from './plugins/tdesign'
import { setupStore } from '@/store'
import router, { setupRouter } from './router'
async function bootstrap() {

  const app = createApp(App)

  // 初始化UI  
  installUI(app)

  // 注册pinia
  setupStore(app)

  // 注册全局指令
  setupDirective(app)

  // 挂载路由
  await setupRouter(app)

  // 路由准备就绪后挂载APP实例
  await router.isReady()

  app.mount('#app')
}
void bootstrap()