import { reactive } from 'vue'
const usePagination = (options = {}) => {
  // 管理组件内内置的一些属性
  const constAttrs = {
    pagination: { // 将total、pageNum、pageSize整合到pagination对象中
      total: 100,
      pageNum: 1,
      pageSize: 10,
    },
    attrs: {
      background: true,
      layout: "total, sizes, prev, pager, next",
      'page-sizes': [10 ,20, 30, 50],
      operation_width: 120
    }
  }
  // 生成最终传递给组件的属性
  const attrs = reactive({...Object.assign(constAttrs, options)})

  return {
    attrs
  }
}
export default usePagination
