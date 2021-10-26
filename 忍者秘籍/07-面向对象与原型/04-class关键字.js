/**
 * JavaScript中使用关键字 class, 但其底层的实现仍然是基于原型继承
 */

/**
 * 1. 使用关键字 class
 * ES6引入新的关键字class, 他提供了一种更为优雅的创建对象和实现继承的方式, 底层仍然是基于原型的实现.
 * 
 * 如清单7.13所示
 * 
 * 清单7.13显示了我们可以通过使用 ES6的关键字 class 创建Ninja类, 在类中创建构造函数, 使用类创建实例对象时,
 * 调用该构造函数. 在构造函数体内, 可以通过 this 访问新创建的实例, 添加属性很简单, 例如添加 name 属性.在类中,
 * 还可以定义所有实例对象均可访问的方法.
 * 
 * 1.1 class是语法糖
 * class只是语法糖, 使得在JavaScript模拟类的代码更为简洁.
 * 清单7.13 中的代码可转换为如下 ES5 的代码: 
 * function Ninja(name){
 *    this.name = name;
 * }
 * Ninja.prototype.swingSword = function(){
 *    return true;
 * };
 * 
 * 可以看出, ES6的类没有任何特殊之处. 虽然看起来更优雅, 但使用的是相同的概念.
 * 
 * 1.2 静态方法
 * 之前的实例展示了如何定义所有实例对象可访问的对象方法(原型方法). 除了对象方法之外, 经典面向对象语言如 Java中一般使用类
 * 级别的静态方法.
 * 
 * 如清单 7.14 所示
 * 
 * 可通过关键字 static 定义了一个静态方法 compare
 * static compare(ninja1,ninja2){
 *    return ninja1.level - ninja2.level;
 * }
 * compare 方法比较两个 ninja 实例对象的原型属性 level, 而不是实例属性.
 * 同时也可以看看ES6之前的版本中是如何实现 "静态" 方法的. 我们只需要记住通过函数来实现来. 由于静态方法是类级别的方法,所以
 * 可以利用第一类型对象, 在构造函数上添加方法,如下: 
 * function Ninja(){}
 * Ninja.compare = function(ninja1,ninja2){...} //在构造函数上添加商法, 模拟ES6中的静态方法
 */


/**
 * 2. 实现继承
 * 在ES6之前的版本中实现继承是一件痛苦的事. 回到Ninja 与 Person 的示例中: 
 * function Person(){}
 * Person.prototype.dance = function(){};
 * 
 * function Ninja(){}
 * Ninja.prototype = new Person();
 * 
 * Object.defineProperty(Ninja.prototype, "constructor",{
 *     enumerable: false,
 *     value: Ninja,
 *     writable: true
 * });
 * 
 * 然而, 在ES6中, 整个过程大大地简化了
 * 
 * 清单7.15 在ES6中实现继承
 * 
 * 清单7.15展示了在ES6中实现继承. 我们使用 extends 从另一个类实现继承: 
 * > class Ninja extends Person
 */