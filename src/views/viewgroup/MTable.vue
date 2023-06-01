<template>
  <app-main>
    <template #content>
      <div class="info">
        <h3>基础表格：</h3>
        <div class="content-wrap">
          <m-table
            v-bind="basicTable"
          >
          </m-table>
          <div class="operations" style="margin-top: 15px;">
            <mi-button @click="refreshData">刷新数据</mi-button>
            <mi-button @click="refreshDataByHookInstance">刷新数据By hooks instance</mi-button>
          </div>
        </div>
      </div>
      <div class="info">
        <h3>带操作按钮：</h3>
        <div class="content-wrap">
          <m-table
            v-bind="operateTable"
          >
          </m-table>
        </div>
      </div>
      <div class="info">
        <h3>单选表格：</h3>
        <div class="content-wrap">
          <m-table
            v-bind="radioTable"
            @updateSelection="updateSelection"
          >
          </m-table>
        </div>
      </div>
      <div class="info">
        <h3>多选表格：</h3>
        <div class="content-wrap">
          <m-table
            v-bind="selectionTable"
          >
          </m-table>
        </div>
      </div>
      <div class="info">
        <h3>使用插槽：</h3>
        <div class="content-wrap">
          <m-table
            v-bind="soltTable"
          >
            <template #bookName="{ row }">
              <span>{{`<<${row.bookName}>>`}}</span>
            </template>
          </m-table>
        </div>
      </div>
    </template>
  </app-main>
</template>

<script setup>
  import { reactive } from 'vue'
  import AppMain from '@/components/AppMain'
  import MTable from '@/components/MTable'
  import useTable from '@/components/hooks/useTable'
  import { infoMsg, successMsg } from '@/utils/interaction'

  /**
   * 基础表格，只展示数据
  */
  const basicTable = reactive(useTable({
    tableColumn: [
      { key: 'bookName', label: '书名' },
      { key: 'author', label: '作者' },
      { key: 'issuingDate', label: '年份' }
    ],
    tableData: [
      { bookName: '完美世界', author: '辰东', issuingDate: '2013-08-16' }
    ]
  }))

  /**
   * 切换表格中的数据，直接操作属性
  */
  const refreshData = () => {
    basicTable.tableData = [
      { bookName: '完美世界', author: '辰东', issuingDate: '2013-08-16' },
      { bookName: '遮天', author: '辰东', issuingDate: '2010-10-14' }
    ]
  }

  /**
   * 切换表格数据，使用hook提供的方法
  */
  const refreshDataByHookInstance = () => {
    basicTable.toggleTableData([
      { bookName: '完美世界', author: '辰东', issuingDate: '2013-08-16' },
      { bookName: '遮天', author: '辰东', issuingDate: '2010-10-14' },
      { bookName: '圣墟', author: '辰东', issuingDate: '2016-11-01' }
    ])
  }

  /**
   * 带操作按钮的表格
  */
  const operateTable = reactive(useTable({
    tableColumn: [
      { key: 'bookName', label: '作品名称' },
      { key: 'author', label: '作者' },
      { key: 'issuingDate', label: '年份' }
    ]
  }))

  operateTable.tableData = [
    { id: 1, bookName: '冰海战记', author: '幸村诚', issuingDate: '2023-04-08' },
    { id: 2, bookName: '排球少年', author: '古馆春一', issuingDate: '2012-02-20' }
  ]

  operateTable.operations = [
    {
      label: '操作',
      handler: (row) => {
        infoMsg(JSON.stringify(row))
      }
    }
  ]

  /**
   * 单选表格
  */
  const radioTable = reactive(useTable({
    tableColumn: [
      { key: 'bookName', label: '作品名称' },
      { key: 'author', label: '作者' },
      { key: 'issuingDate', label: '年份' }
    ],
    tableData: [
      { id: 1, bookName: '冰海战记', author: '幸村诚', issuingDate: '2023-04-08' },
      { id: 2, bookName: '排球少年', author: '古馆春一', issuingDate: '2012-02-20' }
    ],
    attrs: {
      useRadio: true,
      currentSelection: 1
    }
  }))

  const updateSelection = (selections) => {
    successMsg(JSON.stringify(selections))
  }

  /**
   * 多选表格
  */
  const selectionTable = reactive(useTable({
    tableColumn: [
      { key: 'bookName', label: '作品名称' },
      { key: 'author', label: '作者' },
      { key: 'issuingDate', label: '年份' }
    ],
    tableData: [
      { id: 1, bookName: '冰海战记', author: '幸村诚', issuingDate: '2023-04-08' },
      { id: 2, bookName: '排球少年', author: '古馆春一', issuingDate: '2012-02-20' }
    ],
    attrs: {
      useSelection: true,
      currentSelection: [ 1 ],
      selectionValChange: (selections) => {
        successMsg(JSON.stringify(selections))
      }
    }
  }))

  /**
   * 使用插槽
  */
  const soltTable = reactive(useTable({
    tableColumn: [
      { key: 'bookName', label: '作品名称' },
      { key: 'author', label: '作者' },
      { key: 'issuingDate', label: '年份' }
    ],
    tableData: [
      { id: 1, bookName: '冰海战记', author: '幸村诚', issuingDate: '2023-04-08' },
      { id: 2, bookName: '排球少年', author: '古馆春一', issuingDate: '2012-02-20' }
    ]
  }))

</script>