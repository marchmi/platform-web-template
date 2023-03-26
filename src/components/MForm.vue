<template>
  <div class="form">
    <mi-form ref="dataForm" class="data-form" :model="dataFormParams" label-width="120px" flex>
      <mi-form-item v-for="field in formFields" :prop="field.key" :key="field.key" :label="field.label">
        <template v-if="$slots[field.key]">
          <slot :name="field.key"></slot>
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
    <m-operation :operations="operations" :row="dataFormParams" :compRef="dataForm"></m-operation>
  </div>
</template>
<script setup>
  import { ref, reactive } from 'vue'

  import MOperation from '@/components/MOperation.vue'
  import DynamicViewLoader from '@/components/DynamicViewLoader.vue'

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
    }
  })

  const dataForm = ref(null)

</script>

<style lang="less" scoped>
</style>
