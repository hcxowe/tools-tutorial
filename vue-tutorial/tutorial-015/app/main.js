// 混合
var Vue = require('vue');

var mixin = {
    created: function () {
        console.log('混合对象的钩子被调用')
    }
};
new Vue({
    mixins: [mixin],
    created: function () {
        console.log('组件钩子被调用')
    }
});