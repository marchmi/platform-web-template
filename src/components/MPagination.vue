<template>
  <div class="pagination-wrap">
    <mi-pagination
      :total="pagination.total"
      v-model:current-page="pagination.pageNum"
      v-model:page-size="pagination.pageSize"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      v-bind="attrs"
      :layout="layout"
    />
  </div>
</template>
<script setup>
  import { onBeforeMount, watchEffect, computed } from 'vue'
  import useComponentStateStore from '@/store/modules/componentState'
  const componentState = useComponentStateStore()
  // 定义组件接收的props
  const props = defineProps({
    // 数据总量
    total: {
      type: Number,
      default: 0
    },
    // 当前页码
    pageNum: {
      type: Number,
      default: 1
    },
    // 分页大小
    pageSize: {
      type: Number,
      default: 10
    },
    pagination: {
      type: Object,
      default: () => {
        return {
          pageNum: 1,
          pageSize: 10,
          total: 100
        }
      }
    },
    // 其它分页组件控制属性
    attrs: {
      type: Object,
      default: ()=>{
        return {
          background: true,
          layout: "prev, pager, next"
        }
      }
    },
  })

  // 需要向父组件同步状态的值，定义emit事件
  const emit = defineEmits(['update:pageNum', 'update:pageSize', 'fetchData'])

  // 分页大小发生变化
  const handleSizeChange = (size) => {
    props.pagination.pageNum = 1
    emit('fetchData')
  }

  // 当前页发生变化
  const handleCurrentChange = (page) => {
    emit('fetchData')
  }

  // 移动端或窄屏幕模式下，修改
  watchEffect(()=>{
    props.attrs.background = !componentState.isMobile
    props.attrs.small = componentState.isMobile
  })

  const layout = computed(()=>{
    return componentState.isMobile ? 'prev, pager, next' : props.attrs.layout
  })

  onBeforeMount(()=>{
    emit('fetchData')
  })
</script>
<style lang="less" scoped >
  .pagination-wrap {
    padding: 20px 0;
  }
</style>