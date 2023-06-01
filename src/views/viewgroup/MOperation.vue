<template>
  <app-main>
    <template #content>
      <div class="info">
        <h3>基础用例：</h3>
        <div class="content-wrap">
          <m-operation
            v-bind="basicOperation"
          >
          </m-operation>
        </div>
      </div>
      <div class="info">
        <h3>使用插槽插入按钮的用例：</h3>
        <div class="content-wrap">
          <m-operation
            v-bind="slotOperation"
          >
            <template #danger="{ operation }">
              <mi-button 
                v-bind="operation.props"
                v-if="(()=>{ return operation.isShow ? operation.isShow(): true })()" 
                :disabled="(()=>{ return operation.disabled ? operation.disabled(): false})()" 
                @click="operation.handler"
                v-permission="operation.permission">
                {{operation.label+' 使用插槽渲染'}}
              </mi-button>
            </template>
          </m-operation>
        </div>
      </div>
    </template>
  </app-main>
</template>

<script setup>
  import { reactive } from 'vue'
  import AppMain from '@/components/AppMain'
  import MOperation from '@/components/MOperation'
  import useOperation from '@/components/hooks/useOperation'
  import { infoMsg, successMsg } from '@/utils/interaction'

  /**
   * 基础用例
  */
  const basicOperation = useOperation([
    {
      label: '操作一',
      handler: () => { 
        infoMsg('点击了按钮【操作一】')
      },
      props: { // 其他的按钮控制属性
        type: 'info',
        size: 'default'
      }
    },
    {
      label: '操作二',
      handler: () => {
        successMsg('点击了按钮【操作二】')
      },
      props: {
        type: 'primary',
        size: 'default'
      }
    }
  ])

  /**
   * 使用插槽插入按钮
  */
  const slotOperation = useOperation([
    {
      label: '操作一',
      handler: () => { 
        infoMsg('点击了按钮【操作一】')
      },
      props: {
        type: 'info',
        size: 'default'
      }
    },
    {
      label: '操作二',
      handler: () => {
        successMsg('点击了按钮【操作二】')
      },
      props: {
        type: 'primary',
        size: 'default'
      }
    },
    {
      label: '插槽按钮',
      slotName: 'danger', // 定义插槽名称
      handler: () => { 
        infoMsg('点击了按钮【插槽按钮】')
      },
      props: {
        type: 'danger',
        size: 'default'
      }
    }
  ])

</script>