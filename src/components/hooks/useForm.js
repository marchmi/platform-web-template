/**
 * Created By: Marchmi
 * CreateTime: 2023-3-14 21:50 
 * LastEditTime: 2023-3-14 21:50
 */

import { reactive } from 'vue'
import useOperation from './useOperation'
import useComponentStateStore from '@/store/modules/componentState'
const componentState = useComponentStateStore()
const useForm = (options = {}) => {
  /**
   * options: {
   *   formFields: [] // 表单中要展示的字段信息管理对象
   *   operations: [] // 表单中的操作按钮的属性管理对象
   *   dataFormParams: {} // 表单v-model的对象
   * }
   */

  // 计算字段的props属性,穿透给对应的展示组件
  const fields = options.formFields.map(field => {
    const mergedAttr = Object.assign({}, field.props || {})
    const rtn = {...Object.assign({}, field), props: mergedAttr}
    return rtn
  })

  // el-col span
  let span = options.span || 12
  if(componentState.isMobile) { // 手机模式时，col span 固定为24
    span = 24
  }

  // 表单中要展示的字段
  /**
   * 字段配置有breakSign属性时，字段显示为subtitle
   */
  const formFields = reactive([...fields])

  // 表单中操作按钮的属性管理对象
  const operations = reactive(useOperation(options.operations||[]).operations)

  // form绑定的值
  const dataFormParams = reactive({ ...(options.formParams || {}) })

  // 表单校验规则
  const rules = reactive({ ...(options.rules || {}) })

  return {
    span,
    formFields,
    operations,
    dataFormParams,
    rules
  }
}
export default useForm
