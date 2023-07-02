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
  import { ON_SHELF_STATUS } from '@/const/Base'
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

  const { setItem, fetchList, removeItem } = useForage('dish', 'dish', 'dishCode')

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
      },
      {
        key: 'onShelfStatus',
        type: 'select',
        label: '上架状态',
        props: {
          options: ON_SHELF_STATUS,
          placeholder: '请选择上架状态'
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
      key: 'retailPrice',
      label: '零售价'
    },
    {
      key: 'retailWeight',
      label: '单份净重'
    },
    {
      key: 'restrictedQuantity',
      label: '可售数量',
      tooltip: '默认为99，即不对每日预定菜的分量作限制',
    },
    {
      key: 'onShelfStatus',
      label: '上架状态'
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
    const { ingredientCode, ingredientName, ingredientTags } = enumStore.ingredientEnumMap[val]
    formDialog.formAttrs.dataFormParams.ingredientName = ingredientName 
    formDialog.formAttrs.dataFormParams.ingredientCode = ingredientCode
    formDialog.formAttrs.dataFormParams.ingredientTags = ingredientTags
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
          key: 'ingredientTags',
          type: 'select',
          label: '食材Tag',
          props: {
            options: enumStore.ingredientTagEnum,
            placeholder: '请选择食材Tag',
            multiple: true,
            disabled: true
          }
        },
        {
          key: 'retailPrice',
          type: 'input',
          label: '零售价'
        },
        {
          key: 'retailWeight',
          type: 'input',
          label: '单份净重(g)'
        },
        {
          key: 'restrictedQuantity',
          type: 'input',
          label: '可售数量',
          tooltip: '默认为99，即不对每日预定菜的分量作限制',
        },
        {
          key: 'onShelfStatus',
          type: 'select',
          label: '上架状态',
          props: {
            options: ON_SHELF_STATUS,
            placeholder: '请选择上架状态'
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
      formParams: {
      },
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
    formDialog.formAttrs.dataFormParams = {
      onShelfStatus: 'onShelf',
      retailPrice: 0,
      retailWeight: 0,
      restrictedQuantity: 99
    }
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
    enumStore.fetchIngredientTagEnum()
  })

</script>

<style lang="less" scoped>
.page-header-operate-wrap {
  display: flex;
  padding: 5px 0 15px 0;
  justify-content: flex-end;
}
</style>