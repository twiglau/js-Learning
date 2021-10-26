/**
 * 继承(Inheritance)是一种在新对象上复用现有对象的属性的形式. 这有助于避免重复代码和重复数据.
 * 在JavaScript中, 继承原理与其他流行的面向对象语言略有不同.
 * 我们尝试在清单7.7中实现继承
 * 
 * 执行测试发现. 虽然我们已经教会Ninja跳舞, 但是无法使得Ninja称为真正的Person类型. 我们对Ninja进行模拟
 * Person的dance 方法, 但是Ninja仍然不是真实的Person类型. 这不是真正的继承 -- 仅仅是复制
 * 
 * 由于这种方法是无效的继承, 因此我们还需要将每个Person的属性单独复制到Ninja的原型上. 这种办法没有实现继承,
 * 让我们继续探索.
 * 
 * 我们真正想要实现的是一个完整的原型链, 在原型链上, Ninja继承自Person, Person继承自Mammal,Mammal继承自
 * Animal, 以此类推, 一直到Object. 创建这样的原型链最佳技术方案是一个对象的原型直接是另一个对象的实例: 
 * SubClass.prototype = new SuperClass();
 * 
 * 清单7.8 使用原型实现继承
 * 
 * 这段代码中唯一的不同是使用Person的实例作为Ninja的原型. 运行测试会发现这种方式成功实现了继承. 现在我们进一步观察
 * 创建新的ninja对象后程序的运行状态.
 * 
 * 图7.14显示了当定义一个Person函数时, 同时也创建了Person原型, 该原型通过其 constructor 属性引用函数本身. 正常来说,
 * 我们可以使用附加属性扩展Person原型, 在本例中, 我们在Person的原型上扩展了 dance 方法, 因此每个 Person的实例对象
 * 也都具有 dance 方法: 
 */

/**
 * 1. 重写constructor属性的问题
 * 
 */