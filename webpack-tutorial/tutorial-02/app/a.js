require('xxx/b.js');
require('./app.css');
var $ = require('jquery');
document.writeln('webpack-xxxx');

$(function() {
    console.log('domready');
});