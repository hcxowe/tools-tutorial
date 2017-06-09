var express = require('express');

var app = express();

function setHeader(req, res, next) {
    res.statusCode = 200;
    res.header = { 'Content-Type': 'text/html' };
    res.head = '<head><meta charset="utf-8"></head>';
    console.log('setHeader');
    next();
}

app.use(setHeader);

// 安装在 /index.html 路径中的中间件函数。在 /index.html 路径中为任何类型的 HTTP 请求执行此函数
app.user('/index.html', setHeader);

app.get('/', (req, res) => {
    res.writeHead(res.statusCode, res.header);
    res.write(res.head);
    res.end('hello!');
});

var server = app.listen(1337, 'localhost', () => {
    console.log('listen to %j', server.address());
});

