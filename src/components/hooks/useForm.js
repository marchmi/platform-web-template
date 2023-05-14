/**
 * Created By: Marchmi
 * CreateTime: 2023-3-14 21:50 
 * LastEditTime: 2023-3-14 21:50
 */

import { reactive } from 'vue'
import useOperation from './useOperation'
const useForm = (options = {}) => {

  // 计算字段的props属性
  const fields = options.formFields.map(field=>{
    const mergedAttr = Object.assign({}, field.props||{})
    const rtn = {...Object.assign({}, field), props: mergedAttr}
    return rtn
  })

  // 筛选条件中要展示的字段
  const formFields = reactive([...fields])

  // 筛选条件操作按钮数据
  const operations = reactive(useOperation(options.operations||[]).operations)

  // form绑定的值
  const dataFormParams = reactive({ ...(options.formParams || {}) })

  return {
    operations,
    dataFormParams,
    formFields
  }
}
export default useForm
