require('./a.js');

require.ensure(['./b'], function(require) {
    require('./c');

    console.log('done');
});

/**
 * a.js 与index.js将打包到一个文件，
 * b.js c.js打包到一个文件，按需请求文件并加载， 这里涉及到动态加入到html的head中，所以publicPath需要设置加入的文件的目录
 */