var Vue = require('vue');

var app = new Vue({
    el: '#app',
    data: {
        message: 'hello vue!', 
        isActive: true,
        isHidden: false
    },
    computed: {
        reversedMessage: function() {
            return this.message.split('').reverse().join('');
        }
    },
    methods: {
        clock: function() {
            return Date.now();
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