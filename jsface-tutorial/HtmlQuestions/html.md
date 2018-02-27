### `doctype`的作用是什么 ?

> doctype是一种标准通用标记语言的文档类型声明，目的是告诉标准通用标记语言解析器要使用什么样的文档类型定义（DTD）来解析文档。

> 额外知识: 浏览器本身分为两种模式，一种是标准模式，一种是怪异模式，浏览器通过doctype来区分这两种模式，doctype在html中的作用就是触发浏览器的标准模式，如果html中省略了doctype，浏览器就会进入到Quirks模式的怪异状态，在这种模式下，有些样式会和标准模式存在差异，而html标准和dom标准值规定了标准模式下的行为，没有对怪异模式做出规定，因此不同浏览器在怪异模式下的处理也是不同的，所以一定要在html开头使用doctype

### HTML 和 XHTML 有什么区别 ？

- XHTML中的标签都必须被正确地嵌套,HTML中的某些标签可以彼此不正确的嵌套。
- XHTML中的所有标签必须要关闭。
- XHTML中规范定义：标签名和属性对大小写敏感,所有XHTML标签名必须用小写字母。
- XHTML文档必须拥有根元素。
- XHTML中标签的属性值要使用双引号"

### 如果页面使用 'application/xhtml+xml' 会有什么问题吗 ？

> 对这个MIME type浏览器要实行强错误检查，既如果页面有HTML错误，就要显示错误信息

### 如果网页内容需要支持多语言，你会怎么做 ？

> 

### 在设计和开发多语言网站时，有哪些问题你必须要考虑 ？

> 

### 使用 data- 属性的好处是什么 ？

> html5 新增, 为开发者提供自定义属性, 这是属性通过 dataset 属性获取, 不支持 data-* 的浏览器通过 getAttribute 获取, 开发中可以利用这一点在生成DOM结构时把数据储存在自定义属性中,通过一系列交互操作,可以再获得这些数据,而不用再去ajax去后台取得数据

### 请描述 cookies、sessionStorage 和 localStorage 的区别 ?

#### cookie

1. cookie是存储在浏览器上的一小段数据，用来记录某些当页面关闭或者刷新后仍然需要记录的信息
2. 在控制台用 「document.cookie」查看你当前正在浏览的网站的cookie
3. cookie可以使用 js 在浏览器直接设置, 也可以在服务端通使用 HTTP 协议规定的 set-cookie 来让浏览器设置cookie
4. 每次网络请求中都会带上cookie。所以如果 cookie 太多太大对传输效率会有影响
5. 一般浏览器存储cookie 最大容量为4k，所以大量数据不要存到cookie

##### 主要参数

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

### 请解释 `<script>`、`<script async>` 和 `<script defer>` 的区别 ?

> `<script>`阻塞页面渲染, 请求下载并执行脚本
> `<script async>` 不阻塞页面渲染, 请求下载并在下载完成后执行脚本, 不能保障 async 脚本的执行顺序
> `<script defer>` 不阻塞页面渲染, 请求下载并延时到页面加载完成后执行, 能保证 defer 脚本的顺序

### 为什么通常推荐将 CSS <link> 放置在 <head></head> 之间，而将 JS <script> 放置在 </body> 之前 ？你知道有哪些例外吗 ？

> 当把css样式放在底部或者使用`@import`方式引入样式时,一些浏览器例如chrome,他的加载和渲染机制是等css全部加载解析完后再渲染展示页面,而这个等待的时间就为白屏.另一些浏览器例如Firefox,他会在css未加载前先展现页面,等css加载后再重绘一次,这就造成了FOUC (无样式内容闪烁)。所以为了避免这些问题,最好使用LINK标签将样式表放在文档的HEAD中。
> js 放在 body 元素最后,避免由于 js 的请求执行阻塞页面渲染

### 什么是渐进式渲染 (progressive rendering) ？

> 渐进增强: 先保证低版本浏览器的基本功能,再去兼容高版本浏览器效果和交互。
> 优雅降级: 先保证高版本浏览器的效果和交互等,再去兼容低版本的浏览器

### 你用过哪些不同的 HTML 模板语言 ？

> 