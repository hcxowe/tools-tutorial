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
        a: './sub/a',
        'ztree': './ztree/jquery.ztree.all',
        'jquery': './ztree/jquery-1.4.4.min'
    },
    /**
     * shim为那些没有使用define()来声明依赖关系、设置模块的"浏览器全局变量注入"型脚本做依赖和导出配置
     * 只针对没有使用AMD模式的脚本使用shim-不是使用define()定义的脚本
     * 
     * RequireJS 2.0.*中，shim配置中的"exports"属性可以是一个函数而不是字串。这种情况下它就起到上述示例中的"init"属性的功能。 
     * RequireJS 2.1.0+中加入了"init"承接库加载后的初始工作，以使exports作为字串值被enforceDefine所使用
     * 
     * 请仅使用其他"shim"模块作为shim脚本的依赖，或那些没有依赖关系，并且在调用define()之前定义了全局变量(如jQuery或lodash)的AMD库。
     * 否则，如果你使用了一个AMD模块作为一个shim配置模块的依赖，在build之后，AMD模块可能在shim托管代码执行之前都不会被执行，这会导致错误。
     * 终极的解决方案是将所有shim托管代码都升级为含有可选的AMD define()调用。
     */
    shim: {
        'ztree': {
            // jquery插件，依赖jquery，一旦加载完成，插件附在了jquery全局对象上，可以不使用exprots作为模块的导出值
            deps: ['jquery']
            //exports: 'jQuery.fn.zTree'
        },
        // jquery插件可以简化为这样
        'jquery.colorize': ['jquery'],
        'jquery.scroll': ['jquery'],
        'backbone.layoutmanager': ['backbone'],

        // 未添加到require的依赖中的脚本都不会被加载
        'backbone': {
            // 依赖的脚本，在backbone之前加载
            deps: ['underscore', 'jquery'],
            //一旦加载完成，使用全局变量‘Backbone’作为模块的值
            exports: 'Backbone'
        }
    },
    /**
     * map-对于给定的模块前缀，使用一个不同的模块ID来加载该模块
     * 
     * 当“some/newmodule”调用“require('foo')”,它将获取到foo1.2.js文件;
     * 当“some/oldmodule”调用“require('foo')”,它将获取到foo1.0.js文件;
     */
    map: {
        'some/newmodule': {
            'foo': 'foo1.2'
        },
        'some/oldmodule': {
            'foo': 'foo1.0'
        }
    },

    /**
     * config:常常需要将配置信息传给一个模块。
     * 这些配置往往是application级别的信息，需要一个手段将它们向下传递给模块。
     * 在RequireJS中，基于requirejs.config()的config配置项来实现。
     * 要获取这些信息的模块可以加载特殊的依赖“module”，并调用module.config()
     */
    config: {
        './sub/a': {
            size: 'large'
        },
        './b': {
            color: 'blue'
        }
    },

    /**
     * 在放弃加载一个脚本之前等待的秒数。设为0禁用等待超时。默认为7秒
     */
    waitSeconds: 15,

    /**
     *  urlArgs:RequireJS获取资源时附加在URL后面的额外的query参数,作为浏览器或服务器未正确配置时的“cache bust”手段很有用
     * 在开发中这很有用，但请记得在部署到生成环境之前移除它
     */
    urlArgs: "bust=" +  (new Date()).getTime()
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
    console.log(module.config());
});


/**
 * IE 6-8中的script.onerror无效。没有办法判断是否加载一个脚本会导致404错；更甚地，在404中依然会触发state为complete的onreadystatechange事件。
 * IE 9+中script.onerror有效，但有一个bug：在执行脚本之后它并不触发script.onload事件句柄。因此它无法支持匿名AMD模块的标准方法。
 * 所以script.onreadystatechange事件仍被使用。但是，state为complete的onreadystatechange事件会在script.onerror函数触发之前触发。
 */