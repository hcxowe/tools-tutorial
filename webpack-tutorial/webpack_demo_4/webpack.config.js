var path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'webpack-numbers.js',
        library: 'webpackNumber', // 当你在 import 引入模块时，这可以将你的 library bundle 暴露为名为 webpackNumbers 的全局变量
        libraryTarget: 'umd' // 控制 library 如何以不同方式暴露的选项 var this window umd 
    },
    externals: {
        lodash: {
            commonjs: 'lodash',
            commonjs2: 'lodash',
            amd: 'lodash',
            root: '_'
        }
    }
}