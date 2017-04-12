// 组件
var Vue = require('vue');

Vue.component('my-component', {
    template: '<div>my component</div>'
});

Vue.component('button-counter', {
    template: '<button v-on:click="count+=1">{{ count }}</button>',
    data: function() {
        return {
            count: 0
        };
    }
});

Vue.component('child', {
    template: '<span> {{ message}} + {{ bigMessage }} + {{ parentMessage }} </span>',
    //props: ['message', 'bigMessage', 'parentMessage'],
    props: {
        message: {
            type: String,
            default: 'default'
        },
        bigMessage: {
            type: null,
            required: true
        },
        parentMessage: [String, Number],

        // 基础类型检测 （`null` 意思是任何类型都可以）
        propA: Number,
        // 多种类型
        propB: [String, Number],
        // 必传且是字符串
        propC: {
            type: String,
            required: true
        },
        // 数字，有默认值
        propD: {
            type: Number,
            default: 100
        },
        // 数组／对象的默认值应当由一个工厂函数返回
        propE: {
            type: Object,
            default: function () {
                return { message: 'hello' }
            }
        },
        // 自定义验证函数
        propF: {
            validator: function (value) {
                return value > 10
            }
        }
    }
});

Vue.component('child-two', {
    template: '<button v-on:click="increment"> {{count}} </button>',
    data: function() {
        return {
            count: 0
        };
    },
    methods: {
        increment: function() {
            this.count += 1;
            this.$emit('increment');
        }
    }
});


Vue.component('child-three', {
    template: '<div><h1> {{ title }} </h1> <slot name="slot1"></slot><p>这是分隔段落</p><slot name="slot2"></slot></div>',
    data: function() {
        return {
            title: 'title of child'
        }
    }
});


var app = new Vue({
    el: '#app',
    data: {
        parentMessage: '',
        total: 0
    },

    methods: {
        incrementTotal: function() {
            this.total += 1;
        }
    }
});

