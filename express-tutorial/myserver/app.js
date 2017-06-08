var express = require('express');

var app = express();

app.get('/index.html', (req, res) => {
    // res.writeHead(200, 'success', {'Content-Type': 'text/html'});
    // res.write('<!DOCTYPE html><html><head><meta charset="utf-8"><title>express</title></head><body>Hello, this is home page!</body></html>');
    // res.end();
    res.send('hello, 你好!');
});

var server = app.listen(1337, 'localhost', () => {
    console.log('listen to %j', server.address());
});