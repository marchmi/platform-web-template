<template>
  <div class="layout">
    <div class="layout-mask" @click="sidebar.handleToggleMaskVisible" :class="sidebar.maskVisible?'active':''"></div>
    <!-- 宽屏模式下显示 非宽屏模式下，mask开启的状态下显示菜单 -->
    <div class="layout-left" v-show="isWideScreen||sidebar.maskVisible">
      <side-bar></side-bar>
    </div>
    <div class="layout-right">
      <div class="toolBar">
        <div class="collapse-switch" @click="changeCollapsed">
          <mi-icon size="24" v-if="sidebar.collapse||!isWideScreen"><Expand /></mi-icon>
          <mi-icon size="24" v-else><Fold /></mi-icon>
        </div>
        <user-avator></user-avator>
        <theme></theme>
      </div>
      <div class="page-container-wrap">
        <router-view v-slot="{ Component }">
          <transition :name="'slide'">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>
<script setup>

import sideBar from './components/sideBar/Menu'
import userAvator from './components/userAvator'
import theme from './components/theme'
import { Expand, Fold } from '@element-plus/icons-vue'
import { useSidebarStore } from '@/store/modules/sidebar'
import { ref, onMounted } from 'vue'
import { debounce } from '@/utils'
import useComponentStateStore from '@/store/modules/componentState'
const componentState = useComponentStateStore()
const isWideScreen = ref(true) // 是否是宽屏
// 宽屏模式（窗口的宽度>=800）下菜单折叠展开处理逻辑
const sidebar = useSidebarStore()
const changeCollapsed = () => {
  // 如果是宽屏状态下，按钮点击时控制菜单是否折叠
  if(isWideScreen.value){
    sidebar.handleCollapse()
    return
  }
  sidebar.handleToggleMaskVisible()
}

const watchScreenWidth = debounce(() => {
  const el = document.documentElement
  const width = el.offsetWidth
  if(width<=800){ // 非宽屏模式下
    componentState.dialogFullscreen = true
    componentState.isMobile = true
    isWideScreen.value = false
    sidebar.collapse = false // 菜单保持非折叠状态
    return
  }
  componentState.dialogFullscreen = false
  componentState.isMobile = false
  sidebar.maskVisible = false
  isWideScreen.value = true
  sidebar.collapse = false // 菜单保持非折叠状态
}, 100)

onMounted(()=>{
  watchScreenWidth()
  window.addEventListener('resize', watchScreenWidth)
})

</script>

<style lang='less' scoped>
  .layout{
    height: 100vh;
    background: #f7f7f7;
    display: flex;
    position: relative;
    .layout-mask{
      position: fixed;
      left: 0;
      top: 0;
      background-color: #00000080;
      height: 100%;
      width: 100%;
      z-index: 999;
      display: none;
      &.active{
        display: block;
      }
    }
    .layout-left{
      // width: 240px;
      height: 100vh;
      padding: 0;
      background: var(--el-menu-bg-color);
      .sidebar-container{
        height: 100%;
        overflow: hidden;
      }
      :deep(.el-menu){
        border-right: none;
      }
    }
    @media screen and (max-width:800px){
      .layout-left{
        position: absolute;
        left: 0;
        z-index: 9999;
        transition: all .3s;
      }
    }
    .layout-right{
      flex: 1;
      overflow: hidden;
      .toolBar{
        position: relative;
        height: 55px;
        background: var(--el-menu-bg-color);
        .collapse-switch{
          position: absolute;
          left: 10px;
          top:15px;
          cursor: pointer;
        }
        .collapse-switch:hover{
          color: var(--el-color-primary);
        }
      }
      .page-container-wrap{
        height: 100%;
        position: relative;
      }
    }
  }
/*滚动条样式*/
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  background: rgba(0,0,0,0.2);
}
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  border-radius: 0;
  background: rgba(0,0,0,0.1);
}
</style>