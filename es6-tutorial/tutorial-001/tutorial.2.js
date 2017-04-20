// 变量的解构赋值
function l(obj) {console.log(obj);}

// 数组的解构
var [a, b, c] = [1, 2, 3];
l(a); // 1

// 对象的解构
var {foo, bar} = {foo: 'foo', bar: 'bar'};
l(foo); // foo


let {min, max, abs} = Math;
min(1,2); //1


// 字符串的解构
const [aa, bb, cc, dd, ee, ff] = 'hcxowe';
let {length: len} = 'hcxowe';

aa; // h
len; // 6


// 函数参数的解构
function add([x, y]) {
    return x + y;
}

add([1, 2]); // 3


// 叫唤 a ， b 的值
[a, b] = [b, a];



// 从函数返回多个值
function test() {
    return [1, 2, 3];
}

var [x, y, z] = test();

x; // 1
 

// 输入模块的指定方法
import {xx, yy} from cxxsd;