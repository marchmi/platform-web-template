<template>
  <div class="login-page">
    <span @click="handleLogin">登录</span>
  </div>
</template>
<script setup>
  import { useRouter } from 'vue-router'
  const router = useRouter()
  const handleLogin = () => {
    localStorage.setItem('ms_username', true)
    router.push('/')
  }
</script>