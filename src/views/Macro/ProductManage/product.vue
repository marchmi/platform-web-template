<template>
  <app-main>
    <template #content>
      <!-- m-filter + m-table + m-operation + m-pagination -->
      <m-filter v-bind="filterAttrs" v-model:filter-params="filterAttrs.filterParams"></m-filter>
      <!-- table -->
      <m-table
        v-bind="tableAttrs"
        v-model:attrs="tableAttrs.attrs"
        >
        <!-- 使用插槽显示的数据 -->
        <template #pic="{ row }">
          <img :src="row.pic" style="width:100px;" alt="" srcset="">
        </template>
        <template #name="{ row }">
          <p>{{row.name}}</p>
          <p>品牌：{{row.brandName}}</p>
        </template>
        <template #price="{ row }">
          <p>价格：￥{{formatValue(row.price, 'commafy')}}</p>
          <p>货号：{{row.productSn}}</p>
        </template>
        <!-- 也可以对齐筛选条件，将操作栏组件内置在table组件内 -->
        <template #operation="{ row }">
          <m-operation :operations="operations" :row="row"></m-operation>
        </template>
      </m-table>
      <!-- 对于需要跟子组件保持同步的值，使用v-model:xxx的形式进行绑定 -->
      <m-pagination
        v-bind="paginationAttrs"
        @fetchData="handleSearch"
      >
      </m-pagination>
    </template>
  </app-main>
</template>
<script setup>
  import { ref, reactive, onMounted } from 'vue'
  import { enumToArray, formatValue } from '@/utils/index.js'
  import { confirm } from '@/utils/interaction.js'

  import { fetchList as fetchBrandOptions } from '@/api/Macro/ProductManage/brand.js' // api引入
  import { fetchOptionsData as fetchCategoryOptions } from '@/api/Macro/ProductManage/category.js'
  import { fetchList, deleteOne } from '@/api/Macro/ProductManage/product.js' // api引入

  import { PUBLISH_STATUS, VERIFY_STATUS } from '@/const/Macro.js'

  import AppMain from "@/components/AppMain.vue" // 组件引入
  import MFilter from '@/components/MFilter.vue'
  import MOperation from '@/components/MOperation.vue'
  import MTable from "@/components/MTable.vue"
  import MPagination from "@/components/MPagination.vue"

  import useFilter from '@/components/hooks/useFilter.js' // 组件props脚本引入
  import useOperation from '@/components/hooks/useOperation.js'
  import useTable from '@/components/hooks/useTableOld.js'
  import usePagination from '@/components/hooks/usePagination.js'
  
  const brandOptions = ref([]) // 筛选条件-品牌下拉框选项数据

  const getBrandOptions = () => {
    fetchBrandOptions({ pageNum: 1, pageSize: 100 }).then(res=>{
      brandOptions.value = [...res.list]
    })
  }

  const productCategoryOptions = ref([]) // 筛选条件-商品分类选项数据
  const getProductCategoryOptions = () => {
    fetchCategoryOptions().then((res)=>{
      productCategoryOptions.value = [...res]
    })
  }

  
  // 表格数据
  const tableData = ref([])
  // 分页信息
  const pagination = reactive({
    pageNum: 1,
    pageSize: 10,
    total: 0
  })

  // 分页插件内部会触发第一次列表查询
  const handleSearch = (params = {}) => {
    const query = {...params,...pagination}
    fetchList(query).then(res=>{
      const { total, list } = res
      tableData.value = [...list]
      pagination.total = total
    })
  }

  const handleReset = (params, ref) => {
    ref.resetFields()
  }
  // 筛选条件组件props
  const filterAttrs = useFilter({
    formFields: [
      {
        key: 'keyword',
        type: 'input',
        label: '商品名称',
        props: {
          placeholder: '请输入商品名称'
        }
      },
      {
        key: 'productSn',
        type: 'input',
        label: '商品货号',
        props: {
          placeholder: '请输入商品货号'
        }
      },
      {
        key: 'productCategoryId',
        type: 'cascader',
        label: '商品分类',
        props: {
          placeholder: '全部',
          options: productCategoryOptions
        }
      },
      {
        key: 'brandId',
        type: 'select',
        label: '商品品牌',
        props: {
          placeholder: '全部',
          options: brandOptions,
          valueKey: 'id' // select组件选项数据的value key
        }
      },
      {
        key: 'publishStatus',
        type: 'select',
        label: '上架状态',
        props: {
          placeholder: '全部',
          options: enumToArray(PUBLISH_STATUS)
        }
      },
      {
        key: 'verifyStatus',
        type: 'select',
        label: '审核状态',
        props: {
          placeholder: '全部',
          options: enumToArray(VERIFY_STATUS)
        }
      }
    ],
    operations: [ // 操作栏
      {
        label: '搜索',
        handler: handleSearch, // 传递操作函数的指针
        props: { // 其它的按钮控制属性
          type: 'primary',
          size: 'default'
        }
      },
      {
        label: '重置',
        handler: handleReset,
        props: { // 其它的按钮控制属性
          type: 'info',
          size: 'default'
        }
      }
    ]
  })

  // 表格中要展示的字段
  const tableColumn = ref([
    {
      key: 'id',
      label: '编号'
    },
    {
      key: 'pic',
      label: '商品图片',
      tbl_width: 150
    },
    {
      key: 'name',
      label: '商品名称',
      tbl_width: 480
    },
    {
      key: 'price',
      label: '价格/货号',
      tbl_width: 160
    },
    {
      key: 'tag',
      label: '标签',
      tbl_width: 140
    },
    {
      key: 'sort',
      label: '排序'
    },
    {
      key: 'sku',
      label: 'SKU库存'
    },
    {
      key: 'sale',
      label: '销量'
    }
  ])

  // 表格组件props对象
  const tableAttrs = reactive(useTable({
    tableData: tableData,
    tableColumn: tableColumn,
    attrs: {
      useSelection: true,
      fixedOperationColumn: 'right'
    }
  }).attrs)

  const handleEdit = (row) => {
    console.log(row)
  }
  
  /**
   * 删除当前行数据
  */
  const deleteRow = (row) => {
    deleteOne({ ids: row.id, deleteStatus: 1 }).then(res=>{
      handleSearch(filterAttrs.filterParams)
    })
  }
  const handleDelete = (row) => {
    confirm({
      content: `确认删除商品${row.name}?`
    }).then(()=>{
      deleteRow(row)
    })
  }

  // 表格-操作栏组件props对象
  const operations = reactive(useOperation([
    {
      label: '编辑',
      handler: handleEdit,
      disabled: () => { return true },
      props: { // 其它的按钮控制属性
        link: true
      }
    },
    {
      label: '删除',
      handler: handleDelete,
      props: { // 其它的按钮控制属性
        link: true
      }
    }
  ]).operations)

  // 分页组件props对象
  const paginationAttrs = reactive(usePagination({
    pagination: pagination
  }).attrs)

  onMounted(()=>{
    getBrandOptions()
    getProductCategoryOptions()
  })

</script>