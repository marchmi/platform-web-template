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
    <mi-menu-item v-else :index="item.index">
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
