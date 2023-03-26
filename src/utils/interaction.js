import { ElMessage, ElLoading, ElMessageBox } from 'element-plus'

/**
 * 
 * @param {*} msg 反馈消息
 * @param {*} attrs 其它设置
 */
export const successMsg = (msg, attrs = {}) => {
  ElMessage({
    message: msg,
    grouping: true,
    ...attrs,
    type: 'success',
  })
}

/**
 * 
 * @param {*} msg 反馈消息
 * @param {*} attrs 其它设置
 */
export const errorMsg = (msg, attrs = {}) => {
  ElMessage({
    message: msg,
    grouping: true,
    ...attrs,
    type: 'error',
  })
}

/**
 * 
 * @param {*} msg 反馈消息
 * @param {*} attrs 其它设置
 */
 export const infoMsg = (msg, attrs = {}) => {
  ElMessage({
    message: msg,
    grouping: true,
    ...attrs,
    type: 'info',
  })
}

/**
 * 
 * @param {*} msg 反馈消息
 * @param {*} attrs 其它设置
 */
 export const warningMsg = (msg, attrs = {}) => {
  ElMessage({
    message: msg,
    grouping: true,
    ...attrs,
    type: 'warning',
  })
}


/**
 * 用于在axios中开起加载动画
 * @returns 
 */
export const createLoading = () => {
  return ElLoading.service({ text: '正在加载' })
}


export const confirm = (options = {}) => {
  const { 
    title: title = "提示", 
    content: content = "确认删除当前数据？", 
    confirmButtonText: confirmButtonText = "确认", 
    cancelButtonText: cancelButtonText = "取消" ,
    type: type = "warning"
  } = options
  return ElMessageBox.confirm(
    content,
    title,
    {
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText,
      type: type,
    }
  )
}