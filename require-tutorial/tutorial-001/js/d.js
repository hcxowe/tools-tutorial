// 模块的返回值不一定是object类型，函数也是可以
define(['./a'], function(a) {
    return function() {
        console.log(a.size);
    };
});