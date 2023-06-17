<template>
  <div class="table-dialog">
    <mi-link @click="dialogVisible = true" type="primary">{{trigger}}</mi-link>
    <mi-dialog 
      v-model="dialogVisible"
      :fullscreen="componentState.dialogFullscreen"
      :title="title"
      :destroy-on-close="true"
      >
      <FullScreenIcon />
      <div class="dialog-content" :style="{ height: componentState.dialogFullscreen ? '85vh' : '55vh' }">
        <app-main class="dialog">
          <template #content>
            <m-table v-bind="tableAttrs"></m-table>
          </template>
        </app-main>
      </div>
    </mi-dialog>
  </div>
</template>
<script setup>
  import { ref } from 'vue'
  import MTable from '@/components/MTable'  
  import AppMain from "@/components/AppMain" // 组件引入
  import FullScreenIcon from './dialogFullScreenIcon'
  import useComponentStateStore from '@/store/modules/componentState'
  import useTable from '@/components/hooks/useTable'
  const componentState = useComponentStateStore()
  const dialogVisible = ref(false)
  const props = defineProps({
    trigger: {
      type: String,
      default: '查看字段说明'
    },
    title: {
      type: String,
      default: 'Title'
    },
    tableAttrs: {
      type: Object,
      default: ()=>{
        return useTable({
          tableColumn: [
            {
              key: '1',
              label: '字段',
              tbl_width: 180
            },
            {
              key: '2',
              label: '备注'
            },
            {
              key: '3',
              label: '是否必填'
            }
          ],
          tableData:[
            {
              1: '姓名',
              2: '最多20个字符',
              3: '必填'
            },
            {
              1: '昵称',
              2: '最多20个字符'
            }
          ]
        }).attrs
      }
    }
  })
</script>

<style lang="less" scoped>
</style>
