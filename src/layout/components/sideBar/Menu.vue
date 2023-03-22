<template>
  <div class="sidebar-container">
    <mi-menu theme="dark" :defaultExpanded="defaultExpanded" :value="onRoutes" :collapsed="sidebar.collapse" @change="changeHandler">
      <menubar-item v-for="menu in items" :key="menu.path" :menu-data="menu" />
      <template #logo>
        <img :width="sidebar.collapse ? 35 : 136" :src="iconUrl" alt="logo" />
      </template>
      <template #operations>
        <mi-button class="t-demo-collapse-btn" variant="text" shape="square" @click="changeCollapsed">
          <template #icon><ViewListIcon /></template>
        </mi-button>
      </template>
    </mi-menu>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import MenubarItem from './MenubarItem.vue'
import { ViewListIcon }  from 'tdesign-icons-vue-next'
import { useSidebarStore } from '@/store/modules/sidebar'
import { routesStore } from '@/store/modules/routes'
import { useRoute, useRouter } from 'vue-router'
const routesPinia = routesStore()
export default defineComponent({
  components: { MenubarItem, ViewListIcon },
  setup (props, content) {
    const items = computed(() => {
      return routesPinia.getMenus()
    })
    const router = useRouter()
    const route = useRoute()
    const onRoutes = computed(() => {
      return route.path
    })
    const defaultExpanded = computed(() => {
      return [route.path]
    })

    const sidebar = useSidebarStore()
    
    const iconUrl = ref('https://tdesign.gtimg.com/site/baseLogo-light.png');

    const changeCollapsed = () => {
      sidebar.collapse = !sidebar.collapse;
      iconUrl.value = sidebar.collapse
        ? 'https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/logo%402x.png'
        : 'https://tdesign.gtimg.com/site/baseLogo-light.png';
    };

    const changeHandler = (active) => {
      if(onRoutes.value===active){
        return
      }
      router.push(active)
    };
    return {
      items,
      onRoutes,
      sidebar,
      iconUrl,
      defaultExpanded,
      changeCollapsed,
      changeHandler
    }
  }
})
</script>
