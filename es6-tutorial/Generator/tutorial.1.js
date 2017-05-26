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

//************************************************************************************************

// ES6最完美的世界就是生成器（看似同步的异步代码）和Promise（可信任可组合）的结合

// 执行一个生成器，把上一个yield的值传递给下一个yield
function run(gen) {
    var args = [].slice.call(arguments, 1), it;

    // 初始化生成器
    it = gen.apply(this, args);

    return Promise.resolve().then(function handleNext(value) {
        // 上一个yield使用value代替， 并执行到下一个yield，并返回yield返回的值
        var next = it.next(value);

        return (function handleResult(next) {
            // 如果生成器执行完成，则返回生成器最后返回的值
            if (next.done) {
                return next.value;
            }
            // 继续下一个yield
            else {
                return Promise.resolve(next.value).then(
                    handleNext, // 向生成器传回上一步生成器得到的值

                    // reject时，把错误传回生成器进行错误处理
                    function handleErr(err) {
                        return Promise.resolve(it.throw(err)).then(handleResult)
                    })
            }

        }(next));
    });
}



