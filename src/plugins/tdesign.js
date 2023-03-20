/**
 * author: marchmi
 * createTime: 2023-3-17 18:03
 * updateTime: 2023-3-20 18:03
 * 按需加载当前项目中使用到的组件并，组件重命名；使切换ui库时项目中组件所使用的标签名能够保持统一
 */
import {
  Button,
  Input,
  Radio,
  Table,
  Form
} from 'tdesign-vue-next'
import 'tdesign-vue-next/es/style/index.css';

const coms = [
  Button,
  Input,
  Radio,
  Table,
  Form
]

export default (app) => {
  coms.map(c => {
    app.component(c.name.replace('T', "Mi")  // Hello World
    , c)
  })
}
