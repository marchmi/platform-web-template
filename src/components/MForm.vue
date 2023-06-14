<template>
  <div class="form">
    <mi-form 
      ref="dataForm"
      class="data-form"
      :model="dataFormParams"
      label-width="120px"
      :label-position="'top'"
      :rules="rules"
      :validate-on-rule-change="false"
      flex
    >
      <mi-row :gutter="24">
        <mi-col v-for="field in formFields" :key="field.key" :span="field.breakSign ? 24 : (field.span || span)">
          <mi-form-item :prop="field.key">
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
                :events="field.events || {}"
                >
              </dynamic-view-loader>
            </template>
          </mi-form-item>
        </mi-col>
      </mi-row>
    </mi-form>
    <!-- 表单操作按钮 -->
    <Teleport v-if="dialogFooterDomRef" :to="dialogFooterDomRef">
      <!-- 向嵌套子组件分发插槽内容 -->
      <m-operation :operations="operations" :row="dataFormParams" :compRef="dataForm">
        <template v-for="(index, name) in $slots" v-slot:[name]="props">
          <slot :name="name" v-bind="props" />
        </template>
      </m-operation>
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
    span: {
      type: Number,
      default: 12
    },
    dataFormParams: { // v-model绑定对象
      type: Object,
      required: true
    },
    formFields: { // 表单展示的字段信息集合
      type: Array,
      default: () => {
        return [
          // {
          //   key: 'name',
          //   type: 'input',
          //   label: '姓名',
          //   props: {}
          // }
        ]
      }
    },
    operations: { // 操作按钮
      type: Array,
      default: () => {
        return [
          // { label: '取消', handler: (val) => { console.log(val) } },
          // { label: '确认', handler: (val) => { Object.keys(val).forEach(key=>val[key] = '') } }
        ]
      }
    },
    rules: { // 表单校验规则
      type: Object,
      default: () => {
        return {}
      }
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