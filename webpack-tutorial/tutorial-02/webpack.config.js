var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './app/index.js',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            //sourceMap: options.devtool && (options.devtool.indexOf('sourcemap') >=0 || options.devtool.indexOf('source-map') >= 0)
        })
    ]
};