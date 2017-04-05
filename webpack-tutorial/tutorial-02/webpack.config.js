var path = require('path');
var webpack = require('webpack');

module.exports = {

    context: path.resolve(__dirname, 'app'),

    //entry: './a.js',
    entry: {
        main: './a.js',
        // vendor: './jquery.min.js'
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        //pathinfo: true, // 是否以注释形式在require中增加模块path信息
        // 配合url-loader|file-loader使用，在css或者html存在文件引入的地方配置文件的加载路径
        publicPath: 'dist/images/', // eg. 在app.css中以url(./images/1.png)的方式指定body的背景图片，最后文件生成的图片地址是相对于html的dist/images/[id].png
        filename: '[name].js',
        //chunkFilename: '[id].js', // 此选项决定了按需加载(on-demand loaded)的 chunk 文件的名称, 这些文件名需要在 runtime 根据 chunk 发送的请求去生成, http://react-china.org/t/webpack-output-filename-output-chunkfilename/2256/2
        //crossOriginLoading: false, // 是否允许跨域加载 false | anonymous | use-credentials        
        //sourceMapFilename: '[file].map'
    },

    module: {
        // 防止 webpack 解析那些任何与给定正则表达式相匹配的文件
        noParse: /jquery|lodash/,

        rules: [
            {
                 test: /\.css$/,
                 use: ['style-loader', 'css-loader']
            },

            {
                 test: /\.(png|jpg)$/, 
                 use: 'url-loader?limit=8192'
            }
         ]
    },

    resolve: {
        alias: {
            xxx: path.resolve(__dirname, 'app/xxx/'), // 路径的别名
            bbb: path.resolve(__dirname, 'app/b.js') // 文件的别名
        },
    },

    plugins: [
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendor',
        //     filename: 'vendor.min.js'
        // }),

        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false,
        //         drop_console: false
        //     }
        // })
    ],

    // 依赖不需要进入webpack处理，直接引用全局对象
    externals: {
        jquery: 'jQuery'
    },

    // webpack-dev-server配置
    devServer: {
        contentBase: path.join(__dirname, ""),
        compress: true,
        port: 9000,
        hot: true,
        inline: true
    }
};