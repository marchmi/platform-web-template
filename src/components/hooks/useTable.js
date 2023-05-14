/**
 * Created By: Marchmi
 * CreateTime: 2023-3-12 13:50 
 * LastEditTime: 2023-3-12 13:50
 */

import { reactive } from 'vue'
import useOperation from './useOperation'
const useTable = (options = {}) => {
  // 管理组件内内置的一些属性
  const constAttrs = {
    tableData: [
      {
        id: 1, 
        date: 1678522220000,
        income: 3000.00,
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        id: 2, 
        date: 1678522320000,
        income: 80000.00,
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        id: 3, 
        date: 1678522210000,
        income: 1000.25,
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        id: 4, 
        date: 1678522220000,
        income: 100000000.00,
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      }
    ], // 默认的表格中要展示的数据
    tableColumn: [
      { key: 'name', label: '姓名' },
      { key: 'income', label: '收入', format: 'commafy' },
      { key: 'date', label: '日期', format: 'formatDate' },
      { key: 'address', label: '地址' }
    ], // 表格中要展示的字段
    attrs: {
      useSelection: false, // 开启表格的都选功能 默认不开启
      useRadio: false, // 开启表格的单选功能 默认不开启
      fixedOperationColumn: 'right', // 操作栏固定的位置 默认为right 支持false、ture、right、left
      rowKey: 'id', // row的主键
      currentSelection: '', // 当前选中项
      'highlight-current-row': false,
      stripe: true,
      border: true
      // ... 其他table组件支持的props属性
    }
  }
  const mergedAttr = Object.assign(constAttrs.attrs, options.attrs || {})

  
  // 筛选条件操作按钮数据
  const operations = reactive(useOperation(options.operations || []).operations)

  // 生成最终传递给组件的属性
  const attrs = reactive({...Object.assign(constAttrs, options), attrs: mergedAttr, operations})

  return {
    attrs
  }
}
export default useTable
