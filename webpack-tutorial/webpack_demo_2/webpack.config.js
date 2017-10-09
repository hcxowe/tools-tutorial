const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 自动生成html插件
const CleanWebpackPligin = require('clean-webpack-plugin'); // 清理输出目录插件
const ManifestPlugin = require('webpack-manifest-plugin'); // 将manifest输出为json

module.exports = {
    entry: {
        app: './src/index.js',
        print: './src/print.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new CleanWebpackPligin(['dist']),
        new ManifestPlugin(),
        new HtmlWebpackPlugin({
            title: 'Output html-webpack-plugin'
        })
    ],
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
    }
}   