<template>
  <mi-pagination
    :total="pagination.total"
    v-model:current-page="pagination.pageNum"
    v-model:page-size="pagination.pageSize"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    v-bind="attrs"
  />
</template>
<script setup>
  import { onBeforeMount } from 'vue'
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
  onBeforeMount(()=>{
    emit('fetchData')
  })
</script>
