var Vue = require('vue');

// 全局配置
Vue.config.silent = false; // 取消Vue所有日志与警告
Vue.config.optionMergeStrategies = {}; // 自定义合并策略
Vue.config.devtools = true; // 是否允许 vue-devtools 检查代码
Vue.config.LerrorHandler = function() {}; // 指定组件的渲染和观察期间未捕获错误的处理函数。这个处理函数被调用时，可获取错误信息和 Vue 实例
Vue.config.ignoredElements = []; // 使vue忽略的的自定义元素，否则，vue会假设你忘记注册全局组件或者拼错了组件名称，从而抛出一个关于 Unknown custom element 的警告
Vue.config.keyCodes = {  // 给 v-on 自定义键位别名
    v: 86,
    f1: 112
};

// 全局API

//使用基础 Vue 构造器，创建一个“子类”。参数是一个包含组件选项的对象
var Profile = Vue.extend({
    template: '<p> {{ firstname}} {{ secondname }} aka {{ alias }} </p>',
    data: function() {
        return {
            firstname: 'hcx',
            secondname: 'owe',
            alias: 'Heisenberg'
        };
    }
});


// 创建 Profile 实例，并挂载到一个元素上
var app = new Profile().$mount('#mount-point');


// 在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM
app.firstname = 'xxxx';
Vue.nextTick(function() {
    console.log(app.firstname + '2');
});

console.log(app.firstname + '1');


// 设置对象的属性。如果对象是响应式的，确保属性被创建后也是响应式的，同时触发视图更新。这个方法主要用于避开 Vue 不能检测属性被添加的限制。
Vue.set(app.$data, 'alias', 'templageValue');
Vue.set(app, 'firstname', 'templageFirstName');


// 删除对象的属性。如果对象是响应式的，确保删除能触发更新视图。这个方法主要用于避开 Vue 不能检测到属性被删除的限制，但是你应该很少会使用它。
Vue.delete(app.$data, 'alias'); // 抛出警告Avoid deleting properties on a Vue instance or its root $data - just set it to null


// 注册或获取全局指令
Vue.directive('my-directive', {
    bind: function() {}, // 指令绑定到节点上触发
    inserted: function() {}, // 指令所在节点插入到dom中，或者其他节点中触发
    update: function() {}, // 所在节点update时触发
    compomentUpdated: function() {}, // 组件更新完成触发
    unbind: function() {} // 解除绑定触发
});

var myDirective = Vue.directive('my-directive'); // 返回已注册的指令


// 注册或获取全局过滤器
Vue.filter('my-filter', function(value) {
    // 返回处理后的值
    return value + value;
});

var myFilter = Vue.filter('my-filter');


// 注册或获取全局组件。注册还会自动使用给定的id设置组件的名称
Vue.component('my-component', {
    template: '<span>{{ message }}</span>',
    data: function() {
        return {
            message: 'message'
        };
    }
});
Vue.component('my-component1', Vue.extent({
    template: '<span>{{ message }}</span>',
    data: function() {
        return {
            message: 'message'
        };
    }
}));
var component = Vue.component('my-component'); // 获取组件


// 安装 Vue.js 插件。如果插件是一个对象，必须提供 install 方法。如果插件是一个函数，它会被作为 install 方法。install 方法将被作为 Vue 的参数调用
// 当 install 方法被同一个插件多次调用，插件将只会被安装一次
Vue.use({});


// 全局注册一个混合，影响注册之后所有创建的每个 Vue 实例。插件作者可以使用混合，向组件注入自定义的行为。不推荐在应用代码中使用
Vue.mixin({});


// 在render函数中编译模板字符串。只在独立构建时有效
var res = Vue.compile('<div><span>{{ msg }}</span></div>')
new Vue({
    data: {
        msg: 'hello'
    },
    render: res.render,
    staticRenderFns: res.staticRenderFns
});











