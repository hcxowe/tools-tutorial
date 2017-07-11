# vuex

Vuex 是专为 Vue.js 应用程序开发的状态管理模式

## State

### 单一状态数

Vuex 使用 单一状态树 —— 用一个对象就包含了全部的应用层级状态

### 在 Vue 组件中获得 Vuex 状态

调用 Vue.use(Vuex) 将状态从根组件『注入』到每一个子组件中

```js
import Vuex from 'vuex'
// 注入
Vue.use(Vuex);

// 定义Store实例
var store = new Vuex.Store({
    // state
    // getters
    // actions
    // mutations
});

// 将store实例传入Vue根实例的‘store’属性， 这可以把 store 的实例注入所有的子组件
var vm = new Vue({
    el: '#app',
    store,
    ...
});
```

组件中可以通过 `this.$store` 访问到 store 实例

### mapState 辅助函数

```js
// 在单独构建的版本中辅助函数为 Vuex.mapState
import { mapState } from 'vuex'

export default {
    // ...
    computed: mapState({
        // 箭头函数可使代码更简练
        count: state => state.count,

        // 传字符串参数 'count' 等同于 `state => state.count`
        countAlias: 'count',

        // 为了能够使用 `this` 获取局部状态，必须使用常规函数
        countPlusLocalState (state) {
            return state.count + this.localCount
        }
    })
}
```

### 对象展开运算符

```js
computed: {
    localComputed () { /* ... */ },
    
    // 使用对象展开运算符将此对象混入到外部对象中
    ...mapState({
        // ...
    })
}
```

## getters

```js
// 定义
const store = new Vuex.Store({
    state: {
        todos: [
        { id: 1, text: '...', done: true },
        { id: 2, text: '...', done: false }
        ]
    },
    getters: {
        // 第一个参数为state，其他getters可作为第二个参数
        doneTodos: state => {
            return state.todos.filter(todo => todo.done)
        }
    }
});

// 使用
computed: {
    doneTodosCount () {
        return this.$store.getters.doneTodosCount
    }
}
```

### mapGetters 辅助函数

mapGetters 辅助函数仅仅是将 store 中的 getters 映射到局部计算属性

```js
import { mapGetters } from 'vuex'

export default {
    // ...
    computed: {
        // 使用对象展开运算符将 getters 混入 computed 对象中
        ...mapGetters([
            'doneTodosCount',
            'anotherGetter',
            // ...
        ])
    }
}

mapGetters({
    // 映射 this.doneCount 为 store.getters.doneTodosCount
    doneCount: 'doneTodosCount'
})
```

## Mutations

更改 Vuex 的 store 中的状态的唯一方法是提交 mutation

```js
const store = new Vuex.Store({
    state: {
        count: 1
    },
    // mutations 定义
    mutations: {
        increment (state) {
            // 变更状态
            state.count++
        }
    }
})
```

### 提交载荷

```js
// ...
mutations: {
    increment (state, n) {
        state.count += n
    }
}

// 提交时传入额外的参数
store.commit('increment', 10)
```

### mutation 必须是同步函数

### 在组件中提交 Mutations

组件中使用 `this.$store.commit('xxx')` 提交 `mutation`, 或者使用 mapMutations 辅助函数将组件中的 methods 映射为 store.commit 调用

```js
import { mapMutations } from 'vuex'

export default {
    // ...
    methods: {
        postFrom: function() {
            this.$store.commit('increment', {});
        },
        ...mapMutations([
            'increment' // 映射 this.increment() 为 this.$store.commit('increment')
        ]),
        ...mapMutations({
            add: 'increment' // 映射 this.add() 为 this.$store.commit('increment')
        })
    }
}
```

## Actions

Action 提交的是 mutation，而不是直接变更状态; Action 可以包含任意异步操作

```js
const store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        increment (state) {
            state.count++
        }
    },
    actions: {
        increment (context) {
            context.commit('increment')
        }
    }
})
```

### 分发 Action

```js
// 以载荷形式分发
store.dispatch('incrementAsync', {
    amount: 10
})

// 以对象形式分发
store.dispatch({
    type: 'incrementAsync',
    amount: 10
})
```

### 在组件中分发 Action

```js
import { mapActions } from 'vuex'

export default {
    // ...
    methods: {
        getSomething: function() {
            this.$store.dispatch('increment', {});
        },
        ...mapActions([
            'increment' // 映射 this.increment() 为 this.$store.dispatch('increment')
        ]),
        ...mapActions({
            add: 'increment' // 映射 this.add() 为 this.$store.dispatch('increment')
        })
    }
}
```
**一个 store.dispatch 在不同模块中可以触发多个 action 函数。在这种情况下，只有当所有触发函数完成后，返回的 Promise 才会执行**

## Modules

Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割

```js
const moduleA = {
    state: { ... },
    mutations: { ... },
    actions: { ... },
    getters: { ... }
}

const moduleB = {
    state: { ... },
    mutations: { ... },
    actions: { ... }
}

const store = new Vuex.Store({
    modules: {
        a: moduleA,
        b: moduleB
    }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```

### 模块的局部状态

对于模块内部的 mutation 和 getter，接收的第一个参数是模块的局部状态对象
```js
const moduleA = {
    state: { count: 0 },
    mutations: {
        increment (state) {
            // 这里的 `state` 对象是模块的局部状态
            state.count++
        }
    },

    getters: {
        doubleCount (state, getters, rootState) {
            return state.count * 2
        }
    }
}
```

对于模块内部的 action，局部状态通过 context.state 暴露出来， 根节点状态则为 context.rootState
```js
const moduleA = {
    // ...
    actions: {
        incrementIfOddOnRootSum ({ state, commit, rootState }) {
            if ((state.count + rootState.count) % 2 === 1) {
                commit('increment')
            }
        }
    }
}
```

### 命名空间

```js
const store = new Vuex.Store({
    modules: {
        account: {
            namespaced: true,
            // 模块内容（module assets）
            state: { ... }, // 模块内的状态已经是嵌套的了，使用 `namespaced` 属性不会对其产生影响
            getters: {
                isAdmin () { ... } // -> getters['account/isAdmin']
            },
            actions: {
                login () { ... } // -> dispatch('account/login')
            },
            mutations: {
                login () { ... } // -> commit('account/login')
            },
            // 嵌套模块
            modules: {
                // 继承父模块的命名空间
                myPage: {
                    state: { ... },
                    getters: {
                        profile () { ... } // -> getters['account/profile']
                    }
                },
                // 进一步嵌套命名空间
                posts: {
                    namespaced: true,
                    state: { ... },
                    getters: {
                        popular () { ... } // -> getters['account/posts/popular']
                    }
                }
            }
        }
    }
})
```

### 在命名空间模块内访问全局内容（Global Assets）

如果你希望使用全局 state 和 getter，rootState 和 rootGetter 会作为第三和第四参数传入 getter，也会通过 context 对象的属性传入 action

若需要在全局命名空间内分发 action 或提交 mutation，将 { root: true } 作为第三参数传给 dispatch 或 commit 即可

```js
modules: {
    foo: {
        namespaced: true,
        getters: {
            // 在这个模块的 getter 中，`getters` 被局部化了
            // 你可以使用 getter 的第四个参数来调用 `rootGetters`
            someGetter (state, getters, rootState, rootGetters) {
                getters.someOtherGetter // -> 'foo/someOtherGetter'
                rootGetters.someOtherGetter // -> 'someOtherGetter'
            },
            someOtherGetter: state => { ... }
        },
        actions: {
            // 在这个模块中， dispatch 和 commit 也被局部化了
            // 他们可以接受 `root` 属性以访问根 dispatch 或 commit
            someAction ({ dispatch, commit, getters, rootGetters }) {
                getters.someGetter // -> 'foo/someGetter'
                rootGetters.someGetter // -> 'someGetter'
                dispatch('someOtherAction') // -> 'foo/someOtherAction'
                dispatch('someOtherAction', null, { root: true }) // -> 'someOtherAction'
                commit('someMutation') // -> 'foo/someMutation'
                commit('someMutation', null, { root: true }) // -> 'someMutation'
            },
            someOtherAction (ctx, payload) { ... }
        }
    }
}
```

### 带命名空间的绑定函数

```js
computed: {
    ...mapState({
        a: state => state.some.nested.module.a,
        b: state => state.some.nested.module.b
    })
},
methods: {
    ...mapActions([
        'some/nested/module/foo',
        'some/nested/module/bar'
    ])
}
```
对于这种情况，你可以将模块的空间名称字符串作为第一个参数传递给上述函数，这样所有绑定都会自动将该模块作为上下文。于是上面的例子可以简化为:
```js
computed: {
    ...mapState('some/nested/module', {
        a: state => state.a,
        b: state => state.b
    })
},
methods: {
    ...mapActions('some/nested/module', [
        'foo',
        'bar'
    ])
}
```

### 模块动态注册

```js
// 注册模块 `myModule`
store.registerModule('myModule', {
    // ...
})
// 注册嵌套模块 `nested/myModule`
store.registerModule(['nested', 'myModule'], {
    // ...
})
```
使用 `store.unregisterModule(moduleName)` 来动态卸载模块, 不能使用此方法卸载静态模块（即创建 store 时声明的模块）

### 模块重用

与 组件内的data属性一样

```js
const MyReusableModule = {
    state () {
        return {
        foo: 'bar'
        }
    },
   // mutation, action 和 getter 等等...
}
```

## 项目结构
```
├── index.html
├── main.js
├── api
│   └── ... # 抽取出API请求
├── components
│   ├── App.vue
│   └── ...
└── store
    ├── index.js          # 我们组装模块并导出 store 的地方
    ├── actions.js        # 根级别的 action
    ├── mutations.js      # 根级别的 mutation
    └── modules
        ├── cart.js       # 购物车模块
        └── products.js   # 产品模块
```

## 插件

```js
// Vuex 插件就是一个函数，它接收 store 作为唯一参数
const myPlugin = store => {
    // 当 store 初始化后调用
    store.subscribe((mutation, state) => {
        // 每次 mutation 之后调用
        // mutation 的格式为 { type, payload }
    })
}

// 插件使用
const store = new Vuex.Store({
    // ...
    plugins: [myPlugin]
})
```

## 严格模式

```js
const store = new Vuex.Store({
    // ...
    strict: true
})
```
在严格模式下，无论何时发生了状态变更且不是由 mutation 函数引起的，将会抛出错误。这能保证所有的状态变更都能被调试工具跟踪到

严格模式会深度监测状态树来检测不合规的状态变更——请确保在发布环境下关闭严格模式，以避免性能损失

## 表单处理

使用带有 setter 的双向绑定计算属性

```js
<input v-model="message">

// ...
computed: {
    message: {
        get () {
            return this.$store.state.obj.message
        },
        set (value) {
            this.$store.commit('updateMessage', value)
        }
    }
}
```
