<template>
  <app-main>
    <template #content>
      <div class="info">
        <h3>基础表格：</h3>
        <div class="content">
          <m-form
            v-bind="basicForm"
          >
          </m-form>
        </div>
      </div>
      <div class="info">
        <h3>使用插槽：</h3>
        <div class="content">
          <m-form
            v-bind="slotForm"
          >
            <template #author="{ formParams }">
              <mi-input v-model="formParams.author"></mi-input>
              <span>作者：{{formParams.author}}</span>
            </template>
          </m-form>
        </div>
      </div>
      <div class="info">
        <h3>多个表单：</h3>
        <div class="content">
          <m-form
            v-bind="complexForm"
          >
          </m-form>
        </div>
      </div>
      <div class="info">
        <h3>含事件交互：</h3>
        <div class="content">
          <m-form
            v-bind="eventForm"
          >
          </m-form>
        </div>
      </div>
    </template>
  </app-main>
</template>

<script setup>
  import { reactive } from 'vue'
  import AppMain from '@/components/AppMain'
  import MForm from '@/components/MForm'
  import useForm from '@/components/hooks/useForm'
  import { enumToArray } from '@/utils'
  import { infoMsg } from '@/utils/interaction'

  /**
   * 基础表格，只展示数据
  */
  const basicForm = useForm({
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
  })

  /**
   * 使用插槽
  */
  const slotForm = useForm({
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
  })

  /**
   * 多个表单
  */
  const complexForm = useForm({
    formFields: [
      {
        breakSign: '作品信息', // 表单中的上下文分割插槽
      },
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
        breakSign: '发行信息', // 表单中的上下文分割插槽
      },
      {
        key: 'issuingDate',
        type: 'datePicker',
        label: '发行日期',
        props: {
          placeholder: '请选择日期'
        }
      },
      {
        key: 'press',
        type: 'input',
        label: '出版社',
        props: {
          placeholder: '请填写内容'
        }
      }
    ]
  })

  /**
   * 含事件交互
  */
 const eventForm = useForm({
    formFields: [
      {
        breakSign: '作品信息', // 表单中的上下文分割插槽
      },
      {
        key: 'bookName',
        type: 'input',
        label: '作品名称',
        props: {
          'show-word-limit': true,
          maxlength: 20,
          placeholder: '请输入作品名称'
        },
        events: {
          'change': (val) => {
            infoMsg(val)
          }
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
        breakSign: '发行信息', // 表单中的上下文分割插槽
      },
      {
        key: 'issuingDate',
        type: 'datePicker',
        label: '发行日期',
        props: {
          placeholder: '请选择日期'
        }
      },
      {
        key: 'press',
        type: 'input',
        label: '出版社',
        props: {
          placeholder: '请填写内容'
        }
      }
    ]
  })

</script>