// Array.from-------------------------------------------------------------------------------------
let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};

let arr1 = [].slice.apply(arrayLike);
console.log(arr1); // ['a', 'b', 'c']

let arr2 = Array.from(arrayLike);
console.log(arr2); // ['a', 'b', 'c']

(function foo() {
    console.log(Array.from(arguments));
    console.log([].slice.apply(arguments));
    console.log([...arguments]); // 扩展运算符
}(1, 2, 3));

// [1 ,2 ,3]
// [1 ,2 ,3]
// [1 ,2 ,3]

Array.from('hcxowe'); // ["h", "c", "x", "o", "w", "e"]
Array.from({
    length: 3
}); // [undefined, undefined, undefined]
Array.from([1, 2, 3], (x) => x * x); // [1, 4, 9]

// 字符串转为数组，然后返回字符串的长度。
// 因为它能正确处理各种Unicode字符，可以避免JavaScript将大于\uFFFF的Unicode字符，算作两个字符的bug
function countSymbols(string) {
    return Array.from(string).length;
}

// Array.of-------------------------------------------------------------------------------------

Array.of(1, 2, 3); // [1, 2, 3]
Array.of(1); // [1]

// Array.copyWithin------------------------------------------------------------------------------

// 使用位置2到3（不包括3）的元素覆盖0位置的元素
[1, 2, 3, 4, 5].copyWithin(0, 2, 3); // [3, 2, 3, 4, 5]

// Array.find----------------------------------------------------------------------------------------------

// 找到第一个大于9的元素并返回
[1, 5, 10, 15].find(function (value, index, arr) {
    return value > 9;
}); // 10

// Array.findIndex----------------------------------------------------------------------------------------------

// 找到第一个大于9的元素的位置并返回
[1, 5, 10, 15].find(function (value, index, arr) {
    return value > 9;
}); // 2

// Array.fill----------------------------------------------------------------------------------------------

// 使用7填充1-2-位置, 1, 2 位置可选
['a', 'b', 'c'].fill(7, 1, 2); // ['a', 7, 'c']

['a', 'b', 'c'].fill(7); // [7, 7, 7]

// Array.entries------------------------------------------------------------------------------------------

// 返回遍历器对象,对键值对进行遍历
let letter = ['a', 'b', 'c'];
let entries = letter.entries();
console.log(entries.next().value); // [0, 'a']
console.log(entries.next().value); // [1, 'b']
console.log(entries.next().value); // [2, 'c']

// Array.keys------------------------------------------------------------------------------------------

// 返回遍历器对象,对键进行遍历
letter = ['a', 'b', 'c'];
entries = letter.keys();
console.log(entries.next().value); // 0
console.log(entries.next().value); // 1
console.log(entries.next().value); // 2

// Array.values------------------------------------------------------------------------------------------

// 返回遍历器对象,对值进行遍历
letter = ['a', 'b', 'c'];
entries = letter.keys();
console.log(entries.next().value); // 'a'
console.log(entries.next().value); // 'b'
console.log(entries.next().value); // 'c'

// Array.includes-----------------------------------------------------------------------------------------

// 从位置2开始查找数组是否存在值3
[1, 2, 3].includes(3, 2); // true
[1, 2, 3].includes(3, 3); // false


// 数组的空位---------------------------------------------------------------------------------------

// 数组的空位指，数组的某一个位置没有任何值
// 空位不是undefined，一个位置的值等于undefined，依然是有值的。空位是没有任何值
let ary = Array(4); // [undefined × 3]

/*
 ES5对空位的处理，已经很不一致了，大多数情况下会忽略空位。
    - forEach(), filter(), every() 和some()都会跳过空位。
    - map()会跳过空位，但会保留这个值
    - join()和toString()会将空位视为undefined，而undefined和null会被处理成空字符串。
*/

// forEach方法
[, 'a'].forEach((x, i) => console.log(i)); // 1

// filter方法
['a', , 'b'].filter(x => true) // ['a','b']

// every方法
[, 'a'].every(x => x === 'a') // true

// some方法
[, 'a'].some(x => x !== 'a') // false

// map方法
[, 'a'].map(x => 1) // [,1]

// join方法
[, 'a', undefined, null].join('#') // "#a##"

// toString方法
[, 'a', undefined, null].toString() // ",a,,"

// ES6则是明确将空位转为undefined
Array.from(['a', , 'b']); // [ "a", undefined, "b" ]
[, 'a', 'b', , ].copyWithin(2, 0); // [,"a",,"a"]
new Array(3).fill('a'); // ["a","a","a"]

let arr = [, , ];
for (let i of arr) {
    console.log(1);
} // 1 1

// entries()
[...[, 'a'].entries()] // [[0,undefined], [1,"a"]]

// keys()
[...[, 'a'].keys()] // [0,1]

// values()
[...[, 'a'].values()] // [undefined,"a"]

// find()
[, 'a'].find(x => true) // undefined

// findIndex()
[, 'a'].findIndex(x => true) // 0

// 避免空位的出现