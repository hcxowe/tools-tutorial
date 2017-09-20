# 简介

Markdown 旨在简洁、高效，也由于 Markdown 的易读易写，人们用不同的编程语言实现了多个版本的解析器和生成器，这就导致了目前不同的 Markdown 工具集成了不同的功能（基础功能大致相同），例如流程图与时序图，复杂表格与复杂公式的呈现，虽然功能的丰富并没有什么本质的缺点，但终归有些背离初衷，何况在编写的过程中很费神，不如使用专业的工具撰写来的更有效率，所以如果你需实现复杂功能，专业的图形界面工具会更加方便。当然，如果你对折腾这些不同客户端对 Markdown 的定制所带来高阶功能感到愉悦的话，那也是无可厚非的


# 规则

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

+ AAA
    - BBB
        * CCC
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

+ AAA
    - BBB
        * CCC

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

<br>

## 表格

```
|列头|列头|列头|
|:-|:-:|-:|
|左对齐列|居中对齐列|右对齐列|
|11111111111111|222222222222222|33333333333333|
```

|列头|列头|列头|
|:-|:-:|-:|
|左对齐列|居中对齐列|右对齐列|
|11111111111111|222222222222222|33333333333333|

