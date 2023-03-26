/**
 * Created By: Marchmi
 * CreateTime: 2023-3-11 21:04 
 * LastEditTime: 2023-3-11 21:04
 */


/**
 *数字金额转文字
 *
 * @export
 * @param {*} money
 * @returns
 */
 export const convertCurrency = (money) => {
  //汉字的数字
  var cnNums = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖')
  //基本单位
  var cnIntRadice = new Array('', '拾', '佰', '仟')
  //对应整数部分扩展单位
  var cnIntUnits = new Array('', '万', '亿', '兆')
  //对应小数部分单位
  var cnDecUnits = new Array('角', '分', '毫', '厘')
  //整数金额时后面跟的字符
  var cnInteger = '整'
  //整型完以后的单位
  var cnIntLast = '元'
  //最大处理的数字
  var maxNum = 999999999999999.9999
  //金额整数部分
  var integerNum
  //金额小数部分
  var decimalNum
  //输出的中文金额字符串
  var chineseStr = ''
  //分离金额后用的数组，预定义
  var parts
  if (money == '') {
    return ''
  }
  money = parseFloat(money);
  if (money >= maxNum) {
    //超出最大处理数字
    return ''
  }
  if (money == 0) {
    chineseStr = cnNums[0] + cnIntLast + cnInteger
    return chineseStr
  }
  //转换为字符串
  money = money.toString();
  if (money.indexOf('.') == -1) {
    integerNum = money;
    decimalNum = ''
  } else {
    parts = money.split('.')
    integerNum = parts[0]
    decimalNum = parts[1].substr(0, 4)
  }
  //获取整型部分转换
  if (parseInt(integerNum, 10) > 0) {
    var zeroCount = 0
    var IntLen = integerNum.length
    for (var i = 0; i < IntLen; i++) {
      var n = integerNum.substr(i, 1)
      var p = IntLen - i - 1
      var q = p / 4
      var m = p % 4
      if (n == '0') {
        zeroCount++
      } else {
        if (zeroCount > 0) {
          chineseStr += cnNums[0]
        }
        //归零
        zeroCount = 0
        chineseStr += cnNums[parseInt(n)] + cnIntRadice[m]
      }
      if (m == 0 && zeroCount < 4) {
        chineseStr += cnIntUnits[q]
      }
    }
    chineseStr += cnIntLast
  }
  //小数部分
  if (decimalNum != '') {
    var decLen = decimalNum.length
    for (var i = 0; i < decLen; i++) {
      var n = decimalNum.substr(i, 1)
      if (n != '0') {
        chineseStr += cnNums[Number(n)] + cnDecUnits[i]
      }
    }
  }
  if (chineseStr == '') {
    chineseStr += cnNums[0] + cnIntLast + cnInteger
  } else if (decimalNum == '') {
    chineseStr += cnInteger
  }
  return chineseStr
}

/*
 *数字每三位加逗号
 * 
 */
export const commafy = (num) => {
  return num && num.toString()
    .replace(/\d+/, function(s){
      return s.replace(/(\d)(?=(\d{3})+$)/g, '$1,')
    })
}

/**
 * 生成某个范围之内的随机数
 * @param {*} min 
 * @param {*} max 
 * @returns 
 */
export const numberRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}