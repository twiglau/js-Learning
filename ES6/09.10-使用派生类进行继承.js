/**
 * 1.屏蔽类方法
 * 派生类中的方法总是会屏蔽基类的同名方法,如,你可以将 getArea() 方法添加到 Square类,
 * 以便重定义它的功能:
 */
class Rectangle {
    constructor(length,width) {
        this.length = length;
        this.width = width;
    }

}
class Square extends Rectangle {
    constructor(length){
        super(length,length);
    }

    //重写并屏蔽 Rectangle.prototype.getArea()
    getArea() {
        return this.length * this.length;
    }
}
/**
 * 由于 getArea() 已经被定义为 Square 的一部分, Rectangle.prototype.getArea() 方法就
 * 不能在 Square 的任何实例上被调用. 当然, 你总是可以使用 super.getArea() 方法来调用基类
 * 中的同名方法,如下:
 */
class SquareX extends Rectangle {
    constructor(length) {
        super(length,length);
    }

    //重写,屏蔽并调用了 Rectangle.prototype.getArea()
    getArea() {
        return super.getArea();
    }
}
/**
 * 用这种方式使用 super, 其效果等同于第四章讨论过的 super 引用(详见 "使用super引用的简单
 * 原型访问"). this值会被自动设置为正确的值,因此你就能进行简单的调用.
 */

/**
 * 2.继承静态成员
 * 如果基类包含静态成员,那么这些静态成员在派生类中也是可用的.继承的工作方式类似于其他语言,
 * 但对于JS而言则是新概念,如下:
 */
class Rectangle_01 {
    constructor(length,width) {
        this.length = length;
        this.width = width;
    }
    getArea() {
        return this.length * this.width;
    }
    static create(length,width){
        return new Rectangle_01(length,width);
    }
}
class Square_01 extends Rectangle_01 {
    constructor(length) {
        
        //与 Rectangle.call(this,length,length) 相同
        super(length,length);
    }
}

var rect = Square_01.create(3,4);

console.log(rect instanceof Rectangle_01);
console.log(rect.getArea());
console.log(rect instanceof Square_01);
//在此代码中,一个新的静态方法 create() 被添加到 Rectangle 类中. 通过继承,该方法会以
//Square.create() 的形式存在, 并且其行为方式与 Rectangle.create() 一样.

/**
 * 3.从表达式中派生类
 * 在ES6中派生类的最强大能力,或许就是能够从表达式中派生类. 只要一个表达式能够返回一个具有
 * [[Construct]] 属性以及原型的函数,你就可以对其使用 extends. 如下:
 */
function Rectangle_02(length,width){
    this.length = length;
    this.width = width;
}
Rectangle_02.prototype.getArea = function() {
    return this.length * this.width;
};

class Square_02 extends Rectangle_02 {
    constructor(length) {
        super(length,length);
    }
}

var x = new Square_02(3);
console.log(x.getArea());
console.log(x instanceof Rectangle_02);
/**
 * Rectangle_02 被定义为ES5风格的构造器,而Square_02则是一个类. 由于Rectangle_02具有
 * [[Construct]] 以及原型, Square_02 类就能直接继承它.
 * 
 * extends 后面能接受任意类型的表达式,这带来了巨大可能性,如动态地决定所要继承的类:
 */
function Rectangle_03(length,width){
    this.length = length;
    this.width = width;
}
Rectangle_03.prototype.getArea = function() {
    return this.length * this.width
};
function getBase() {
    return Rectangle_03;
}
class Square_03 extends getBase() {
    constructor(length){
        super(length,length);
    }
}
var x = new Square_03(3);
console.log(x.getArea());
console.log(x instanceof Rectangle_03);
/**
 * getBase() 函数作为类声明的一部分被直接调用,它返回了 Rectangle_03,使得此例的功能等价于
 * 前一个例子.并且由于可以动态地决定基类,那也就能创建不同的继承方式,如,可以有效地创建混入:
 */
let SerializableMixin = {
    serialize() {
        return JSON.stringify(this);
    }
};
let AreaMixin = {
    getArea() {
        return this.length * this.width;
    }
};
function mixin(...mixins){
    var base = function() {};
    Object.assign(base.prototype,...mixins);
    return base;
}
class Square_04 extends mixin(AreaMixin,SerializableMixin) {
    constructor(length) {
        super();
        this.length = length;
        this.width = length;
    }

}
var x = new Square_04(3);
console.log(x.getArea());
console.log(x.serialize());
/**
 * 此例使用了混入 (mixin) 而不是传统继承. mixin() 函数接受代表混入对象的任意数量的参数,
 * 它创建了一个名为 base 的函数,并将每个混入对象的属性都赋值到新函数的原型上.此函数随后被返回,
 * 于是Square就能够对其使用 extends 关键字了,注意由于仍然使用了 extends,你就必须在在构造
 * 器内调用 super().
 * 
 * Square_04 的实例既有来自 AreaMixin 的 getArea() 方法,又有来自 SerializableMixin 的
 * serialize() 方法,这是通过原型继承实现的. mixin() 函数使用了混入对象的所有自有属性,动态地
 * 填充了新函数的原型
 * 记住:
 * 若多个混入对象拥有相同的属性,则只有最后添加的属性会被保留.
 * 
 * 任意表达式都能在 extends 关键字后使用,但并非所有表达式的结果都是一个有效的类.
 */


/**
 * 4.继承内置对象
 * 几乎从 JS 数组出现那天开始,开发者就想通过继承机制来创建他们自己的特殊数组类型.在 ES5及早期
 * 版本中,这是不可能做到的. 试图使用传统继承并不能产生功能正确的代码,例如:
 */

//内置数组的行为
var colors = [];
colors[0] = "red";
console.log(colors.length);

colors.length = 0;
console.log(colors[0]); //undefined

//在 ES5 中尝试继承数组

function MyArray() {
    Array.apply(this,arguments);
}
MyArray.prototype = Object.create(Array.prototype,{
    constructor: {
        value:MyArray,
        writable:true,
        configurable:true,
        enumerable:true
    }
});

var colors = new MyArray();
colors[0] = "red";
console.log(colors.length);

colors.length = 0;
console.log(colors[0]);
/**
 * console.log() 在此代码尾部的输出说明了: 对数组使用传统形式的JS继承,产生了预期外
 * 的行为. MyArray 实例上的 length 属性以及数值属性,其行为与内置数组并不一致,因为
 * 这些功能并未被涵盖在 Array.apply() 或数组原型中.
 * 
 * 在ES6中的类,其设计目的的之一就是允许从内置对象上进行继承. 为了达成这个目的,类的继承
 * 模型与ES5或更早版本的传统继承模型有轻微差异;
 * 在ES5的传统继承中,this的值会先被派生类(例如 MyArray )创建,随后基类构造器(例如 Array.apply() 方法)
 * 才被调用. 这意味着 this 一开始就是 MyArray 的实例,之后才使用了 Array 的附加属性对
 * 属性对其进行了装饰.
 * 
 * 在ES6基于类的继承中, this 的值会被基类 ( Array ) 创建,随后才被派生类的构造器 ( MyArray )
 * 所修改. 结果是 this 初始就拥有作为基类的内置对象的所有功能,并能正确接收与之关联的所有
 * 功能.
 * 如下:
 */
class MyArray_01 extends Array {
    //空代码块
}
var colors = new MyArray_01();
colors[0] = "red";
console.log(colors.length);

colors.length = 0;
console.log(colors[0]);
/**
 * MyArray_01 直接继承了 Array, 因此工作方式与正规数组一致. 与数值索引属性的互动更新了 length 属性,
 * 而操纵 length 睡醒也能更新索引属性. 这意味着你既能适当第继承 Array 来创建你自己的派生数组类,也同样
 * 能继承其他的内置对象. 伴随着这些附加功能, ES6与派生类型有效解决了从内置类型进行派生这最后的特殊情况,
 * 不过这种情况仍然值得继续探索.
 */

/**
 * 5.Symbol.species 属性
 * 继承内置对象一个有趣的方面是: 任意能返回内置对象实例的方法,在派生类上却会自动返回派生
 * 类的实例. 因此,若你拥有一个继承了 Array 的派生类 MyArray, 诸如 slice() 之类的方法
 * 都会返回 MyArray 的实例,如下:
 */
class MyArray_02 extends Array {
    //空代码块
}
let items = new MyArray_02(1,2,3,4),subitems = items.slice(1,3);
console.log(items instanceof MyArray_02);
console.log(subitems instanceof MyArray_02);
/**
 * 在此代码中, slice() 方法返回了 MyArray_02 的一个实例. slice() 方法是从 Array 上
 * 继承的,原本应当返回 Array 的一个实例. 而 Symbol.species 属性在后台造成了这种变化.
 * 
 * Symbol.species 知名符号被用于定义一个能返回函数的静态访问器属性. 每当类实例的方法
 * (构造器除外) 必须创建一个实例时,前面返回的函数就被用为新实例的构造器.下列内置
 * 类型都定义了 Symbol.species:
 * 
 * >Array
 * >ArrayBuffer(详见第十章)
 * >Map
 * >Promise
 * >RegExp
 * >Set
 * >类型化数组(详见第十章)
 * 以上每个类型都拥有默认的 Symbol.species 属性,其返回值为 this,意味着该属性总是
 * 会返回自身的构造器函数,若你准备在一个自定义类上实现此功能,如下:
 */


class MyClass_04 {
    static get [Symbol.species]() {
        return this;
    }

    constructor(value){
        this.value = value;
    }

    clone() {
        return new this.constructor[Symbol.species](this.value);
    }
}
/**
 * 在此例中, Symbol.species 知名符号被用于定义 MyClass_04 的一个静态访问器属性.注意
 * 此处只有getter而没有setter,这是因为修改类的species是不允许的.任何对 this.constructor[Symbol.species]
 * 的调用都会返回 MyClass_04, clone() 方法使用了该定义来返回一个新的实例,而没有直接使用 MyClass_04,
 * 这就允许派生类重写这个值,如下:
 */
class MyDerivedClass1 extends MyClass_04 {
    //空代码块
}
class MyDerivedClass2 extends MyClass_04 {
    static get [Symbol.species]() {
        return MyClass_04;
    }
}
let instance1 = new MyDerivedClass1("foo"),
    clone1 = instance1.clone(),
    instance2 = new MyDerivedClass2("bar"),
    clone2 = instance2.clone();

console.log(clone1 instanceof MyClass_04);
console.log(clone1 instanceof MyDerivedClass1);
console.log(clone2 instanceof MyClass_04);
console.log(clone2 instanceof MyDerivedClass2);
/**
 * 此处,MyDerivedClass1 继承了 MyClass_04,并且未修改 Symbol.species 属性.由于
 * this.constructor[Symbol.species] 会返回 MyDerivedClass1,当 clone()被调用时,它就
 * 返回了 MyDerivedClass1 的一个实例. MyDerivedClass2 类也继承了 MyClass_04,但重写了
 * Symbol.species,让其返回 MyClass_04. 当 clone() 在 MyDerivedClass2 的一个实例上被
 * 调用时,返回值就变成 MyClass_04的一个实例. 使用 Symbol.species,任意派生类在调用应当
 * 返回实例的方法时,都可以判断出需要返回什么类型的值.
 * 
 * 
 * 例如,Array 使用了 Symbol.species 来指定方法所使用的类,让其返回值为一个数组.在 Array
 * 派生出的类中,你可以决定这些继承的方法应返回何种类型的对象,如下:
 */

class MyArray_05 extends Array {
    static get [Symbol.species]() {
        return Array;
    }
}
let items_05 = new MyArray_05(1,2,3,4),subitems_05 = items_05.slice(1,3);
console.log(items_05 instanceof MyArray_05);
console.log(subitems_05 instanceof Array);
console.log(subitems_05 instanceof MyArray_05);

/**
 * 此代码重写了从 Array 派生的 MyArray_05 类上的 Symbol.species. 所有返回数组的继承方法
 * 现在都会使用 Array 的实例,而不是 MyArray_05 的实例.
 * 
 * 一般而言,每当想在类方法中使用 this.constructor时,你就应当设置类的 Symbol.species 属性.
 * 这么做允许派生类轻易地重写方法的返回类型.此外,若你从一个拥有 Symbol.species 定义的类创建
 * 了派生类,要保证使用此属性,而不是直接使用构造器.
 */