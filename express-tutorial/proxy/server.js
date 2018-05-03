const express = require('express');
const crypto=require('crypto');  
const proxy = require('http-proxy-middleware');//引入代理中间件
const bodyParser = require('body-parser');
const app = express();

var allData = {}

/* app.use(function (req, res, next) {
    allData[req.path] = req;
    next();
}); */

const zimu = 'abcdefghijklmnopqrstuvwxyz';
const appID = 'gasd12138';
const appKey = '3545GASwkasasdvT48';
 
//将服务器代理到localhost:8080端口上[本地服务器为localhost:3000]
const apiProxy = proxy('/', { 
    target: 'http://192.168.0.174:8081',
    changeOrigin: true,
    onProxyReq(proxyReq, req, res) {


        //console.dir(req)
        var md5 = crypto.createHash("md5");  
        var time = new Date().getTime();
        var ranS = randomString(6);

        console.dir(proxyReq)

        var obj = {}
        if (req.method == 'GET') {
            obj = req.query
        }
        else if (req.method == 'POST') {
            obj = req.body
            
        }

        var str =  JSON.stringify(obj) != '{}' 
                ? Object.keys(obj).filter(el=>obj[el]).sort().map(el => `${el}=${obj[el]}`).join('&') + '&' + appKey + '&' + time + '&' + ranS
                : appKey + '&' + time + '&' + ranS

        var md5S = md5.update(str).digest('hex');

        var ret = {
            appid: appID,
            sign: md5S,
            timestamp: time,
            nonce: ranS
        }

        req = allData[req.path]
        proxyReq.setHeader('Authorization', JSON.stringify(ret));
    }
});

//app.use(bodyParser.json())
app.use('/', apiProxy);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.listen(3000, () => {
  console.log('Listening on: http://localhost:3000');
});

function randomString(count) {
    var str = ''
    
    while(count--) {
        str += zimu[Math.floor(Math.random() * 27)]
    }

    return str
}