function User(name,passwordHash){
    this.name = name;
    this.passwordHash = passwordHash;
}
//1.如果调用者忘记使用new关键字,那么函数的接收者将是全局对象
var u = User("baravelli","d8999ldk239dkalkdf789");
console.log(u); // undefined
console.log(this.name,this.passwordHash);
//以上函数不但会返回无意义的undefined,而且会灾难性地创建(如果这些全局变量已经存在则会修改)
//全局变量name和passwordHash.

//2.如果将User函数定义为ES5的严格代码,那么它的接收者默认为undefined.
function User_01(name,passwordHash){
    "use strict";
    this.name = name;
    this.passwordHash = passwordHash;
}
// var ua = User_01("baravelli","d8b7393302ddaladd234");
//Uncaught TypeError: Cannot set property 'name' of undefined

//在这种情况下,这种错误的调用会导致一个即使错误: User的第一行视图给this.name
//赋值,这回抛出TypeError异常,因此,使用严格的构造函数至少会帮助调用者尽早地发现
//该Bug并修复它.

//而无论在哪种情况下,User函数都是脆弱的. 当和new操作符一同使用时,它能按预期工作,
//然而,当将它作为一个普通的函数调用时便会失效. 一个更为健壮的方式是提供一个不管
//怎样调用都工作如构造函数的函数.
//实现该函数的一个简单方法是检查函数的接收者是否是一个正确的User实例.
function User_02(name,passwordHash){
    if(!(this instanceof User_02)){
        return new User_02(name,passwordHash);
    }
    this.name = name;
    this.passwordHash = passwordHash;
}
//使用这种方式,不管是已函数的方式还是以构造函数的方式调用User函数,它都返回一个继承自
//User.prototype的对象.
var x = User_02("baravelli","d8b7df34589700djdalla33");
var y = new User_02("baravelli","d834850hsksdhwwjkk234");
console.log(
    x instanceof User_02,
    y instanceof User_02
)

//这种模式的一个缺点是它小额外的函数调用,因此代价有点高. 而且,它也很难适用
//于可变参数函数, 因为没有一种直接模拟apply方法将可变参数函数作为构造函数调用
//的方式. 一种更为奇异的方式是利用ES5 的 Object.create 函数.
function User_03(name,passwordHash){
    var self = this instanceof User
             ? this
             : Object.create(User.prototype)
    self.name = name;
    self.passwordHash = passwordHash;

    return self;
}
/**
 * Object.create需要一个原型对象作为参数,并返回一个继承自该原型对象的新对象,
 * 因此,当以函数的方式调用该版本的User函数时,结果将返回一个继承自User.prototype
 * 的新对象,并且该对象具有已经初始化的name和passwordHash属性.
 * 
 * Object.create只有在ES5环境中才是有效的,但是在一些旧的环境中可以通过创建一个
 * 局部的构造函数并使用new操作符初始化该构造函数来替代Object.create.
 */
if(typeof Object.create === "undefined"){
    Object.create = function(prototype){
        function c() {}
        c.prototype = prototype;
        return new c();
    }
}
//以上,只实现了单参数版本的Object.create参数.

/**
 * 如果使用new操作符调用该新版本的User函数会发生什么?
 * 多亏了构造函数覆盖模式,使用new操作符调用该函数的行为就如以函数调用它
 * 行为一样. 这能工作完全得益于JavaScript允许new表达式的结果可以被构造
 * 函数中的显式return语句所覆盖. 当User函数返回self对象时, new表达式
 * 的结果就变为self对象. 该self对象可能是另一个绑定到 this 的对象.
 */


/**
 * 1.通过使用new操作符或Object.create方法在构造函数定义中调用自身使得该构造函数
 * 与调用语法无关
 * 2.当一个函数期望使用new操作符调用是,清晰地文档化该函数.
 */
