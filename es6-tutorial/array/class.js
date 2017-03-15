/**
 * Class 类
 */

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    toString() {
        return 'x:' + this.x + 'y:' + this.y;
    }
};

var point = new Point(1, 2);
point.toString();