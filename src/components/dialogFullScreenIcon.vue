<template>
  <mi-icon v-show="!componentState.isMobile" class="dialog-fullscreen" @click="componentState.toggleDialogFullscreen">
    <FullScreen v-if="!componentState.dialogFullscreen" />
    <Minus v-else />
  </mi-icon>
</template>
<script setup>
  import { FullScreen, Minus } from '@element-plus/icons-vue'
  import useComponentStateStore from '@/store/modules/componentState'
  const componentState = useComponentStateStore()
</script>

<style lang="less" scoped>
.dialog-fullscreen{
  position: absolute;
  top: 6px;
  right: 54px;
  padding: 0;
  width: 54px;
  height: 54px;
  background: 0 0;
  border: none;
  outline: 0;
  cursor: pointer;
  font-size: var(--el-message-close-size,16px);
  color: var(--el-color-info);
  &:hover{
    color: var(--color-primary)!important;
  }
}
</style>
