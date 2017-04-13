// 过渡效果
var Vue = require('vue');
var _ = require('lodash');

var app = new Vue({
    el: '#app',
    data: {
        show: true
    },
    methods: {
        beforeEnter: function (el) {
            el.style.opacity = 0
            el.style.transformOrigin = 'left'
        },
        enter: function (el, done) {
            Velocity(el, { opacity: 1, fontSize: '1.4em' }, { duration: 300 })
            Velocity(el, { fontSize: '1em' }, { complete: done })
        },
        leave: function (el, done) {
            Velocity(el, { translateX: '15px', rotateZ: '50deg' }, { duration: 600 })
            Velocity(el, { rotateZ: '100deg' }, { loop: 2 })
            Velocity(el, {
                rotateZ: '45deg',
                translateY: '30px',
                translateX: '30px',
                opacity: 0
            }, { complete: done })
        }            
    }
});

var list = new Vue({
    el: '#list-demo',
    data: {
        items: [1,2,3,4,5,6,7,8,9],
        nextNum: 10
    },
    methods: {
        randomIndex: function() {
            return Math.floor(Math.random() * this.items.length);
        },
        add: function() {
            this.items.splice(this.randomIndex(), 0, this.nextNum++);
        },
        remove: function() {
            this.items.splice(this.randomIndex(), 1);
        }
    }
});

var flip = new Vue({
    el: '#flip-list-demo',
    data: {
        items: [1,2,3,4,5,6,7,8,9]
    },
    methods: {
        shuffle: function () {
            this.items = _.shuffle(this.items)
        }
    }
});

var list2 = new Vue({
    el: '#list-complete-demo',
    data: {
        items: [1,2,3,4,5,6,7,8,9],
        nextNum: 10
    },
    methods: {
        randomIndex: function () {
            return Math.floor(Math.random() * this.items.length)
        },
        add: function () {
            this.items.splice(this.randomIndex(), 0, this.nextNum++)
        },
        remove: function () {
            this.items.splice(this.randomIndex(), 1)
        },
        shuffle: function () {
            this.items = _.shuffle(this.items)
        }
    }
});

var list3 = new Vue({
    el: '#list-more-demo',
    data: {
        //items: [1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,]
        items: Array.apply(null, { length: 81 })
            .map(function (_, index) { 
            return {
                id: index,
                number: index % 9 + 1
            }
        })
    },
    methods: {
        shuffle: function() {
            this.items = _.shuffle(this.items);
        }
    }
});

new Vue({
    el: '#sudoku-demo',
    data: {
        cells: Array.apply(null, { length: 81 })
            .map(function (_, index) { 
            return {
                id: index,
                number: index % 9 + 1
            }
        })
    },
    methods: {
        shuffle: function () {
            this.cells = _.shuffle(this.cells)
        }
    }
})