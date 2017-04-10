var Vue = require('vue');

Vue.component('my-component', {
    template: '<div>this is myself component~</div>'
});

new Vue({
    el: '#example'
})