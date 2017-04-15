// 自定义组件
var Vue = require('vue');

Vue.directive('focus', {
    inserted: function(el) {
        el.focus();
    }
});


var app = new Vue({
    el: '#app'
});

Vue.directive('test', {
    bind: function(el, binding, vnode) {
        var s = JSON.stringify;
        el.innerHTML = 
            'name:'         + s(binding.name) + '<br>' + 
            'value:'        + s(binding.value) + '<br>' + 
            'expression:'   + s(binding.expression) + '<br>' + 
            'argument:'     + s(binding.arg) + '<br>' + 
            'modifiers:'    + s(binding.modifiers) + '<br>' + 
            'vnode keys:'   + Object.keys(vnode).join(',')
    }
});

var app2 = new Vue({
    el: '#app2',
    data: {
        message: 'vuejs'
    }
});