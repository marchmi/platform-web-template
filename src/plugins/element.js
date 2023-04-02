/**
 * author: marchmi
 * createTime: 2023-3-17 18:03
 * updateTime: 2023-3-20 18:03
 * 按需加载当前项目中使用到的组件并，组件重命名；使切换ui库时项目中组件所使用的标签名能够保持统一
 */
import {
  ElButton,
  ElInput,
  ElRadio,
  ElTable,
  ElTableColumn,
  ElForm,
  ElFormItem,
  ElIcon,
  ElMenu,
  ElMenuItem,
  ElSubMenu,
  ElScrollbar,
  ElCascader,
  ElCheckboxGroup,
  ElCheckbox,
  ElDatePicker,
  ElUpload,
  ElSelect,
  ElTag,
  ElSwitch,
  ElPagination,
  ElOption,
  ElAvatar,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem
} from 'element-plus'
import 'element-plus/dist/index.css'

const coms = [
  ElButton,
  ElInput,
  ElRadio,
  ElTable,
  ElTableColumn,
  ElForm,
  ElFormItem,
  ElIcon,
  ElMenu,
  ElMenuItem,
  ElSubMenu,
  ElScrollbar,
  ElCascader,
  ElCheckboxGroup,
  ElCheckbox,
  ElDatePicker,
  ElUpload,
  ElSelect,
  ElTag,
  ElSwitch,
  ElPagination,
  ElOption,
  ElAvatar,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem
]

export default (app) => {
  coms.map(c => {
    app.component(c.name.replace('El', "Mi")  // Hello World
    , c)
  })
}
