<template>
  <div ref="operate" class="operations">
    <template v-for="(operation, key) in operations" :key="key">
      <template v-if="[operation.slotName] && $slots[operation.slotName]">
        <slot :name="[operation.slotName]" :row="row" :operation="operation" :compRef="compRef"></slot>
      </template>
      <template v-else>
        <!--  operation.isShow(row) operation.disabled(row) operation.handler(row) 表格中使用组件时，row为传递给组件的当前行的数据,在筛选条件中使用时，row是当前筛选条件的值-->
        <!-- click事件添加stop修饰符，避免点击按钮时，触发row-click事件 -->
        <mi-button 
          v-bind="operation.props"
          v-if="((row)=>{ return operation.isShow ? operation.isShow(row): true })(row)" 
          :disabled="((row)=>{ return operation.disabled ? operation.disabled(row): false})(row)" 
          @click.stop="operation.handler(row, compRef)"
          v-permission="operation.permission">
          {{operation.label}}
        </mi-button>
      </template>
    </template>
  </div>
</template>
<script setup>
  import { ref } from 'vue'
  // 定义组件接收的props
  const props = defineProps({
    operations: {
      type: Array,
      default: () => [
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
    },
    row: { // 表格中使用组件时，row为传递给组件的当前行的数据,在筛选条件中使用时，row是当前筛选条件的值
      type: Object,
      required: false
    },
    compRef: { // 组件ref，在Mtable组件中使用时传递的是el-table的ref，在筛选条件和表单中使用时传递的是el-form的ref
      type: Object,
      required: false
    } 
  })

  const operate = ref(null)

  
</script>
