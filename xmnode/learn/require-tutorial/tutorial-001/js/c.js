// 定义一个模块，依赖其他模块
define(['./a', './b'], function(a, b) {
    return {
        name: 'module C',
        show: function() {
            console.log(a.color + '  ' + b.b);
        }
    }
});