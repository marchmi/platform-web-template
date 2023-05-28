/**
 * Created By: Marchmi
 * CreateTime: 2023-3-12 13:50 
 * LastEditTime: 2023-3-12 13:50
 */

import { ref, reactive } from 'vue'
import useOperation from './useOperation'
const useTable = (options = {}) => {
  // 管理组件内内置的一些属性
  /**
   * constAttrs: {
   *    tableData: [] // 表格中要展示的数据
   *    tableColumn: [] // 表格中要展示的字段
   *    attrs: {} // table组件可接收的属性和配置
   * }
   */
  const constAttrs = {
    tableData: [
      // {
      //   id: 1, 
      //   date: 1678522220000,
      //   income: 3000.00,
      //   name: 'Tom',
      //   address: 'No. 189, Grove St, Los Angeles',
      // }
    ], // 默认的表格中要展示的数据
    /**
     * 值的format函数，可选项
     */
    tableColumn: [
      // { key: 'date', label: '日期', format: 'formatDate' },
    ], // 表格中要展示的字段
    attrs: {
      useSelection: false, // 开启表格的都选功能 默认不开启
      useRadio: false, // 开启表格的单选功能 默认不开启
      fixedOperationColumn: 'right', // 操作栏固定的位置 默认为right 支持false、ture、right、left
      rowKey: 'id', // row的主键
      currentSelection: '', // 当前选中项
      'highlight-current-row': false,
      stripe: true,
      border: true,
      selectionValChange: undefined
      // ... 其他table组件支持的props属性
    }
  }

  // 表格中要显示的数据
  const tableData = ref(options.tableData || constAttrs.tableData)

  // 表格中要显示的字段信息
  const tableColumn = options.tableColumn || constAttrs.tableColumn

  // 合并组件的属性配置项
  const mergedAttr = Object.assign(constAttrs.attrs, options.attrs || {})

  // 操作栏操作按钮的属性管理对象
  const operations = useOperation(options.operations || []).operations

  // 刷新tableData
  const toggleTableData = (data) => {
    tableData.value = data
  }

  return {
    tableData,
    tableColumn,
    operations,
    attrs: mergedAttr,
    toggleTableData
  }
}
export default useTable
