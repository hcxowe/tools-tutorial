// 生产环境构建
/**
 * 包括 文件压缩 sourceMap 环境变量配置  手动为多环境配置环境
 * 
 * 文件压缩 -- webpack自带UglifyJsPlugin插件
 * 环境变量配置 -- webpack自带DefinePlugin插件
 * sourceMap -- devtool属性进行配置
 * 手动为多环境配置 -- 可以为不同环境创建不同的配置文件，也可以提取base部分与不同的部分 通过条件合并base与特定环境的配置
 */

var path = require('path');
var webpack = require('webpack');

module.exports = {
    context: path.resolve(__dirname, 'app'),

    entry: './index.js',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                screw_ie8: true
            },
            comments: false
        })
    ]
};