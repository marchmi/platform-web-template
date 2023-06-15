import localforage, { key } from 'localforage'

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
   * @param {*} key 
   * @param {*} value 
   * @returns promise
   */
  const setItem = (key, value) => {
    return forage.setItem(key, value)
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
    const filter = { ...query }
    delete filter.pageNum
    delete filter.pageSize
    const gather = []
    await forage.iterate((value, key, idx)=> {
      gather.push(value)
    })
    result.list = gather
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