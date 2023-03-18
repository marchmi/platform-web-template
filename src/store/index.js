/**
 * author：marchmi
 * createTime：2023-3-18 15:55 
 * updateTime：2023-3-18 15:55 
 */
import { createPinia } from 'pinia'

const store = createPinia()

export function setupStore(app) {
  app.use(store)
}

export { store }