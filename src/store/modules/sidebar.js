import { defineStore } from 'pinia'

export const useSidebarStore = defineStore('sidebar', {
  state: () => {
    return {
      collapse: false, // 控制左侧菜单是否折叠
      maskVisible: false // 控制是否展示mask
    }
  },
  getters: {},
  actions: {
    handleCollapse() {
      this.collapse = !this.collapse
    },
    handleToggleMaskVisible() {
      this.maskVisible = !this.maskVisible
    }
  }
})