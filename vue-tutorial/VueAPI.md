## vue API

### 全局配置
```js
// Vue全局配置
Vue.config = {
    silent: true, // 取消vue所有日志与警告
    // 自定义合并策略的选项
    optionMergeStrategies：{
        _my_option: function(parent, child, vm) {
            return child + 1;
        }
    },
    devtools: true, // 是否允许 vue-devtools 检查代码
    errorHandler: function(err, vm) {}, // 指定组件渲染与观察期间未捕获错误的处理函数
    ignoredElements: [], // 须使 Vue 忽略在 Vue 之外的自定义元素
    // 给v-on自定义键位别名
    keyCodes: {
        v: 86,
        f1: 112
    }
}
```

### 全局API

```js
// 使用基础 Vue 构造器，创建一个“子类”。参数是一个包含组件选项的对象
var profile = Vue.extend({
    template: '<p>{{ name }}</p>',
    data: function() {
        return {
            name: 'hcxowe'
        }
    }
})

// 创建profile实例 并挂载到DOM元素上
new profile().$mount('#app')
```

```js
vm.name = 'rachel'
// 在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM
Vue.nextTick(function() {
    // 这里vm的DOM已经更新了
})
```

```js
// 设置对象的属性。
// 这个方法主要用于避开 Vue 不能检测属性被添加的限制, 如ary[index] = 'x' 或 ary.length = 0
// 注意对象不能是 Vue 实例，或者 Vue 实例的根数据对象
Vue.set(obj, key, value)

// 删除对象属性
Vue.delete(object, key)
```

```js
// 注册全局指令
Vue.directive('hcx-directive', {
    bind: function() {}, // 指令绑定到元素时调用
    inserted: function() {}, // 被绑定元素插入到父元素时调用
    update: function() {}, // 被绑定元素所在的模板更新时调用，而不论绑定值是否变化
    componentUpdated: function() {}, // 被绑定元素所在模板完成一次更新周期时调用
    unbind: function() {} // 指令与元素解绑时调用
})
```

```js
// 注册全局过滤器
Vue.filter('hcx-filter', function(value) {
    return '处理后的值'
})
```

```js
// 注册组件

// 传入一个扩展过的构造器
Vue.component('hcx-component', Vue.extend({ /* ... */ }))

// 传入一个选项对象（自动调用 Vue.extend）
Vue.component('hcx-component', { /* ... */ })

// 获取注册的组件（始终返回构造器）
var MyComponent = Vue.component('hcx-component')
new MyComponent().mount('#app')
```

```js
// 安装 Vue.js 插件
// 如果插件是一个对象，必须提供 install 方法。
// 如果插件是一个函数，它会被作为 install 方法。install 方法将被作为 Vue 的参数调用
import router from 'vue-router'
Vue.use(router)
```

```js
// mixin 混合
// 全局注册一个混合，影响注册之后所有创建的每个 Vue 实例。
// 插件作者可以使用混合，向组件注入自定义的行为。不推荐在应用代码中使用
Vue.mixin({
    created: function() {
        console.log('created')
    }
})
```

```js
// 在render函数中编译模板字符串。只在独立构建时有效
var res = Vue.compile('<div><span>{{ msg }}</span></div>')

new Vue({
  data: {
    msg: 'hello'
  },
  render: res.render,
  staticRenderFns: res.staticRenderFns
})
```

### 选项 / 数据

```html
<div id='app'>
    <my-cpm :message='name'></my-cpm>
</div>
```

```js
var hcxCpt = Vue.extend({
    template: '<span>{{ message }}</span>',
    //props 可以是数组或对象，用于接收来自父组件的数据。
    //props 可以是简单的数组，或者使用对象作为替代，对象允许配置高级选项，如类型检测、自定义校验和设置默认值。
    //props: ['message'],
    props: {
        name: {
            type: String,
            default: 'xxx',
            required: true,
            // 自定义验证方法
            validator: function(value) {
                return value.length >= 3
            }
        }
    }
    // 不应该对 data 属性使用箭头函数
    // 理由是箭头函数绑定了父级作用域的上下文，所以 this 将不会按照期望指向 Vue 实例
    data: function() {
        return {

        }
    }
})

Vue.component('my-cpm', hcxCpt)

var vm = new Vue({
    el: '#app',
    data: {
        /*
        Vue 实例的数据对象。Vue 将会递归将 data 的属性转换为 getter/setter，从而让 data 的属性能够响应数据变化

        以 _ 或 $ 开头的属性 不会 被 Vue 实例代理，因为它们可能和 Vue 内置的属性、 API 方法冲突。你可以使用例如 vm.$data._property 的方式访问这些属性
        */
        name: 'hcxowe',
        _age: 20,
        $email: 'hcxowe@126.com',
        status: 'good'
    },
    components: ['my-cpm'],
    /*
    计算属性将被混入到 Vue 实例中。所有 getter 和 setter 的 this 上下文自动地绑定为 Vue 实例
    不应该使用箭头函数来定义计算属性函数
    计算属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算
    */
    computed: {
        fullname: function() {
            return this.name + this.status
        }
    },
    /*
    methods 将被混入到 Vue 实例中。可以直接通过 VM 实例访问这些方法，或者在指令表达式中使用。方法中的 this 自动绑定为 Vue 实例

    不应该使用箭头函数来定义 method 函数

    如果模板中有绑定值为函数调用 add() 则当组件重新渲染时都会调用
    */
    methods: {
        add: function() {
            this._age += 1
        }
    },
    /*
    一个对象，键是需要观察的表达式，值是对应回调函数。值也可以是方法名，或者包含选项的对象。Vue 实例将会在实例化时调用 $watch()，遍历 watch 对象的每一个属性

    不应该使用箭头函数来定义 watcher 函数

    watch 与 computed 的主要区别是 watch中可执行异步操作
    */
    watch: {
        _age: function(val, oldVal) {

        }
    }
})

// 实例创建之后，可以通过 vm.$data 访问原始数据对象。
// Vue 实例也代理了 data 对象上所有的属性，因此访问 vm.a 等价于访问 vm.$data.a
vm.$data.name = vm.name
vm._age; // undefined
va.$data._age; // 20
```

```js
// 可以手动传入props 通过 propsData,可用于测试组件
var Comp = Vue.extend({
  props: ['msg'],
  template: '<div>{{ msg }}</div>'
})

var vm = new Comp({
  propsData: {
    msg: 'hello'
  }
})
```

### 选项 / DOM

```js
var vm = new Vue({
    /*
    只在由 new 创建的实例中遵守
    可以是 CSS 选择器，也可以是一个 HTMLElement 实例
    */    
    el: '#app',
    /*
    一个字符串模板作为 Vue 实例的标识使用。模板将会 替换 挂载的元素。

    挂载元素的内容都将被忽略，除非模板的内容有分发 slot

    如果 Vue 选项中包含 render 函数，template 选项将被忽略。
    */
    template: '<span>hello</span>',
    /*
    字符串模板的代替方案，允许你发挥 JavaScript 最大的编程能力。render 函数接收一个 createElement 方法作为第一个参数用来创建 VNode。

    如果组件是一个函数组件，Render 函数还会接收一个额外的 context 参数，为没有实例的函数组件提供上下文信息。
    */
    render: function(h, context) {
        return h(p, 'render')
    }
})

// 在实例挂载之后， 元素可以用 vm.$el 访问
console.log(vm.$el)

var cpt = Vue.extend({
    
})

// 显式调用 instance.$mount() 手动开启编译
new cpt().$mount('#app')
```

### 选项 / 生命周期钩子

```js
// 所有的生命周期钩子自动绑定 this 上下文到实例中，因此你可以访问数据，对属性和方法进行运算。这意味着 你不能使用箭头函数来定义一个生命周期方法
new Vue({
    el: '#app',
    // 在实例初始化之后，数据观测(data observer) 和 event/watcher 事件配置之前被调用
    beforeCreate: function() {},
    // 实例已经创建完成之后被调用。在这一步，实例已完成以下的配置：数据观测(data observer)，属性和方法的运算， watch/event 事件回调。然而，挂载阶段还没开始，$el 属性目前不可见
    created: function() {},
    // 在挂载开始之前被调用：相关的 render 函数首次被调用。
    // 该钩子在服务器端渲染期间不被调用
    beforeMount: function() {},
    // el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子。如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$el 也在文档内
    // 该钩子在服务器端渲染期间不被调用
    mounted: function() {},
    // 数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。
    // 你可以在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程
    // 该钩子在服务器端渲染期间不被调用
    beforeUpdate: function() {},
    // keep-alive 组件激活时调用。
    // 该钩子在服务器端渲染期间不被调用
    activated: function() {},
    // keep-alive 组件停用时调用。
    // 该钩子在服务器端渲染期间不被调用
    deactivated: function() {},
    // 实例销毁之前调用。在这一步，实例仍然完全可用。
    // 该钩子在服务器端渲染期间不被调用
    beforeDestory: function() {},
    // Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。
    // 该钩子在服务器端渲染期间不被调用
    destoryed: function() {}
})
```

### 选项 / 资源 / 杂项

```js
new Vue({
    el: '#app',
    // 自定义指令
    directives: {
        focus: {
            inserted: function(el, binding) {
                el.focus()
            }
        }
    },
    // 自定义过滤器  | 分隔多个过滤器
    filters: { 
        reserve: function(value) {
            return value.split('').reserve().join('');
        }
    },
    // 自定义组件
    components: {
        xxx: {
            template: '',
            data: function(){ return {} }
        }
    },
    // 指定已创建的实例之父实例，在两者之间建立父子关系。
    // 子实例可以用 this.$parent 访问父实例，子实例被推入父实例的 $children 数组中
    parent: '',
    // mixins 选项接受一个混合对象的数组。
    // 这些混合实例对象可以像正常的实例对象一样包含选项,他们将在 Vue.extend() 里最终选择使用相同的选项合并逻辑合并。
    // 举例：如果你混合包含一个钩子而创建组件本身也有一个,两个函数将被调用。
    // Mixin钩子按照传入顺序依次调用,并在调用组件自身的钩子之前被调用。
    mixins: [
        {
            created: function() {
                console.log(1)
            }
        }
    ],
    // 只有作为组件选项时起作用
    // 通过 name ，允许组件模板递归地调用自身
    // 组件在全局用 Vue.component() 注册时，全局 ID 自动作为组件的 name
    // 指定 name 选项的另一个好处是便于调试。有名字的组件有更友好的警告信息
    name: 'cmp',
    // 允许声明扩展另一个组件(可以是一个简单的选项对象或构造函数),而无需使用 Vue.extend。这主要是为了便于扩展单文件组件。
    // 这和 mixins 类似，区别在于，组件自身的选项会比要扩展的源组件具有更高的优先级。
    extends: CompA,
    // 改变纯文本插入分隔符。 这个选择只有在独立构建时才有用
    delimiters: ['${', '}'],
    // 使组件无状态（没有 data ）和无实例（没有 this 上下文）。他们用一个简单的 render 函数返回虚拟节点使他们更容易渲染
    functional: true
})

var CompA = { /*...*/ }
```

