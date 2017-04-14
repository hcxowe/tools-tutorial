// Render函数
var Vue = require('vue');

/**
   @returns {VNode}
    createElement(
        // {String | Object | Function}
        // 一个 HTML 标签字符串，组件选项对象，或者一个返回值类型为String/Object的函数，必要参数
        'div',
        // {Object}
        // 一个包含模板相关属性的数据对象
        // 这样，您可以在 template 中使用这些属性.可选参数.
        {
            // (详情见下一节)
        },
        // {String | Array}
        // 子节点(VNodes)，可以是一个字符串或者一个数组. 可选参数.
        [
            createElement('h1', 'hello world'),
            createElement(MyComponent, {
            props: {
                someProp: 'foo'
            }
            }),
            'bar'
        ]
    )
 */

Vue.component('auto-header', {
    render: function(createElement) {
        return createElement(
            'h'+this.level,     // tag name 标签名称
            this.$slots.default // 子元素被存储在组件实例中的 $slots.default
            );
    },
    props: {
        level: {
            type: Number,
            required: true
        }
    }
});

var app = new Vue({
    el: '#app',
    data: {
        items: [1,2,3,4,5,6]
    }
});

// 函数化组件
var EmptyList = { /* ... */ }
var TableList = { /* ... */ }
var OrderedList = { /* ... */ }
var UnorderedList = { /* ... */ }
Vue.component('smart-list', {
    functional: true,
    render: function (createElement, context) {
        function appropriateListComponent () {
        var items = context.props.items
        if (items.length === 0)           return EmptyList
        if (typeof items[0] === 'object') return TableList
        if (context.props.isOrdered)      return OrderedList
        return UnorderedList
        }
        return createElement(
        appropriateListComponent(),
        context.data,
        context.children
        )
    },
    props: {
        items: {
        type: Array,
        required: true
        },
        isOrdered: Boolean
    }
});