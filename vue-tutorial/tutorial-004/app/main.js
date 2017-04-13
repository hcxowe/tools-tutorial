var Vue = require('vue');

var app = new Vue({
    el: '#app',
    data: {
        isActive: true,
        activeColor: 'blue',
        activeSize: 20,
        styleObject: {
            color: 'green',
            fontSize: '18px',
            fontWeight: 'bold'
        }
    }
});
