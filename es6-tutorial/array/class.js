/**
 * Class 类
 */

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    toString() {
        return 'x:' + this.x + ' y:' + this.y;
    }
};

var point = new Point(1, 2);
point.toString();  // x:1 y:2

typeof Point // "function"
Point === Point.prototype.constructor // true

// Class不存在变量提升


// 继承
class ColorPoint extends Point {
    constructor(x, y, color) {
        // 子类必须在constructor方法中调用super方法，否则新建实例时会报错
        super(x, y);
        this.color = color;
    }
}