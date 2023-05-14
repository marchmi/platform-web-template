<template>
  <mi-table 
    ref="table"
    :data="tableData"
    v-bind="attrs"
    @current-change="handleCurrentChange"
    @selection-change="handleSelectionChange"
    style="width: 100%"
    >
    <mi-table-column v-if="attrs.useSelection" type="selection" width="55" />
    <!-- 设置了width属性时，min-width属性会失效 -->
    <mi-table-column
      v-for="(field) in columns"
      :key="field.key"
      :prop="field.key"
      :label="field.label"
      :width="field.tbl_width || ''"
      :min-width="field.minWidth"
      align="center"
    >
      <template #header>
        <!-- 使用插槽进行渲染 -->
        <template v-if="$slots[`${field.key}Title`]">
          <slot :name="`${field.key}Title`"></slot>
        </template>
        <template v-else-if="field.toolTip">
          <mi-tooltip
            effect="dark"
            :content="field.toolTip"
            placement="top-start"
          >
            <div class="tooltip-header">
              <mi-icon><InfoFilled /></mi-icon>
              <span>{{field.label}}</span>
            </div>
          </mi-tooltip>
        </template>
        <template v-else>
          <span>{{field.label}}</span>
        </template>
      </template>
      <template #default="{ row }">
        <template v-if="field.key==='useRadio'">
          <mi-radio v-model="attrs.currentSelection" :label="row[attrs.rowKey]" size="large">&nbsp;</mi-radio>
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
    </mi-table-column>
    <!-- 通过$slots中是否有operation插槽控制显示操作栏 -->
    <!-- <mi-table-column v-if="$slots.operation" :fixed="attrs.fixedOperationColumn" label="操作" :width="attrs.operation_width||120"> -->
    <mi-table-column v-if="operations.length" :fixed="attrs.fixedOperationColumn" label="操作" :width="operationWidth||120">
      <template #default="{ row }">
        <!-- <slot name="operation" :row="row" :compRef="table">
        </slot> -->
        <m-operation :operations="operations" @updateOperationColWidth="updateOperationColWidth" :compRef="table" :row="row"></m-operation>
      </template>
    </mi-table-column>
  </mi-table>
</template>
<script setup>
  import { formatValue } from '@/utils'
  import { ref, computed, onMounted, nextTick, watch } from 'vue'
  import { InfoFilled } from '@element-plus/icons-vue'
  import { setElMinWidth } from '@/utils/elAutoWidthUtil'
  import MOperation from '@/components/MOperation'
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
    // 操作栏
    operations: {
      type: Array,
      default: () => {
        return [
          {
            label: '编辑', // 按钮文案
            handler: (val) => { console.log(val) }, // 按钮点击事件
            permission: '1', // 按钮权限code
            isShow: (row) => {
              return true
            },
            disabled: (row) => {
              return false
            },
            props: { // 其他的按钮控制属性
              type: 'primary'
            }
          }
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
    }
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

  const operationWidth = ref(props.attrs.operation_width || 80)

  const updateOperationColWidth = (width) => {
    if(width > operationWidth.value){
      operationWidth.value = width
    }
  }

  watch(
    () => props.tableColumn,
    (columns) => {
      setElMinWidth(columns)
    },
    {
      immediate: true,
      deep: true
    }
  )

</script>

<style lang="less" scoped>
.tooltip-header{
  display: flex;
  justify-content: left;
  cursor: pointer;
  :deep(.el-icon){
    margin-right: 5px;
    margin-top: 4px;
  }
}
</style>