var path = require('path');
var webpack = require('webpack');

module.exports = {
    context: path.resolve(__dirname, 'app'),

    entry: {
        main: './main.js'
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },

    module: {
        noParse: /Vue/
    },

    // 依赖不需要进入webpack处理，直接引用全局对象
    externals: {
        vue: 'Vue'
    },
}