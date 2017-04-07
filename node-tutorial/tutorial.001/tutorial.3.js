// Buffer 
// Buffer类的实例类似于整数数组，除了其是大小固定的、且在 V8 堆外分配物理内存。 Buffer 的大小在其创建时就已确定，且不能调整大小。
const buf1 = Buffer.alloc(10, 0); // 长度为10，以0填充的Buffer
console.log(buf1);

const buf2 = Buffer.allocUnsafe(10); // 长度为10，为初始化的Buffer
console.log(buf2);
buf2.fill(0);
console.log(buf2); // 这里的console存在异步输出， 输出的buf内容一样

const buf3 = Buffer.from([1 ,2 ,3]);
console.log(buf3);

const buf4 = Buffer.from('test ddd', 'utf-8');
console.log(buf4);

for (const value of buf3) {
    console.log(value);
}

console.log(`${buf3}:${Buffer.byteLength(buf3, 'utf-8')}字节`);