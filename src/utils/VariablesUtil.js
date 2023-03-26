export class VariablesUtil {
  isNumber (num) {
    return typeof num === 'number'
  }

  isString (str) {
    return typeof str === 'string'
  }

  isBoolean (bool) {
    return typeof bool === 'boolean'
  }

  isUndefined (und) {
    return typeof und === 'undefined'
  }

  isBigint (num) {
    return typeof num === 'bigint'
  }

  isSymbol (sym) {
    return typeof sym === 'symbol'
  }

  isFunction (fn) {
    return typeof fn === 'function' || Object.prototype.toString.call(fn) === '[object Function]'
  }

  isNull (n) {
    return Object.prototype.toString.call(n) === '[object Null]'
  }

  isObject (o) {
    return Object.prototype.toString.call(o) === '[object Object]'
  }

  isArray (arr) {
    return Object.prototype.toString.call(arr) === '[object Array]'
  }

  isEmptyObject (o) {
    return Object.keys(o).length === 0
  }
}

export const variTool = new VariablesUtil()