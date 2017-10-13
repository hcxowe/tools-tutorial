// String.prototype.match
var str = 'abcd{$info},efghijklmnopqr{$index}stuvwxyz';
var ret = str.split(/\{\$.+?\}/);
console.dir(ret); // [ 'abcd', ',efghijklmnopqr', 'stuvwxyz' ]

var ret = str.split(/\{\$.+?\}/g);
console.dir(ret); // [ 'abcd', ',efghijklmnopqr', 'stuvwxyz' ]

ret = str.split(/\{\$(.+?)\}/);
console.dir(ret); // [ 'abcd', 'info', ',efghijklmnopqr', 'index', 'stuvwxyz' ]

ret = str.split(/\{\$(.+?)\}/g);
console.dir(ret); // [ 'abcd', 'info', ',efghijklmnopqr', 'index', 'stuvwxyz' ] 

ret = str.match(/\{\$(.+?)\}/);
console.dir(ret); 
/* 
[ 
    '{$info}'
    'info'
    index: 4
    input: 'abcd{$info},efghijklmnopqr{$index}stuvwxyz' 
] 
*/
ret = str.match(/\{\$(.+?)\}/g);
console.dir(ret); // [ '{$info}', '{$index}' ]

ret = str.search(/\{\$(.+?)\}/g);
console.log(ret); // 4
ret = str.search(/\{\$(.+?)\}/);
console.log(ret); // 4
ret = str.search(/\{\$.+\}/);
console.log(ret); // 4


var data = {
    info: 'information',
    index: 999
};

ret = str.replace(/\{\$.+?\}/g, function() {
    console.log(arguments);
    return arguments[1];
});
console.log(ret); // abcd4,efghijklmnopqr26stuvwxyz
/* 
    { 
        '0': '{$info}',
        '1': 4,
        '2': 'abcd{$info},efghijklmnopqr{$index}stuvwxyz' 
    }
    { 
        '0': '{$index}',
        '1': 26,
        '2': 'abcd{$info},efghijklmnopqr{$index}stuvwxyz' 
    } 
*/
ret = str.replace(/\{\$(.+?)\}/g, function() {
    console.log(arguments);
    return data[arguments[1]];
});
console.log(ret); // abcdinformation,efghijklmnopqr999stuvwxyz
/* 
    { 
        '0': '{$info}',
        '1': 'info',
        '2': 4,
        '3': 'abcd{$info},efghijklmnopqr{$index}stuvwxyz' 
    }
    { 
        '0': '{$index}',
        '1': 'index',
        '2': 26,
        '3': 'abcd{$info},efghijklmnopqr{$index}stuvwxyz'
    }
*/