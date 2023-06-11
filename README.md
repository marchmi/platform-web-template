# Platform-Web-Template

## Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## 简介

[Platform-Web-Template](https://github.com/marchmi/platform-web-template) 基于vue3 + vite + javascript 遵循面向对象的设计原则对项目中的一些关注点进行适当封装，是一套高效的前端解决方案。

## 项目基建
### 组件相关约束与能力支持
- 引入第三方组件库（主要是UI库）时，对组件名进行重命名，以确保在以不同的组件库作为UI库时，相同功能组件的使用始终能保持统一的标签。
> 下面以引入element-plus的组件库为例，更多内容详见[@/plugins/element.js](https://github.com/marchmi/platform-web-template/blob/main/src/plugins/element.js)

```
import {
  ElButton,
  ElInput,
  ...
} from 'element-plus'
import 'element-plus/dist/index.css'

const coms = [
  ElButton,
  ElInput,
  ...
]

export default (app) => {
  coms.map(c => {
    app.component(c.name.replace('El', "Mi")
    , c)
  })
}
```
> 至此，无论项目引入的是element ui还是其它组件库，在项目中使用时统一使用`<mi-input>` 标签实现输入框视图。

```
<mi-input v-model.trim="val" clearable v-bind="$attrs"  v-on="$attrs.events"/>
```

2. 在封装自定义组件时，首先对引入的外部组件中会高频使用的一些视图组件进行二次封装，然后使用这些二次封装后的视图组件进行功能和更复杂的组件的开发。以确保同类型的视图在项目中始终能保持行为统一，且能够更方便的掌控组件的行为。
> 像下面这样使用 `mi-input` 二次封装一个 `input` 组件,并设置 `clearable` 属性,这样在项目中使用 `input` 组件时，输入框都默认支持了清空的功能。详见[@/components/async-components/input.vue](https://github.com/marchmi/platform-web-template/blob/main/src/components/async-components/input.vue)

```
<template>
  <div>
    <mi-input 
      v-model.trim="val"
      clearable
      v-bind="$attrs"
      v-on="$attrs.events"
    />
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: [String, Number],
      default: ''
    }
  },

  computed: {
    val: {
      get () {
        return this.data
      },
      set (value) {
        this.$emit('update:data', value)
      }
    }
  }
}
</script>

```

3. Vue本身采用虚拟DOM，拥有数据驱动视图的能力，所以项目中在视图开发时一般采用 ==`业务组件`== + ==`容器组件`== + ==`视图组件`== 的结构进行实现。
> ==视图组件==一般按照 `input` 输入框，一个 `select` 选择器这种最小颗粒度的视图进行组件封装，即一个字段对应一个组件。视图组件主要负责数据呈现，会尽量少的包含事件交互，方便容器组件统一调度，确保组件行为。[@/components/async-components](https://github.com/marchmi/platform-web-template/tree/main/src/components/async-components)目录下提供了一部分视图组件。这些组件同时也满足第2点种提到的约定。

> ==容器组件== 基于vue的内置组件 `component` 和 `defineAsyncComponent` 实现。能够根据 ==视图管理数据== 动态加载 ==视图组件==，将prop属性和事件信息传递给 ==视图组件== ，并监听 ==视图组件== 的value，将值反馈给父组件。 详见[@/components/DynamicViewLoader.vue](https://github.com/marchmi/platform-web-template/blob/main/src/components/DynamicViewLoader.vue)

> ==`业务组件`== 则是项目中为实现数据展示、数据录入等功能，包含一些组合视图和操作的复杂组件。如 `表单` 、 `弹窗` 、 `弹窗表单` 等。 这一类组件在项目中采用 ==组件== 加 ==组件hook== 的形式实现。==组件== 向容器组件提供 ==视图管理数据== 。==组件hook== 则用于标准化的定义组件props属性及操作函数。
4. 项目中目前提供的业务组件：

| 组件名称 | 组件hook | 使用场景 |
| --- | --- | --- |
| [MOperation操作栏组件](https://github.com/marchmi/platform-web-template/blob/main/src/components/MOperation.vue) | [useOperation](https://github.com/marchmi/platform-web-template/blob/main/src/components/hooks/useOperation.js) | 需要使用按钮的视图，如筛选条件、表单、操作栏。支持使用插槽插入视图元素 |
| [MForm](https://github.com/marchmi/platform-web-template/blob/main/src/components/MForm.vue) | [useForm](https://github.com/marchmi/platform-web-template/blob/main/src/components/hooks/useForm.js) | 需要使用表单的视图，如数据录入面板。支持使用插槽插入视图元素 |
| [MFilter](https://github.com/marchmi/platform-web-template/blob/main/src/components/MFilter.vue) | [useFilter](https://github.com/marchmi/platform-web-template/blob/main/src/components/hooks/useFilter.js) | 用作筛选条件。支持使用插槽插入视图元素 |
| [MTable](https://github.com/marchmi/platform-web-template/blob/main/src/components/MTable.vue) | [useTable](https://github.com/marchmi/platform-web-template/blob/main/src/components/hooks/useTable.js) | 数据表格。支持使用插槽插入视图元素 |
| [MFormDialog](https://github.com/marchmi/platform-web-template/blob/main/src/components/MFormDialog.vue) | [useFormDialog](https://github.com/marchmi/platform-web-template/blob/main/src/components/hooks/useFormDialog.js) | 表单弹窗。支持使用插槽插入视图元素 |

[组件用例](https://github.com/marchmi/platform-web-template/tree/main/src/views/viewgroup)

## 技术选型

| 技术                      | 版本      | 说明       | 官网                                                        |
| ----------------------- | ------- | -------- | --------------------------------------------------------- |
| Vue                     | ^3.2.47 | 前端框架     | <https://cn.vuejs.org/>                                   |
| Vue-Router              | ^4.1.6  | 路由框架     | <https://router.vuejs.org/zh/>                            |
| Pinia                   | ^2.0.33 | 全局状态管理库  | <https://pinia.web3doc.top/>                              |
| Axios                   | ^1.3.4  | 前端Http框架 | <https://axios-http.com/zh/docs/intro>                    |
| Element Plus            | ^2.3.0  | 前端UI库    | <https://element-plus.gitee.io/zh-CN/>                    |
| TDesign                 | ^1.2.1  | 前端UI库    | <https://tdesign.tencent.com/vue-next/overview>           |
| @element-plus/icons-vue | ^2.1.0  | 前端Icon库  | <https://element-plus.gitee.io/zh-CN/component/icon.html> |
| qs                      | ^6.11.1 | 参数序列化工具包 | <https://github.com/ljharb/qs>                            |

> Tips\:package.json中有安装TDesignUI库，并在[tdesign-version-template](https://github.com/marchmi/platform-web-template/tree/tdesign-version-template)分支中保留了基于TDesign的版本。

其他可选UI库 [Arco.Design](https://arco.design/) [Ant Design Vue](https://antdv.com/components/overview) 等

## 目录结构（维护中）

    ├── api request api
    │   │
    │   ├── macro 项目中使用到的开源项目https://github.com/macrozheng/mall-admin-web中的接口信息
    │   │
    │   └── xxx 其它 request api 信息
    │
    ├── assets 静态资源目录
    │   │
    │   ├── css 层叠样式表文件
    │   │
    │   └── img 静态图片
    │
    ├── components 通用业务组件
    │   │
    │   ├── async-components 供DynamicViewLoader组件调用的基础视图组件
    │   │
    │   ├── hooks 公共业务组件的hooks脚本
    │   │
    │   ├── AppMain 布局组件
    │   │
    │   ├── DynamicViewLoader 视图组件加载器，用于根据视图控制信息渲染async-components下的视图组件
    │   │
    │   ├── MFilter 筛选条件业务组件，配合hooks下的useFilter使用
    │   │
    │   ├── MForm 表单业务组件，配合hooks下的useForm使用
    │   │
    │   ├── MOperation 操作栏业务组件，配合hooks下的useOperation使用
    │   │
    │   ├── MPagination 分页器业务组件，配合hooks下的usePagination使用
    │   │
    │   └── MTable table业务组件，配合hooks下的useTable使用
    │
    ├── const enum枚举常量
    │   │
    │   └── Macro.js 项目中使用到的开源项目https://github.com/macrozheng/mall-admin-web中的一些枚举对象
    │
    ├── directives vue全局指令
    │   │
    │   ├── global 目录，存放全局指令定义文件
    │   │
    │   └── index.js 全局指令初始化脚本，自动载入global目录下的指令定义脚本注册
    │
    ├── layout 基础layout布局页面和组件
    │   │
    │   ├── components layout布局会使用到的组件
    │   │
    │   └── xxx 其它公共页面文件
    │
    ├── plugins 插件注册脚本存放目录
    │   │
    │   ├── element.js Element Plus ui注册脚本
    │   │
    │   └── tdesign.js T-Design ui注册脚本
    │
    ├── router 插件注册脚本存放目录
    │   │
    │   ├── module 目录，路由管理对象脚本存放目录
    │   │
    │   ├── constant.js 路由功能中需要使用到的一些常量定义文件
    │   │
    │   ├── generator-routers 根据views目录下的文件夹及文件信息生成路由表
    │   │
    │   ├── index.js 路由管理对象入口文件
    │   │
    │   └── routeFileLoader.js 自动载入module下的路由管理对象并生成路由表
    │
    ├── service axios实例管理
    │   │
    │   ├── base.js axios实例，request和response拦截器
    │   │
    │   └── macrozheng.js 项目中使用到的开源项目https://github.com/macrozheng/mall-admin-web中的后台服务
    │
    ├── store pinia全局状态管理对象相关脚本
    │   │
    │   ├── modules 各全局状态管理对象
    │   │
    │   └── index.js pinia库注册脚本
    │
    ├── utils 工具脚本
    │   │
    │   ├── index.js 基础，未归类的一些常用脚本
    │   │
    │   ├── interaction.js 交互类脚本
    │   │
    │   ├── numberUtils.js 数字处理类脚本
    │   │
    │   ├── timeUtils.js 时间处理类脚本
    │   │
    │   └── VariablesUtil.js 类型判断类工具脚本
    │
    ├── views 目录
    │
    ├── App.vue
    │
    └── main.js 入口文件

