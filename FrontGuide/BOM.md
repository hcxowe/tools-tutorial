### cookie,session,localstorage,sessionstoragesh什么以及他们的作用？

#### cookie

1. cookie是存储在浏览器上的一小段数据，用来记录某些当页面关闭或者刷新后仍然需要记录的信息
2. 在控制台用 「document.cookie」查看你当前正在浏览的网站的cookie
3. cookie可以使用 js 在浏览器直接设置, 也可以在服务端通使用 HTTP 协议规定的 set-cookie 来让浏览器设置cookie
4. 每次网络请求中都会带上cookie。所以如果 cookie 太多太大对传输效率会有影响
5. 一般浏览器存储cookie 最大容量为4k，所以大量数据不要存到cookie

#### 主要参数

- path：表示 cookie 影响到的路径，匹配该路径才发送这个 cookie
- expires 和 maxAge：告诉浏览器这个 cookie 什么时候过期, 当不设置这两个选项时，会产生 session cookie，session cookie，当用户关闭浏览器时，就被清除
- secure：当 secure 值为 true 时，cookie 在 HTTP 中是无效，在 HTTPS 中才有效
- httpOnly：浏览器不允许脚本操作 document.cookie 去更改 cookie。一般情况下都应该设置这个为 true，这样可以避免被 xss 攻击拿到 cookie

#### session

1. session是服务器端创建的与用户身份关联的对象
2. 服务器验证用户身份之后，创建session记录用户信息,session可保存在内存或数据库中
3. 服务器将session_id通过setCookies设置到响应头
4. 浏览器将响应头的set-cookie字段设置到对应域名中
5. 下次发起请求时，都会在http请求头中带上该域名下所有cookie,服务器通过cookie中设置的session_id来识别用户

#### localStorage

1. localStorage HTML5本地存储web storage特性的API，用于将大量数据（最大5M）保存在浏览器中
2. 不参与网络传输
3. 一般用于性能优化
4. 同源可操作

#### sessionStorage

1. sessionStorage 同localStorage
2. 只在会话期间有效，关闭标签页或浏览器sessionStorage失效
3. 单标签页限制：sessionStorage操作限制在单个标签页中，在此标签页进行同源页面访问都可以共享sessionStorage数据

### Fetch API 是什么？

- Fetch 是浏览器提供的原生 AJAX 接口。使用 window.fetch 函数可以代替以前的 $.ajax、$.get 和 $.post
- Fetch 基于 Promise , 不需要依赖第三方库，就可以优雅地使用 AJAX
- Fetch 无法取消一个请求。这是因为 Fetch API 基于 Promise，而 Promise 无法做到这一点

### 从输入一个网址到页面展示网页内容这段时间内，浏览器和服务器都发生了什么？

1. 输入网址，浏览器开启线程处理请求，对URL进行解析，不同协议进行不同处理
2. 浏览器引擎开始加载URL
3. 通过DNS解析获取网址对应IP，查询完成后带上userAgent与符合的Cookie一起向目标服务器发起请求
4. 网站Web服务器处理请求
5. 后端程序处理逻辑
6. 服务器返回响应报文，如果有缓存则返回304，否则返回200和对应内容
7. 浏览器下载网页内容
8. 浏览器将HTML内容解析建立DOM，并根据HTML中的标记请求下载指定MIME类型文件
9. 结合CSS规则，浏览器渲染DOM

### 浏览器发起请求时，头部域字段如何进行缓存控制的？

1. 浏览器会查询Cache-Control ( Expires设置的是绝对时间，Cache-Control设置的是相对时间，HTTP1.1之后一般使用后者 ) 来判定内容是否过期，如果未过期则直接从浏览器读取缓存
2. 浏览器判断上次文件返回头中是否包含ETag信息，有则带上If-None-Match字段信息发送请求，服务器判断ETag未修改则返回304，如果修改则返回200
3. 浏览器判断上次文件返回头中是否包含Last-Modofied信息，有则带上If-Modified-Since字段信息发送请求，服务器判断Last-Modified失效则返回200，有效则返回304
4. 直接向服务器发送请求

### 浏览器前端优化策略有哪些？

#### 网络加载

- 减少HTTP资源请求次数
    合并静态资源图片（雪碧图）、js、css代码
- 减小HTTP请求大小
    压缩js，css文件，gzip压缩传输内容
- css，js放在外部文件中，避免使用style，script标签引入
    为了利用浏览器的静态资源缓存
- 避免空的href与src
    href与src为空，浏览器在渲染的时候也会对href与src属性中的空内容进行加载，直到失败，这阻塞了页面其他资源的下载进程
- 为HTML指定Cache-Control或Expires
- 合理设置Etag与Last-Modified
- 减少页面重定向
- 使用静态资源分域存放来增加下载并行数
- 使用静态资源CDN来存储文件
- 使用CDN Combo下载传输内容
- 使用可缓存的AJAX
- 拉取服务端数据时使用GET来完成AJAX请求效率更好
- 减少Cookie的大小并进行Cookie隔离
    Cookie默认不跨域，对于静态资源，尽量使用不同的域名来存放
- 推荐使用异步JS资源
- 消除阻塞渲染的CSS以及JS
- 避免使用CSS import 引用加载CSS
    带有@import的css样式需要在CSS文件串行解析到@import时才会加载另外的CSS文件，增加了CSS渲染完成的时间

#### 页面渲染

- 把CSS资源引用放到HTML文件顶部
    把css放在head便签中，利于浏览器优先下载CSS并尽早完成页面渲染
- JS资源引用放到HTML文件底部
    JS的加载和解析执行会阻塞HTML DOM解析和CSS渲染的过程
- 不要在HTML中直接缩放图片
    缩放引起页面重排重绘
- 减少DOM元素的数量和深度
- 尽力避免使用table，iframe等慢元素
    - table内容的渲染是将table的DOM渲染树全部生成完并一次性绘制到页面上的，长表格渲染十分耗时
    - 尽量使用异步方式动态添加iframe，iframe内资源的下载进程会阻塞父页面静态资源的下载与CSS及HTML DOM的解析
- 避免运行耗时的JS
- 避免使用CSS表达式和CSS滤镜