<template>
  <app-main>
    <template #content>
      <m-filter
        v-bind="filterAttrs"
        v-model:filter-params="filterAttrs.filterParams"
      >
      </m-filter>
      <div class="page-header-operate-wrap">
        <m-operation
          :operations="headerOperations"
        >
        </m-operation>
      </div>
      <m-table
        v-bind="tableAttrs"
      >
      </m-table>
      <m-pagination
        v-bind="paginationAttrs"
        @fetchData="handleSearch"
      >
      </m-pagination>
      <m-form-dialog
        v-bind="formDialog"
        v-model:dialog-visible="formDialog.dialogVisible"
      > 
      </m-form-dialog>
    </template>
  </app-main>
</template>
<script setup>
  import { ref, reactive, onMounted } from 'vue'
  import { confirm, errorMsg } from '@/utils/interaction'

  import AppMain from '@/components/AppMain' // 组件引入
  import MFilter from '@/components/MFilter'
  import MOperation from '@/components/MOperation'
  import MTable from '@/components/MTable'
  import MPagination from '@/components/MPagination'
  import MFormDialog from '@/components/MFormDialog'

  import usePage from '@/components/hooks/usePage' // 组件props hook
  import useFilter from '@/components/hooks/useFilter'
  import useTable from '@/components/hooks/useTable'
  import usePagination from '@/components/hooks/usePagination'
  import useOperation from '@/components/hooks/useOperation'
  import useFormDialog from '@/components/hooks/useFormDialog'

  import useForage from '@/plugins/useForage'

  import useEnumStore from '@/store/modules/useEnumStore'

  const enumStore = useEnumStore()

  const { setItem, fetchList, removeItem } = useForage('material', 'inventory')

  // 表格数据 分页器控制对象 搜索 重置搜索条件
  const { tableData, pagination, handleSearch, handleReset } = usePage(fetchList)

  // 筛选条件组件props
  const filterAttrs = useFilter({
    formFields: [
      {
        key: 'ingredientCode',
        type: 'select',
        label: '食材',
        props: {
          options: enumStore.ingredientEnum,
          placeholder: '请选择食材'
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
  const tableColumn = [
    {
      key: 'uuid',
      label: 'UUID'
    },
    {
      key: 'ingredientName',
      label: '食材名称'
    },
    {
      key: 'weight',
      label: '入库基数',
      toolTip: '入库的食材的数量，以斤或者箱等为单位'
    },
    {
      key: 'costPrice',
      label: '进价'
    },
    {
      key: 'ingredientCode',
      label: '食材CODE'
    },
    {
      key: 'remark',
      label: '备注'
    },
    {
      key: 'createTime',
      label: '创建时间'
    }
  ]

  // 表格组件props对象
  const tableAttrs = reactive(useTable({
    tableData: tableData,
    tableColumn: tableColumn,
    operations: [
      {
        label: '编辑',
        handler: (row) => {
          formDialog.formAttrs.dataFormParams = { ...row }
          formDialog.toggleDialogVisible()
        },
        props: {
          link: true
        }
      },
      {
        label: '删除',
        handler: (row) => {
          confirm().then(() => {
            removeItem(row.uuid)
            handleSearch()
          })
        },
        props: {
          link: true
        }
      }
    ],
    attrs: {
      fixedOperationColumn: 'right'
    }
  }))

  // 分页组件props对象
  const paginationAttrs = reactive(usePagination({
    pagination: pagination
  }).attrs)

  const ingredientChange = (val) => {
    const { ingredientCode, ingredientName } = enumStore.ingredientEnumMap[val]
    formDialog.formAttrs.dataFormParams.ingredientName = ingredientName 
    formDialog.formAttrs.dataFormParams.ingredientCode = ingredientCode
  }
  const formDialog = reactive(useFormDialog({
    formAttrs: {
      formFields: [
        {
          key: 'ingredientCode',
          type: 'select',
          label: '食材',
          props: {
            options: enumStore.ingredientEnum,
            placeholder: '请选择食材'
          },
          events: {
            change: ingredientChange
          }
        },
        {
          key: 'weight',
          type: 'number',
          label: '入库基数',
          toolTip: '入库的食材的数量，以斤或者箱等为单位',
          props: {
            placeholder: '请输入入库数量'
          }
        },
        {
          key: 'costPrice',
          type: 'number',
          label: '进价',
          props: {
            placeholder: '请输入进价'
          }
        },
        {
          key: 'remark',
          type: 'textarea',
          label: '备注',
          props: {
            'show-word-limit': true,
            maxlength: 100,
            placeholder: '请输入备注'
          }
        }
      ],
      operations: [
        {
          label: '关闭',
          // Using arrow functions to avoid: Uncaught (in promise) ReferenceError: Cannot access 'toggleFormDialogVisible' before initialization at setup 
          handler: (formData, ref) => { 
            toggleFormDialogVisible(ref)
          },
          props: { // 其他的按钮控制属性
            type: 'info',
            size: 'default'
          }
        },
        {
          label: '确认',
          handler: (formData, ref) => {
            handleSubmit(formData, ref)
          },
          props: { // 其他的按钮控制属性
            type: 'primary',
            size: 'default'
          }
        }
      ],
      formParams: {}
    }
  }))

  const handleSubmit = (formData, ref) => {
    ref.validate((valid, fields) => {
      if (valid) {
        setItem(formData).then(res=>{
          const {code, message} = res
          if(code!==200){
            errorMsg(message)
            return
          }
          toggleFormDialogVisible(ref)
          handleSearch()
        })
      } else {
        console.log('error submit!', fields)
      }
    })
  }

  /**
   * 切换formDialog弹窗开启状态
   */
  const toggleFormDialogVisible = (ref) => {
    formDialog.formAttrs.dataFormParams = {}
    ref?.resetFields()
    formDialog.toggleDialogVisible()
  }

  /**
   * 头部操作栏
   */
  const {operations: headerOperations} = useOperation([
    {
      label: '新增',
      handler: toggleFormDialogVisible,
      props: {
        size: 'default'
      }
    }
  ])

  onMounted(()=>{
    enumStore.fetchIngredientEnum()
  })

</script>

<style lang="less" scoped>
.page-header-operate-wrap {
  display: flex;
  padding: 5px 0 15px 0;
  justify-content: flex-end;
}
</style>