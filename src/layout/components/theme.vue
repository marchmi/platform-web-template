<template>
  <div class="theme-picker">
    <mi-badge class="theme-picker-switch" is-dot @click="componentState.handleToggleThemeVisible">
      <mi-icon size="24"><BrushFilled /></mi-icon>
    </mi-badge>
    <mi-drawer v-model="componentState.themeVisible" title="设置主题" size="350px">
      <div class="recommend-theme theme-tool">
        <div class="sub-title">推荐主题</div>
        <div class="theme-list">
          <div class="theme-item" @click="componentState.setTheme(theme, true)" v-for="(theme, index) in componentState.themesEnum" :key="index">
            <div class="theme-item-icon" :style="{background: theme.color}">
              <mi-icon v-show="componentState.currentTheme.name===theme.name"><Check /></mi-icon>
            </div>
            <div class="theme-item-text">{{theme.label}}</div>
          </div>
        </div>
      </div>
      <div class="recommend-theme theme-tool">
        <div class="sub-title">切换主色</div>
        <div class="theme-list">
          <div class="theme-item">
            <mi-color-picker v-model="pickedColor" @change="componentState.setTheme({color: pickedColor})" /><span class="picked-color-value">{{pickedColor}}</span>
          </div>
        </div>
      </div>
    </mi-drawer>
  </div>
</template>
<script setup>
  import useComponentStateStore from '@/store/modules/componentState'
  import { useRouter } from 'vue-router'
  import { BrushFilled, Check } from '@element-plus/icons-vue'
  import { ref, onMounted, watchEffect } from 'vue'
  const router = useRouter()
  const handleLogout = () => {
    // 实际业务中需调整为调用退出登录接口后清空相关参数
    localStorage.setItem('ms_username', '')
    router.push({name: 'Login'})
  }
  const componentState = useComponentStateStore()
  const pickedColor = ref('')
  watchEffect(()=>{
    pickedColor.value = componentState.currentTheme.color
  })
  onMounted(()=>{
    componentState.setTheme(componentState.currentTheme)
  })
</script>
<style lang="less" scoped>
  .theme-picker{
    cursor: pointer;
    width: 30px;
    position: absolute;
    right: 85px;
    top: 15px;
  }
  .theme-picker-switch:hover{
    color: var(--el-color-primary);
  }
  .theme-tool{
    background-color: #f7f7f7;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid var(--el-border-color);
    font-size: 14px;
    color: #000;
    margin-bottom: 20px;
  }
  .sub-title{
    margin-bottom: 10px;
  }
  .theme-list{
    display: flex;
    flex-wrap: wrap;
    .theme-item{
      display: flex;
      line-height: 20px;
      .theme-item-icon{
        height: 20px;
        width: 20px;
        border-radius: 3px;
        margin: 5px 10px 5px 0;
        text-align: center;
        color: #fff;
        line-height: 20px;
        padding: 2px;
        box-sizing: border-box;
        background: #000;
      }
      .theme-item-text{
        height: 20px;
        margin: 5px 10px 5px 0;
      }
      .picked-color-value{
        margin: 5px;
      }
    }
  }
  :deep(.el-badge__content.is-dot){
    height: 10px;
    width: 10px;
  }
  :deep(.el-badge__content--danger){
    background: var(--el-color-primary);
  }
</style>