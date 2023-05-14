/**
 * Created By: Marchmi
 * CreateTime: 2023-4-07 21:04 
 * LastEditTime: 2023-4-07 21:04 
 */

import { nextTick } from 'vue'

 /**
 * Uses canvas.measureText to compute and return the width of the given text of given font in pixels.
 *
 * @param {String} text The text to be rendered.
 * @param {String} font The css font descriptor that text is to be rendered with (e.g. "normal 14px arial").
 *
 */
export const getTextWidth = (text, font = 'normal 14px arial') => {
  // re-use canvas object for better performance
  const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement('canvas'))
  const context = canvas.getContext('2d')
  context.font = font
  const metrics = context.measureText(text)
  return metrics.width
}

export const getElFontStyle = ( selector ) => {
  let font = 'normal 14px arial'
  const el = document.querySelector(selector)
  if(!el){ // 没有传递selector 或者没有获取到元素,上面执行了元素获取，直接判断el是否有值即可
    return font
  }
  const { fontWeight, fontSize } = window.getComputedStyle(el)
  font = `${fontWeight} ${fontSize} arial`
  return font
}

/**
 * 
 * @param {*} textGather text集合
 * @returns 
 */
export const getTheWidestWidth = ( textGather = [] ) => {
  let widest = 0
//   for(let text in textGather) {
//     console.log(text)
//   }
  return widest
}


export const getTotalWith = ( textGather = [] ) => {
  let total = 0
  textGather.forEach( text => {
    total += getTextWidth(text) + 20
  })
  return total ? total : 0 // 30像素的左右边距
}

/**
 * 设置表头最小宽度
 * @param {*} fieldsInfo 表格columns
 * @param {*} selector 表头的class选择器，用于获取font信息
 * @param {*} padding padding
 */
export const setElMinWidth = ( fieldsInfo, selector = '.el-table__header', padding = 36 ) => {
  nextTick(()=>{
    const font = getElFontStyle(selector)

    fieldsInfo.forEach((field) => {
      const iconWidth = field.toolTip ? 20 : 0 // 字段含有toolTip属性时，增加20px的宽度，用于显示tooltip 的 icon
      const result = getTextWidth(field.label, font) + padding + iconWidth
      // 1.针对数据显示，字段配置了minWidth属性 2.自定义表头的内容需要完整显示配置了minWidth属性时。result必须大于minWidth才使用result
      field.minWidth = field.minWidth > result ? field.minWidth : result
    })
  })
}
 
 /**
  * 在Descriptions组件中调用，统一设置descriptions-item的文本宽度
  */
 export const resetDescPanlLabelWidth = () => {
   const els = document.querySelectorAll('.el-descriptions__label')
   const fontSize = parseInt(window.getComputedStyle(els[0]).fontSize)
   let maxWidth = 0
   els.forEach(el => {
     const textWidth = getTextWidth(el.innerText || '', `normal ${fontSize}px arial`)
     maxWidth = textWidth > maxWidth ? textWidth : maxWidth
   })
   els.forEach(el => {
     el.style.minWidth = maxWidth + 40 + 'px'
   })
 }
 
 /**
  * 计算表单的lable的宽度
  * @param {*} targetDomSelectorName el-form-item class
  * @param {*} containerDomSelectorName el-form class
  * @returns
  */
 export const resetDomLabelWidth = (targetDomSelectorName = '.el-form-item__label', containerDomSelectorName = '.submit-form') => {
   const conatiner = document.querySelector(containerDomSelectorName)
   if (!conatiner) {
     return
   }
   const els = conatiner.querySelectorAll(targetDomSelectorName)
   const fontSize = parseInt(window.getComputedStyle(els[0]).fontSize)
   let maxWidth = 0
   els.forEach(el => {
     const textWidth = getTextWidth(el.innerText || '', `normal ${fontSize}px arial`)
     maxWidth = textWidth > maxWidth ? textWidth : maxWidth
   })
   return maxWidth + 40 + 'px'
 }
 
 /**
  * 计算表单的lable的宽度
  * @param {*} targetDomSelectorName el-form-item class
  * @returns
  */
 export const resetOperatiosColumnWidth = (val, moreThanNum = 0, moreButtonText) => {
   const length = val?.length
   if (!length) {
     return 0
   }
   const labels = val.map(operate => {
     return operate.label
   })
   let totalWidth = 0
   if (moreThanNum && (moreThanNum < length)) { // 有更多按钮时，截断数组长度
     labels.length = moreThanNum
     labels.push(moreButtonText)
     totalWidth = 16 // 更多按钮右侧图标的宽度
   }
   labels.forEach(label => {
     totalWidth = totalWidth + getTextWidth(label, 'normal 14px arial') + 24 // 每个按钮的左右边距24
   })
   // let textWidth = getTextWidth(val.label, 'normal 14px arial')
   return totalWidth
 }
 
 /**
  * 计算表格的title宽度
  * @param {*} columns
  */
 export const resetTableHeaderTitleWidth = (columns) => {
   columns.forEach(col => {
     const result = getTextWidth(col.label ? col.label : '', 'bold 14px arial') + 40 // 40的边距
     col.minWidth = (!col.minWidth || result > col.minWidth) ? result : col.minWidth // title文案比较短，但是数据内容比较长的，使用配置项中的title
   })
 }
 
 /**
  * 给筛选项设置统一的label宽度
  * @param {*} columns 筛选条件配置信息
  */
 export const resetfilterLabelWidth = (columns) => {
   let maxWidth = 0
   // 计算当前筛选条件视图中label的统一宽度
   columns.forEach(col => {
     // 遍历筛选条件的label
     let textWidth = getTextWidth(col.label ? col.label : '', 'normal 14px arial')
     if (textWidth > maxWidth) {
       maxWidth = textWidth
     }
     // 遍历select-input类型中options选项的文本
     if (col.type === 'select-input') {
       for (const val in col.options) {
         textWidth = getTextWidth(col.options[val], 'normal 14px arial')
         if (textWidth > maxWidth) {
           maxWidth = textWidth
         }
       }
     }
   })
   // 设置筛选条件配置项的宽度
   columns.forEach(col => {
     const result = maxWidth + 44 // 左右边距 + select-input类型图标icon的宽度 = 44
     col.labelWidth = result
     if (col.selectWidth) {
       col.selectWidth = result || col.selectWidth
       col.singleSelectWidth = col.selectWidth + 210
     }
   })
 }