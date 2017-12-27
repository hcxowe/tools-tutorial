### 为什么不建议将 font-size 设置为 12px 以下？

#### 原因

因为`Chrome`做了如下限制：

- font-size 有一个最小值 12px
- 允许你把 font-size 设置为 0
- 户是可以自行调整的，进入 chrome://settings/fonts 设置

#### 处理

- Chrome 29-，你可以使用 `-webkit-text-size-adjust: none;` 来解除这个限制
- 先设置 12px，然后使用 transform: scale(0.75) 将元素缩小

### 文本添加省略号

```css
p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
```

### CSS样式统一化 reset，normalize，neat的区别？

#### reset

> reset是清除浏览器的默认样式并保持在所有浏览器中一致

#### normalize

> normalize是使用同一种默认样式并在所有浏览器中保持样式一致

#### neat

> neat是前两种的结合，具体需要根据网站的设计特点来确定，但仍需保证默认样式在所有浏览器中一致

### 实现动画的方案有哪些？

- JS
- SVG
- CSS3 transition
- CSS3 animation
- CSS3 Canvas
- requestAnimationFrame

### 实现动画的时候为何会将动画间隔设置为16ms？

一般认为人眼能辨别的流畅动画为每秒60帧，16ms比1000ms/60 略小一点，所以这种情况下可以认为动画是流畅的

### BFC的定义及布局规则？

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