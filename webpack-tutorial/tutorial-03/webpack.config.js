var path = require('path');

module.exports = {

    context: __dirname,

    target: 'node',

    // 入口  string | object | array
    entry: './path/to/my/entry/file.js',
    entry: ['./src/page1.js', './src/page2.js'],
    entry: {
        app: './src/app.js', // 应用程序入口
        vendors: './src/vendors.js', // 公共库入口
    },
    entry: {
        page1: './src/page1.js',
        page2: './src/page2.js',
        page3: './src/page3.js',
        page4: './src/page4.js',
    },

    // 出口 
    output: {
        path: path.resolve(__dirname, 'dist'), // 绝对路径，此路径是你希望一次性打包的目录
        filename: '[name].js', // 指定硬盘每个输出文件的名称。在这里你不能指定为绝对路径 可以使用 [name] [hash] [chunkhash]
        chunkFilename: '', // 非入口的 chunk(non-entry chunk) 的文件名，路径相对于 output.path 目录
        crossOriginLoading: false, // 此选项启用跨域加载 use-credentials | anonymous | false
        devtoolLineToLine: false, // 所有/指定模块启用行到行映射(line-to-line mapped)模式
        hotUpdateChunkFilename: '', // 热更新 chunk(Hot Update Chunk) 的文件名
        hotUpdateFunction: 'webpackHotUpdate', // webpack 中用于异步加载(async load)热更新(hot update) chunk 的 JSONP 函数
        hotUpdateMainFilename: "[hash].hot-update.json", // 热更新主文件(hot update main file)的文件名
        jsonpFunction: 'webpackJsonp', // webpack 中用于异步加载(async loading) chunk 的 JSONP 函数
        library: '', // 如果设置此选项，会将 bundle 导出为 library。output.library 是 library 的名称
        libraryTarget: 'var', // library 的导出格式
        publicPath: '/assets/', // 在编译时不知道最终输出文件的 publicPath 的情况下，publicPath 可以留空，并且在入口起点文件运行时动态设置。如果你在编译时不知道 publicPath，你可以先忽略它，并且在入口起点设置 __webpack_public_path__。
        sourceMapFilename: '[file].map' // JavaScript 文件的 SourceMap 的文件名
    },

    // loader是对应用程序中资源文件进行转换。它们是（运行在 Node.js 中的）函数，可以将资源文件作为参数的来源，然后返回新的资源文件。
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/, 
                include: [path.resolve(__dirname, 'app')],
                exclude: [path,resolve(__dirname, './demo')],
                use: 'babel-loader',
                options: []
            }
        ]
    },

    resolve: {
        modules: [
            'node_modules',
            path.resolve(__dirname, 'app')
        ],

        extensions: ['.js', '.json', '.jsx', '.css'],

        alias: {
            'module': 'new-module',
            'only-module$': 'new-module',
            'module': path.resolve(__dirname, 'app/module.js')
        }
    },

    devtool: 'source-map',

    extensions: [],

    stats: {},

    devServer: {

    },

    //插件是 wepback 的支柱功能。在你使用 webpack 配置时，webpack 自身也构建于同样的插件系统上！ 插件目的在于解决 loader 无法实现的其他事。
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
};