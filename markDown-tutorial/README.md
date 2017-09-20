## 标题

```
# markdown
## markdown
### markdown
#### markdown
##### markdown
###### markdown

markdown
=======

markdown
---
```

# markdown
## markdown
### markdown
#### markdown
##### markdown
###### markdown  

markdown
===
markdown
---

<br>  

## 引用

```
> Markdown是一种可以使用普通文本编辑器编写的标记语言，通过简单的标记语法，它可以使普通文本内容具有一定的格式

// 嵌套
> Markdown是一种可以使用普通文本编辑器编写的标记语言，通过简单的标记语法，它可以使普通文本内容具有一定的格式
>> Markdown是一种可以使用普通文本编辑器编写的标记语言，通过简单的标记语法，它可以使普通文本内容具有一定的格式
>>> Markdown是一种可以使用普通文本编辑器编写的标记语言，通过简单的标记语法，它可以使普通文本内容具有一定的格式
```

> Markdown是一种可以使用普通文本编辑器编写的标记语言，通过简单的标记语法，它可以使普通文本内容具有一定的格式
>> Markdown是一种可以使用普通文本编辑器编写的标记语言，通过简单的标记语法，它可以使普通文本内容具有一定的格式
>>> Markdown是一种可以使用普通文本编辑器编写的标记语言，通过简单的标记语法，它可以使普通文本内容具有一定的格式

<br>  

## 斜体 & 粗体

```
字体   
*斜体*
_斜体_
**粗体**
__粗体__

```

字体   
*斜体*  
_斜体_  
**粗体**  
__粗体__
 
<br>

## 换行

### 

```

&copy;// 这里没有空格
AT&T

// 使用两个以上的空格在回车进行换行
&copy;  // 这里有两个空格
AT&T

&copy;<br>
AT&T
```

&copy;
AT&T

&copy;  
AT&T

&copy;<br>
AT&T

<br>

## 列表

### 无序列表
```
// 文字开头添加(*, +, and -)实现无序列表, 符号与文字之间需要添加空格
* Red
* Green
* Blue  

+ Red
+ Green
+ Blue  

- Red
- Green
- Blue  
```

* Red
* Green
* Blue  

+ Red
+ Green
+ Blue  

- Red
- Green
- Blue  

### 有序列表

```
// 在文字前添加数字与空格
1. Red
2. Green
3. Blue 
```

1. Red
2. Green
3. Blue 

<br>

## 链接

```
[节点集团](http://www.xmnode.com/ "baiduyixia")

<http://www.taobao.com>

[baidu]: http://www.baidu.com "百度"
[百度一下][baidu]
```

[节点集团](http://www.xmnode.com/ "www.xmnode.com")

<http://www.taobao.com>

[baidu]: http://www.baidu.com "百度"
[百度一下][baidu]

<br>

## 分隔线

```
* * *
- - -
```

* * *
- - -

<br>

## 图片

```
![Alt text](./111.png "xmnode")
```

![Alt text](./111.png "xmnode")

<br>

## 代码

`markdow`

``There is a literal backtick (`) here.``

    hello world!!!

```html
<div class="wrap">
    <div class="left-md">
        <textarea id="mdInput"></textarea>
    </div>
    <div class="right-html">
        <div class="markdown-body" id="htmlShow"></div>
    </div>
</div>
```

```js
var input = document.getElementById('mdInput');
var container = document.getElementById('htmlShow');
input.addEventListener('input', function(evt) {
    container.innerHTML = marked(evt.target.value);
});
```

```css
.wrap {
    width: 100%;
    height: 100%;
    position: relative;
}

.left-md {
    position: absolute;
    left: 0; top: 0; bottom: 0; 
    width: 50%;
    padding: 5px;
    border: 1px solid #ccc;
}

.left-md > textarea {
    width: 100%;
    height: 100%;
    resize: none;
}

.right-html {
    position: absolute;
    right: 0; top: 0; bottom: 0; 
    width: 50%;
    padding-left: 30px;
    border: 1px solid #ccc;
    overflow: auto;
}
```

```java
public class HelloWorld {
    public static void main(String[] args){
        System.out.println("Hello World!");
    }
}
```

