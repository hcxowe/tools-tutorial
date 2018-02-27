### CSS 中类 (class) 和 ID 的区别 ?

> css 中 class 与 ID 的权重不同

> html 中:id 与 class 都是元素属性, id 的值是唯一的, class 的值可以多个;id 还有锚点功能

### 请问 "resetting" 和 "normalizing" CSS 之间的区别？你会如何选择，为什么？

> Normalize 注重通用的方案，重置掉该重置的样式，保留有用的 user agent 样式，同时进行一些 bug 的修复

> Reset 不管你有没有用，统统重置成一样的效果，且影响的范围很大，讲求跨浏览器的一致性

1. Normalize.css 保护了有价值的默认值，Reset通过为几乎所有的元素施加默认样式，强行使得元素有相同的视觉效果。相比之下，Normalize.css保持了许多默认的浏览器样式。这就意味着你不用再为所有公共的排版元素重新设置样式。当一个元素在不同的浏览器中有不同的默认值时，Normalize.css会力求让这些样式保持一致并尽可能与现代标准相符合。 
2. Normalize.css 修复了浏览器的bug，它修复了常见的桌面端和移动端浏览器的bug。这往往超出了Reset所能做到的范畴。关于这一点，Normalize.css修复的问题包含了HTML5元素的显示设置、预格式化文字的font-size问题、在IE9中SVG的溢出、许多出现在各浏览器和操作系统中的与表单相关的bug。 
3. Normalize.css 不会让你的调试工具变的杂乱 
4. Normalize.css 是模块化的 
5. Normalize.css 拥有详细的文档 

### 请解释浮动 (Floats) 及其工作原理 ?

> 浮动元素会生成一个块级框

### 描述z-index和叠加上下文是如何形成的 ?

#### 叠加上下文形成原因

- 负外边距
> 文档流处于后面的元素覆盖前面的元素
- 绝对/相对/固定 定位
> z-index 控制层叠顺序

### 请描述 BFC(Block Formatting Context) 及其如何工作 ?


> BFC直译为`块级格式化上下文`，它是一个独立的渲染区域，只有块级盒子参与,它规定了内部块级盒子如何布局，并且这个区域与外部毫不相干

#### BFC布局规则

- 内部的Box会在垂直方向,一个接一个地放置
- 盒子垂直方向的距离由`margin`决定，属于同一个BFC的两个相邻盒子的`margin`会发生重叠
- 每个元素的`margin`框的左边与包含块`border`框左边相接触，即使存在浮动元素也是如此
- BFC的区域不会与浮动盒子重叠
- BFC是页面上一个独立的容器，容器内的子元素不会影响到外面的元素，外面也无法影响里面的元素
- 计算BFC的高度时，浮动元素也参与

#### 哪些元素会生成BFC?

- 根元素
- float属性不为none
- position为absolute或fixed
- display为inline-block, table-cell, table-caption, flex, inline-flex
- overflow不为visible( hidden,scroll,auto )

### 列举不同的清除浮动的技巧，并指出它们各自适用的使用场景?

- 添加新的元素 、应用 clear: left/right/both;
- 父元素定义 overflow：auto/hidden/scroll;
- after 伪元素应用 clear

### 请解释 CSS sprites，以及你要如何在页面或网站中实现它 ?

> 即 css 雪碧图 , CSS Sprites就是把网页中一些背景图片整合到一张图片文件中，再利用CSS的“background-image”，“background- repeat”，“background-position”的组合进行背景定位，background-position可以用数字能精确的定位出背景图片的位置。 

> 优点：当页面加载时，不是加载每个单独图片，而是一次加载整个组合图片。这是一个了不起的改进，它大大减少了HTTP请求的次数，减轻服务器压力，同时缩短了悬停加载图片所需要的时间延迟，使效果更流畅，不会停顿。 

### 你会如何解决特定浏览器的样式问题？

```css
.selector {
　　color: #ff0\0;/*ie8*/
　　color: #f00\9\0;/*ie9+*/
}
```

```html
<!--[if IE 8 ]> <html class="ie8" lang="en"> <![endif]-->
<!--[if IE 9 ]> <html class="ie9" lang="en"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!-->
```

### 如何为有功能限制的浏览器提供网页？

### 有哪些的隐藏内容的方法 (如果同时还要保证屏幕阅读器可用呢)？

1. display:none;的缺陷搜索引擎可能认为被隐藏的文字属于垃圾信息而被忽略屏幕阅读器（是为视觉上有障碍的人设计的读取屏幕内容的程序）会忽略被隐藏的文字。
2. visibility:hidden;的缺陷这个大家应该比较熟悉就是隐藏的内容会占据他所应该占据物理空间
3. overflow:hidden;一个比较合理的方法.texthidden{display:block;/*统一转化为块级元素*/overflow:hidden;width:0;height:0;}就像上面的一段CSS所展示的方法，将宽度和高度设定为0，然后超过部分隐藏，就会弥补上述一、二方法中的缺陷，也达到了隐藏内容的目的。

### 你用过栅格系统 (grid system) 吗？如果使用过，你最喜欢哪种？

### 你用过媒体查询，或针对移动端的布局/CSS 吗？

### 你熟悉 SVG 样式的书写吗？

### 如何优化网页的打印样式？

`<link rel="stylesheet"type="text/css" media="print" href="xxx.css"/>`

1. 打印样式表中最好不要用背景图片，因为打印机不能打印CSS中的背景。如要显示图片，请使用html插入到页面中。
2. 最好不要使用像素作为单位，因为打印样式表要打印出来的会是实物，所以建议使用pt和cm。
3. 隐藏掉不必要的内容。（@print div{display:none;}）
4. 打印样式表中最好少用浮动属性，因为它们会消失。如果想要知道打印样式表的效果如何，直接在浏览器上选择打印预览就可以了。

### 在书写高效 CSS 时会有哪些问题需要考虑？

- 性能
- 可维护性
- 易读性

### 使用 CSS 预处理器的优缺点有哪些？

优点: 可以使用预处理器提供的特性来写 css
缺点: 得花时间学习语法

### 如果设计中使用了非标准的字体，你该如何去实现？

1. 图片代替
2. web fonts在线字库，如Google Webfonts，Typekit
3. @font-face，Webfonts(字体服务例如：Google Webfonts，Typekit)

### 请解释浏览器是如何判断元素是否匹配某个 CSS 选择器？

> 从后往前判断。浏览器先产生一个元素集合，这个集合往往由最后一个部分的索引产生（如果没有索引就是所有元素的集合）。然后向上匹配，如果不符合上一个部分，就把元素从集合中删除，直到真个选择器都匹配完，还在集合中的元素就匹配这个选择器了

### 请描述伪元素 (pseudo-elements) 及其用途。

### 请解释你对盒模型的理解，以及如何在 CSS 中告诉浏览器使用不同的盒模型来渲染你的布局?

#### box-sizing:content-box
当我们设置box-sizing:content-box;时，浏览器对盒模型的解释遵从我们之前认识到的W3C标准，当它定义width和height时，它的宽度不包括border和padding。

#### box-sizing:border-box
当我们设置box-sizing:border-box;时，浏览器对盒模型的解释与IE6之前的版本相同，当它定义width和height时，border和padding则是被包含在宽高之内的。内容的宽和高可以通过定义的“width”和“height”减去相应方向的“padding”和“border”的宽度得到。内容的宽和高必须保证不能为负，必要时将自动增大该元素border box的尺寸以使其内容的宽或高最小为0

### 请罗列出你所知道的 display 属性的全部值

|属性值|描述|
|:-:|:-:|
| none | 不显示 |
| block | 块级元素 |
| inline | 行内元素 |
| inline-block | 行内块级元素 |
| list-item | 作为列表项展示 |
| run-in | 根据上下文作为块级元素或内联元素显示 |
| table | 作为块级表格来显示（类似`<table>`），表格前后带有换行符 |
| inline-table | 作为内联表格来显示（类似`<table>`），表格前后没有换行符 |
| table-row-group | 作为一个或多个行的分组来显示（类似`<tbody>`） |
| table-header-group | 作为一个或多个行的分组来显示（类似`<thead>`）|
| table-footer-group | 作为一个或多个行的分组来显示（类似`<tfoot>`） |
| table-row | 作为一个表格行显示（类似`<tr>`） |
| table-column-group | 作为一个或多个列的分组来显示（类似`<colgroup>`） |
| table-column | 作为一个单元格列显示（类似`<col>`）|
| table-cell | 作为一个表格单元格显示 |
| table-caption | 作为一个表格标题显示（类似`<caption>`） |
| inherit | 从父元素继承display属性的值 |

### 请解释 inline 和 inline-block 的区别？

#### display:block
- block元素会独占一行，多个block元素会各自新起一行。默认情况下，block元素宽度自动填满其父元素宽度。
- block元素可以设置width,height属性。块级元素即使设置了宽度,仍然是独占一行。
- block元素可以设置margin和padding属性。

#### display:inline
- inline元素不会独占一行，多个相邻的行内元素会排列在同一行里，直到一行排列不下，才会新换一行，其宽度随元素的内容而变化。
- inline元素设置width,height属性无效。
- inline元素的margin和padding属性，水平方向的padding-left, padding-right, margin-left, margin-right都产生边距效果；但竖直方向的padding-top, padding-bottom, margin-top, margin-bottom不会产生边距效果。

#### display:inline-block
简单来说就是将对象呈现为inline对象，但是对象的内容作为block对象呈现。之后的内联对象会被排列在同一行内。比如我们可以给一个link（a元素）inline-block属性值，使其既具有block的宽度高度特性又具有inline的同行特性。

### 请解释 relative、fixed、absolute 和 static 元素的区别

1. static（静态定位）：默认值。没有定位，元素出现在正常的流中（忽略 top, bottom, left, right 或者 z-index 声明）。
2. relative（相对定位）：生成相对定位的元素，通过top,bottom,left,right的设置相对于其正常（原先本身）位置进行定位。可通过z-index进行层次分级。　　
3. absolute（绝对定位）：生成绝对定位的元素，相对于 static 定位以外的第一个父元素进行定位。元素的位置通过 "left", "top", "right" 以及 "bottom" 属性进行规定。可通过z-index进行层次分级。
4. fixed（固定定位）：生成绝对定位的元素，相对于浏览器窗口进行定位。元素的位置通过 "left", "top", "right" 以及 "bottom" 属性进行规定。可通过z-index进行层次分级。

### CSS 中字母 'C' 的意思是叠层 (Cascading)。请问在确定样式的过程中优先级是如何决定的 (请举例)？如何有效使用此系统？

### 你在开发或生产环境中使用过哪些 CSS 框架？你觉得应该如何改善他们？

bootstrap3

### 请问你有尝试过 CSS Flexbox 或者 Grid 标准规格吗？

flexbox

### 为什么响应式设计 (responsive design) 和自适应设计 (adaptive design) 不同？

响应式布局 Responsive design ＝ RWD，自适应布局 Adaptive design ＝ AWD

共同点: 两者都是因为越来越多的 移动设备（ mobile, tablet device ）加入到互联网中来而出现的为移动设备提供更好的体验的技术。用技术来使网页适应从小到大（现在到超大）的不同分辨率的屏幕。有人说，RWD 是 AWD 包含的一个子集。

RWD: RWD 是采用 CSS 的 media query 技术，配合流体布局（ fluid grids ）和同样可以自适应的图片/视频等资源素材。以上所说，都是通过 HTML 和 CSS 就能完成的。一般来说，RWD 倾向于只改变元素的外观布局，而不大幅度改变内容。把 RWD 定义为一切能用来为各种分辨率和设备性能优化视觉体验的技术吧。

AWD：Adaptive Design 是 Aaron Gustafson 的书的标题。他认为 AWD 在包括 RWD 的 CSS media query 技术以外，也要用 Javascript 来操作 HTML 来更适应移动设备的能力。AWD 有可能会针对移动端用户减去内容，减去功能。AWD 可以在服务器端就进行优化，把优化过的内容送到终端上。AWD 通常会牵扯到另外一个词 “progressive enhancement” 。

progressive enhancement：从针对最低端的，最低分辨率的设备的设计做起，逐步逐步为更高阶的设备增加功能和效果的做法。（换个角度说，也就是相当于为移动设备减去功能）

RWD 和 AWD 在断点（ break point ）的区别：

RWD 采用流体＋断点，在断点之间，页面依然会随窗口大小自动缩放（通过  fluid grid ），直到遇到断点改变界面样式。相对的，AWD 只在针对几种分辨率（如1280，800，640，320px）进行优化，在断点之间的自动过渡比较少。

RWD 一般来说需要在网页设计初期就开始（通常采用 mobile first 策略），所以旧的网站要做 RWD 很可能要完全重建。而 AWD 则采用保留现有桌面网站（ desktop version ）而对于更小的分辨率做针对性的优化（适应），这点对于很多老的网站来说很重要，因为重构成本太大。

最后：在网上的各种说法里确实是有很多相互干扰相互矛盾的地方，但是其实技术都是摆在那里的。其实可以认为，AWD 在针对布局的优化中，可以采用 RWD 的策略，但是AWD 着力于更多其他的 JS 或者服务器上的优化，来强化移动端体验。
