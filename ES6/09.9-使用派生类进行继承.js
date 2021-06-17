/**
 * ES6之前,实现自定义类型的继承是个繁琐的过程.严格的继承要求有多个步骤,如下:
 */
function Rectangle(length,width){
    this.length = length;
    this.width = width;
}

Rectangle.prototype.getArea = function() {
    return this.length * this.width;
};

function Square(length){
    Rectangle.call(this,length,length);
}
Square.prototype = Object.create(Rectangle.prototype,{
    constructor: {
        value:Square,
        enumerable:true,
        writable:true,
        configurable:true
    }
});
var square = new Square(3);

console.log(square.getArea());
console.log(square instanceof Square);
console.log(square instanceof Rectangle);
/**
 * Square 继承了 Rectangle,为此它必须使用 Rectangle.prototype 所创建的一个新对象来
 * 重写 Square.prototype, 并且还要调用 Rectangle.call() 方法. 这些步骤常常会搞晕
 * JS 的新手,并会成为有经验开发者出错的根源之一.
 * 
 * 类让继承工作变得更轻易,使用熟悉的 extends 关键字来指定当前类所需要继承的函数,即可.生
 * 成的类的原型会被自动调整,而你还能调用 super() 方法来访问基类的构造器,此处是与上个例子
 * 等价的 ES6 代码:
 */

class Rectangle_01 {
    constructor(length,width) {
        this.length = length;
        this.width = width;
    }

    getArea() {
        return this.length * this.width
    }
}

class Square_01 extends Rectangle_01 {
    constructor(length) {

        //与 Rectangle.call(this,length,length) 相同
        super(length,length);
    }
}

var square = new Square_01(3);
console.log(square.getArea());
console.log(square instanceof Square_01);
console.log(square instanceof Rectangle_01);
/**
 * 此次Square_01 类使用了 extends 关键字继承了 Rectangle_01. Square_01 构造器使用了 super()
 * 配合指定参数调用了 Rectangle 的构造器,注意与 ES5 版本的代码不同, Rectangle 标识符仅在类定义
 * 时被使用了 (在 extends 之后 ).
 * 
 * 继承了其他类的类被称为派生类(derived classes),如果派生类指定了构造器,就需要使用 super(),否则
 * 会造成错误,若你选择不使用构造器, super() 方法会被自动调用,并会使用创建新实例时提供的所有参数,
 * 例如,下列两个类是完全相同的:
 */
class Square extends Rectangle {
    //没有构造器
}
//等价于:
class Square extends Rectangle {
    constructor(...args){
        super(...args);
    }
}
/**
 * 此例中的第二个类展示了与所有派生类默认构造器等价的写法,所有的参数都按顺序传递给了基类的构造器.在
 * 当前需求下,这种做法并不完全准确,因为 Square 构造器只需要单个参数,因此最好手动定义构造器.
 */

/**
 * 使用 super() 是需牢记以下几点:
 * 
 * > 你只能在派生类中使用 super(). 若尝试在非派生的类(即: 没有使用 extends 关键字的类) 或函数中
 *   使用它,就会抛出错误.
 * > 在构造器中,你必须在访问 this 之前调用 super(). 由于 super() 负责初始化 this,因此试图先访问
 *   this 自然就会造成错误.
 * > 唯一能避免调用 super() 的办法,是从类构造器中返回一个对象.
 *   
 */