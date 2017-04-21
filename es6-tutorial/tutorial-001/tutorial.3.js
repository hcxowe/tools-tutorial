// 字符串的扩展

'\u0061'; // a

// 6种方法标示一个字符
'\z';
'\172';
'\x7A';
'\u007A';
'\u{7A}';


// 字符串的遍历器接口
for (let code of 'hcxowe') {
    console.log(code);
}

var a = 'hcxowe'
console.log(`字符串模板,输出a变量:${a}`);