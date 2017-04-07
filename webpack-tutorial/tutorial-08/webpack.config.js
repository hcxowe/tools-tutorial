// require.ensure
const path = require('path');
module.exports = {
    context: path.resolve(__dirname, 'app'),

    entry: {
        bundle: './index.js',
        a: './a.js',
        b: './b.js',
        c: './c.js'
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        /**
         * 不要在开发环境下使用 [chunkhash]，因为这会增加编译时间。
         * 将开发和生产模式的配置分开，并在开发模式中使用 [name].js 的文件名， 在生产模式中使用 [name].[chunkhash].js 文件名。
         */
        //filename: '[name].[hash].js', // 每次hash值都不一样
        filename: '[name].[chunkhash].js' // 根据文件内容生成 chunkhash
    }
};
