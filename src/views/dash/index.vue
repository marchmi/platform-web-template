<template>
  <app-main>
    <template #content>
      <mi-button @click="handleClick">跳转</mi-button>
      <p>23333</p>
      <p>23333</p>
      <p>23333</p>
      <p>23333</p>
      <p>23333</p>
      <p>23333</p>
      <p>23333</p>
      <p>23333</p>
      <p>23333</p>
      <p>23333</p>
      <p>23333</p>
      <p>23333</p>
      <p>23333</p>
      <p>23333</p>
      <p>23333</p>
      <p>23333</p>
      <p>23333</p>
      <p>23333</p>
      <p>23333</p>
      <p>23333</p>
      <p>23333</p>
      <p>23333</p>
      <p>23333</p>
      <p>23333</p>
      <p>23333</p>
      <p>23333</p>
      <p>23333</p>
      <p>23333</p>
      <p>23333</p>
      <p>23333</p>
      <p>23333</p>
      <p>23333</p>
      <p>23333</p>
      <p>23333</p>
      <p>23333</p>
      <p>23333</p>
      <p>23333</p>
      <p>23333</p>
      <p>23333</p>
      <p>23333</p>
      <p>23333</p>
      <p>23333</p>
      <p>23333</p>
      <p>23333</p>
      <p>23333</p>
      <p>23333</p>
      <p>23333</p>
      <p>23333</p>
      <p>23333</p>
      <p>23333</p>
      <p>23333</p>
      <p>23333</p>
      <p>23333</p>
      <p>23333</p>
      <p>23333</p>
      <p>23333</p>
      <p>23333</p>
      <p>23333</p>
      <p>23333</p>
      <p>23333</p>
      <p>23333</p>
      <p>23333</p>
      <p>23333</p>
      <p>23333</p>
      <p>23333</p>
      <p>23333</p>
      <p>23333</p>
      <p>23333</p>
      <p>23333</p>
      <p>23333</p>
      <p>23333</p>
      <p>23333</p>
      <p>23333</p>
      <p>23333</p>
      <p>23333</p>
      <p>23333</p>
      <p>23333</p>
      <p>23333</p>
    </template>
  </app-main>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSidebarStore } from '@/store/modules/sidebar'
import AppMain from '@/components/AppMain.vue'
const sidebar = useSidebarStore()
const router = useRouter()
const handleClick = () => {
  router.push({path: '/dashboard'})
}
</script>