/**
 * 每个函数都有一个原型对象, 该原型对象将被自动设置为通过该函数创建对象的原型.
 * 
 * 查看清单7.2   通过原型方法创建新的实例
 * 
 * 我们通过new操作符调用该函数, 此次是作为构造器进行调用,发生了完全不同的事情. 再次调用这个函数,
 * 但这一次已经创建了新分配的对象, 并将其设置为函数的上下文(可通过this关键字访问). 操作符 new 返回
 * 的结果是这个新对象的引用. 然后我们测试 ninja2 是新创建的对象的引用, 具有swingSword方法,并调用
 * swingSword方法.
 * 
 * 图7.4, 可查看应用程序状态
 * 
 * - 每一个函数都具有一个原型对象
 * - 每一个函数的原型都具有一个 constructor 属性, 该属性指向函数本身.
 * - constructor对象的原型设置为新创建的对象的原型.
 * 
 * 从图7.4可以看出, 我们创建的每一个函数都具有一个新的原型对象. 最初的原型对象只有一个属性, 即 constructor属性.
 * 该属性指向函数本身
 */

/**
 * 1. 实例属性
 * 当把函数作为构造函数, 通过操作符new进行调用时, 它的上下文被定义为新的对象实例. 通过原型暴露属性,通过
 * 构造函数的参数进行初始化.
 * 
 * 清单7.3检查使用这种方法创建的实例的属性. 
 * 观察初始化过程的优先级
 * 
 * - 实例会隐藏原型中与实例方法重名的方法, 如图7.5所示.
 * 
 * 在构造函数内部, 关键字this指向新创建的对象, 所以在构造器内添加的属性直接在新的ninja实例上. 然后,当通过ninja访问
 * SwingSword属性时, 就不需要遍历原型链(如图 7.4所示),就立即可以找到并返回了在构造器内创建的属性
 * 
 * 这里有一个很有意思的副作用. 图7.6展示了当创建3个ninja实例之后程序的状态
 */