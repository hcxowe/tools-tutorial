//************************************************************************************************
// 生成器： 一类特殊的函数，可以一次或者多次启动和停止，并不一定非得要完成
var x = 1;
function *foo() {
    x++;
    yield;
    console.log(x);
}

var it = foo();
it.next();
console.log(x); // 2
x++;
it.next(); // 3

//************************************************************************************************
// next() 与 yield 构成一个双向消息传递系统
function *fun(x) {
    return x * (yield '传入一个值');
}

var iter = fun(6);
var ret = iter.next();
console.log(ret); // { value: '传入一个值', done: false }
ret = iter.next(7);
console.log(ret); // { value: 42, done: true }

//************************************************************************************************

// 定义一个迭代器 Iterator
var something = (function() {
    var nextVal;

    return {
        [Symbol.iterator]: function() {
            return this;
        },

        next: function() {
            if (nextVal === undefined) {
                nextVal = 1;
            }
            else {
                nextVal = 3 * nextVal + 6;
            }

            if (nextVal > 1000) {
                return { done: true, value: nextVal };
            }

            return { done: false, value: nextVal };
        }
    }
}());

console.log(something.next().value); // 1
console.log(something.next().value); // 9
console.log(something.next().value); // 33

for (var v of something) {
    console.log(v); // 105

    if (v > 100) {
        break;
    }
}

console.log(something.next().value); // 321




