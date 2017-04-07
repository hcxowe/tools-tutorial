// 代码分离

const path = require('path');
const webpack = require('webpack');

// 将样式处理成一个单独的样式文件
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, 'app'),

    //entry: './index.js',
    entry: {
        main: './index.js',
        vendor: ['jQuery', 'moment']
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        //filename: '[chunkhash].[name].js'
        filename: '[name].js'
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                //use: ['style-loader', 'css-loader']
                use: ExtractTextPlugin.extract({
                    use: 'css-loader'
                })
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin('styles.css'),

        // 提取公共模块到 指定名字的文件
        new webpack.optimize.CommonsChunkPlugin({
            // 这种方式当应用文件变更的时候重新打包会重新生成文件，不利于浏览器缓存
            // name: 'vendor', // 公共 bundle 的名字
            // minChunks: function(module) {
            //     // 指定在node_modules中的模块都处理到单独的vendor文件中
            //     return module.context && module.context.indexOf('node_modules') !== -1;
            // }

            // 将运行时代码提取到一个单独的 manifest 文件中, 改变应用代码并不会重新生成vendor文件
            name: ['vendor', 'mainfest'] 
        })
    ]
};
