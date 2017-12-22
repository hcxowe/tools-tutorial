### 为什么 0.1 + 0.2 结果为 0.30000000000000004 ？

#### 原因
基础知识：
- 计算机将所有数据以二进制的形式存储
- 计算机用有限的大小来存储数据（不存在无限大的内存或硬盘）

1. 十进制的 0.1 转为二进制，得到一个无限循环小数：0.00011…，二进制无法用有限的位数来表示 0.1。对于 0.2 也是一样的
2. 计算机只能用有限的位数来存一个数，所以最终，计算机存的数是一个近似于 0.1 的小数
3. 当我们计算 0.1 + 0.2 时，实际上算的是两个近似值相加，得到的值也是近似等于 0.3

二进制能「用有限的位数」表示的有：0.5、0.25、0.125 等

#### 验证

```js
0.1 + 0.2
> 0.30000000000000004
```

#### 总结

1. 十进制小数转为二进制小数的过程中，会损失精度
2. 在进行浮点数判断时， == === 的使用需要小心
3. 将小数转换为整数，计算之后在转换回小数
4. ES6，`Number.EPSILON`给出了近似相等的范围
```js
if ( Math.abs(0.3 - (0.1 + 0.2)) < Number.EPSILON ) {
    console.log('equal');
}
// equal
```

### JS里基本类型（值）和复杂类型（引用）有什么区别？

1. 基本类型变量存的是值，复杂类型的变量存的是内存地址
2. 基本类型在赋值的时候拷贝值，复杂类型在赋值的时候只拷贝地址，不拷贝值

### 什么是立即执行函数？有什么作用？

- 定义: 声明一个匿名函数, 马上调用这个匿名函数
- 作用: 创建一个独立的作用域。这个作用域里面的变量，外面访问不到, 即避免`变量污染`

### 对原型、原型链、 Function、Object 的理解？

- 当 new 一个函数的时候会创建一个对象，`函数.prototype` 等于 `被创建对象.__proto__`
- 一切函数都是由 Function 这个函数创建的，所以`Function.prototype === 被创建的函数.__proto__`
- 一切函数的原型对象都是由 Object 这个函数创建的，所以`Object.prototype === 一切函数.prototype.__proto__`

### ES6新增特性有哪些？

- 作用域
    - 块级作用域
    - let
    - const
- 箭头
    - square = x => x * x
    - 函数中this绑定箭头所在词法作用域
- 参数设置
    - 默认参数 function(x=1, y=2) {return x + y}
    - 剩余参数 function(x, ...rest) {return x + rest.reduce((x, y) => {return x + y})}
    - 展开运算符 [...[1,2,3]] => [1,2,3]
- 模板字面量
    - 支持多行
    - 字符串插值 `${a}`
- 对象属性加强
    - 属性定义段语法 var x = 1, y = 2, obj = {x, y}
    - 属性名支持表达式 var obj2 = {['x' + x]: x}
    - 新增__prop__属性
- 解构赋值
    - 数组解构赋值 var a = 1, b = 2, [a, b] = [b, a]
    - 对象解构赋值 var {a, b} = {a: 1, b: 2, c: 3}
    - 参数解构赋值 function({a:1, b:2}) { return a + b;}
- 模块
    - 导入 import
    - 导出 export
    - 默认导出 default export
- 类
    - super
    - 构造函数
    - 继承 extends
- 迭代
    - 迭代器
    - for of
- 生成器 Generator
- Promise
- Proxy & Reflex
- 新增数据类型
    - Symbol
    - Set
    - Map
    - WeakSet
    - WeakMap
    - TypeArray
- 内置对象API增强
    - String
        - includes
        - repeat
        - startsWith
        - endsWith
    - Number
        - EPSILON
        - isInteger
        - isSafeInteger
        - isFinite
        - isNaN
    - Math
        - acosh
        - hypot
        - imul
        - sign
        - trunc
    - Object
        - assign
    - Array
        - from
        - of
        - fill
        - findIndex
        - copyWithin
        - entries
        - keys
        - values
- 尾递归优化

### 什么是作用域？

作用域是一套设计良好的规则，用来存储变量，并且之后可以方便地找到这些变量

作用域可以嵌套，引擎在查找变量时，会沿着当前作用域向上进行查找

ReferenceError同作用域判别失败相关 - 不成功的RHS(赋值操作右侧)引用
TypeError则代表作用域判别成功了，但对结果的操作是非法或者不合理的

### 什么是词法作用域？

词法作用域是一套关于引擎如何寻找变量以及会在何处找到变量的规则，它的定义过程发生在书写阶段（没有eval，with）

词法作用域就是定义在词法阶段的作用域，由写代码时将变量与块作用域写在哪里决定的

#### 什么是闭包？

当函数能够记住并访问所在的词法作用域即使函数是在当前词法作用域之外执行，就产生了闭包