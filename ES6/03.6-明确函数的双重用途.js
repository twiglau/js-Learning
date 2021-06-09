/**
 * 在ES5以及更早版本中,函数根据是否使用 new 来调用而有双重用途. 当使用 new 时,
 * 函数内部的 this 是一个新对象,并作为函数的返回值.如下:
 */
function Person(name){
    this.name = name;
}
var person = new Person("Nicholas");
var notAPerson = Person("Nicholas");
console.log(person);
console.log(notAPerson);
/**
 * 当创建 notAPerson 时,未使用 new 来调用 Person(),输出了 undefined
 * (并且在非严格模式下给全局对象添加了 name 属性). Person 首字母大写是指示
 * 其应当使用 new 来调用的唯一标识, 这在JS编程中十分普遍.函数双重角色的混乱
 * 情况在 ES6 中发生了一些改变.
 * 
 * JS为函数提供了两个不同的内部方法: [[Call]] 与 [[Construct]].当函数未
 * 使用 new 进行调用时, [[Call]] 方法会被执行,运行的是代码中显示的函数体,而当
 * 函数使用new进行调用时, [[Construct]] 方法则会被执行,负责创建一个被称为新
 * 目标的新的对象,并且使用该新目标作为 this 去执行函数体,拥有[[Construct]]方法
 * 的函数被称为构造器.
 * 
 * 记住并不是所有函数都拥有 [[Construct]] 方法,因此不是所有函数都可以用 new 来
 * 调用. 在 "箭头函数" 小节中介绍的箭头函数就未拥有该方法.
 */

/**
 * 1. 在 ES5 中判断函数如何被调用
 * 在 ES5 中判断函数是不是使用了 new 来调用(即作为构造器),最流行的方式是使用 instanceof,
 * 例如:
 */
function Person_01(name){
    if(this instanceof Person_01){
        this.name = name; //使用 new
    } else {
        throw new Error("You must use new with Person.")
    }
}
var per_01 = new Person_01("Nicholas");
// var notAPerson = Person("Nicholas");
/**
 * 此处对 this 值进行了检查,来判断其是否为构造器的一个实例;如是,正常继续执行;否则抛出错误.
 * 这能奏效是因为 [[Construct]] 方法创建了 Person 的一个新实例并将其赋值给 this. 可惜的
 * 是,该方法并不绝对可靠,因为在不使用 new 的情况下 this 仍然可能是 Person 的实例,正如下例:
 */
var notAPerson_01 = Person_01.call(per_01,"Michael");
console.log({
    per_01,
    notAPerson_01
})
/**
 * 调用 Person_01.call() 并将 per_01 变量作为第一个参数传入,这意味着将 Person_01 内部的
 * this 设置成了 per_01. 对于该函数来说,没有任何方法能将这种方式与使用 new 调用区分开来.
 */

/**
 * 2. new.target 元属性
 * 为了解决这个问题,ES6引入了 new.target 元属性. 元属性指的是 "非对象"(例如 new)上的一个属性,
 * 并提供关联到它的目标的附加信息. 当函数的 [[Construct]] 方法被调用时, new.target 会被填入
 * new 运算符的作用目标,该目标通常是新创建的对象实例的构造器,并且会成为函数体颞部的 this 值. 而若
 * [[Call]] 被执行, new.target 的值则会是 undefined.
 * 
 * 通过检查 new.target 是否被定义,这个新的元属性就让你能安全地判断函数是否被使用 new 进行了调用.
 */