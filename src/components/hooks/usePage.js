/**
 * Created By: Marchmi
 * CreateTime: 2023-06-17 21:40
 * LastEditTime: 2023-06-17 21:40
 */

 import { ref, reactive } from 'vue'
 const usePage = (fetchApi, ...args) => {
 
   let filterVal = {}
   const tableData = ref([])
   const pagination = reactive({
     pageNum: 1,
     pageSize: 10,
     total: 0
   })
   
 
   // 分页插件内部会触发第一次列表查询
   const handleSearch = async (params = filterVal) => {
     filterVal = {...params}
     const query = {...filterVal, ...pagination}
     fetchApi(query).then(res=>{
       const { total, list } = res
       tableData.value = [...list]
       pagination.total = total
     })
   }
 
   const handleReset = (params, refFom) => {
     filterVal = {...params}
     refFom.resetFields()
   }
   
 
   return {
     tableData,
     pagination,
     handleSearch,
     handleReset
   }
 }
 export default usePage
 