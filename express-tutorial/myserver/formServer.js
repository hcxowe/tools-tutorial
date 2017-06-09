var express = require('express');
var fs      = require('fs');
var qs      = require('querystring');

var app = express();

app.get('/index.html', (req, res) => {
    // res.writeHead(200, 'success', { 'Content-Type': 'text/html' });
    // var rs = fs.createReadStream(__dirname + '/index.html');
    // rs.pipe(res);

    res.sendFile(__dirname + '/index.html');
});

app.post('/index.html', (req, res) => {
    req.on('data', (data) => {
        var obj = qs.parse(data.toString());

        console.log(obj);

        res.send('提交成功');
    })
});

var server = app.listen(1337, 'localhost', () => {
    console.log('listen to %j', server.address());
});