/**
 * 1.C.prototype用于建立由 new C() 创建的对象的原型.
 * 2.Object.getPrototypeOf(obj)是ES5中用来获取obj对象的原型对象的标注方法.
 * 3.obj.__proto__是获取obj对象的原型对象的非标准方法.
 */

//如何理解上面三个区别?

function User(name,passwordHash){
    this.name = name;
    this.passwordHash = passwordHash;
}
User.prototype.toString = function(){
    return "[User " + this.name + "]";
}
User.prototype.checkPassword = function(password) {
    return hash(password) === this.passwordHash;
};
var u = new User("sfalken","0adfa;fj3ee0eee");

/**
 * User函数带有一个默认的prototype属性,其包含一个开始几乎为空的对象.
 * 在该例子中,我们添加了两个方法到User.prototype对象: toString 和 checkPassword.
 * 当我们使用new操作符创建User的实例是,产生的对象u得到了自动分配的原型对象,该原型对象
 * 被存储在User.prototype中. 图30.1显示了这些对象的图表.
 * 
 * 请注意箭头链接实例对象u到其原型对象User.prototype. 此链接描述了它们的继承关系.
 * 1.属性查找会从对象的自身属性开始搜索.
 * 例如, u.name 及 u.passwordHash 返回的是对象u的直接属性的当前值.
 *       假如没有在对象u中找到相应的属性,才会接着查找u的原型对象.
 *       比如,访问u.checkPassword, 返回的是存储在User.prototype中的方法
 * 
 * 有关原型的方法, 构造函数的prototype属性用来设置新实例的原型关系.
 * ES5中的函数Object.getPrototypeOf()可以用于检索现有对象的原型.
 * 例如, 当我们创建了上述例子中的对象u后,可以这样测试.
 * Object.getPrototypeOf(u) === User.prototype; // true
 * 
 * 一些环境提供了一个非标准的方法检索对象的原型,即特殊的 __proto__属性,
 * 这可作为在不支持ES5的 Object.getPrototypeOf()方法的环境中的一个权宜之计.
 * 在这些环境中,我们可以这样检测:
 * u.__proto__ === User.prototype; //true
 * 
 * 关于原型关系的最后说明: JavaScript程序员往往将User描述为一个类, 尽管它跟一个函数差不多.
 * JavaScript中
 * 类本质上是
 * 一个构造函数(User)与一个用于在该类(User.prototype)实例间共享方法的原型对象的结合.
 * 
 * 图30.2提供了一个很好的方法来理解User类的概念.
 * User函数给该类提供了一个公共的构造函数,而User.prototype是实例
 * 之间共享方法的一个内部实现.
 * 
 * User 和 u 的普通用法都不需要直接访问原型对象.
 */

/**
 * 1. C.prototype属性是 new C()创建的对象的原型
 * 2. Object.getPrototypeOf(obj)是ES5 中检索对象原型的标准函数.
 * 3. obj.__proto__ 是检索对象原型的非标准方法.
 * 4. 类是由一个构造函数和一个关联的原型组成的一种设计模式. 
 */