var express = require("express");
const proxy = require('http-proxy-middleware');
var app = express();

app.use("/", express.static(__dirname + ""));

const apiProxy = proxy('/', { 
    target: 'http://192.168.0.85:9000',
    changeOrigin: true,
    onProxyReq(proxyReq, req, res) {

    }
});

app.use('/', apiProxy)

app.listen(3000, () => {
    console.log('Listening on: http://localhost:3000');
});