<script setup>
import zhCn from "element-plus/lib/locale/lang/zh-cn"
</script>

<template>
  <mi-config-provider :locale="zhCn">
    <router-view />
  </mi-config-provider>
</template>

<style lang="less">
 @import "./assets/css/reset.css";
 @import "./assets/css/index.less";
 @import "./assets/css/animate.less";
</style>
