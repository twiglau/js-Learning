/**
 * JavaScript完全有可能不借助原型进行编程.
 */
function User(name,passwordHash){
    this.name = name;
    this.passwordHash = passwordHash;
    this.toString = function() {
        return "[User " + this.name + "]";
    };
    this.checkPassword = function(password){
        return hash(password) === this.passwordHash;
    }
}
//大多数情况下,这个类的行为与其原始实现版本几乎是一样的.
//但当我们构造多个User的实例是,一个重要的区别就暴露出来了.
var u1 = new User('lily','3dlaodjlfdklfad');
var u2 = new User('andy','eeiodakdf23344dddd800');
var u3 = new User('kiky','aldkdafkdl34553222sklkl');

//图34.1 展示了这三个对象及它们的原型对象的结构图. 每个实例都包含toString 和 checkPassword
//方法的副本,而不是通过原型共享这些方法,所以总共有6个函数对象.

//相反,图34.2 显示了使用原始版本,这三个对象及其原型对象的结构图.
//toString 和 checkPassword 方法只被创建了一次,对象实例间通
//过原型来共享它们.

//将方法存储在原型中,使其可以被所有的实例使用,而不需要存储方法实现
//的多个副本,也不需要给每个实例对象增加额外的属性.
//你可能认为将方法存储在实例对象中会优化方法查找的速度.例如,u3.toString()方法,不需要
//搜索原型链来查找toString的实现.然而,现代的JavaScript引擎深度优化了原型查找,所以将
//方法赋值到实例对象并不一定保证速度有明显的提升.而且实例方法比起原型方法肯定会占用更多的内存

/**
 * 1.将方法存储在实例对象中将创建该函数的多个副本,因为每个实例对象都有一分副本.
 * 2.将方法存储于原型中优与存储在实例对象中.
 */