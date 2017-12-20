### 页面加载完毕前调用 document.write 就不清空，调用完再调用 document.write 就会清空， 为何？

#### 原因
当打开一个页面，浏览器执行过程
1. 调用 document.open() 打开文档
2. document.write(...) 将下载到的网页内容写入文档
3. 所有内容写完了，就调用 document.close()
4. 触发 dom ready 事件(DOMContentReady)

如果在第3步之前 document.write(1) 那么你就直接追加内容到当前位置

如果你在第3步之后 document.write()，那么由于 document 已经 close 了，所以必须重新 document.open() 来打开文档，这一打开，内容就被清空了

#### 验证

1. 打开 `https://www.baidu.com/` 等页面加载完
2. 在控制台运行 document.write(1)，页面会清空，只有一个 1
3. 再次运行 document.write(1)，页面没有清空，1 变成了 11，因为追加了一个1
4. 运行 document.close()，这时文档就关闭了
5. 再次运行 document.write(1)，文档又清空了，变成了 1


### 为什么 document.all 有时像一个对象，有时又不像一个对象

#### 原因

这是历史遗留问题，因为IE4首先实现了document.all，可以用 document.all['id'] 来获取元素, 所以那时候的程序员会写出如下浏览器判定代码
```js
if(document.all){
   // IE
   document.all['id'];
}else{
   // 非 IE
   document.getElementById('id');
}
```
后来其他浏览器也实现了document.all，但是又不想被这段判定代码判定为IE，就将document.all的类型设置为了undefined

#### 验证

1. F12打开浏览器console
2. 键入 document.all, 可以看到DOM元素的数组
3. 键入 typeof document.all, 输出 undefined

**不在使用document.all，该用getElementById之类的方法**


### property 与 atttribute

> `node.getAttribute('someAttribute')`获取的是`attribute`，而`node.someAttribute`获取的是元素的`property`，二者并不相同

#### 情景一

```html
<div id="main" />

<script>
    var mainDiv = document.getElementById('main');
    console.log( mainDiv.id );                  //"main"
    console.log( mainDiv.getAttribute('id') );  //"main"
</script>
```

mainDiv.id 和 mainDiv.getAttribute('id') 获取的值相等

#### 情景二

```html
<div id="main" data-h="xxx" data-x=123 />
<script>
    var mainDiv = document.getElementById('main');
    console.log(mainDiv['data-h']); // undefined
    console.log(mainDiv.getAttribute('data-h')); // 'xxx'
    console.log(mainDiv.getAttribute('daTa-H')); // 'xxx'
    console.log(mainDiv.getAttribute('daTa-X')); // '123'
</script>
```

- `property`的方式不能获取自定义属性，`attribute`的方式可以获取自定义属性
- `attribute`获取自定义属性忽略属性的大小写
- `attribute`获取自定义属性得到的值的类型总是字符串

#### 情景三

```html
<!-- 支持disabled的元素 -->
<input type="checkbox" disabled id="check">
<script>
    var check = document.getElementById('check');
    console.log(check.disabled); // true
    console.log(check.getAttribute('disabled')); // ''
</script>

<input type="checkbox" disabled=false id="check">
<script>
    var check = document.getElementById('check');
    console.log(check.disabled); // true
    console.log(check.getAttribute('disabled')); // 'false'
</script>

<!-- 不支持disabled的元素 -->
<div id="main" disabled />
<script>
    var mainDiv = document.getElementById('main');
    console.log(mainDiv.disabled); // undefined
    console.log(mainDiv.getAttribute('disabled')); // ''
</script>

<div id="main" disabled=false />
<script>
    var mainDiv = document.getElementById('main');
    console.log(mainDiv.disabled); // undefined
    console.log(mainDiv.getAttribute('disabled')); // 'false'
</script>
```

- HTML中支持`disabled`的元素只要出现了`disabled`属性，不管值是什么，`property`结果都是true
- HTML中不支持`disabled`的元素出现了`disabled`属性，`property`结果都是`undefined`
- `attribute` 获取的则是把 HTML 里对应属性的值拿到转换成字符串

#### 情景四

```html
<a href="/" id="host"></a>
<script>
var host = document.getElementById('host');
    console.log(logo.href); // 'https://www.jsbin.com' 绝对url
    console.log(logo.getAttribute('href')); // '/'
<script>
```

#### 情景五

```html
<input type="text" value="hcxowe" id="editInput">
<script>
    var editInput = document.getElementById('editInput');
    console.log(editInput.value); // 'hcxowe'
    console.log(editInput.getAttribute('value')); // 'hcxowe'

    editInput.value = 'rachel';

    console.log(editInput.value); // 'rachel'
    console.log(editInput.getAttribute('value')); // 'hcxowe'

    editInput.setAttribute('value', 'xuan');

    console.log(editInput.value); // 'rachel'
    console.log(editInput.getAttribute('value')); // 'xuan'
</script>
```

对于input 的 value， 改变 `property` 不会同步到 `atttribute` 上，改变 `attribute`也不会同步到 `property`, `attribute`对应 HTML， `property` 对应 DOM

获取非自定义的属性，比如 id、name、src、href 、checked... 用 `property` 的方式比较符合日常习惯，如果需要获取自定义属性那只能使用 `getAttribute`

