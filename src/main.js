import { createApp } from 'vue'
import App from './App.vue'
import installElementPlus from './plugins/element'
import { setupStore } from '@/store'
import router, { setupRouter } from './router'

async function bootstrap() {

  const app = createApp(App)

  // 初始化element  
  installElementPlus(app)

  // 注册pinia
  setupStore(app)

  // 挂载路由
  await setupRouter(app)

  // 路由准备就绪后挂载APP实例
  await router.isReady()

  app.mount('#app')
}
void bootstrap()