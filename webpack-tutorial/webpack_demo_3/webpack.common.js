const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpckPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: './src/index.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpckPlugin({
            title: 'Production'
        })
    ]
}