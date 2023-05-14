<template>
  <div class="app-main" :class="componentState.isMobile?'mobile':''">
    <div class="container-shadow wrapper-shadow" v-if="showShadow"></div>
    <mi-scrollbar>
      <div :class="{'app-main-container': showShadow}">
        <slot name="content"></slot>
      </div>
    </mi-scrollbar>
  </div>
</template>
<script>
import useComponentStateStore from '@/store/modules/componentState'
const componentState = useComponentStateStore()
export default {
  props: {
    showShadow: {
      type: Boolean,
      default: true
    }
  },
  data(){
    return {
      componentState
    }
  }
}
</script>

<style lang="less">
.app-main {
  position: relative;
  height: calc(100% - 120px);
  width: calc(100% - 30px);
  border-radius: 5px;
  background: #fff;
  margin: 15px;
  &.detail {
    height: auto;
  }
  &.mobile {
    margin: 0;
    width: calc(100%);
    height: calc(100% - 60px);
    .app-main-container {
      margin: 0;
      margin-left: 15px;
      margin-right: 10px;
      padding: 0;
    }
  }
  &.dialog {
    height: calc(100% - 0px);
  }
  .container-shadow {
    width: calc(100% - 80px);
    background: #fff;
    border-radius: 4px;
    &.detail {
      margin-left: 20px;
      padding: 20px;
    }
  }
  .wrapper-shadow {
    position: absolute;
    left: 20px;
    top: 0;
    height: 100%;
  }
  .app-main-container {
    margin: 0 20px;
    padding: 20px ;
  }
}
</style>