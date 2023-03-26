/**
 * Created By: Marchmi
 * CreateTime: 2023-3-12 18:52 
 * LastEditTime: 2023-3-12 18:52
 */

import { reactive } from 'vue'
const useOperation = (options = {}) => {
  // 默认的按钮属性
  const defaultButtonAttrs = {
    label: '操作按钮', // 按钮文案
    handler: (val) => { console.log(val) }, // 按钮点击事件
    permission: undefined, // 按钮权限code undefined时不做检测
    isShow: (row) => {
      return true
    },
    disabled: (row) => {
      return false
    },
    collapse: false, // 是否折叠，默认超过三个操作按钮时，对操作栏进行折叠 boolean|number  to be developed
    props: { // 其他的按钮控制属性
      type: 'primary',
      size: 'mini'
    }
  }

  const operates = options.map(operate=>{
    const mergedAttr = Object.assign({}, defaultButtonAttrs.props, operate.props||{})
    const rtn = {...Object.assign({}, defaultButtonAttrs, operate), props: mergedAttr}
    return rtn
  })

  // 生成最终的操作按钮
  const operations = reactive([...operates])

  return {
    operations
  }
}
export default useOperation
