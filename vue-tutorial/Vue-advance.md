# Vue 进阶

## 深入响应式原理

- Vue将data的所有属性通过Object.defineProperty转换为setter/getter
- 组件实例的watcher实例对象在组件渲染时把属性记录为依赖
- 当依赖项的setter被调用时，同志watcher重新计算
- 相关联的组件更新

Vue 不能检测到对象属性的添加或删除, 属性必须在 data 对象上存在才是响应的

可以使用 `Vue.set(object, key, value)` 方法将响应属性添加到嵌套的对象上

`Vue.nextTick(callback)` | `vm.$nextTick(callback)` 添加callback到下一个tick的事件队列中

## 过渡效果

```html
<transition name="fade">
    <p v-if="show">hello</p>
</transition>
```
```css
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0
}
```
### 过渡的CSS类名

`v-enter` `v-enter-active` `v-enter-to` `v-leave` `v-leave-action` `v-leave-to`

### CSS 过渡动画

### 自定义过渡类名

```html
<link href="https://unpkg.com/animate.css@3.5.1/animate.min.css" rel="stylesheet" type="text/css">
<div id="example-3">
    <button @click="show = !show">
        Toggle render
    </button>
    <transition
        name="custom-classes-transition"
        enter-active-class="animated tada"
        leave-active-class="animated bounceOutRight">
        <p v-if="show">hello</p>
    </transition>
</div>
```

### 显性的过渡效果持续时间
用 <transition> 组件上的 duration 属性定制一个显性的过渡效果持续时间 (以毫秒计)

```html
<transition :duration="1000">...</transition>

<!--定制进入和移出的持续时间-->
<transition :duration="{ enter: 500, leave: 800 }">...</transition>
```

### JS 钩子

```html
<transition
    v-on:before-enter="beforeEnter"
    v-on:enter="enter"
    v-on:after-enter="afterEnter"
    v-on:enter-cancelled="enterCancelled"
    v-on:before-leave="beforeLeave"
    v-on:leave="leave"
    v-on:after-leave="afterLeave"
    v-on:leave-cancelled="leaveCancelled">
</transition>
```
当只用 JavaScript 过渡的时候， 在 enter 和 leave 中，回调函数 done 是必须的 。 否则，它们会被同步调用，过渡会立即完成

对于仅使用 JavaScript 过渡的元素添加 v-bind:css="false"，Vue 会跳过 CSS 的检测。这也可以避免过渡过程中 CSS 的影响

### 初始渲染的过渡

通过 appear 特性设置节点的在初始渲染的过渡

```html
<transition appear>
</transition>

<!--默认和进入和离开过渡一样，同样也可以自定义 CSS 类名-->
<transition
    appear
    appear-class="custom-appear-class"
    appear-to-class="custom-appear-to-class"
    appear-active-class="custom-appear-active-class">
</transition>

<!--自定义 JavaScript 钩子-->
<transition
    appear
    v-on:before-appear="customBeforeAppearHook"
    v-on:appear="customAppearHook"
    v-on:after-appear="customAfterAppearHook"
    v-on:appear-cancelled="customAppearCancelledHook">
</transition>
```

### 多个元素的过渡

当有相同标签名的元素切换时，需要通过 key 特性设置唯一的值来标记以让 Vue 区分它们
```html
<transition>
    <button v-if="isEditing" key="save">
        Save
    </button>
    <button v-else key="edit">
        Edit
    </button>
</transition>
```

### 过渡模式

- in-out: 新元素先进行过渡，完成之后当前元素过渡离开。
- out-in: 当前元素先进行过渡，完成之后新元素过渡进入

### 多个组件的过渡

多个组件的过渡简单很多 - 我们不需要使用 key 特性。相反，我们只需要使用动态组件

```html
<style>
    .component-fade-enter-active, .component-fade-leave-active {
        transition: opacity .3s ease;
    }
    .component-fade-enter, .component-fade-leave-to /* .component-fade-leave-active for <2.1.8 */ {
        opacity: 0;
    }
</style>
<transition name="component-fade" mode="out-in">
    <component v-bind:is="view"></component>
</transition>
```

```js
new Vue({
    el: '#transition-components-demo',
    data: {
        view: 'v-a'
    },
    components: {
        'v-a': {
            template: '<div>Component A</div>'
        },
        'v-b': {
        template: '<div>Component B</div>'
        }
    }
})
```

### 列表的过渡

使用 `<transition-group>` 组件
- 不同于 `<transition>`， 它会以一个真实元素呈现：默认为一个 `<span>`。你也可以通过 tag 特性更换为其他元素。
- 内部元素总是需要提供唯一的 key 属性值

#### 列表的进入与离开

#### 列表的位移过渡
v-move
```html
<style>
.flip-list-move {
    transition: transform 1s;
}
</style>
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.14.1/lodash.min.js"></script>
<div id="flip-list-demo" class="demo">
    <button v-on:click="shuffle">Shuffle</button>
    <transition-group name="flip-list" tag="ul">
        <li v-for="item in items" v-bind:key="item">
        {{ item }}
        </li>
    </transition-group>
</div>
```
```js
new Vue({
    el: '#flip-list-demo',
    data: {
        items: [1,2,3,4,5,6,7,8,9]
    },
    methods: {
        shuffle: function () {
            this.items = _.shuffle(this.items)
        }
    }
})
```

### 可复用的过渡

过渡可以通过 Vue 的组件系统实现复用。要创建一个可复用过渡组件，你需要做的就是将 `<transition>` 或者 `<transition-group>` 作为根组件，然后将任何子组件放置在其中

### 动态过渡

动态过渡最基本的例子是通过 name 特性来绑定动态值， 定义的 CSS 过渡/动画 在不同过渡间切换

## 过渡状态

通过 watcher 我们能监听到任何数值属性的数值更新，结合第三方库来补间，不断更新数值从而达到一个过渡效果
```html
<script src="https://unpkg.com/tween.js@16.3.4"></script>
<div id="animated-number-demo">
    <input v-model.number="number" type="number" step="20">
    <p>{{ animatedNumber }}</p>
</div>
```
```js
new Vue({
    el: '#animated-number-demo',
    data: {
        number: 0,
        animatedNumber: 0
    },
    watch: {
        number: function(newValue, oldValue) {
            var vm = this
            function animate () {
                if (TWEEN.update()) {
                    requestAnimationFrame(animate)
                }
            }

            new TWEEN.Tween({ tweeningNumber: oldValue })
                .easing(TWEEN.Easing.Quadratic.Out)
                .to({ tweeningNumber: newValue }, 500)
                .onUpdate(function () {
                    vm.animatedNumber = this.tweeningNumber.toFixed(0)
                })
                .onComplete(function () {
                    cancelAnimationFrame(animationFrame)
                })
                .start()

            animate()
        }
    }
})
```
动态过渡效果应用到 animatedNumber 属性上，当 number 更新时，执行TWEEN的补间 number 从旧值新的值，animatedNumber 则为这些补间的一系列值

## Render 函数

```js
Vue.component('anchored-heading', {
    render: function (createElement) {
        return createElement(
            'h' + this.level,   // tag name 标签名称
            this.$slots.default // 子组件中的阵列
        )
    },
    props: {
        level: {
            type: Number,
            required: true
        }
    }
})
```

### createElement 参数

```js
// @returns {VNode}
createElement(
    // {String | Object | Function}
    // 一个 HTML 标签字符串，组件选项对象，或者一个返回值类型为String/Object的函数，必要参数
    'div',
    // {Object}
    // 一个包含模板相关属性的数据对象
    // 这样，您可以在 template 中使用这些属性.可选参数.
    {
        // 和`v-bind:class`一样的 API
        'class': {
            foo: true,
            bar: false
        },
        // 和`v-bind:style`一样的 API
        style: {
            color: 'red',
            fontSize: '14px'
        },
        // 正常的 HTML 特性
        attrs: {
            id: 'foo'
        },
        // 组件 props
        props: {
            myProp: 'bar'
        },
        // DOM 属性
        domProps: {
            innerHTML: 'baz'
        },
        // 事件监听器基于 `on`
        // 所以不再支持如 `v-on:keyup.enter` 修饰器
        // 需要手动匹配 keyCode。
        on: {
            click: this.clickHandler
        },
        // 仅对于组件，用于监听原生事件，而不是组件内部使用 `vm.$emit` 触发的事件。
        nativeOn: {
            click: this.nativeClickHandler
        },
        // 自定义指令. 注意事项：不能对绑定的旧值设值
        // Vue 会为您持续追踪
        directives: [
            {
                name: 'my-custom-directive',
                value: '2',
                expression: '1 + 1',
                arg: 'foo',
                modifiers: {
                    bar: true
                }
            }
        ],
        // Scoped slots in the form of
        // { name: props => VNode | Array<VNode> }
        scopedSlots: {
            default: props => createElement('span', props.text)
        },
        // 如果组件是其他组件的子组件，需为 slot 指定名称
        slot: 'name-of-slot',
        // 其他特殊顶层属性
        key: 'myKey',
        ref: 'myRef'
    },
    // {String | Array}
    // 子节点 (VNodes)，由 `createElement()` 构建而成，
    // 或简单的使用字符串来生成“文本结点”。可选参数。
    [
        '先写一些文字',
        createElement('h1', '一则头条'),
        createElement(MyComponent, {
            props: {
                someProp: 'foobar'
            }
        })
    ]
)
```

## 自定义指令

```js
// 注册一个全局指令 -- 简写模式  只在bind与update上执行指定的函数
Vue.directive('color-swatch', function (el, binding) {
    el.style.backgroundColor = binding.value
})

// 注册一个全局自定义指令 v-focus --- 详细
Vue.directive('focus', {
    // 指令第一次绑定到元素时调用
    // el 指令索绑定的元素，用来直接操作DOM
    /*
    binding 一个对象 {
        name: 指令名,
        value: 指令的绑定值
        oldValue： 指令绑定的前一个值
        expression： 绑定值的字符串形式
        arg： 传给指令的参数
        modifiers： 一个包含修饰符的对象
    }
    */
    // vnode Vue编译生产的虚拟节点
    // oldVnode： 上一个虚拟节点
    bind: function(el, binding, vnode, oldVnode){

    },
    // 当绑定元素插入到 DOM 中。
    inserted: function (el) {
        // 聚焦元素
        el.focus()
    },
    // 被绑定元素所在模板进行更新时调用
    update: function() {

    },
    // 被绑定元素所在模板完成一次更新周期时调用
    componentUpdated: function() {

    },
    // 指令与元素解绑时调用
    unbind: function() {

    }
})

<!--注册局部指令-->
new Vue({
    directives: {
        focus: {
            // 指令的定义---
        }
    }
})
```
```html
<!--指令的使用-->
<input v-focus>
```

### 对象字面量

如果指令需要多个值，可以传入一个 JavaScript 对象字面量
```html
<div v-demo="{ color: 'white', text: 'hello!' }"></div>
```
```js
Vue.directive('demo', function (el, binding) {
    console.log(binding.value.color) // => "white"
    console.log(binding.value.text)  // => "hello!"
})
```

## 混合

## 基本用法
混合是一种灵活的分布式复用 Vue 组件的方式。混合对象可以包含任意组件选项。以组件使用混合对象时，所有混合对象的选项将被混入该组件本身的选项

当组件和混合对象含有同名选项时，这些选项将以恰当的方式混合。比如，同名钩子函数将混合为一个数组，因此都将被调用。另外，混合对象的 钩子将在组件自身钩子 之前 调用 

值为对象的选项，例如 methods, components 和 directives，将被混合为同一个对象。 两个对象键名冲突时，取组件对象的键值对

Vue.extend() 也使用同样的策略进行合并
```js
// 定义一个混合对象
var myMixin = {
    created: function () {
        console.log('混合对象钩子')
    },
    methods: {
        hello: function () {
            console.log('mixin hello')
        }
    }
}
// 定义一个使用混合对象的组件
var Component = Vue.extend({
    mixins: [myMixin],
    created: function() {
        console.log('组件自身钩子');
    },
    methods: {
        world: function() {
            console.log('组件 world');
        },
        hello: function() {
            console.log('组件 hello');
        }
    }
})
var component = new Component() // -> "混合对象钩子" '组件自身钩子'
component.hello(); // '组件 hello'
component.world(); // '组件 world'
```

### 全局混合

一旦使用全局混合对象，将会影响到 所有 之后创建的 Vue 实例
```js
// 为自定义的选项 'myOption' 注入一个处理器。 
Vue.mixin({
    created: function () {
        var myOption = this.$options.myOption
        if (myOption) {
            console.log(myOption)
        }
    }
})
new Vue({
    myOption: 'hello!'
}) //  'hello'
```
### 自定义选项将使用默认策略


## 插件

### 插件开发

插件通常会为Vue添加全局功能。插件的范围没有限制——一般有下面几种：
- 添加全局方法或者属性，如: vue-element
- 添加全局资源：指令/过滤器/过渡等，如 vue-touch
- 通过全局 mixin方法添加一些组件选项，如: vuex
- 添加 Vue 实例方法，通过把它们添加到 Vue.prototype 上实现。
- 一个库，提供自己的 API，同时提供上面提到的一个或多个功能，如 vue-router

```js
MyPlugin.install = function (Vue, options) {
    // 1. 添加全局方法或属性
    Vue.myGlobalMethod = function () {
        // 逻辑...
    }
    // 2. 添加全局资源
    Vue.directive('my-directive', {
        bind (el, binding, vnode, oldVnode) {
            // 逻辑...
        }
        ...
    })
    // 3. 注入组件
    Vue.mixin({
        created: function () {
            // 逻辑...
        }
        ...
    })
    // 4. 添加实例方法
    Vue.prototype.$myMethod = function (options) {
        // 逻辑...
    }
}
```

### 使用插件

`Vue.use(MyPlugin, { someOption: true })`

Vue.use 会自动阻止注册相同插件多次，届时只会注册一次该插件

## 单文件组件

```html
<template>
    <p>{{ hello }}</p>
</template>

<script>
    import * as data from './data'

    export default {
        name: 'Hello',
        data () {
            return {
                hello: 'hello Vue!'
            }
        }
    }
</script>

<style lang="less" scoped>
    p {
        color: red;
    }
</style>
```

## 生产/开发环境

## 路由

vue-router

## 状态管理

Vuex

## 单元测试

## 服务器端渲染
