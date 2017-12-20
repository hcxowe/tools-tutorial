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

