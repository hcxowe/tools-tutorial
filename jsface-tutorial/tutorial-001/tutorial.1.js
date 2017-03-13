// 1
(function() {
    var a = b = 5;
}());

console.log(b); // 5;

// 2、在 String 对象上定义一个 repeatify 函数。这个函数接受一个整数参数，来明确字符串需要重复几次、
// 如： console.log('hello'.repeatify(3)); 输出 hellohellohello
String.prototype.repeatify = String.prototype.repeatify || function(times) {
   var str = '';
 
   for (var i = 0; i < times; i++) {
      str += this;
   }
 
   return str;
};

console.log('hcxowe'.repeatify(3));

String.prototype.repeatify1 = String.prototype.repeatify || function(times) {
    return new Array(n+1).join(this);
};

console.log('hcxowe'.repeatify1(3));

// 3、变量提升
(function() {
    console.log(a);
    console.log(foo());

    var a = 1;
    var foo = function foo() {
        return 'foo2';
    };

    function foo() {
        return 'foo';
    }

    console.log(foo());
}());