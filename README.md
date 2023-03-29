# Platform-Web-Template

## Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

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

## 目录说明

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

