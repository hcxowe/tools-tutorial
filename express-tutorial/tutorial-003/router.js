// 路由
var express = require('express');
var birds = require('./birds.js');
var app = express();

app.use('/birds', birds);

app.get('/', function(req, res) {
    res.send('get something');
});

// 第一个参数使用正则匹配   - 和 . 在基于字符串的路径中按照字面值解释
app.get('/ab?cd', function(req, res) {
    //res.send('abcd');
    // 重定向
    res.redirect('http://www.expressjs.com');
});

// 也可以这样，表示匹配路径中带w
app.get(/w/, function(req, res, next) {
    console.log('wwwwww');
    next();
}, function(req, res) {
    res.send('next');
});

app.post('/', function(req, res) {
    res.send('post anything');
});

app.all('/', function(req, res) {
    res.send('all request type');
});

app.listen(3000, function() {
    console.log('App listening on port 3000!');
});