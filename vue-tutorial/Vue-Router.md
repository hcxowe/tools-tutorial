# vue-router

## 基本使用

```html
<style>
    /*路由匹配成功，对应的<router-link>将自动设置的class属性*/
    .router-link-active {
        color: red;
    }
</style>
<div id="app">
    <p>
        <!-- 使用 router-link 组件来导航. -->
        <!-- 通过传入 `to` 属性指定链接. -->
        <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
        <router-link to="/foo">Go to Foo</router-link>
        <router-link to="/bar">Go to Bar</router-link>
    </p>

    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
</div>
```

```js
// 1. 导入/导入 组件
import ComponentA from '@/ComponentA'
import ComponentB from '@/ComponentB'

// 2. 定义路由
const routes = {
    {
        path: '/a',
        component: ComponentA
    },
    {
        path: '/b',
        component: ComponentB
    }
};

// 3. 创建 router 实例
const router = new VueRouter({
    router
});

// 4. 创建及挂载跟实例
const app = new Vue({
    router
}).mount('#app');
```

## 动态路由

在 `vue-router` 的路由路径中使用`动态路径参数`,把某种模式匹配到的所有路由，全都映射到同个组件

```js
const router = new VueRouter({
    routes: [
        // 动态路径参数 以冒号开头
        { path: '/user/:id', component: User }
    ]
});
// /user/foo 和 /user/bar 都将映射到相同的路由
```
`路径参数`将会设置到`$route.params`中，可以在组件内使用，此外 `$route` 还会设置一些其他有有用的信息 `$route.query` `$route.hash`...

响应路由反生变化，原来的组件实例会被复用，组件的生命周期钩子不会再被调用
```js
// 使用watch来监视 $route 的变更
const User = {
    template: '...',
    watch: {
        '$route' (to, from) {
        // 对路由变化作出响应...
        }
    }
}
```
同一个路径可以匹配多个路由，匹配的优先级就按照路由的定义顺序

## 嵌套路由

```js
const router = new VueRouter({
    routes: [
        {
            path: '/user/:id', component: User,
            children: [
                // 当 /user/:id 匹配成功，
                // UserHome 会被渲染在 User 的 <router-view> 中
                { 
                    path: '', 
                    component: UserHome 
                },
                {
                    // 当 /user/:id/profile 匹配成功，
                    // UserProfile 会被渲染在 User 的 <router-view> 中
                    path: 'profile',
                    component: UserProfile
                },
                {
                    // 当 /user/:id/posts 匹配成功
                    // UserPosts 会被渲染在 User 的 <router-view> 中
                    path: 'posts',
                    component: UserPosts
                }
            ]
        }
    ]
})
```

## 编程式的导航

### router.push(location) 

想要导航到不同的 URL，则使用 router.push 方法。这个方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，则回到之前的 URL

```js
// 字符串
router.push('home')

// 对象
router.push({ path: 'home' })

// 命名的路由
router.push({ name: 'user', params: { userId: 123 }})

// 带查询参数，变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' }})
```

### router.replace(location)

导航到location，它不会向 history 添加新记录，而是替换掉当前的 history 记录

### router.go(n)

参数是一个整数，意思是在 history 记录中向前或者后退多少步

```js
// 在浏览器记录中前进一步，等同于 history.forward()
router.go(1)

// 后退一步记录，等同于 history.back()
router.go(-1)

// 前进 3 步记录
router.go(3)

// 如果 history 记录不够用，那就默默地失败呗
router.go(-100)
router.go(100)
```

## 命令路由

```js
// 为路由设置 name
const router = new VueRouter({
    routes: [
        {
            path: '/user/:userId',
            name: 'user',
            component: User
        }
    ]
})
```
使用方式
```html
<router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>
```

```js
router.push({ name: 'user', params: { userId: 123 }})
```

## 命令视图

在界面中拥有多个单独命名的视图，而不是只有一个单独的出口。如果 router-view 没有设置名字，那么默认为 default

```html
<router-view class="view one"></router-view>
<router-view class="view two" name="a"></router-view>
<router-view class="view three" name="b"></router-view>
```
```js
const router = new VueRouter({
    routes: [
        {
        path: '/',
            components: {
                default: Foo,
                a: Bar,
                b: Baz
            }
        }
    ]
})
```

## 重定向 与 别名

### 重定向

```js
const router = new VueRouter({
    routes: [
        { path: '/a', redirect: '/b' },
        { path: '/b', redirect: { name: 'ComponentB' }},
        { 
            path: '/c', 
            redirect: to => {
                // 方法接收 目标路由 作为参数
                // return 重定向的 字符串路径/路径对象
                return to + '/b';
            }
        }
    ]
})
```

### 别名

/a 的别名是 /b，意味着，当用户访问 /b 时，URL 会保持为 /b，但是路由匹配则为 /a，就像用户访问 /a 一样
```js
const router = new VueRouter({
    routes: [
        { path: '/a', component: A, alias: '/b' }
    ]
})
```

## HTML5 History 模式

vue-router 默认 hash 模式， 不太好看。可以用路由的 history 模式，这种模式充分利用 history.pushState API 来完成 URL 跳转而无须重新加载页面，URL 就像正常的 url，例如 http://yoursite.com/user/id，也好看！

history 模式需要后台配置支持

[Node.js(express)](https://github.com/bripkens/connect-history-api-fallback) 的解决方法
```js
var express = require('express');
var history = require('connect-history-api-fallback');

var app = express();
// 设置静态目录
app.use(express.static(path.join(__dirname, '../dist')));

// 配合 history 模式
app.use(history({
    index: '/index.html', // 默认首页
    resrites: [], // 改写请求
    disableDotRule: true,
    verbose: true,  // 日志
    logger: console.log.bind(console), // 日志函数
    htmlAcceptHeaders: ['text/html', '*/*']
}));
```

```js
const router = new VueRouter({
    mode: 'history',
    routes: [
        ...
        { path: '*', component: NotFoundComponent } // 最后加上这个，当没有匹配到，导航到404页面
    ]
})
```

# 进阶

## 导航钩子

vue-router 提供的导航钩子主要用来拦截导航，让它完成跳转或取消。有多种方式可以在路由导航发生时执行钩子：全局的, 单个路由独享的, 或者组件级的

### 全局钩子

```js
const router = new VueRouter({ ... })
router.beforeEach((to, from, next) => {
    // to: Route: 即将要进入的目标 路由对象
    // from: Route: 当前导航正要离开的路由
    // next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数
        // next(), 下一个钩子
        // next(false), 中断当前导航
        // next({path: '/'}), 中断当前导航，发起一个新的导航
});

// 全局的 after 钩子， after 钩子没有 next 方法, 不能改变导航
router.afterEach(route => {
})
```
当一个导航触发时，全局的 before 钩子按照创建顺序调用。钩子是异步解析执行，此时导航在所有钩子 resolve 完之前一直处于 等待中

### 路由独享的钩子

```js
const router = new VueRouter({
    routes: [
        {
            path: '/foo',
            component: Foo,
            beforeEnter: (to, from, next) => {
                
            }
        }
    ]
})
```

### 组件内的钩子

```js
const Foo = {
    template: `...`,
    beforeRouteEnter (to, from, next) {
        // 在渲染该组件的对应路由被 confirm 前调用
        // 不！能！获取组件实例 `this`
        // 因为当钩子执行前，组件实例还没被创建
    },
    beforeRouteUpdate (to, from, next) {
        // 在当前路由改变，但是该组件被复用时调用
        // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
        // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
        // 可以访问组件实例 `this`
    },
    beforeRouteLeave (to, from, next) {
        // 导航离开该组件的对应路由时调用
        // 可以访问组件实例 `this`
        // 可以通过 next(false) 来取消导航
    }
}
```

## 路由元信息

```js
const router = new VueRouter({
  routes: [
        {
            path: '/foo',
            component: Foo,
            children: [
                {
                    path: 'bar',
                    component: Bar,
                    // a meta field
                    meta: { requiresAuth: true }
                }
            ]
        }
    ]
})
```
一个路由匹配到的所有路由记录会暴露为 $route 对象（还有在导航钩子中的 route 对象）的 $route.matched 数组。因此，我们需要遍历 $route.matched 来检查路由记录中的 meta 字段


```js
// 在全局导航钩子中检查 meta 字段
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // 该路由需要授权，检测是否已经登陆， 如果没有重定向到登录页面
        if (!auth.loggedIn()) {
        next({
            path: '/login',
            query: { redirect: to.fullPath }
        })
        } else {
            next()
        }
    } else {
        next() // 确保一定要调用 next()
    }
})
```

## 过渡动效

### 基本过渡

每个路由都设置一样的过渡效果
```html
<transition>
    <router-view></router-view>
</transition>
```

### 单个路由的过渡

每个路由组件有各自的过渡效果
```js
const Foo = {
  template: `
    <transition name="slide">
      <div class="foo">...</div>
    </transition>
  `
}

const Bar = {
  template: `
    <transition name="fade">
      <div class="bar">...</div>
    </transition>
  `
}
```

### 基于路由的动态过渡

基于当前路由与目标路由的变化关系，动态设置过渡效果
```html
<transition :name="transitionName">
    <router-view></router-view>
</transition>
```

```js
// 在父组件内 watch $route 决定使用哪种过渡
watch: {
    '$route' (to, from) {
        const toDepth = to.path.split('/').length;
        const fromDepth = from.path.split('/').length;
        this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
    }
}
```

## 数据获取

进入某个路由后，需要从服务器获取数据，实现方法：
- 导航完成之后获取：先完成导航，然后在接下来的组件生命周期钩子中获取数据。在数据获取期间显示『加载中』之类的指示
- 导航完成之前获取：导航完成前，在路由的 enter 钩子中获取数据，在数据获取成功后执行导航

## 滚动行为

这个功能只在 HTML5 history 模式下可用， 当切换到新路由时，想要页面滚到顶部，或者是保持原先的滚动位置，就像重新加载页面那样。 vue-router 能做到，而且更好，它让你可以自定义路由切换时页面如何滚动

```js
const router = new VueRouter({
    routes: [...],
    scrollBehavior (to, from, savedPosition) {
        // return 期望滚动到哪个的位置
    }
})
```
模拟『滚动到锚点』的行为
```js
scrollBehavior (to, from, savedPosition) {
    if (to.hash) {
        return {
            selector: to.hash
        }
    }
}
```

## 路由懒加载

结合 Vue 的 异步组件 和 Webpack 的 code splitting feature, 轻松实现路由组件的懒加载, 然后当路由被访问的时候才加载对应组件

```js
const Foo = resolve => {
  // require.ensure 是 Webpack 的特殊语法，用来设置 code-split point
  // （代码分块）
    require.ensure(['./Foo.vue'], () => {
        resolve(require('./Foo.vue'))
    })
}
```
AMD风格的require
```js
const Foo = resolve => require(['./Foo.vue'], resolve)
```
不需要改变任何路由配置，跟之前一样使用 Foo
```js
const router = new VueRouter({
    routes: [
        { path: '/foo', component: Foo }
    ]
})
```

### 把组件按组分块

想把某个路由下的所有组件都打包在同个异步 chunk 中。只需要 给 chunk 命名，提供 require.ensure 第三个参数作为 chunk 的名称

```js
const Foo = r => require.ensure([], () => r(require('./Foo.vue')), 'group-foo')
const Bar = r => require.ensure([], () => r(require('./Bar.vue')), 'group-foo')
const Baz = r => require.ensure([], () => r(require('./Baz.vue')), 'group-foo')
```

Webpack 将相同 chunk 下的所有异步模块打包到一个异步块里面 —— 这也意味着我们无须明确列出 require.ensure 的依赖（传空数组就行）。