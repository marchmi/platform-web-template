<template>
  <div class="filter filter-flex">
    <mi-form ref="filter" class="filter-form" :inline="true" :model="filterParams" :label-position="componentState.isMobile ? 'top' : 'right'" label-width="120px" flex>
      <mi-form-item v-for="field in formFields" :prop="field.key" :key="field.key" :label="field.label" style="width: 360px">
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
      </mi-form-item>
    </mi-form>
    <m-operation class="filter-operations" :operations="operations" :row="filterParams" :compRef="filter"></m-operation>
  </div>
</template>
<script setup>
  import { ref, reactive } from 'vue'

  import MOperation from '@/components/MOperation'
  import DynamicViewLoader from '@/components/DynamicViewLoader'

  import useComponentStateStore from '@/store/modules/componentState'
  const componentState = useComponentStateStore()

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
  .filter-flex{
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
  @media screen and (max-width:800px){
    .filter-flex{
      display: block;
    }
    .filter-operations{
      text-align: left;
      margin-left: 0;
      margin-bottom: 10px;
    }
  }
</style>
