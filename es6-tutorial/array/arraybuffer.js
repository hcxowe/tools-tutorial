// 二进制数组： 
/**
 * ArrayBuffer 创建内存
 * TypeBuffer 接受ArrayBuffer对象，指定何种方式解析数据  TypeBuffer共有9种类型
 * DataView 自定义复合格式的视图
 */

var buf = new ArrayBuffer(255);
var typebuf = new Int8Array(buf); // 使用有符号8位整数解读buf
var dataView = new DataView(buf); // 自定义复合格式的视图
dataView.getUint8(0); // 以无符号8位整数读取buf第一个元素

/**
 * 应用场景：
 *  AJAX： XMLHttpRequest 第二版可以接受服务器返回二进制数据
 *  canvas: canvas元素输出的二进制像素数据，就是TypeArray数组
 *  WebSocket: 发送或接受二进制数组
 *  Fetch API - 改进页面通信的技术的新一代技术
 *  File API
 *  SharedArrayBuffer: 线程共享数据
 **/