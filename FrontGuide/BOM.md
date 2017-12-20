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

