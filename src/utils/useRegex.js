/**
 * Created By: Marchmi
 * CreateTime: 2023-06-05 21:30 
 * LastEditTime: 2023-06-05 21:30
 * Generate regular expression validation function
 */
/**
 * 
 * @param {*} regex regular
 * @param {*} message notice msg
 * @param {*} trigger trigger event
 * @returns 
 */
export const useRegex = (regex, message, trigger = ['blur', 'change']) => {
  return {
    validator: (rule, value, callback) => {
      if (value === '') {
        callback()
      } else if (!regex.test(value)) {
        callback(new Error(message))
      } else {
        callback()
      }
    },
    trigger
  }
}

export const POSITIVE_INTEGER_REGEX = /^[1-9]\d*$/
 