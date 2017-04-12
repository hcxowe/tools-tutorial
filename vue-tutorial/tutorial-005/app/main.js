// 条件渲染
var Vue = require('vue');

var app = new Vue({
    el: '#app',
    data: {
        ok: true,
        loginStep: 1,
        display: true
    },
    methods: {
        toggleStep: function() {
            this.loginStep == 1 ? this.loginStep++ : this.loginStep--;

            this.display = !this.display;

            this.ok = !this.ok;
        }
    }
});