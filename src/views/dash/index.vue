<template>
  <div class="dashboard">
    <mi-button @click="handleClick">跳转{{sidebar.collapse}}</mi-button>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSidebarStore } from '@/store/modules/sidebar'
const sidebar = useSidebarStore()
const router = useRouter()
const handleClick = () => {
  router.push({path: '/dashboard'})
}
</script>