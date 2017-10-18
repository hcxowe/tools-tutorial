# 企划系统前端单页面应用

### 什么是单页面

传统的多页面应用每个页面（只说动态页面）都是使用服务器端模板编写，然后请求这个页面的时候由服务器渲染成 html 再返回

单页面是指只有一个主页面的应用，浏览器一开始要加载所有必须的 html, js, css。所有的页面内容都包含在这个所谓的主页面中。但在写的时候，还是会分开写（页面片段），然后在交互的时候由路由程序动态载入

## 实现方案

前置条件： IE8+, 模块化, 快速开发, AJAX, RESTful API

### 单页面且兼容IE8的框架
- AngularJS 1.2.x
- AvalonJS 1
- RegularJS
- ...

功能完备, 数据驱动视图, 但是学习曲线及学习成本都不适用

### IFrame + Hash/HTML5 history API + Easyui + JQuery + RequireJS + AJAX + RESTful API + mockjs

- IFrame
    > IFRAME是HTML标签，作用是文档中的文档。iframe元素会创建包含另外一个文档的内联框架
- Hash
    > hash可以用来获取或设置页面的标签值。浏览器读取URL后，会自动将hash指定的元素滚动至可视区域
- HTML5 History API 
    > 管理浏览器历史记录的API
- Easyui
    > 基于JQuery的UI插件集合
- JQuery
    > 快速、简洁的JavaScript框架/类库
- RequireJS
    > 基于AMD(异步模块定义)规范的模块载入框架
- AJAX
    > 一种在无需重新加载整个网页的情况下，能够更新部分网页的技术
- RESTful API
    > 通过一套统一的接口, 为AJAX请求提供服务
- mockjs
    > 前端模拟数据， 基于`数据模板`生成模拟数据, 拦截并模拟 ajax 请求

兼容IE8, Easyui+jquery有基础, 可快速开发

## 目录结构

![text](./directory.png)

- ./common 公共目录
    - ./js 公共脚本文件
    - ./css 公共样式文件
    - ./images 公共图片
- ./zuilibs 第三方库
    - ./easyui
    - ./jquery
    - ./require
    - ./mockjs
    - ...
- ./views 存放具体的页面
    - ./base 基本数据模块
        - ./workData 工作日历设置界面
            - ./js 工作日历设置界面的脚本文件
            - ./css 工作日历设置界面的样式文件
            - ./index.html 主页面
            - ./main.js 入口JS
        - ./devInfo 设备信息管理
        - ./devType 设备型号管理
        - ...
    - ./plan 主计划计算
    - ./report 统计报表
    - ...

## 技术的使用

### RequireJS

RequireJS 是一个JavaScript模块加载器。它非常适合在浏览器中使用, 使用RequireJS加载模块化脚本将提高代码的加载速度和质量。

#### RequireJS的优点
- 异步加载
    > 我们知道，通常网站都会把script脚本的放在html的最后，这样就可以避免浏览器执行js带来的页面阻塞。使用RequireJS，会在相关的js加载后执行回调函数，这个过程是异步的，所以它不会阻塞页面。

- 按需加载
    > 通过RequireJS，你可以在需要加载js逻辑的时候再加载对应的js模块，这样避免了在初始化网页的时候发生大量的请求和数据传输，或许对于一些人来说，某些模块可能他根本就不需要，那就显得没有必要。

- 方便的模块依赖管理
    > 解决因为script标签顺序问题而导致依赖关系发生错误：这个函数未定义，那个变量undefine之类的。通过RequireJS的机制，你能确保在所有的依赖模块都加载以后再执行相关的文件，所以可以起到依赖管理的作用。

### 基于JQuery的AJAX

#### AJAX
AJAX的全称是Asynchronous JavaScript and XML（异步的 JavaScript 和 XML）  

ajax是一种在无需重新加载整个网页的情况下，能够更新部分网页的技术。   

通过与服务器进行少量数据交换。ajax可以使网页实现异步更新。这意味着可以在不重新加载整个网页的情况下，对网页的某部分进行更新。而传统的网页（不使用ajax）如果需要更新内容，必须重载整个网页面。

ajax的优点：
1. 最大的一点是页面无刷新，用户的体验非常好。
2. 使用异步方式与服务器通信，具有更加迅速的响应能力。。
3. 可以把一些服务器负担的工作转嫁到客户端，利用客户端闲置的能力来处理，减轻服务器压力
4. 基于标准化的并被广泛支持的技术，不需要下载插件或者小程序。
5. ajax可使因特网应用程序更小、更快，更友好。

ajax的缺点：
1. ajax不支持浏览器back按钮
2. AJAX暴露了与服务器交互的细节

#### jQuery.ajax
```js
$.ajax({
    url: '/test.action', // 请求的路径
    method: 'GET', // 请求类型/请求方法
    type: 'GET', // method的别名
    data: null, // 发送到服务器的数据
    processData: true, // 是否转换通过data选项传递进来的数据，如果是一个对象，都会处理转化成一个查询字符串

    async: true, // 异步请求/同步请求
    cache: false, // 是否启用浏览器缓存
    contentType: 'aplication/x-www-form-urlencoded;charset=UTF-8', // 发送信息的内容编码类型
    context: null, // 设置 Ajax 相关回调函数的上下文
    global: false, // 是否触发全局 AJAX 事件。默认值: true。设置为 false 将不会触发全局 AJAX 事件，如 ajaxStart 或 ajaxStop 可用于控制不同的 Ajax 事件
    ifModified: false, // 在服务器数据改变时获取新数据
    timeout: 0, // 设置超时时间，0代表没有超时

    dataType: 'json', // 期望从服务器返回的数据类型， xml/html/script/json/jsonp/text
    jsonp: '', // 在JSONP请求中覆盖回调函数名
    jsonpCallback: '', // 为 jsonp 请求指定一个回调函数名, 不用指定，jquery会自动把jsonp的数据取出来传递给success方法
    dataFilter: function(data, type){

    }, // 给 Ajax 返回的原始数据的进行预处理的函数。data 是 Ajax 返回的原始数据，type 是调用 jQuery.ajax 时提供的 dataType 参数。函数返回的值将由 jQuery 进一步处理
    beforeSend: function(jqXHR, settings) {

    }, // 发送请求前的回调函数，return false 取消请求
    success: function(data, statusText, jqXHR) {

    }, // 请求成功回调
    error: function(jqXHR, statusText, errorThrown) {

    }, // 请求失败回调
    complete: function(jqXHR, statusText) {

    } // 请求完成回调
});
```

#### 衍生方法
```js
$.get(url, data, success, dataType);

// ==

$.ajax({
    url: url,
    type: 'GET',
    data: data,
    success: success,
    dataType: dataType
});
```

```js
$.getJSON(url, data, success);

$.getScript(url, success);

$.post(url, data, success, dataType);
```

### mockjs