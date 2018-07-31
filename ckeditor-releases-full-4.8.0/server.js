var express = require("express");
const proxy = require('http-proxy-middleware');
var app = express();

app.use("/", express.static(__dirname + ""));

app.listen(8765, () => {
    console.log('Listening on: http://localhost:8765');
});