var express = require('express');

var app = express();

app.get('/index.html/:id(\\d+)?', (req, res, next) => {

    if (typeof req.params.id === 'undefined') {
        res.send('你需要加上id参数值')
    }
    else if (req.params.id > 10) {
        next();
    }
    else {
        res.send('id参数值必须不小于10!');
    }
});

app.get('/index.html/:id(\\d+)', (req, res, next) => {
    // res.writeHead(200, 'success', {'Content-Type': 'text/html'});
    // res.write('<!DOCTYPE html><html><head><meta charset="utf-8"><title>express</title></head><body>Hello, this is home page!</body></html>');
    // res.end();
    res.send('hello, 你好!');
});

var server = app.listen(1337, 'localhost', () => {
    console.log('listen to %j', server.address());
});