<template>
  <template v-if="item.index">
    <mi-sub-menu v-if="item.subs?.length > 0" :index="item.index">
      <template #title>
        <span>{{ item.title }}</span>
      </template>
      <menubar-item
        v-for="child in item.subs"
        :key="child.index"
        :menu-data="child">
      </menubar-item>
    </mi-sub-menu>
    <mi-menu-item @click="closeMask" v-else :index="item.index">
      <span>{{ item.title }}</span>
    </mi-menu-item>
  </template>
</template>

<script>
import { useSidebarStore } from '@/store/modules/sidebar'
const sidebar = useSidebarStore()
export default {
  name: 'MenubarItem',
  props: {
    menuData: {
      type: Object,
      required: true
    }
  },
  methods: {
    closeMask(){
      sidebar.maskVisible = false
    }
  },
  data () {
    return {
      item: {}
    }
  },
  watch: {
    menuData: {
      handler (value) {
        this.item = value || {}
      },
      immediate: true
    }
  }
}
</script>
