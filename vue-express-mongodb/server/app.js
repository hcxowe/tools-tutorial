var express = require('express');
var path = require('path');
var history = require('connect-history-api-fallback');

var app = express();

app.use(express.static(path.join(__dirname, '../dist')));

app.use(history({
    disableDotRule: true,
    verbose: true
}));

app.listen(3000, function() {
    console.log('start server');
});