/**
 * Created By: Marchmi
 * CreateTime: 2023-04-09 08:22 
 * LastEditTime: 2023-04-09 12:55
 * 
 */

import { reactive, ref } from 'vue'
import useForm from './useForm'
const useFormDialog = (options = {}) => {

  // 筛选条件操作按钮数据
  const formAttrs = reactive(useForm(options.formAttrs))
  const trigger = options.trigger || '查看功能字段信息'
  const title = options.title || '字段信息'
  const dialogVisible = ref(false)

  const toggleDialogVisible = () => {
    this.dialogVisible.value = !this.dialogVisible.value
  }

  const updateFormAttrs = () => {
    const newFormAttrs = useForm(options)
  }

  return {
    formAttrs,
    trigger,
    title,
    dialogVisible,
    toggleDialogVisible,
    updateFormAttrs
  }
}
export default useFormDialog
