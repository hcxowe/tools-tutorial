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