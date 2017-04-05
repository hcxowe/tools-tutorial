var path = require('path');

module.exports = {
    // string
    context: path.resolve(__dirname, 'app'), // 默认使用当前目录，但是推荐在配置中传递一个值

    // string || object || array
    //entry: './a.js',  // 单页面
    //entry: ['./a.js', './b.js'], // 单页面， 导出为一个文件
    entry: {
        page1: './a.js', // 多页面
        page2: './b.js'
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        //filename: 'bundle.js'
        filename: '[name].[id].[hash].js',
    }
}