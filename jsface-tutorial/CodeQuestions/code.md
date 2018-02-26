### What is the value of foo?`var foo = 10 + '20'`

> 1020

### What will be the output of the code below?`0.1+0.2 == 0.3`

false

### How would you make this work?
```js
add(1, 2, 3, 4) // 10
add(1)(2)(3)(4) // 10
```

```js
function add() {
    var len = arguments.length
    if(len > 1) {
        return [].slice.call(arguments).reduce(function(x, y){return x+y}, 0)
    }
    
    add.sum += arguments[0]
    return add
}

add.sum = 0
add.valueOf = add.toString = function() {
    return this.sum
}
```

### What is the value of foo.x?

```js
var foo = {n: 1};
var bar = foo;
foo.x = foo = {n: 2};
```

```js
foo; // {n: 2}
bar; // {x: {n:2}, n:1}
foo.x // undefined
```