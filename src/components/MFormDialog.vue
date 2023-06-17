<template>
  <div class="table-dialog">
    <mi-dialog 
      v-model="dialogOpenStatus"
      :fullscreen="componentState.dialogFullscreen"
      :title="title"
      :destroy-on-close="true"
      >
      <FullScreenIcon />
      <div class="dialog-content" :style="{ height: componentState.dialogFullscreen ? '70vh' : '55vh' }">
        <app-main class="dialog">
          <template #content>
            <m-form v-bind="formAttrs" @inited="inited" v-model:data-form-params="formAttrs.dataFormParams">
            <!-- 向子组件分发插槽内容 -->
              <template v-for="(index, name) in $slots" v-slot:[name]="props">
                <slot :name="name" v-bind="props" />
              </template>
            </m-form>
          </template>
        </app-main>
      </div>
      <template #footer>
        <div id="dialog-footer">
        </div>
    </template>
    </mi-dialog>
  </div>
</template>
<script setup>
  import { ref, computed } from 'vue'
  import MForm from '@/components/MForm'  
  import AppMain from "@/components/AppMain" // 组件引入
  import FullScreenIcon from './dialogFullScreenIcon'
  import useComponentStateStore from '@/store/modules/componentState'
  import useForm from '@/components/hooks/useForm'
  const componentState = useComponentStateStore()
  const props = defineProps({
    trigger: { // 弹窗触发按钮的文本
      type: String,
      default: '打开弹窗'
    },
    title: { // 弹窗的title
      type: String,
      default: 'Title'
    },
    dialogVisible: { // 弹窗的显示状态控制变量
      type: Boolean
    },
    formAttrs: {
      type: Object,
      default: ()=>{
        return useForm({
          formFields: [
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
          ],
          operations: [
            {
              label: '关闭',
              handler: () => {},
              props: { // 其他的按钮控制属性
                type: 'info',
                size: 'small '
              }
            },
            {
              label: '确认',
              handler: (row, ref) => {
                ref.validate((valid, fields) => {
                  if (valid) {
                    console.log('submit!')
                  } else {
                    console.log('error submit!', fields)
                  }
                })
              },
              props: { // 其他的按钮控制属性
                type: 'primary',
                size: 'small '
              }
            }
          ],
          formParams: {
            name: '示例值'
          }
        })
      }
    }
  })

  /**
   * 计算弹窗的显示状态
   */
  const emit = defineEmits(['update:dialogVisible'])

  const dialogOpenStatus = computed({
    get: () => {
      return props.dialogVisible
    },
    set: (val) => {
      emit('update:dialogVisible', val)
    }
  })

  /**
   * MForm组件inited函数回调
   * 用于指定MForm组件中的操作按钮的显示位置
   */
  const inited = (callback) => {
    callback('#dialog-footer')
  }

</script>

<style lang="less" scoped>
</style>
