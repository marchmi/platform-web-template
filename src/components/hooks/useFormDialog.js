/**
 * Created By: Marchmi
 * CreateTime: 2023-04-09 08:22 
 * LastEditTime: 2023-04-09 12:55
 * 
 */

import { reactive, ref } from 'vue'
import useForm from './useForm'
const useFormDialog = (options = {}) => {

  const formAttrs = reactive(useForm({span: 24, ...options.formAttrs})) // 生成MForm组件的props对象
  const trigger = options.trigger || '打开弹窗' // 弹窗触发按钮的文本
  const title = options.title || '表头' // 弹窗的title
  const dialogVisible = ref(false) // 控制弹窗开启关闭

  /**
   * 切换弹窗的显示状态
   */
  const toggleDialogVisible = () => {
    dialogVisible.value = !dialogVisible.value
  }

  return {
    formAttrs,
    trigger,
    title,
    dialogVisible,
    toggleDialogVisible
  }
}
export default useFormDialog
