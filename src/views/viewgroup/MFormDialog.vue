<template>
  <app-main>
    <template #content>
      <div class="info">
        <h3>基础表单：</h3>
        <div class="content">
          <m-form-dialog
            v-bind="basicDialogForm"
            v-model:dialog-visible="basicDialogForm.dialogVisible"
          >
          </m-form-dialog>
          <mi-button @click="basicDialogForm.toggleDialogVisible">{{basicDialogForm.trigger}}</mi-button>
        </div>
      </div>
      <div class="info">
        <h3>带操作表单：</h3>
        <div class="content">
          <m-form-dialog
            v-bind="operationDialogForm"
            v-model:dialog-visible="operationDialogForm.dialogVisible"
          >
          </m-form-dialog>
          <mi-button @click="operationDialogForm.toggleDialogVisible">{{operationDialogForm.trigger}}</mi-button>
        </div>
      </div>
      <div class="info">
        <h3>带操作表单：</h3>
        <div class="content">
          <m-form-dialog
            v-bind="ruleDialogForm"
            v-model:dialog-visible="ruleDialogForm.dialogVisible"
          >
          </m-form-dialog>
          <mi-button @click="ruleDialogForm.toggleDialogVisible">{{ruleDialogForm.trigger}}</mi-button>
        </div>
      </div>
    </template>
  </app-main>
</template>

<script setup>
  import { reactive } from 'vue'
  import AppMain from '@/components/AppMain'
  import MFormDialog from '@/components/MFormDialog'
  import useFormDialog from '@/components/hooks/useFormDialog'
  import { enumToArray } from '@/utils'
  import { infoMsg, successMsg } from '@/utils/interaction'

  /**
   * 基础表单，只展示数据
  */
  const basicDialogForm = reactive(useFormDialog({
    formAttrs: {
      formFields: [
        {
          key: 'bookName',
          type: 'input',
          label: '作品名称',
          props: {
            'show-word-limit': true,
            maxlength: 20,
            placeholder: '请输入作品名称'
          }
        },
        {
          key: 'author',
          type: 'input',
          label: '作者',
          props: {
            'show-word-limit': true,
            maxlength: 10,
            placeholder: '请输入作者'
          }
        },
        {
          key: 'tyee',
          type: 'select',
          label: '类型',
          props: {
            options: enumToArray({
              1: '小说',
              2: '漫画'
            }),
            placeholder: '请选择类型'
          }
        },
        {
          key: 'issuingDate',
          type: 'datePicker',
          label: '发行日期',
          props: {
            placeholder: '请选择日期'
          }
        }
      ]
    }
  }))

  /**
   * 带操作表单
  */
  const operationDialogForm = reactive(useFormDialog({
    formAttrs: {
      formFields: [
        {
          key: 'bookName',
          type: 'input',
          label: '作品名称',
          props: {
            'show-word-limit': true,
            maxlength: 20,
            placeholder: '请输入作品名称'
          }
        },
        {
          key: 'author',
          type: 'input',
          label: '作者',
          props: {
            'show-word-limit': true,
            maxlength: 10,
            placeholder: '请输入作者'
          }
        },
        {
          key: 'tyee',
          type: 'select',
          label: '类型',
          props: {
            options: enumToArray({
              1: '小说',
              2: '漫画'
            }),
            placeholder: '请选择类型'
          }
        },
        {
          key: 'issuingDate',
          type: 'datePicker',
          label: '发行日期',
          props: {
            placeholder: '请选择日期'
          }
        }
      ],
      operations: [
        {
          label: '关闭',
          handler: () => { operationDialogForm.dialogVisible = false },
          props: { // 其他的按钮控制属性
            type: 'info',
            size: 'default'
          }
        },
        {
          label: '确认',
          handler: (row, ref) => {
            ref.validate((valid, fields) => {
              if (valid) {
                console.log(fields)
                operationDialogForm.dialogVisible = false
              } else {
                console.log('error submit!', fields)
              }
            })
          },
          props: { // 其他的按钮控制属性
            type: 'primary',
            size: 'default'
          }
        }
      ]
    }
  }))

  /**
   * 自定义bookName校验规则
  */
  const bookNameValidator = (rule, value, callback) => {
    if(!value){
      callback()
    }
    if(value===ruleDialogForm.formAttrs.dataFormParams.author){
      callback(new Error('作品名称不能和作者相同'))
    }
    callback()
  }

  const ruleDialogForm = reactive(useFormDialog({
    formAttrs: {
      formFields: [
        {
          key: 'bookName',
          type: 'input',
          label: '作品名称',
          props: {
            'show-word-limit': true,
            maxlength: 20,
            placeholder: '请输入作品名称'
          }
        },
        {
          key: 'author',
          type: 'input',
          label: '作者',
          props: {
            'show-word-limit': true,
            maxlength: 10,
            placeholder: '请输入作者'
          }
        },
        {
          key: 'tyee',
          type: 'select',
          label: '类型',
          props: {
            options: enumToArray({
              1: '小说',
              2: '漫画'
            }),
            placeholder: '请选择类型'
          }
        },
        {
          key: 'issuingDate',
          type: 'datePicker',
          label: '发行日期',
          props: {
            placeholder: '请选择日期'
          }
        }
      ],
      operations: [
        {
          label: '关闭',
          handler: () => { ruleDialogForm.dialogVisible = false },
          props: { // 其他的按钮控制属性
            type: 'info',
            size: 'default'
          }
        },
        {
          label: '移除校验规则',
          handler: (formData, ref) => {
            ruleDialogForm.formAttrs.rules = []
            ref.clearValidate()
          },
          props: { // 其他的按钮控制属性
            type: 'primary',
            size: 'default'
          }
        },
        {
          label: '确认',
          handler: (formData, ref) => {
            ref.validate((valid, fields) => {
              if (valid) {
                successMsg(JSON.stringify(formData))
                ruleDialogForm.dialogVisible = false
              } else {
                console.log('error submit!', fields)
              }
            })
          },
          props: { // 其他的按钮控制属性
            type: 'primary',
            size: 'default'
          }
        }
      ],
      rules: {
        bookName: [
          {
            required: true, message: 'Please input book name', trigger: ['blur', 'change']
          },
          {
            validator: bookNameValidator, trigger: ['blur', 'change']
          }
        ]
      }
    }
  }))
</script>