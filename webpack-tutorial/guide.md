# 指南

## 起步

`webpack --config webpack.config.js`

关键字：`entry`, `output`, `modules`, `webpack.config.js`

## 管理资源

### 加载CSS

`style-loader`, `css-loader`

### 加载图片

`file-loader`, `url-loader`

### 加载字体

`file-loader`

### 加载数据

`import Data from './data.json'` 可以正常运行

其他CSV,TSV,XML需要使用 `csv-loader`, `xml-loader`

## 管理输出

### 多个入口

`html-webpack-plugin`

### 清理输出目录

`clean-webpack-plugin`

### manifest转json

`webpack-manifest-plugin`

## 开发

### source map

用于将构建后的代码映射到构建前的代码

### webpack --watch

观察模式，当文件有变更自动构建

### webpack-dev-server

启动一个node服务器，当文件有变更自动构建并刷新浏览器，需要先安装

### webpack-dev-middleware

Express创建的服务器的中间件

## 模块热替换

模块局部刷新，不是整体刷新

### HMR修改样式表

借助于 `style-loader` 的帮助，CSS 的模块热替换实际上是相当简单的。当更新 CSS 依赖模块时，此 `loader` 在后台使用 `module.hot.accept` 来修补(patch) `<style>` 标签

## Tree Shaking

通常用于描述移除 JavaScript 上下文中的未引用代码(dead-code)。它依赖于 ES2015 模块系统中的静态结构特性，例如 import 和 export。

使用 tree shaking，需要：
- 使用 ES2015 模块语法（即 import 和 export）。
- 引入一个能够删除未引用代码(dead code)的压缩工具(minifier)（例如 UglifyJSPlugin）`uglifyjs-webpack-plugin`


## 配置

根据环境不同，将配置文件拆分为不同的文件： `webpack.common.js` `webpack.dev.js` `webpack.prod.js`

通过插件 `webpack-merge` 进行配置合并


## 代码分离

常用的代码分离方法：
- 入口起点：使用 entry 配置手动地分离代码。
- 防止重复：使用 CommonsChunkPlugin 去重和分离 chunk。
```js
const webpack = require('webpack');
module.exports = {
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common' // 指定公共 bundle 的名称。
        })
    ]
}
```
- 动态导入：通过模块的内联函数调用来分离代码

一些对于代码分离很有帮助的插件和 loaders：
- ExtractTextPlugin: 用于将 CSS 从主应用程序中分离。
- bundle-loader: 用于分离代码和延迟加载生成的 bundle。
- promise-loader: 类似于 bundle-loader ，但是使用的是 promises。

社区支持(community-supported)的webpack分析工具：
- webpack-chart: webpack 数据交互饼图。
- webpack-visualizer: 可视化并分析你的 bundle，检查哪些模块占用空间，哪些可能是重复使用的。
- webpack-bundle-analyzer: 一款分析 bundle 内容的插件及 CLI 工具，以便捷的、交互式、可缩放的树状图形式展现给用户