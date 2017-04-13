// 时间处理器
var Vue = require('vue');

var vm1 = new Vue({
    el: '#example1', 
    data: {
        count: 0
    },
    methods: {
        addNum: function(event) {
            this.count += 1;
            console.log(event);
        },

        subNum: function(num, event) {
            this.count -= num;
            console.log(event);
        },

        alert: function(str) {
            alert(str);
        }
    }
});

