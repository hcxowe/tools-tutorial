#### 为什么不建议将 font-size 设置为 12px 以下？

#### 原因

因为`Chrome`做了如下限制：

- font-size 有一个最小值 12px
- 允许你把 font-size 设置为 0
- 户是可以自行调整的，进入 chrome://settings/fonts 设置

#### 处理

- Chrome 29-，你可以使用 `-webkit-text-size-adjust: none;` 来解除这个限制
- 先设置 12px，然后使用 transform: scale(0.75) 将元素缩小

