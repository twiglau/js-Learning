/**
 * 理解函数调用,方法调用及构造函数调用之间的不同
 * 在面向对象编程,你可能认为函数,方法和类的构造函数是三种不同的概念.
 * 而在JavaScript中,它们只是单个构造对象的三种不同的使用模式:
 */

//1.最简单的使用模式是函数调用
function hello(username){
    return "hello, " + username;
}
console.log(hello("Keyser Soze"));

//2.第二种使用模式是 方法调用, JavaScript 中的方法不过是对象的属性恰好是函数而已
var obj = {
    hello: function() {
        return "hello, " + this.username;
    },
    username: "Hans Gruber"
};
console.log(obj.hello());
/**
 * 以上示例:
 * hello方法是如何通过this变量来访问obj对象的属性的. 你可能倾向于this变量被绑定到obj对象
 * 是由于hello方法被定义在obj对象中,但我们可以在另一个对象中赋值一份相同函数的引用,并得到
 * 一个不同的答案
 */
var obj2 = {
    hello:obj.hello,
    username:"Boo Radley"
};
console.log(obj2.hello());
/**
 * 事实是,在方法调用中是由调用表达式自身来确定this变量的绑定. 绑定到this变量
 * 的对象被称为调用接收者(receiver). 表达式obj.hello()在obj对象中查找名为hello的属性,
 * 并将obj对象作为接收者,然后调用该属性. 表达式  obj2.hello()在 obj2对象中查找名为
 * hello的属性,恰巧正式 obj.hello 函数, 但是接收者是 obj2 对象, 通过某个对象调用
 * 方法将查找该方法并将该对象作为该方法的接收者.
 */
//由于方法其实就是通过特定对象调用的函数,但不知为何一个普通的函数不能引用 this 变量.
function hello(){
    return "hello, " + this.username;
}
//这对于预定义一个在多个项目中共享的函数很有用.
var obj1 = {
    hello:hello,
    username:"Gordon Gekko"
}
console.log(obj1.hello());
var obj2 = {
    hello:hello,
    username:"Biff Tannen"
}
console.log(obj2.hello());

//与实例1作为对比, 使用一个使用了 this 变量的函数, 比起作为方法被调用,将它作为函数
//被调用并不是特别有用.
console.log(hello()); // "hello, undefined"
/**
 * 以上, 一个非方法(nonmethod)的函数调用会将全局对象作为接收者,在这种情况下全局对象
 * 没有名为name的属性所以产生了 undefined, 将方法作为函数调用则毫无用处,因为没理由
 * 希望全局对象匹配调用对象中的方法.
 */

//3. 函数的第三种用法是通过构造函数使用,就像方法和纯函数一样,构造函数也是由function
//运算符定义的.
function User(name,passwordHash){
    this.name = name;
    this.passwordHash = passwordHash;
}
//3.1 使用new操作符来调用User则视其为构造函数
var u = new User("sfalken","0erdlkd3dppp");
console.log(u.name);
/**
 * 与函数调用和方法调用不同的是,构造函数调用将一个全新的对象作为this变量的值,
 * 并隐式返回这个对象作为调用结果,构造函数的主要职责是初始化该新对象.
 */

/**
 * 1.方法调用将被查找方法属性的对象作为调用接收者.
 * 2.函数调用将全局对象(处于严格模式下则为undefined)作为其接收者, 一般很少使用
 *   函数调用语法来调用方法.
 * 3.构造函数需要通过 new 运算符调用, 并产生一个新的对象作为接收者.
 */