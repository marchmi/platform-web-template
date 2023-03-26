<template>
  <el-table 
    ref="table"
    :data="tableData"
    v-bind="attrs"
    @current-change="handleCurrentChange"
    @selection-change="handleSelectionChange"
    style="width: 100%"
    >
    <el-table-column v-if="attrs.useSelection" type="selection" width="55" />
    <el-table-column
      v-for="(field) in columns"
      :key="field.key"
      :prop="field.key"
      :label="field.label"
      :width="field.tbl_width"
      align="center"
    >
      <template #default="{ row }">
        <template v-if="field.key==='useRadio'">
          <el-radio v-model="attrs.currentSelection" :label="row[attrs.rowKey]" size="large">&nbsp;</el-radio>
        </template>
        <!-- 使用插槽进行渲染 -->
        <template v-else-if="$slots[field.key]">
          <slot :name="field.key" :row="row"></slot>
        </template>
        <!-- 有需要时，这里补充使用视图组件加载器加载视图的逻辑 -->
        <!-- 直接展示 -->
        <template v-else>
          <span>{{formatValue(row[field.key], field.format)}}</span>
        </template>
      </template>
    </el-table-column>
    <!-- 通过$slots中是否有operation插槽控制显示操作栏 -->
    <el-table-column v-if="$slots.operation" :fixed="attrs.fixedOperationColumn" label="操作" :width="attrs.operation_width||120">
      <template #default="{ row }">
        <slot name="operation" :row="row" :compRef="table">
        </slot>
      </template>
    </el-table-column>
  </el-table>
</template>
<script setup>
  import { formatValue } from '@/utils/index.js'
  import { ref, computed } from 'vue'
  // 定义组件接收的props
  const props = defineProps({
    // 表格数据
    tableData: {
      type: Array,
      default: () => {
        return [
          {
            id: 1, 
            date: 1678522220000,
            income: 3000.00,
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
          },
          {
            id: 2, 
            date: 1678522320000,
            income: 80000.00,
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
          },
          {
            id: 3, 
            date: 1678522210000,
            income: 1000.25,
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
          },
          {
            id: 4, 
            date: 1678522220000,
            income: 100000000.00,
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
          }
        ]
      }
    },
    // 表格展示字段
    tableColumn: {
      type: Array,
      default: ()=>{
        return [
          { key: 'name', label: '姓名' },
          { key: 'income', label: '收入', format: 'commafy' },
          { key: 'date', label: '日期', format: 'formatDate' },
          { key: 'address', label: '地址' }
        ]
      }
    },
    // 其他控制属性
    attrs: {
      type: Object,
      default: ()=>{
        return {
          useSelection: false, // 开启表格的多选功能
          useRadio: false, // 开启表格的单选功能
          fixedOperationColumn: 'right', // false||'right'||其他
          rowKey: 'id',
          'highlight-current-row': false,
          stripe: true,
          operation_width: 120
        }
      }
    },
  })

  const table = ref(null)

    // 计算表格中要展示的字段
  const columns = computed(()=>{
    const rtn = [...props.tableColumn]
    if(props.attrs.useRadio){
      rtn.unshift({key: 'useRadio', label: '选择', tbl_width: 50})
    }
    return rtn
  })

  // 需要向父组件同步状态的值，定义emit事件
  const emit = defineEmits(['update:attrs'])

  // 更新当前选中项
  const handleCurrentChange = (row) => {
    if(props.attrs.useRadio){ // 单选功能开启时
      props.attrs.currentSelection = row[props.attrs.rowKey]
      emit('update:attrs', props.attrs)
    }
    if(props.attrs.useSelection){ // 多选功能开启时
      table.value.toggleRowSelection(row, undefined)
    }
  }

  // 更新当前选中项
  const handleSelectionChange = (selection) => {
    props.attrs.currentSelection = selection.map(row=>{
      return row[props.attrs.rowKey]
    })
    emit('update:attrs', props.attrs)
  }

</script>
