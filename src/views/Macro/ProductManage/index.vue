<template>
  <app-main>
    <template #content>
      <!-- m-table + m-operation -->
      <!-- table -->
      <m-table
        v-bind="tableAttrs"
        v-model:attrs="tableAttrs.attrs"
        >
        <!-- 使用插槽显示的数据 -->
        <template #level>
          <mi-tag>一级</mi-tag>
        </template>
        <template #navStatus="{ row }">
          <mi-switch
            v-model="row.navStatus"
            inline-prompt
            active-text="是"
            inactive-text="否"
            :active-value="1"
            :inactive-value="0"
          />
        </template>
        <template #showStatus="{ row }">
          <mi-switch
            v-model="row.showStatus"
            inline-prompt
            active-text="是"
            inactive-text="否"
            :active-value="1"
            :inactive-value="0"
          />
        </template>
        <template #setting="{ row }">
          <m-operation :operations="settingOperations" :row="row"></m-operation>
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
  import { formatValue } from '@/utils/index.js'
  import { confirm, successMsg } from '@/utils/interaction.js'
  import { useRouter } from 'vue-router'

  import { fetchList } from '@/api/Macro/ProductManage/productCate.js' // api引入

  import AppMain from "@/components/AppMain.vue" // 组件引入
  import MOperation from '@/components/MOperation.vue'
  import MTable from "@/components/MTable.vue"
  import MPagination from "@/components/MPagination.vue"

  import useOperation from '@/components/hooks/useOperation.js' // 组件props脚本引入
  import useTable from '@/components/hooks/useTable.js'
  import usePagination from '@/components/hooks/usePagination.js'
  
  const router = useRouter()

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

  // 表格中要展示的字段
  const tableColumn = ref([
    {
      key: 'id',
      label: '编号'
    },
    {
      key: 'name',
      label: '分类名称'
    },
    {
      key: 'level',
      label: '级别'
    },
    {
      key: 'productCount',
      label: '商品数量',
      format: 'commafy',
      tbl_width: 140
    },
    {
      key: 'productUnit',
      label: '数量单位'
    },
    {
      key: 'navStatus',
      label: '导航栏',
      tbl_width: 120
    },
    {
      key: 'showStatus',
      label: '是否显示',
      tbl_width: 120
    },
    {
      key: 'sort',
      label: '排序'
    },
    {
      key: 'setting',
      label: '设置',
      tbl_width: 240
    }
  ])

  // 表格组件props对象
  const tableAttrs = reactive(useTable({
    tableData: tableData,
    tableColumn: tableColumn,
    attrs: {
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
    deleteOne(row.id).then(res=>{
      handleSearch()
    })
  }
  const handleDelete = (row) => {
    confirm({
      content: `确认删除商品分类${row.name}?`
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

  const handleViewProduct = (row) => {
    router.push({name: 'Product'})
  }

  const transferProduct = (row) => {
    successMsg('已移除当前分类下所有商品的商品分类属性')
  }
  const handleTransferProduct = ( row ) => {
    confirm({
      content: `确认移除${row.name}分类下的商品?`
    }).then(()=>{
      transferProduct(row)
    })
  }
  // 表格-操作栏组件props对象
  const settingOperations = reactive(useOperation([
    {
      label: '查看商品',
      handler: handleViewProduct,
      props: { // 其它的按钮控制属性
        link: true
      }
    },
    {
      label: '移除商品',
      handler: handleTransferProduct,
      props: { // 其它的按钮控制属性
        link: true
      }
    }
  ]).operations)

  // 分页组件props对象
  const paginationAttrs = reactive(usePagination({
    pagination: pagination
  }).attrs)

</script>