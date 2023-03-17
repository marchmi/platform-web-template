import { createApp } from 'vue'
import App from './App.vue'
import installElementPlus from './plugins/element'

async function bootstrap() {

  const app = createApp(App)

  // 初始化element  
  installElementPlus(app)

  app.mount('#app')
}
void bootstrap()