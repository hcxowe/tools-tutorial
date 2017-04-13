### Get Post 请求的区别

#### GET
- GET 请求可被缓存
- GET 请求保留在浏览器历史记录中
- GET 请求可被收藏为书签
- GET 请求有长度限制
- GET 请求对数据类型只允许 ASCII 字符
- GET 请求只应当用于取回数据
- GET 请求不应在处理敏感数据时使用

#### POST
- POST 请求不会被缓存
- POST 请求不会保留在浏览器历史记录中
- POST 不能被收藏为书签
- POST 请求对数据长度没有要求
- POST 请求对数据类型没有限制，允许二进制数据

> HTTP的底层是TCP/IP. 所以GET和POST的底层也是TCP/IP, GET/POST都是TCP链接. 

> GET和POST能做的事情是一样的. 你要给GET加上request body, 给POST带上url参数, 技术上都是可以的

> http是一个行为准则, 不同的浏览器和服务器通常都会限制url长度(浏览器2K，服务器最多64K). 超过的部分，并不会处理. 如果使用GET请求时在request body添加了数据, 是否能正常处理需要服务器的配合

#### GET产生一个TCP数据包; POST产生两个TCP数据包

- GET请求， 浏览器会把http header和data一并发送出去，服务器响应200
- POST请求，浏览器先发送header，服务器响应100 continue，浏览器再发送data，服务器响应200