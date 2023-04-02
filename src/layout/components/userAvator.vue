<template>
  <div class="avator-group">
    <mi-dropdown>
      <mi-avatar :size="40" src="https://p3-passport.byteimg.com/img/user-avatar/c222e765413e471533c212a1a8fe49fd~180x180.awebp" />
      <template #dropdown>
        <mi-dropdown-menu>
          <mi-dropdown-item @click="handleLogout">退 出</mi-dropdown-item>
        </mi-dropdown-menu>
      </template>
    </mi-dropdown>
  </div>
</template>
<script setup>
  import { useRouter } from 'vue-router'
  const router = useRouter()
  const handleLogout = () => {
    // 实际业务中需调整为调用退出登录接口后清空相关参数
    localStorage.setItem('ms_username', '')
    router.push({name: 'Login'})
  }
</script>
<style lang="less" scoped>
  .avator-group{
    cursor: pointer;
    width: 50px;
    position: absolute;
    right: 25px;
    top: 7px;
  }
</style>