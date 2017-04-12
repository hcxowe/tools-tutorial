// 深入响应式原理
var Vue = require('vue');

Vue.component('my-example', {
    template: '<span>{{ message }}</span>',
    data: function() {
        return {
            message: '123'
        };
    },
    methods: {
        updateMessage: function() {
            this.message = 'new message';
            console.log(this.$el.textContent);

            // 回调函数中的this自动绑定到当前vue实例
            this.nextTick(function() {
                console.log(this.$el.textContent);
            });
        }
    }
});

var app = new Vue({
    el: '#app',
    data: {
        message: '123'
    }
});

app.message = 'new message';

console.log(app.$el.textContent);

Vue.nextTick(function() {
    console.log(app.$el.textContent);
});
