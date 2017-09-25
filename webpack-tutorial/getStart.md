# Webpack

> webpack 是 JavaScript 应用程序的模块打包器

> 四个核心概念：入口-entry、输出-output、loader、插件-plugins

### 入口起点

> webpack 创建应用程序所有依赖的关系图(dependency graph)。   
> 图的起点被称之为入口起点(entry point)。入口起点告诉 webpack 从哪里开始，并根据依赖关系图确定需要打包的内容。

```js
// 单个入口
const config = {
    entry: './js/main.js'
};

// 对象语法
const config = {
    entry: {
        main: './js/main.js',
        vendors: './js/vendors.js'
    }
};
```

#### 单页面应用
```js
const config = {
    entry: {
        main: './js/main.js', // 应用程序入口
        vendors: './js/vendors.js' // 第三方库入口
    }
};
```

#### 多页面应用
```js
const config = {
    entry: {
        onepage: './js/one.js',
        twopage: './js/two.js',
        threepage: './js/three.js'
    }
};
```

### 输出 output
 
> 告诉 webpack 在哪里打包应用程序

```js
const config = {
    output: {
        filename: '[name].js',
        path: __dirname + '/dist',
        publicPath: "http://cdn.example.com/assets/[hash]/" // 使用 CDN 和资源 hash
    }
};
```

### loader

>  loader 在文件被添加到依赖图中时，其转换为模块

```js
const config = {
    module: {
        rules: [
            // 当碰到「在 require()/import 语句中被解析为 '.txt' 的路径」时，在打包之前，先使用 raw-loader 转换一下
            { test: /\.txt$/, use: 'raw-loader' },
            { 
                test: /\.css$/, 
                use: 
                [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    }
                ]
            },
            { test: /\.ts$/, use: 'ts-loader' }
        ]
    }
}
```
#### loader的特性
- loader 支持链式传递。能够对资源使用流水线(pipeline)。一组链式的 loader 将按照先后顺序进行编译。loader 链中的第一个 loader 返回值给下一个 loader。在最后一个 loader，返回 webpack 所预期的 JavaScript。
- loader 可以是同步的，也可以是异步的。
- loader 运行在 Node.js 中，并且能够执行任何可能的操作。
- loader 接收查询参数。用于对 loader 传递配置。
- loader 也能够使用 options 对象进行配置。
- 插件(plugin)可以为 loader 带来更多特性。
- loader 能够产生额外的任意文件。

### 插件 plugins

> 然而由于 loader 仅在每个文件的基础上执行转换，而 插件(plugins) 更常用于（但不限于）在打包模块的 “compilation” 和 “chunk” 生命周期执行操作和自定义功能

> 插件是 wepback 的支柱功能。webpack 自身也是构建于，你在 webpack 配置中用到的相同的插件系统之上！

> 插件目的在于解决 loader 无法实现的其他事

> 由于插件可以携带参数/选项，你必须在 webpack 配置中，向 plugins 属性传入 new 实例

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const config = {
    plugins: [
        new webpack.optimize.UglifyJsPlugin(), // 压缩
        new HtmlWebpackPlugin({template: './src/index.html'}) // 根据模版自动生成html
    ]
};
```

### 模块

#### webpack 模块能够以各种方式表达它们的依赖关系

- ES2015 import 语句
- CommonJS require() 语句
- AMD define 和 require 语句
- css/sass/less 文件中的 @import 语句。
- 样式(url(...))或 HTML 文件(<img src=...>)中的图片链接(image url)

### 配置

#### webpack 配置是标准的 Node.js CommonJS 模块，你可以做到以下事情：

- 通过 require(...) 导入其他文件
- 通过 require(...) 使用 npm 的工具函数
- 使用 JavaScript 控制流表达式，例如 ?: 操作符
- 对常用值使用常量或变量
- 编写并执行函数来生成部分配置

### 模块解析

> resolver 是一个库(library)，用于帮助找到模块的绝对路径

#### webpack 能够解析三种文件路径

- 绝对路径
- 相对路径   
    > 使用import或require的文件所在目录认定为上下文目录结合给定的相对路径,产生决定路径
- 模块路径
    > 模块将在 resolve.modules 中指定的所有目录内搜索

### 缓存

> 每个文件系统访问都被缓存，以便更快触发对同一文件的多个并行或穿行请求