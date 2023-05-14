<template>
  <div class="form">
    <mi-form ref="dataForm" class="data-form" :model="dataFormParams" label-width="120px" :label-position="'top'" flex>
      <mi-form-item v-for="field in formFields" :prop="field.key" :key="field.key">
        <template #label>
          <template v-if="field.toolTip">
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
        <template v-if="$slots[field.key]">
          <slot :name="field.key" :formParams="dataFormParams"></slot>
        </template>
        <template v-else-if="field.breakSign">
          <h2>{{field.breakSign}}</h2>
        </template>
        <template v-else>
          <dynamic-view-loader
            v-model:data="dataFormParams[field.key]"
            :type="field.type"
            v-bind="field.props"
            >
          </dynamic-view-loader>
        </template>
      </mi-form-item>
    </mi-form>
    <!-- 表单操作按钮 -->
    <Teleport v-if="dialogFooterDomRef" :to="dialogFooterDomRef">
      <m-operation :operations="operations" :row="dataFormParams" :compRef="dataForm"></m-operation>
    </Teleport>
    <m-operation v-else :operations="operations" :row="dataFormParams" :compRef="dataForm"></m-operation>
  </div>
</template>
<script setup>
  import { ref, reactive, onMounted } from 'vue'

  import { InfoFilled } from '@element-plus/icons-vue'
  import MOperation from '@/components/MOperation'
  import DynamicViewLoader from '@/components/DynamicViewLoader'

  // 定义组件接收的props
  const props = defineProps({
    dataFormParams: {
      type: Object,
      required: true
    },
    formFields: {
      type: Array,
      default: () => {
        return [
          {
            key: 'name',
            type: 'input',
            label: '姓名',
            props: {}
          },
          {
            key: 'income',
            type: 'input',
            label: '收入',
            props: {}
          }
        ]
      }
    },
    operations: {
      type: Array,
      default: () => {
        return [
          { label: '取消', handler: (val) => { console.log(val) } },
          { label: '确认', handler: (val) => { Object.keys(val).forEach(key=>val[key] = '') } }
        ]
      }
    },
    operations_wrap: {
      type: [String,Object]
    }
  })

  const dataForm = ref(null)

  // 操作按钮显示在哪个元素内
  const dialogFooterDomRef = ref(null)

  // 更改操作按钮显示的容器
  const updateDialogFooterDomRef = (val) => {
    dialogFooterDomRef.value = val
  }

  // 定义emit方法，ref访问子组件方法的形式失效，采用emit
  const emit = defineEmits(['inited'])

  // 视图挂载后向父组件提交inited事件
  onMounted(()=>{
    emit('inited', updateDialogFooterDomRef)
  })

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