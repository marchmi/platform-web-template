<template>
  <div class="app-main">
    <div class="container-shadow wrapper-shadow" v-if="showShadow"></div>
    <mi-scrollbar>
      <div :class="{'app-main-container': showShadow}">
        <slot name="content"></slot>
      </div>
    </mi-scrollbar>
  </div>
</template>
<script>
export default {
  props: {
    showShadow: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="less">
.app-main {
  position: relative;
  height: calc(100% - 80px);
  &.detail {
    height: auto;
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