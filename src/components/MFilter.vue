<template>
  <div class="filter flex">
    <el-form ref="filter" class="filter-form" :inline="true" :model="filterParams" label-width="120px" flex>
      <el-form-item v-for="field in formFields" :prop="field.key" :key="field.key" :label="field.label">
        <template v-if="$slots[field.key]">
          <slot :name="field.key"></slot>
        </template>
        <template v-else>
          <dynamic-view-loader
            v-model:data="filterParams[field.key]"
            :type="field.type"
            v-bind="field.props"
            >
          </dynamic-view-loader>
        </template>
      </el-form-item>
    </el-form>
    <m-operation class="filter-operations" :operations="operations" :row="filterParams" :compRef="filter"></m-operation>
  </div>
</template>
<script setup>
  import { ref, reactive } from 'vue'

  import MOperation from '@/components/MOperation.vue'
  import DynamicViewLoader from '@/components/DynamicViewLoader.vue'

  // 定义组件接收的props
  const props = defineProps({
    filterParams: {
      type: Object,
      default: () => {
        return {}
      }
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
          { label: '搜索', handler: (val) => { console.log(val) } },
          { label: '重置', handler: (val) => { Object.keys(val).forEach(key=>val[key] = '') } }
        ]
      }
    }
  })

  const filter = ref(null)

</script>

<style lang="less" scoped>
  .flex{
    display: flex;
    justify-content: space-around;
  }
  .filter-form{
    flex: 1;
  }
  .filter-operations{
    margin-left: 10px;
    text-align: right;
  }
</style>
