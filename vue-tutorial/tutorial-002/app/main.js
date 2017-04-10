var Vue = require('vue');
require('./component/dome-component/dome-component');

var app = new Vue({
    el: '#app',
    data: {
        message: 'hello vue!', 
        show: true,
        visible: false,
        isActive: true,
        isHidden: false,
        items: [
            {message: 'hcxowe'},
            {message: 'owexch'}
        ],
        count: 0
    },
    computed: {
        reversedMessage: function() {
            return this.message.split('').reverse().join('');
        }
    },
    methods: {
        clock: function() {
            return Date.now();
        },
        counter: function() {
            this.count++;
        }
    },
    beforeCreate: function() {
        console.log("app before Create");
    },
    created: function() {
        console.log("app created");
    },
    beforeMount: function() {
        console.log("app beforeMount");
    },
    mounted: function() {
        console.log("app mounted");
    },
    beforeUpdate: function() {
        console.log("app before update");
    },
    updated: function() {
        console.log("app updated");
    },
    beforeDestroy: function() {
        console.log("app before destroy");
    },
    destroyed: function() {
        console.log("app destroyed");
    }
});

new Vue({
    el: '#example'
})