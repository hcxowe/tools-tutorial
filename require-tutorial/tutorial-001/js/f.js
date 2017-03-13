// 可以使用commonjs模块模式编写,  避免对模块指定模块名称，可更具移植性，更快的载入速度
define(function(require, exports, module) {
    var d = require('d');

    return {
        show: d
    };
});