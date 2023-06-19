import localforage, { key } from 'localforage'
import { clearEmpty } from '@/utils'

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

const useForage = (dbName, storeName) => {

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
  const setItem = (value) => {
    let uuid = value.uuid || generateUUID()
    value.uuid = uuid
    return forage.setItem(uuid, JSON.parse(JSON.stringify(value)))
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
   * 所有数据
   * @returns 
   */
   const getLength = async () => {
    const result = await forage.length()
    return result
  }

  const fetchList = async (query = {}) => {
    const total = await getLength()
    const result = { total }
    const { pageNum, pageSize } = query
    const filter = clearEmpty({ ...query })
    delete filter.pageNum
    delete filter.pageSize
    delete filter.total
    console.log(filter, pageNum, pageSize)
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
    fetchList
  }
}

export default useForage