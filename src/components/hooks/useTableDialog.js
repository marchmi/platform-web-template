/**
 * Created By: Marchmi
 * CreateTime: 2023-3-14 08:22 
 * LastEditTime: 2023-3-14 21:07
 */

import { reactive } from 'vue'
import useTable from './useTable'
const useTableDialog = (options = {}) => {

  // 筛选条件操作按钮数据
  const tableAttrs = reactive(useTable(options.tableAttrs).attrs)
  const trigger = options.trigger || '查看功能字段信息'
  const title = options.title || '字段信息'

  return {
    tableAttrs,
    trigger,
    title
  }
}
export default useTableDialog
