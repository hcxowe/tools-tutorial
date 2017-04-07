// Assert 断言  assert 模块提供了一组简单的断言测试集合，可被用于测试不变量

const assert = require('assert');

// assert.ok(value[, messgae]) value是否为真值，不是则抛出异常，异常信息message
assert(true);
// assert(false);
// assert(false, '不是真值');

// assert.equal(boj1, boj2[, message])  使用 == 比较
assert.equal(1, 1); 
assert.equal(1, "1");
//assert.equal({}, {}); // 不通过

// assert.notEqual !=

// assert.strictEqual === 

// assert.notStrictEqual !==

// assert.deepEqual(obj1, obj2[, message]) 测试 actual 参数与 expected 参数是否深度相等
// 原始值使用相等运算符（==）比较
// 只比较可枚举的自身属性
const obj1 = {
    a: 1,
    b: {
        x: null
    }
};

const obj2 = {
    a: 1,
    b: {
        x: undefined
    }
};

assert.deepEqual(obj1, obj1, '不相等');
assert.deepEqual(obj1, obj2, '不相等');

// assert.notDeepEqual(obj1, obj2[, message])  测试不深度相等，与assert.deepEqual相反

// assert.deepStrictEqual(actual, expected[, message])
// 原始值使用全等运算符（===）比较。 其次，对象的比较包括检查它们的原型是否全等
assert.deepEqual({a: 1}, {a: '1'}); // 通过
//assert.deepStrictEqual({a:1}, {a:'1'}); // 不通过

// assert.notDeepStrictEqual(actual, expected[, message]) 

// assert.doesNotThrow(block[, error][, message]) 
// 断言 block 函数不会抛出错误, 如果抛出错误与error指定的错误类型相同 则抛出AssertionError, 不同则抛出函数抛出的异常
// assert.doesNotThrow(() => {
//     throw new TypeError('error');
// }, TypeError, '捕获指定类型错误');


// assert.fail(obj1, obj2, message, operator)
//assert.fail(1, 2, undefined, '>'); // 抛出异常 1 > 2
//assert.fail(1, 2, 'error', '>'); // 抛出异常 error

// assert.ifError(value)  value是否为真值，为真值抛出value


// assert.throw(func[, error][, message])
