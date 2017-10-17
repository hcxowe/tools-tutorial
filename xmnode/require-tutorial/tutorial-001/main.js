require.config({
    /**
     * 模块查找的根目录
     * 如未显式设置baseUrl，则默认值是加载require.js的HTML所处的位置。
     * 如果用了data-main属性，则该路径就变成baseUrl
     */
    baseUrl: './js', 

    /**
     * path映射那些不直接放置于baseUrl下的模块名
     * 设置path时起始位置是相对于baseUrl的，除非该path设置以"/"开头或含有URL协议
     */
    paths: {
        'a': './sub/a',
        'ztree': './ztree/jquery.ztree.all',
        'jquery': './ztree/jquery-1.4.4.min'
    },

    /**
     * shim为那些没有使用define()来声明依赖关系、设置模块的"浏览器全局变量注入"型脚本做依赖和导出配置
     * 只针对没有使用AMD模式的脚本使用shim-不是使用define()定义的脚本
     */
    shim: {
        'ztree': {
            // jquery插件，依赖jquery，一旦加载完成，插件附在了jquery全局对象上，可以不使用exprots作为模块的导出值
            deps: ['jquery']
            //exports: 'jQuery.fn.zTree'
        },

        // jquery插件可以简化为这样
        'jquery.colorize': ['jquery'],

        // 未添加到require的依赖中的脚本都不会被加载
        'backbone': {
            // 依赖的脚本，在backbone之前加载
            deps: ['underscore', 'jquery'],
            //一旦加载完成，使用全局变量‘Backbone’作为模块的值
            exports: 'Backbone'
        }
    },

    /**
     * 在放弃加载一个脚本之前等待的秒数。设为0禁用等待超时。默认为7秒
     */
    waitSeconds: 15
});

require(['a', 'b', 'c', 'd', 'e', 'f', 'module', 'ztree'], function(a, b, c, d, e, f, module) {
    console.log(a);
    console.log(b);
    console.log(c);
    c.show();
    d();
    e.show();
    f.show();  
    console.log($.fn.zTree);
});