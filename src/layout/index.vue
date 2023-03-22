<template>
  <div class="layout">
    <div class="layout-left">
      <side-bar :routes="routes"></side-bar>
    </div>
    <div class="layout-right">
      <router-view>
      </router-view>
    </div>
  </div>
</template>
<script setup>
import { reactive } from 'vue'
import sideBar from './components/sideBar/Menu.vue'
const routes = reactive([
  {
    uuid: 1,
    menuName: '1',
    children: []
  },
  {
    uuid: 2,
    menuName: '2',
    children: [
      {
        uuid: 3,
        menuName: '3',
        children: [
          {
            uuid: 5,
            menuName: '5',
            children: []
          }
        ]
      },
      {
        uuid: 4,
        menuName: '4',
        children: []
      }
    ]
  }
])
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
  }
</style>