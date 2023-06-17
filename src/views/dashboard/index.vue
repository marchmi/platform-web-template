<template>
  <app-main>
    <template #content>
      <div class="dashboard">
      </div>
    </template>
  </app-main>
</template>
<script setup>
import AppMain from '@/components/AppMain'
</script>
<style lang="less" scoped>
.dashboard{
  width: 100%;
  height: 80vh;
  background-image: url(@/assets/img/dashboard-bg.jpg);
  background-size: 100%;
}
</style>