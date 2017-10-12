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

    // 这些选项决定了如何处理项目中的不同类型的模块
    module: {
        // 不解析这里的模块
        noParse: [
            /special-library\.js$/
        ],

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

    // 这些选项能设置模块如何被解析
    resolve: {
        // 解析模块时应该搜索的目录
        modules: [
            'node_modules', 
            path.resolve(__dirname, 'app')
        ],

        // 使用的扩展名
        extensions: ['.js', '.json', '.jsx', '.css'],

        // 模块别名--创建 import 或 require 的别名，来确保模块引入变得更简单
        alias: {
            "module": "new-module", // module -> new-module
            "only-module$": 'new-module', // only-module结尾的 -> new-module

            // 模块别名相对于当前上下文导入
            // 起别名 "module" -> "./app/third/module.js" 和 "module/file" 会导致错误
            "module": path.resolve(__dirname, 'app/third/module.js')
        },

        /* 高级选项 */

        // 遵循符号链接(symlinks)到新位置
        symlinks: true,
    
        // 从 package 描述中读取的文件
        descriptionFiles: ["package.json"],
    
        // 当从 npm 包中导入模块时（例如，import * as D3 from "d3"），此选项将决定在 package.json 中使用哪个字段导入模块
        mainFields: ["main"],
    
        aliasFields: ["browser"],
        // 从描述文件中读取的属性
        // 以对此 package 的请求起别名
    
        enforceExtension: false,
        // 如果为 true，请求必不包括扩展名
        // 如果为 false，请求可以包括扩展名
    
        // 在解析模块（例如，loader）时尝试使用的扩展。默认是一个空数组
        moduleExtensions: ["-module"],
        // 如果你想要不带 -loader 后缀使用 loader
        moduleExtensions: ["-loader"],

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

    // 这些选项可以控制 webpack 如何通知「资源(asset)和入口起点超过指定文件限制」。 
    performance: {
        hint: 'warning', // 抛出警告
        hint: 'error', // 性能中抛出错误
        hint: false, // 关闭性能提示
        // 资源(asset)是从 webpack 生成的任何文件。
        // 此选项根据单个资源体积，控制 webpack 何时生成性能提示
        maxAssetSize: 250000,
        // 入口起点表示针对指定的入口，对于所有资源，要充分利用初始加载时(initial load time)期间。
        // 此选项根据入口起点的最大体积，控制 webpack 何时生成性能提示
        maxEntrypointSize: 400000,
        // 此属性允许 webpack 控制用于计算性能提示的文件
        assetFilter: function(assetFilename) {
            return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
        }
    },

    // 该选项控制是否生成源映射以及如何生成源映射。
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

    // externals 配置选项提供了「从输出的 bundle 中排除依赖」的方法。
    // 相反，所创建的 bundle 依赖于那些存在于用户环境(consumer's environment)中的依赖。
    // 此功能通常对 library 开发人员来说是最有用的，然而也会有各种各样的应用程序用到它
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
        
        // 告诉服务器从哪里提供内容。只有在你想要提供静态文件时才需要。devServer.publicPath 将用于确定应该从哪里提供 bundle，并且此选项优先。
        // 默认情况下，将使用当前工作目录作为提供内容的目录
        contentBase: path.join(__dirname, 'public'),
        
        // 允许访问dev服务器的白名单
        allowedHosts: [
            'host.com',
            'subdomain.host.com',
            'subdomain2.host.com',
            'host2.com'
        ],

        // 这个选项在启动时通过ZeroConf网络广播服务器
        bonjour: true,

        // 控制开发工具(DevTools)的控制台(console)的消息显示
        // none, error, warning 或者 info（默认值）
        clientLogLevel: none,

        // 是否启用gzip 压缩
        compress: true, 
        
        // 当设置为true时，该选项将绕过主机检查。不推荐使用不检查主机的应用程序是否容易受到DNS重新绑定攻击
        disableHostCheck: true,

        // 在惰性模式中，此选项可减少编译。 默认在惰性模式，每个请求结果都会产生全新的编译。使用 filename，可以只在某个文件被请求时编译
        // 在不使用惰性加载时没有效果
        filename: 'bundle.js',

        // 在所有响应中添加首部内容
        headers: {
            'X-Custom-Foo': 'bar'
        },

        // 当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html
        historyApiFallback: true,
        historyApiFallback: {
            rewrites: [
                { from: /^\/$/, to: '/views/landing.html' },
                { from: /^\/subpage/, to: '/views/subpage.html' },
                { from: /./, to: '/views/404.html' }
            ]
        },

        // 默认是 localhost, 如果你希望服务器外部可访问,指定使用一个 host, 
        host: '0.0.0.0',

        // 指定要监听请求的端口号
        port: 8080,

        // 启用 webpack 的模块热替换特性
        hot: true,

        // 启用热模块替换(见devserver.Hot)，而不需要页面刷新，以防出现构建失败。
        hotOnly: true,

        // 默认情况下，dev-server 通过 HTTP 提供服务。也可以选择带有 HTTPS 的 HTTP/2 提供服务
        https: false,
        https: {
            key: fs.readFileSync("/path/to/server.key"),
            cert: fs.readFileSync("/path/to/server.crt"),
            ca: fs.readFileSync("/path/to/ca.pem"),
        },

        // CLI信息输出。它是默认启用的
        info: true,

        // 在 dev-server 的两种不同模式之间切换。
        // 默认情况下，应用程序启用内联模式(inline mode)。这意味着一段处理实时重载的脚本被插入到你的包(bundle)中，并且构建消息将会出现在浏览器控制台
        // 也可以使用 iframe 模式，它在通知栏下面使用 <iframe> 标签，包含了关于构建的消息
        // 当使用模块热替换时，建议使用内联模式(inline mode)。
        inline: false,

        // 当启用 lazy 时，dev-server 只有在请求时才编译包(bundle)。
        // 这意味着 webpack 不会监视任何文件改动。我们称之为“惰性模式”
        lazy: true,

        // 启用 noInfo 后，诸如「启动时和每次保存之后，那些显示的 webpack 包(bundle)信息」的消息将被隐藏。错误和警告仍然会显示
        noInfo: true,

        // 打开启用时，dev服务器将打开浏览器
        open: true,

        // 指定在打开浏览器时导航到的页面
        openPage: '/home',

        // 当出现编译错误或警告时，在浏览器中显示一个全屏覆盖。默认情况下禁用。如果只想显示编译器错误
        overlay: true,
        overlay: {
            warnings: true,
            errors: true
        },
        
        // 代理
        // 如果你有单独的后端开发服务器 API，并且希望在同域名下发送 API 请求 ，那么代理某些 URL 会很有用
        proxy: { 
            '/api': 'http://localhost:3000', // 请求到 /api/users 现在会被代理到请求 http://localhost:3000/api/users
            "/api": {
                target: "http://localhost:3000",
                pathRewrite: {"^/api" : ""}
            }, // 请求到 /api/users 现在会被代理到请求 http://localhost:3000/users

            // 默认情况下，不接受运行在 HTTPS 上，且使用了无效证书的后端服务器。如果你想要接受，修改配置如下
            "/api": {
                target: "https://other-server.example.com",
                secure: false
            },

            // 有时你不想代理所有的请求。可以基于一个函数的返回值绕过代理。
            // 在函数中你可以访问请求体、响应体和代理选项。必须返回 false 或路径，来跳过代理请求。
            // 例如：对于浏览器请求，你想要提供一个 HTML 页面，但是对于 API 请求则保持代理。你可以这样做
            "/api": {
                target: "http://localhost:3000",
                bypass: function (req, res, proxyOptions) {
                    if (req.headers.accept.indexOf("html") !== -1) {
                        console.log("Skipping proxy for browser request.");
                        return "/index.html";
                    }
                }
            }
        },

        // 代理多个指定的路径到相同的目标
        proxy: [{
            context: ["/auth", "/api"],
            target: "http://localhost:3000",
        }],

        // 当使用内联模式(inline mode)并代理 dev-server 时，内联的客户端脚本并不总是知道要连接到什么地方。
        // 它会尝试根据 window.location 来猜测服务器的 URL，但是如果失败，你需要这样。
        // 例如，dev-server 被代理到 nginx，并且在 myapp.test 上可用
        public: 'myapp.test:80',

        // 此路径下的打包文件可在浏览器中访问, 默认 publicPath 是 "/"
        // 确保 publicPath 总是以斜杠(/)开头和结尾。
        publicPath: '/assets',

        // 启用 quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台。
        // 这也意味着来自 webpack 的错误或警告在控制台不可见
        quiet: true, 

        // 在这里，您可以访问Express app对象，并将自己的定制中间件添加到其中
        setup (app) {
            app.get('/some/path', function(req, res) {
                res.json({ custom: 'response' });
            });
        },

        // 监听指定socket, 代替host
        socket: 'socket',

        // 该选项允许您精确地控制哪些bundle信息被显示
        stats: 'error-only',

        // 文件更改将触发一个完整的页面重新加载
        watchContentBase: true
    },
  
    // 插件
    plugins: [
        // ...
    ],
};