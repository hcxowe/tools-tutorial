# Vue

## 兼容性

Vue需要用到ES5的defineProperty来设置数据监听，而该特性无法使用ES3进行模拟，故只能兼容支持ES5的浏览器

## 更新日志

[Github](https://github.com/vuejs/vue/releases) 这里查看Vue的更新日志

## CDN

https://unpkg.com/vue

## Vue-CLI

```
$ npm install vue
$ npm install vue-cli --global
$ vue init webpack myProject
$ cd myProject
$ npm install
$ npm run dev
```

## 配置npm镜像

配置淘宝的npm镜像
```
$ npm config set registry https://registry.npm.taobao.org
```
验证配置
```
$ npm config get registry
```

## 术语

Compiler：负责将模板字符串编译为JS渲染函数   
Runtime：负责创建Vue实例，渲染更新`virtual DOM`   
UMD: 直接在浏览器通过 `<script>` 标签使用vue   
CommonJS：   
ES Module：

## 生产环境 / 开发环境

CommonJS/ES 模块中通过`process.env.NODE_ENV`检测当前环境

```js
var webpack = require('webpack')
module.exports = {
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        })
    ]
}
```

## Vue实例

### 构造器
每个 Vue.js 应用都是通过构造函数 Vue 创建一个 Vue 的根实例启动的   
```js
var vm = new Vue({
  // 选项
})
```

所有的 Vue.js 组件其实都是被扩展的 Vue 实例
```js
var MyComponent = Vue.extend({
  // 扩展选项
})
// 所有的 `MyComponent` 实例都将以预定义的扩展选项被创建
var myComponentInstance = new MyComponent()
```

### 属性与方法

Vue实例会代理其`data`属性的对象值里的所有属性，被代理的这些属性是响应的。

除了 data 属性， Vue 实例暴露了一些有用的实例属性与方法。这些属性与方法都有前缀 $，以便与代理的 data 属性区分，eg：$el、$data、$watch

### 声明周期

当创建一个Vue实例时
- beforeCreate 钩子
- 数据观察 --- 代理data对象的所有属性，监视数据变更
- 事件初始化
- created 钩子
- 如果没有 el 选项，则在调用 vm.mount(el) 时， 或者存在 el 选项时， 编译模板：如果存在 template 选项，则编译模板到渲染函数，否则编译 el 的 outerHTML 为模板
- beforeMount 钩子
- 挂载 --- 创建 vm.$el 替代 el 
- mountd 钩子
- 数据变更
- beforeUpdate 钩子
- 更新DOM
- updated 钩子
- beforeDestory 钩子
- 销毁实例
- destoryed 钩子

## 模板语法

### 文本

Mustache 语法（双大括号）

```html
<span>{{ msg }}</span>
```

### 纯HTML

```html
<div v-html="rawHtml"></div>
```

### 属性

```html
<div v-bind:id="objId"></div>
<div v-bind:disabled="disabled"></div>
```

### JS表达式

```html
<div v-bind:title="'my' + title">
    {{ ok ? 'yes' : 'no' }}
</div>
```

## 指令

```html
<div v-if="ok"></div>
<div v-show="ok"></div>
```

带参数
```html
<div v-bind:id="ok"></div>
<div v-on:click="onClick"></div>
```

带修饰符
```html
<div v-on:click.prevent.stop="onClick"></div>
```

缩写
```html
<div v-bind:id="id" v-on:click="onClick"></div>
<!--等价-->
<div :id="id" @:click="onClick"></div>
```

## 过滤器

过滤器可以用在两个地方：mustache 插值和 v-bind 表达式

```html
<div v-bind:id="id | formatId">
    {{ text | upperFilter | otherFilter('arg1', arg2) }}
</div>
```

```js
new Vue({
    filters: {
        upperFilter: function(value) {
            if (!value) {
                return '';
            }

            return value.toUpperCase();
        },
        otherFilter: function(value, arg1, arg2) {
            arg1 = arg1 || "";
            arg2 = arg2 || "";

            return value + arg1 + arg2;
        }
    }
})
```

## 计算属性

```js
new Vue({
    data: {
        firstName: 'hcx',
        lastName: 'owe'
    },
    computed: {
        reverseName: function() {
            return this.lastName + '' + this.firstName;
        },
        fullName: {
            // getter
            get: function () {
                return this.firstName + ' ' + this.lastName
            },
            // setter
            set: function (newValue) {
                var names = newValue.split(' ')
                this.firstName = names[0]
                this.lastName = names[names.length - 1]
            }
        }
    }
});
```

### computed VS methods

计算属性是基于它们的依赖进行缓存的

只要发生重新渲染，method 调用总会执行该函数

```js
new Vue({
    el: '#app',
    data: {
        firstName: 'hcx',
        lastName: 'owe'
    },
    methods: {
        getFullName: function() {
            return this.firstName + ' ' + this.lastName + new Date();
        }
    },
    computed: {
        fullName: function() {
    	    return this.firstName + ' ' + this.lastName + new Date();
        }
    }
});
```

### computed VS watch

计算属性在大多数情况下比 watch 更合适，但要在数据变化时，执行异步操作或开销较大的操作，这时候 watch 是很有用的

```js
var vm = new Vue({
    el: '#app',
    data: {
        a: 1,
        b: 0
    },
    watch: {
        a: function (val) {
            this.$http.get('/getB.action').then((msg) => {
                this.b = msg;
            });
        }
    }
});
```

## Class 与 Style 绑定

在 v-bind 用于 class 和 style 时，表达式的结果类型除了字符串之外，还可以是对象或数组

### 绑定 Class

#### 绑定对象模式

```html
<div v-bind:class="{ active: isActive }"></div>
<div class="static" v-bind:class="{ active: isActive, 'text-danger': hasError }"></div>

<div v-bind:class="classObject"></div>
```
```js
new Vue({
    data: {
        active: true,
        hasError: false,
        classObject: {
            active: true,
            'text-danger': true
        }
    }
});
```
渲染结果
```html
<div class="active"></div>
<div class="static active"></div>

<div class="active text-danger"></div>
```

#### 绑定数组模式

```html
<div v-bind:class="[activeClass, errorClass]"></div>

<div v-bind:class="[ isActive ? activeClass : '', isError ? errorClass : '']"></div>

<div v-bind:class="[{ active: isActive }, errorClass]">
```
```js
data: {
    activeClass: 'active',
    errorClass: 'text-danger',
    isActive: true,
    isError: false
}
```

渲染结果
```html
<div class="active text-danger"></div>

<div class="active"></div>

<div class="active text-danger"></div>
```

### 绑定内联样式

当 v-bind:style 使用需要特定前缀的 CSS 属性时，如 transform ，Vue.js 会自动侦测并添加相应的前缀

#### 绑定对象模式

CSS 属性名可以用驼峰式 (camelCase) 或 (配合引号的) 短横分隔命名

```html
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>

<div v-bind:style="styleObject"></div>
```
```js
data: {
    activeColor: 'red',
    fontSize: 30,
    styleObject: {
        color: 'blue',
        fontSize: '20px'
    }
}
```
```html
<div style="color: red; font-size: 30px;"></div>

<div style="color: blue; font-size: 20px;"></div>
```

#### 绑定数组模式

将多个样式对象应用到一个元素上
```html
<div v-bind:style="[styleObject, otherObject]"></div>
```

## 条件渲染

### v-if / v-if-else / v-else
Vue 会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染, 所以 Vue 提供了一种方式来声明“不要复用它们”。只需添加一个具有唯一值的 key 属性

v-if 是“真正的”条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建

v-if 也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块

当 v-if 与 v-for 一起使用时，v-for 具有比 v-if 更高的优先级
```html
<div v-if="type === 'A'">A</div>
<div v-else-if="type === 'B'" key="b">B</div>
<div v-else-if="type === 'C'" key="c">C</div>
<div v-else>Not A/B/C</div>
```

### v-show

v-show 不管初始条件是什么，元素总是会被渲染并保留在 DOM 中。v-show 是简单地切换元素的 CSS 属性 display

## 列表渲染

### v-for

#### 基本用法
```html
<ul id="ul">
  <li v-for="item in items">
    {{ item.message }}
  </li>
</ul>

<ul id="ul">
  <li v-for="(item, index) in items">
    {{ index - item.message }}
  </li>
</ul>

<ul id="ul">
  <li v-for="item of items">
    {{ item.message }}
  </li>
</ul>
```
#### 对象迭代
```html
<ul id="ul">
  <li v-for="(key, value, index) in obj">
    {{ index - key : value }}
  </li>
</ul>
```

```js
data: {
    obj: {
        name: 'hcxowe',
        age: '28'
    }
}
```

#### 整数迭代

```html
<ul>
    <li v-for="n in 10">{{ n }}</li>
</ul>
```

#### v-for 与 v-if

v-for 的优先级比 v-if 更高，这意味着 v-if 将分别重复运行于每个 v-for 循环中
```html
<li v-for="todo in todos" v-if="!todo.isComplete">
  {{ todo }}
</li>
```
上面的代码只传递了未complete的todos

#### key

当 Vue.js 用 v-for 正在更新已渲染过的元素列表时，它默认用 “就地复用” 策略, 不想元素被复用，只需给元素绑定唯一值的key
```html
<div v-for="item in items" :key="item.id"></div>
```

### 数组更新检测

#### 变异方法

会改变数组自身的方法： `push pop shift unshift splice reverse sort`

#### 非变异方法

总是返回一个新数组的方法： `map filter every some concat slice ...`

#### 无法检测数组变动的操作

当你利用索引直接设置一个项时，例如： vm.items[indexOfItem] = newValue, 替代方案 `Vue.set(example1.items, indexOfItem, newValue)`   

当你修改数组的长度时，例如： vm.items.length = newLength, 替代方案 `example1.items.splice(newLength)`

## 事件处理器

### 基本使用方法

```html
<div @click="onClick"></div>
<div @click="onClick('arg1', $event)"></div>
<div @click="alert('click')"></div>
```

### 事件修饰符

使用修饰符时，顺序很重要；相应的代码会以同样的顺序产生。因此，用 @click.prevent.self 会阻止所有的点击，而 @click.self.prevent 只会阻止元素上的点击。

```html
<div @click.prevent.stop.capture.self.once="onClick"></div>
```

### 键值修饰符

在监听键盘事件时，我们经常需要监测常见的键值。 Vue 允许为 v-on 在监听键盘事件时添加关键修饰符

```html
<!-- 只有在 keyCode 是 13 时调用 vm.submit() -->
<input v-on:keyup.13="submit">
<!-- 同上 -->
<input v-on:keyup.enter="submit">
<!-- 缩写语法 -->
<input @keyup.enter="submit">
```
`.enter
.tab
.delete
.esc
.space
.up
.down
.left
.right`
```js
<!--可以通过全局 config.keyCodes 对象自定义键值修饰符别名-->
// 可以使用 v-on:keyup.f1
Vue.config.keyCodes.f1 = 112
```

### 修饰键 
`.ctrl .alt .shift .meta`   
修饰键比正常的按键不同；修饰键和 keyup 事件一起用时，事件引发时必须按下正常的按键。换一种说法：如果要引发 keyup.ctrl，必须按下 ctrl 时释放其他的按键；单单释放 ctrl 不会引发事件

### 鼠标键

`.left .right .middle` 这些修饰符会限制处理程序监听特定的鼠标按键

## 表单控件绑定

### v-model

v-model 会忽略所有表单元素的 value、checked、selected 特性的初始值。因为它会选择 Vue 实例数据来作为具体的值。你应该通过 JavaScript 在组件的 data 选项中声明初始值

#### 文本
```
<input v-model="message" placeholder="edit me">
<p>Message is: {{ message }}</p>
```

#### 复选框

单个复选框的时候，v-model 绑定的属性得到的是true / false

多个复选框绑定到同一个属性上时，得到的是 每个复选框的value属性的值组成的数组 [value1, value2...]

```html
<!--checked 为 true 与 false 之一-->
<input type="checkbox" id="checkbox" v-model="checked">
<label for="checkbox">{{ checked }}</label>
```

```html
<!--checked 为 aaa bbb ccc 任意组合组成的数组-->
<input type="checkbox" value="aaa" v-model="checked">
<input type="checkbox" value="bbb" v-model="checked">
<input type="checkbox" value="ccc" v-model="checked">
<p>{{ checked }}</p>
```

```html
<!--动态绑定true与false对应的value到checked-->
<input type="checkbox" id="checkbox" v-model="checked" v-bind:true-value="a" v-bind:false-value="b">
<label for="checkbox">{{ checked }}</label>
```

#### 单选按钮

v-model 绑定的属性得到的是checked的单选按钮的value属性的值

```html
<input type="radio" id="one" value="One" v-model="picked">
<input type="radio" id="two" value="two" v-model="picked">
<p>{{ picked }}</p>
```

```html
<!--绑定value-->
<input type="radio" v-model="pick" v-bind:value="a">
```

#### 选择列表

```html
<select v-model="selected" style="width: 50px">
    <option value="1">A</option>
    <option>B</option>
    <option>C</option>
</select>
<span>Selected: {{ selected }}</span>
```
selected 优先获取 value 属性值，如果未设置就获取元素的 textContent

```html
<select v-model="selected">
    <!-- 内联对象字面量 -->
  <option v-bind:value="{ number: 123 }">123</option>
</select>
```

### 修饰符

- .lazy --- v-model 从 input 事件转变为在 change 事件中同步输入框值与数据
- .number --- 自动将用户的输入值转为 Number 类型
- .trim --- 自动过滤用户输入的首尾空格

## 组件

### 注册

注册一个全局组件 `Vue.component(tagName, options)`

```html
<div id="app">
    <my-component></my-component>
    <my-component2></my-component2>
</div>
```

注册组件，并创建根实例
```js
// 全局注册
Vue.component('my-component', {
    template: '<p>My Component!</p>'
});

new Vue({
    el: '#app',
    components: {
        'my-component2': {
            template: '<p>My Component2</p>'
        }
    }
})
```
最后渲染为
```html
<div id="app">
    <p>My Component!</p>
    <p>My Component2</p>
</div>
```

### DOM模板解析说明

当使用 DOM 作为模版时（例如，将 el 选项挂载到一个已存在的元素上）, 你会受到 HTML 的一些限制，因为 Vue 只有在浏览器解析和标准化 HTML 后才能获取模版内容。尤其像这些元素 `<ul> ，<ol>，<table> ，<select>` 限制了能被它包裹的元素， 而一些像 `<option>` 这样的元素只能出现在某些其它元素内部
```html
<table>
  <tr is="my-row"></tr>
</table>
```
使用`is`属性作为变通方案

以下情况不存在以上的限制
- `<script type="text/x-template">`
- JavaScript内联模版字符串
- .vue 组件

### data 

必须是函数，并返回一个对象

### 构成组件

在 Vue 中，父子组件的关系可以总结为 props down, events up 。父组件通过 props 向下传递数据给子组件，子组件通过 events 给父组件发送消息

子组件使用父组件的数据，我们需要通过子组件的props选项

```js
Vue.component('child', {
  // 声明 props
  props: ['message'],
  // 就像 data 一样，prop 可以用在模板内
  // 同样也可以在 vm 实例中像 “this.message” 这样使用
  template: '<span>{{ message }}</span>'
})
```
```html
<!--给child的message属性传递'hello'字符串-->
<child message="hello"></child>

<!--给child的message属性绑定父组件的hello属性-->
<child :message="hello"></child>
```

### camelCase vs kebab-case

HTML 特性是不区分大小写的。所以，当使用的不是字符串模版，camelCased (驼峰式) 命名的 prop 需要转换为相对应的 kebab-case (短横线隔开式) 命名

```js
Vue.component('child', {
  // camelCase in JavaScript
  props: ['myMessage'],
  template: '<span>{{ myMessage }}</span>'
})
```
得像这样子使用组件的myMessage属性
```html
<!-- kebab-case in HTML -->
<child my-message="hello!"></child>
```

### Prop验证

可以为组件的 props 指定验证规格。如果传入的数据不符合规格，Vue 会发出警告

Prop验证是在组件被创建之前进行的，所以在 default validator 方法中不能调用实例属性如data computed methods等

```js
Vue.component('example', {
    props: {
        // 基础类型检测 （`null` 意思是任何类型都可以）
        propA: Number,
        // 多种类型
        propB: [String, Number, Boolean, Function, Object, Array, Symbol],
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
})
```

### Non-Prop 属性

没有进行Prop的属性将自动添加到组件的根元素中

```html
<!--bs-date-input 的template-->
<input type="text" class="date-picker"/>
```

```html
<bs-date-input data-3d-date-picker="true"></bs-date-input>
```

 渲染为
 ```html
 <input type="text" class="date-picker" data-3d-date-picker="true"/>
 ```

 ### 替换 /　合并 存在的属性

 针对 class 与 style 属性， 属性值进行合并。 其他属性使用提给给组件的属性值替换组件自身的属性值

 ```html
 <!--bs-date-input 的template-->
 <input type="date" class="form-control">
 ```

 ```html
 <bs-date-input data-3d-date-picker="true" class="date-picker-theme-dark"></bs-date-input>
```

渲染为
```html
<input type="date" data-3d-date-picker="true" class="form-control date-picker-theme-dark">
```