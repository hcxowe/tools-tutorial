// let 与 const
function L(obj) {
    console.log(obj);
}

// 块级作用域
{
    let a = 1;
    var b = 2;
}

//L(a); // a is not defined
//L(b); // 2

var a = [];
for (let i = 0; i < 10; i++) {
    a[i] = function() {
        return i;
    };
}

L(a[5]()); // 5

// let 不存在变量提升
//L(foo);  // ReferenceError: foo is not defined
let foo = function(){};


// 暂时性死区
var temp = 'temp';
if (true) {
    //temp = 'block'; // ReferenceError: temp is not defined
    let temp;
}


// 不允许重复声明
function dx () {
    let a = 1;
    //var a = 2; // SyntaxError: Identifier 'a' has already been declared
}


// const 用来声明常量
const PI = 3.14;
//PI = 12; // TypeError: Assignment to constant variable


// 全局对象属性
globalA = 1;
L(global.globalA); // 1

let letA = 2;
L(global.letA); // undefined
