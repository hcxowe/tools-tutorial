/**
 * 遍历器（Iterator）就是这样一种机制。它是一种接口，为各种不同的数据结构提供统一的访问机制。
 * 任何数据结构只要部署Iterator接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）
 */

/**
 * Iterator的作用有三个：
 * 一是为各种数据结构，提供一个统一的、简便的访问接口；
 * 二是使得数据结构的成员能够按某种次序排列；
 * 三是ES6创造了一种新的遍历命令for...of循环，Iterator接口主要供for...of消费
 */

// 三类数据结构原生具备Iterator接口：数组、某些类似数组的对象、Set和Map结构
var ary = [1, 2, 3];
var iter = ary[Symbol.iterator]();
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());

// { value: 1, done: false }
// { value: 2, done: false }
// { value: 3, done: false }
// { value: undefined, done: true }

let iterable = {
	0: 'a',
	1: 'b',
	2: 'c',
	length: 3,
	[Symbol.iterator]: Array.prototype[Symbol.iterator]
};
for (let item of iterable) {
	console.log(item); 
}
// 'a', 'b', 'c'


var arr = ['a', 'b', 'c', 'd'];

for (let a in arr) {
	console.log(a); // 0 1 2 3
}

for (let a of arr) {
	console.log(a); // a b c d
}


let arr2 = [3, 5, 7];
arr.foo = 'hello';

for (let i in arr2) {
	console.log(i); // "0", "1", "2", "foo"
}

for (let i of arr2) {
	console.log(i); //  "3", "5", "7"
}


let map = new Map().set('a', 1).set('b', 2);
for (let pair of map) {
	console.log(pair);
}
// ['a', 1]
// ['b', 2]

for (let [key, value] of map) {
	console.log(key + ' : ' + value);
}
// a : 1
// b : 2

var engines = new Set(["Gecko", "Trident", "Webkit", "Webkit"]);
for (var e of engines) {
	console.log(e);
}
// Gecko
// Trident
// Webkit

let arr3 = ['a', 'b', 'c'];
for (let pair of arr3.entries()) {
	console.log(pair);
}
// [0, 'a']
// [1, 'b']
// [2, 'c']


for (i of [1, 2, 3]) {
	console.log(i);
	if (i > 1) {
		break;
	}
}