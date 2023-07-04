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
      :min-width="field.minWidth || 55"
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
        <!-- 使用dynamicviewloader加载视图 -->
        <template v-else-if="field.type">
          <dynamic-view-loader
            v-model:data="row[field.key]"
            :type="field.type"
            v-bind="field.props"
            @input="($event) => { field.input&&field.input($event, row) }"
            >
          </dynamic-view-loader>
        </template>
        <!-- 有需要时，这里补充使用视图组件加载器加载视图的逻辑 -->
        <!-- 直接展示 -->
        <template v-else>
          <span>{{formatValue(row[field.key], field.format)}}</span>
        </template>
      </template>
    </mi-table-column>
    <mi-table-column label="" fixed="right" align="right">
      <template #default="props">
        <div class="table-operation">
          <mi-icon 
            v-if="props.$index"
            @click="removeItem(props.$index)"
            style="margin-right:10px;cursor:pointer;"
          >
            <Minus />
          </mi-icon>
          <mi-icon 
            @click="addItem"
            style="cursor:pointer;"
          >
            <Plus />
          </mi-icon>
        </div>
      </template>
    </mi-table-column>
  </mi-table>
</template>
<script setup>
  import { formatValue } from '@/utils'
  import { ref, computed, onMounted, nextTick, watch } from 'vue'
  import DynamicViewLoader from '@/components/DynamicViewLoader'
  import { InfoFilled, Plus, Minus } from '@element-plus/icons-vue'
  import { setElMinWidth } from '@/utils/elAutoWidthUtil'
  // 定义组件接收的props
  const props = defineProps({
    // 表格数据
    tableData: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 表格展示字段
    tableColumn: {
      type: Array,
      default: ()=>{
        return []
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
          operation_width: 120,
          selectionValChange: undefined
        }
      }
    }
  })

  const table = ref(null)

    // 计算表格中要展示的字段
  const columns = computed(()=>{
    const rtn = [...props.tableColumn]
    if(props.attrs.useRadio){
      rtn.unshift({key: 'useRadio', label: '选择', tbl_width: 60})
    }
    return rtn
  })

  // 需要向父组件同步状态的值，定义emit事件
  const emit = defineEmits(['update:attrs', 'updateSelection'])

  // 更新当前选中项
  const handleCurrentChange = (row) => {
    if(props.attrs.useRadio){ // 单选功能开启时
      props.attrs.currentSelection = row[props.attrs.rowKey]
      emit('update:attrs', props.attrs)
      emit('updateSelection', row)
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
    if(props.attrs.selectionValChange){
      props.attrs.selectionValChange(selection)
    }
    emit('update:attrs', props.attrs)
  }

  /**
   * 新增row
   */
  const addItem = () => {
    props.tableData.push({})
  }

  /**
   * 移除row
   */
  const removeItem = (index) => {
    props.tableData.splice(index, 1)
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