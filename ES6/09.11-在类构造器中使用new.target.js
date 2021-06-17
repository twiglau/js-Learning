//在简单情况下, new.target 就等于本类的构造器函数,如下:
class Rectangle {
    constructor(length,width){
        console.log(new.target === Rectangle);
        this.length = length;
        this.width = width;
    }
}

//new.target 就是 Rectangle
var obj = new Rectangle(3,4);
/**
 * 以上代码说明在 new Rectangle(3,4) 被调用时, new.target 就等于 Rectangle.
 * 类构造器被调用时不能缺少 new, 因此 new.target 属性就始终在类构造器内被定义.
 * 不过这个值并不总是相同的,如下:
 */
class Square extends Rectangle {
    constructor(length){
        super(length,length);
    }
}

// new.target 就是 Square
var obj = new Square(3);
/**
 * Square 调用了 Rectangle 构造器,因此当 Rectangle 构造器被调用时, new.target 等于
 * Square. 这很重要,因为构造器能根据如何被调用而有不同行为,并且这给了更改这种行为的能力.
 * 如下,你可以使用 new.target 来创建一个抽象基类(一种不能被实例化的类),如下:
 */
class Shape {
    constructor() {
        if (new.target === Shape){
            throw new Error("This class cannot be instantiated directly.")
        }
    }
}
class Rectangle_01 extends Shape {
    constructor(length,width){
        super();
        this.length = length;
        this.width = width;
    }
}

var x = new Shape(); //抛出错误
var y = new Rectangle_01(3,4);
console.log( y instanceof Shape);
/**
 * 此例中的 Shape 类构造器会在 new.target 为 Shape 的时候抛出错误,意味着 new Shape()
 * 永远都会抛出错误,然而,你依然可以将 Shape 用作一个基类,正如 Rectangle 所做那样.
 * super() 的调用执行了 Shape 构造器,而且 new.target 的值等于 Rectangle,因此该构造器
 * 能够无错误地继续执行.
 * 
 * 由于调用类是不能缺少 new, 于是 new.target 属性在类构造器内部就绝不会是 undefined.
 */