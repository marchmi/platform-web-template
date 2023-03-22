<template>
  <div class="layout">
    <div class="layout-left">
      <side-bar></side-bar>
    </div>
    <div class="layout-right">
      <div class="toolBar"></div>
      <div class="page-container">
        <router-view>
        </router-view>
      </div>
    </div>
  </div>
</template>
<script setup>
import sideBar from './components/sideBar/Menu.vue'
</script>

<style lang='less' scoped>
  .layout{
    height: 100vh;
    display: flex;
    .layout-left{
      .sidebar-container{
        height: 100%;
        overflow: hidden;
      }
    }
    .layout-right{
      flex: 1;
      .toolBar{
        height: 55px;
        background: var(--td-gray-color-13);
        border-bottom: 1px solid #4e4d4d;
      }
      .page-container{
        height: 100%;
        background: #fff;
        overflow-y: scroll;
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