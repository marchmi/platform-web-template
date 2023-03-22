<template>
  <template v-if="item.index">
    <mi-submenu v-if="item.subs?.length > 0" :value="item.index">
      <template #title>
        <span>{{ item.title }}</span>
      </template>
      <menubar-item
        v-for="child in item.subs"
        :key="child.index"
        :menu-data="child">
      </menubar-item>
    </mi-submenu>
    <mi-menu-item v-else :value="item.index" :route="item">
      <span>{{ item.title }}</span>
    </mi-menu-item>
  </template>
</template>

<script>
export default {
  name: 'MenubarItem',
  props: {
    menuData: {
      type: Object,
      required: true
    }
  },
  methods: {
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
