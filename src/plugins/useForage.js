import localforage, { key } from 'localforage'
import { clearEmpty } from '@/utils'

/**
 * 生成uuid
 * @returns uuid
 */
function generateUUID() {
  var d = new Date().getTime();
  if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
    d += performance.now() // use high-precision timer if available
  }
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (d + Math.random()*16)%16 | 0
    d = Math.floor(d/16)
    return (c=='x' ? r : (r&0x3|0x8)).toString(16)
  })
  return uuid
}

/**
 * 
 * @param {*} filter 筛选条件
 * @param {*} value 值
 * @returns 
 */
function checkAllConditions (filter, value) {
  const keys = Object.keys(filter)
  let flag = true
  for(let i = 0; i < keys.length; i++){
    if(!value[keys[i]] || !value[keys[i]].includes(filter[keys[i]])){
      flag = false
      break
    }
  }
  return flag
}

/**
 * 
 * @param {*} insertVal 当前插入的，设为unique key属性的值
 * @param {*} iterateVal  当前迭代的数据
 * @returns boolean
 * 如设置了code属性为unique key
 * validUniKey('CODE_1','CODE_1') // false
 * validUniKey('CODE_1','CODE1') // true
 */
function validUniKey (insertVal, iterateVal) {
  if(iterateVal === undefined) {
    return true
  }
  return insertVal !== iterateVal
}

const useForage = (dbName, storeName, uniKey) => {

  const toggleStore = (storeName) => {
    forage.config({
      driver: [
        localforage.INDEXEDDB,
        localforage.LOCALSTORAGE
      ],
      storeName
    })
  }

  const forage = localforage.createInstance({
    name: dbName
  })

  if(storeName) {
    toggleStore(storeName)
  }

  /**
   * 新增或更新一条数据
   * @param {*} value 
   * @returns promise
   */
  const setItem = async (value) => {
    if(!value.uuid){
      value.createTime = new Date().getTime()
    }
    let uuid = value.uuid || generateUUID()
    value.uuid = uuid
    const response = { code: 200, message: 'OK', data: value }
    const isUni = await checkUniVal(value, uniKey, value.uuid)
    if(!isUni) {
      return { code: 500, message: 'Duplicate values of a property specified as having uniqueness', data: value }
    }
    const data = await forage.setItem(uuid, JSON.parse(JSON.stringify(value)))
    return { ...response, data}
  }

  const checkUniVal = async (val, uniKey, uuid) => {
    return new Promise((resolve, reject) => {
      if(!uniKey) {
        resolve(true)
        return
      }
      let uniBool = true
      // 这里是异步操作
      forage.iterate((value, key, idx)=> {
        const isCurrent = value.uuid === uuid // 修改操作时，对比的是当前修改的数据时
        if(!validUniKey(val[uniKey], value[uniKey]) && !isCurrent){
          uniBool = false
        }
      }).then(res=>{
        resolve(uniBool)
      })
      
    })
  }

  /**
   * 查询详情
   * @param {*} key 
   * @returns 
   */
  const getItem = (key) => {
    return forage.getItem(key)
  }

  /**
   * 删除数据
   * @param {*} key 
   * @returns 
   */
   const removeItem = (key) => {
    return forage.removeItem(key)
  }

  /**
   * 所有数据的长度
   * @returns 
   */
   const getLength = async () => {
    const result = await forage.length()
    return result
  }

  /**
   * 查询列表数据
   * @param {*} query 
   * @returns 
   */
  const fetchList = async (query = {pageNum: 1, pageSize: 1000}) => {
    const total = await getLength()
    const result = { total }
    const { pageNum, pageSize } = query
    const filter = clearEmpty({ ...query })
    delete filter.pageNum
    delete filter.pageSize
    delete filter.total

    const conditions = Object.keys(filter)
    const gather = []
    await forage.iterate((value, key, idx)=> {
      if(!conditions.length){
        gather.push(value)
      }else if(checkAllConditions(filter,value)){
        gather.push(value)
      }
    })
    result.total = gather.length
    const startIdx = (pageNum - 1) * pageSize
    const endIdx = pageNum * pageSize >  result.total ?  result.total : pageNum * pageSize
    result.list = gather.splice(startIdx,endIdx)
    return result
  }

  return {
    forage,
    toggleStore,
    setItem,
    getLength,
    fetchList,
    removeItem
  }
}

export default useForage