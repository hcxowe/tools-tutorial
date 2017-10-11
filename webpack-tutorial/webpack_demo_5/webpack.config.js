const path = require('path');

module.exports = {

    /* 
        基础目录
        绝对路径
        用于从配置中解析入口起点
        默认使用当前目录
    */
    context: __dirname,

    /* 
        起点或是应用程序的起点入口
        入口配置三种方式，字符串，数组，对象 
        如果传入一个字符串或字符串数组，chunk 会被命名为 main。如果传入一个对象，则每个键(key)会是 chunk 的名称，该值描述了 chunk 的入口起点。
    */
    entry: './app/entry', // string
    entry: ['./app/entry1', './app/entry2'], // array
    entry: { // object
        a: './app/entry-a',
        b: './app/entry-b'
    },

    /* 
        输出配置 
        指示 webpack 如何去输出、以及在哪里输出你的 bundle、asset 和其他你所打包或使用 webpack 载入的任何内容
    */
    output: {
        path: path.resolve(__dirname, 'dist'), // 所有输出文件的目标路径，必须是绝对路径
        
        filename: 'bundle.js', // 一个输出文件
        filename: '[name].bundle.js', // 多个入口
        filename: '[chunkhash].js', // 

        // 输出解析文件的目录，url相对于html页面
        // 对于按需加载(on-demand-load)或加载外部资源(external resources)（如图片、文件等）来说，output.publicPath 是很重要的选项
        publicPath: '/assets/', // 指定一个路径
        publicPath: '',
        publicPath: 'https://cdn.example.com/', // 指定为CDN

        // 导出库的名称，默认需要script加载，myLibrary为全局变量
        library: 'myLibrary',

        libraryTarget: 'var', // 定义library定义的变量
        libraryTarget: 'umd', // 通用模块定义，就是jquery最开始那段代码的模式
        libraryTarget: 'umd2',
        libraryTarget: 'commonjs2', // 使用 module.exports 导出
        libraryTarget: 'commonjs-module', 
        libraryTarget: 'amd', // 使用AMD方式
        libraryTarget: 'this', // 设置为this的属性
        libraryTarget: 'var', // 变量定义与跟作用域下
        libraryTarget: 'assign', // 这将产生一个隐含的全局变量，可能会潜在地重新分配到全局中已存在的值
        libraryTarget: 'window', // 设置为window的属性
        libraryTarget: 'global', // 设置为global的属性
        libraryTarget: 'jsonp', // jsonp 包装

        // 在和 output.library 和 output.libraryTarget 一起使用时，此选项允许用户向导出容器(export wrapper)中插入注释。
        // 要为 libraryTarget 每种类型都插入相同的注释，将 auxiliaryComment 设置为一个字符串
        auxiliaryComment: 'test', 
        auxiliaryComment: {
            root: "Root Comment",
            commonjs: "CommonJS Comment",
            commonjs2: "CommonJS2 Comment",
            amd: "AMD Comment"
        },

        /* 高级输出配置 */

        pathinfo: true, // 生成代码时，是否引入路径相关信息

        // 此选项决定了非入口(non-entry) chunk 文件的名称
        chunkFilename: '[id].js',
        chunkFilename: '[chunkhash].js',

        // chunk 请求到期之前的毫秒数，默认为 120 000
        chunkLoadTimeout: 120000,

        // 用于加载分块的jsonp函数
        jsonpFunction: 'myWebpackJsonp',

        // source map 的文件名模版
        sourceMapFilename: '[file].map',
        sourceMapFilename: 'sourcemap/[file].map',

        devtoolMoudleFilenameTemplate: 'webpack',
        devtoolFallbackModuleFilenameTemplate: 'webpack',

        umdNamedDefine: true, // 在UMD库中使用 AMD 模块

        // 指定运行时如何发出跨域请求问题
        crossOriginLoading: 'use-credentials', //  带凭据(credential)启用跨域加载 with credentials
        crossOriginLoading: 'anonymous', // 不带凭据(credential)启用跨域加载
        crossOriginLoading: false, // 禁用跨域加载（默认）

        /* 专家级配置 */
        hotUpdateMainFilename: '[hash].hot-update.json', // 「HMR 清单」的文件名模板

        hotUpdateChunkFilename: "[id].[hash].hot-update.js", // 「HMR 分块」的文件名模板
    
        sourcePrefix: "\t", // 包内前置式模块资源具有更好可读性
    },

    module: {
        rules: [
            // 模块规则， 配置loader、解析器选项
            {
                test: /\.jsx?$/,
                include: [
                    path.resolve(__dirname, 'app')
                ],
                exclude: [
                    path.resolve(__dirname, 'app/demo-files')
                ],
                issuer: {
                    test, 
                    include, 
                    exclude
                },
                // 标识应用这些规则，即使规则覆盖
                enforce: 'pre',
                enforce: 'post',
                loader: 'babel-loader',
                options: {
                    presets: ['es2015']
                }
            },

            {
                test: /\.html$/,
                test: '\.html$',
                
                use: [
                    'htmllint-loader',
                    {
                        loader: 'html-loader',
                        options: {

                        }
                    }
                ]
            },

            { oneOf: [ /* rules */ ] },
            // 只使用这些嵌套规则之一
      
            { rules: [ /* rules */ ] },
            // 使用所有这些嵌套规则（合并可用条件）
      
            { resource: { and: [ /* 条件 */ ] } },
            // 仅当所有条件都匹配时才匹配
      
            { resource: { or: [ /* 条件 */ ] } },
            { resource: [ /* 条件 */ ] },
            // 任意条件匹配时匹配（默认为数组）
      
            { resource: { not: ''/* 条件 */ } },
            // 条件不匹配时匹配
        ],

        /* 高级配置 */

        // 不解析这里的模块
        noParse: [
            /special-library\.js$/
        ],

        unknownContextRequest: ".",
        unknownContextRecursive: true,
        unknownContextRegExp: /^\.\/.*$/,
        unknownContextCritical: true,
        exprContextRequest: ".",
        exprContextRegExp: /^\.\/.*$/,
        exprContextRecursive: true,
        exprContextCritical: true,
        wrappedContextRegExp: /.*/,
        wrappedContextRecursive: true,
        wrappedContextCritical: false,
    },

    // 解析模块请求的选项
    resolve: {
        // 查找模块的目录
        modules: [
            'node_modules', 
            path.resolve(__dirname, 'app')
        ],

        // 使用的扩展名
        extensions: ['.js', '.json', '.jsx', '.css'],

        // 模块别名
        alias: {
            "module": "new-module", // module -> new-module
            "only-module$": 'new-module', // only-module结尾的 -> new-module

            // 模块别名相对于当前上下文导入
            // 起别名 "module" -> "./app/third/module.js" 和 "module/file" 会导致错误
            "module": path.resolve(__dirname, 'app/third/module.js')
        },

        /* 高级选项 */
        symlinks: true,
        // 遵循符号链接(symlinks)到新位置
    
        descriptionFiles: ["package.json"],
        // 从 package 描述中读取的文件
    
        mainFields: ["main"],
        // 从描述文件中读取的属性
        // 当请求文件夹时
    
        aliasFields: ["browser"],
        // 从描述文件中读取的属性
        // 以对此 package 的请求起别名
    
        enforceExtension: false,
        // 如果为 true，请求必不包括扩展名
        // 如果为 false，请求可以包括扩展名
    
        moduleExtensions: ["-module"],
        enforceModuleExtension: false,
        // 类似 extensions/enforceExtension，但是用模块名替换文件
    
        unsafeCache: true,
        unsafeCache: {},
        // 为解析的请求启用缓存
        // 这是不安全，因为文件夹结构可能会改动
        // 但是性能改善是很大的
    
        cachePredicate: (path, request) => true,
        // predicate function which selects requests for caching
    
        plugins: [
          // ...
        ]
        // 应用于解析器的附加插件
    },

    performance: {
        hint: 'warning', // 抛出警告
        hint: 'error', // 性能中抛出错误
        hint: false, // 关闭性能提示
        maxAssetSize: 2000,
        maxEntrypointSize: 40000,
        assetFilter: function(assetFilename) {
            return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
        }
    },

    // 通过在浏览器调试工具(browser devtools)中添加元信息(meta info)增强调试
    devtool: 'source-map',                  // 牺牲了构建速度的 `source-map' 是最详细的。
    devtool: 'inline-source-map',           // 嵌入到源文件中
    devtool: 'eval-source-map',             // 将 SourceMap 嵌入到每个模块中
    devtool: 'hidden-source-map',           // SourceMap 不在源文件中引用
    devtool: 'cheap-source-map',            // 没有模块映射(module mappings)的 SourceMap 低级变体(cheap-variant)
    devtool: 'cheap-module-source-map',     // 有模块映射(module mappings)的 SourceMap 低级变体
    devtool: 'eval',                        // 没有模块映射，而是命名模块。以牺牲细节达到最快。

   

    // 包(bundle)应该运行的环境
    target: "web", // 枚举
    target: "webworker", // WebWorker
    target: "node", // node.js 通过 require
    target: "async-node", // Node.js 通过 fs and vm
    target: "node-webkit", // nw.js
    target: "electron-main", // electron，主进程(main process)
    target: "electron-renderer", // electron，渲染进程(renderer process)
    target: (compiler) => { /* ... */ }, // 自定义

    // 不要遵循/打包这些模块，而是在运行时从环境中请求他们
    externals: ["react", /^@angular\//],
    externals: "react", // string（精确匹配）
    externals: /^[a-z\-]+($|\/)/, // 正则
    externals: { // 对象
        angular: "this angular", // this["angular"]
        react: { // UMD
            commonjs: "react",
            commonjs2: "react",
            amd: "react",
            root: "React"
        }
    },
    externals: (request) => { /* ... */ return "commonjs " + request },
    
    // 精确控制要显示的 bundle 信息
    stats: "errors-only",
    stats: { //object
        assets: true,
        colors: true,
        errors: true,
        errorDetails: true,
        hash: true,
        // ...
    },

    devServer: {
        // 代理
        proxy: { 
            '/api': 'http://localhost:3000'
        },

        contentBase: path.join(__dirname, 'public'),
        compress: true, // 是否压缩
        historyApiFallback: true, 
        hot: true, 
        https: false, 
        noInfo: true, 
    },
  
    // 插件
    plugins: [
        // ...
    ],
};