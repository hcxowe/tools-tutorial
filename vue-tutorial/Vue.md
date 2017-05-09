### Vuejs是什么?

- 一套构建用户界面的渐进式MVVM框架
- 轻量级框架 
- 采用自底向上增量开发的设计
- 核心库只关注视图层，便于与第三方库整合

### Vue实例创建方式

```javascript
    // 通过构造函数 Vue 创建一个 Vue 的根实例启动
    var vm = new Vue({
        el: '',
        template: '',
        data: {},
        methods: {},
        computed: {},
        created () {},
        ...
    })

    // 扩展 Vue 构造器，从而用预定义选项创建可复用的组件构造器
    var myComponent = Vue.extend({
        ...
    })

    var instance = new myComponent();
```

> 注意，不要在实例属性或者回调函数中（如 vm.$watch('a', newVal => this.myMethod())）使用箭头函数。因为箭头函数绑定父上下文，所以 this 不会像预想的一样是 Vue 实例，而是 this.myMethod 未被定义。

### Vue实例生命周期

配置数据观察，初始化事件， 编译模板， 挂载实例到DOM, 数据变化时更新DOM, 销毁实例

```js
vm = new Vue()

beforeCreate

Observe Data --- 数据观察

Init Events --- 初始化事件

created

Has 'el' option  如果没有则在创建之后显式调用 vm.$mount(el) 进行挂载

Has 'template' option  是否有 'template'

yes - > 使用render function（渲染函数）编译模板

no -> 使用 el 的outerHtml 作为 template

beforeMount

create vm.$el 并使用它替换 el

mounted

Mounted 

when data changes -> beforeUpdate -> Virtual DOM re-render patch - > updated

when vm.$destory is called -> beforeDestory -> 移除监听，子组件，监听事件 -> destoryed

```

### Vue 的HTML模板语法

#### 插值

- 文本

```html
<!--Mustache” 语法（双大括号）, Mustache 不能在 HTML 属性中使用-->
<span>Message: {{ msg }}</span>
<span v-once>This will never change: {{ msg }}</span>
```

- 纯HTML

```html
<!--被插入的内容都会被当做 HTML —— 数据绑定会被忽略。注意，你不能使用 v-html 来复合局部模板，因为 Vue 不是基于字符串的模板引擎-->
<div v-html="rawHtml"></div>

<!--你的站点上动态渲染的任意 HTML 可能会非常危险，因为它很容易导致 XSS 攻击。请只对可信内容使用 HTML 插值，绝不要对用户提供的内容插值。-->
```

- 属性

```html
<div v-bind:id="dynamicId"></div>
```

- js表达式

```html
{{ number + 1 }}
{{ ok ? 'YES' : 'NO' }}
{{ message.split('').reverse().join('') }}
<div v-bind:id="'list-' + id"></div>

<!--模板表达式都被放在沙盒中，只能访问全局变量的一个白名单，如 Math 和 Date 。你不应该在模板表达式中试图访问用户定义的全局变量。-->
```

#### 指令

指令（Directives）是带有 v- 前缀的特殊属性。指令属性的值预期是单一 JavaScript 表达式（除了 v-for）。指令的职责就是当其表达式的值改变时相应地将某些行为应用到 DOM 上

指令名称:参数.修饰符 = '绑定值'
```html
<p v-if="seen">Now you see me</p>
<p v-on:click.stop="seen">Now you see me</p>
<!--v-dir:param.modifiers='value'-->
```

#### 过滤器

Vue.js 允许你自定义过滤器，可被用作一些常见的文本格式化。

过滤器可以用在两个地方：mustache 插值和 v-bind 表达式。

过滤器应该被添加在 JavaScript 表达式的尾部，由“管道”符指示

```html
<!-- in mustaches -->
{{ message | capitalize }}
<!-- in v-bind -->
<div v-bind:id="rawId | formatId"></div>
```

### 计算缓存与方法的区别

```html
<div id='app'>
  <p>{{ dateTime() }}</p>
  <p>{{ date }} </p>
  <p>{{ count }}</p>
  <button @click="add">add</button>
</div>
```

```js
new Vue({
	el: '#app',
  data: {
  	count: 0
  },
  methods: {
  	dateTime: function() {
    	return new Date();
    },
    add: function(){
    	this.count += 1;
    }
  },
  computed: {
  	date: function() {
    	return new Date();
    }
  }
})
```

计算属性是基于它们的依赖进行缓存的。计算属性只有在它的相关依赖发生改变时才会重新求值

相比计算属性，只要发生重新渲染，method 调用总会执行该函数

上面的示例当点击按钮，界面重新渲染时，dateTime每次渲染都会调用，而date并不会改变


### computd 与 watch 的区别

都是当依赖变更时进行处理

watch --- 当你想要在数据变化响应时，执行异步操作或开销较大的操作

使用 watch 选项允许我们执行异步操作，限制我们执行该操作的频率，并在我们得到最终结果前，设置中间状态。这是计算属性无法做到的

尽量用computed计算属性来监视数据的变化，watch通常比computd写出来复杂

计算属性的处理函数需要同步返回一个数据，所以无法处理异步操作

watch监听的是data中的属性，可在异步操作之后进行操作该值


### v-if 与 v-show的区别

v-show 显示/隐藏 元素, 元素始终存在DOM中，v-show 不支持 `<template>` 语法，也不支持 v-else

v-if  是真正的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建

v-if 比 v-show 有更高的切换开销

当 v-if 与 v-for 一起使用时，v-for 具有比 v-if 更高的优先级

### key 的作用

Vue 会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染，使用一个唯一值的keys属性来告诉Vue, 这个元素是独立的，不要复用他们

### 数组的变异方法

push()
pop()
shift()
unshift()
splice()
sort()
reverse()

这些方法都会改变原数组，所以Vue做了变异封装，使用他们给数据赋值将会触发视图更新

Vue不能检测通过 art[index]=value, ary.length=len 来改变数组的操作，这些操作需要通过变异方法重新实现即可，或者使用Vue.set(vm.items, index, value)的方式


### 事件修饰符

.stop 
.prevent
.capture
.self
.once
.native

once可以用于组件的自定义事件，其他只能用在原生DOM事件上

### 按键修饰符

.enter
.tab
.delete
.esc
.space
.up
.down
.left
.right
.ctrl
.alt
.shift
.meta


### 为什么Vue在html中监听事件

Vue.js 事件处理方法和表达式都严格绑定在当前视图的 ViewModel 上，它不会导致任何维护上的困难。

使用 v-on 有几个好处：

- 扫一眼 HTML 模板便能轻松定位在 JavaScript 代码里对应的方法。

- 因为你无须在 JavaScript 里手动绑定事件，你的 ViewModel 代码可以是非常纯粹的逻辑，和 DOM 完全解耦，更易于测试。

- 当一个 ViewModel 被销毁时，所有的事件处理器都会自动被删除。你无须担心如何自己清理它们。

### 表单控件的绑定

v-model 

修饰符 

.lazy input -> change

.number

.trim

### 组件

```js
// 注册一个全局组件
Vue.component('my-component', {
  // 选项
})

// 局部注册
new Vue({
    // ...
    components: {
        // <my-component> 将只在父模板可用
        'my-component': {
            // myMessage 在组件上需要<my-component my-message="xxxx"></my-component>进行传递
            props: {
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
            }, 
            // data 必须是函数
            data: function(){

            }
        }
    }
})
```

### DOM模板解析

当使用 DOM 作为模版时（例如，将 el 选项挂载到一个已存在的元素上）, 你会受到 HTML 的一些限制，因为 Vue 只有在浏览器解析和标准化 HTML 后才能获取模版内容。尤其像这些元素 `<ul> ，<ol>，<table> ，<select>` 限制了能被它包裹的元素， 而一些像`<option>` 这样的元素只能出现在某些其它元素内部
```html
<table>
  <my-row>...</my-row>
</table>
<!--自定义组件 <my-row> 被认为是无效的内容，因此在渲染的时候会导致错误。变通的方案是使用特殊的 is 属性-->
<table>
  <tr is="my-row"></tr>
</table>
```

使用来自以下来源之一的字符串模板，上面的限制将不适用
- `<script type="text/x-template">`
- JavaScript内联模版字符串
- .vue 组件

### 父子组件如何通信

父组件通过 props 向下传递数据给子组件，子组件通过 events 给父组件发送消息


### vue如何跟踪变化

Vue遍历data属性,使用Object.defineProperty将data的所有属性都转化为getter/setter,在其中跟踪依赖，当属性被访问和修改的时通知变化

每个组件都有相应的watcher实例对象，它会在组件渲染的过程中把属性记录为依赖，之后当依赖项的 setter 被调用时，会通知 watcher 重新计算，从而使它关联的组件得以更新

watcher 收集依赖的属性， getter/setter在依赖的属性发生变更或者访问时通知watcher, watcher引发重新渲染组件


