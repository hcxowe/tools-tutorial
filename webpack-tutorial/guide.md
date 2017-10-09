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



### HMR修改样式表

借助于 `style-loader` 的帮助，CSS 的模块热替换实际上是相当简单的。当更新 CSS 依赖模块时，此 `loader` 在后台使用 `module.hot.accept` 来修补(patch) `<style>` 标签





