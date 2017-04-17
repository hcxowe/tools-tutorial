var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, 'app'),

    entry: {
        main: './main.js'
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },

    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.common.js',
            'vue-router$': 'vue-router/dist/vue-router.common.js'
        }
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: './template/index.html'
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'vender',
            filename: 'vender.js',
            minChunks: function(module, count) {
                return module.resource && (/node_modules/).test(module.resource);
            }
        })
    ]
}