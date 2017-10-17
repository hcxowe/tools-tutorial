# 企划系统前端单页面应用

### 什么是单页面

传统的多页面应用每个页面（只说动态页面）都是使用服务器端模板编写，然后请求这个页面的时候由服务器渲染成 html 再返回

单页面是指只有一个主页面的应用，浏览器一开始要加载所有必须的 html, js, css。所有的页面内容都包含在这个所谓的主页面中。但在写的时候，还是会分开写（页面片段），然后在交互的时候由路由程序动态载入

## 实现方案

前置条件： IE8+, 模块化, 快速开发, AJAX, RESTful API

### 单页面且兼容IE8的框架
- AngularJS 1.2.x
- AvalonJS 1
- RegularJS
- ...

功能完备, 数据驱动视图, 但是学习曲线及学习成本都不适用

### IFrame + Hash/HTML5 history API + Easyui + JQuery + RequireJS + AJAX + RESTful API + mockjs

- IFrame
    > IFRAME是HTML标签，作用是文档中的文档。iframe元素会创建包含另外一个文档的内联框架
- Hash
    > hash可以用来获取或设置页面的标签值。浏览器读取URL后，会自动将hash指定的元素滚动至可视区域
- HTML5 History API 
    > 管理浏览器历史记录的API
- Easyui
    > 基于JQuery的UI插件集合
- JQuery
    > 快速、简洁的JavaScript框架/类库
- RequireJS
    > 基于AMD(异步模块定义)规范的模块载入框架
- AJAX
    > 一种在无需重新加载整个网页的情况下，能够更新部分网页的技术
- RESTful API
    > 通过一套统一的接口, 为AJAX请求提供服务
- mockjs
    > 前端模拟数据， 基于`数据模板`生成模拟数据, 拦截并模拟 ajax 请求

兼容IE8, Easyui+jquery有基础, 可快速开发

## 技术的使用

### RequireJS

### 基于JQuery的AJAX

### mockjs