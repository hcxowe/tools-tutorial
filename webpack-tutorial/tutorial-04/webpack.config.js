var path = require('path');

module.exports = {
    context: path.resolve(__dirname, 'app'),

    entry: './index.js',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    }
};

/**
 * 可以通过CLI 命令行 
 * ../node_modules/.bin/webpack app/index.js dist/bundle.js、
 * or
 * ../node_modules/.bin/webpack
 * 
 * 都可以完成打包
 */