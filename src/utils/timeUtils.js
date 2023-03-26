/**
 * Created By: Marchmi
 * CreateTime: 2023-3-11 20:04 
 * LastEditTime: 2023-3-11 20:04
 */

/**
 * 计算两个时间点相差的时分
 * @param {*} start 
 * @param {*} end 
 * @returns 
 */
export const calcHourDiff = (start, end) => {
  const [ startHour, startMinutes ] = start.split(':')
  const [ endHour, endMinutes ] = end.split(':')
  const diffMinutes = (new Date(null, null, null, endHour, endMinutes) -
  new Date(null, null, null, startHour, startMinutes)) / (60 * 1000)
  const diffHours = Math.round((diffMinutes / 60) * 100) / 100
  return {
    minutes: diffMinutes,
    hours: diffHours,
  }
}

/**
 * 根据生日获取年龄
 * @param {*} birsday 
 * @returns 
 */
export const birsdayToAge = (birsday) => {
  let aDate = new Date()
  let thisYear = aDate.getFullYear()
  let bDate = new Date(birsday)
  let brith = bDate.getFullYear()
  let age = thisYear - brith
  if (aDate.getMonth() == bDate.getMonth()) {
    if (aDate.getDate() < bDate.getDate()) {
      age = age - 1
    }
  } else {
    if (aDate.getMonth() < bDate.getMonth()) {
      age = age - 1
    }
  }
  return age
}

/*
 *时间增加或减少几天,省略年份时，默认为2000年
 * date  当前日期 例： 2020-06-10
 * days  增加的天数 例： 30
 * return 增加后的天数
 */
 export const addDate = (date, days) => {
  var d = new Date(date)
  d.setDate(d.getDate() + days)
  var month = d.getMonth() + 1
  var day = d.getDate()
  if (month < 10) {
    month = "0" + month
  }
  if (day < 10) {
    day = "0" + day
  }
  var val = d.getFullYear() + "-" + month + "-" + day
  return val
}

/**
 * 是否为数字
 * @param val
 * @returns {boolean}
 */
export const isNumber = (val) => {
  const regPos = /^\d+(\.\d+)?$/ // 非负浮点数
  const regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/ // 负浮点数
  return regPos.test(val) || regNeg.test(val)
}
  
/**
 * 时间格式化
 * @param date
 * @param format
 * @returns {string}
 */
export const formatDate = (date, format = 'yyyy年MM月dd日 hh时mm分ss秒') => {
  if (!date) {
    return ''
  }
  date = new Date(isNumber(date) ? new Date(Number(date)) : date)
  if (!isNaN(date)) {
    const newDate = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
      'S+': date.getMilliseconds()
    }
    if (/(y+)/i.test(format)) {
      format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (const k in newDate) {
      if (new RegExp('(' + k + ')').test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length === 1
          ? newDate[k]
          : ('00' + newDate[k]).substr(('' + newDate[k]).length))
      }
    }
    return format
  }
  return ''
}