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
 * 如果我们仔细观察图7.14会发现, 通过设置Person实例对象作为Ninja构造器的原型时, 我们已经丢失了Ninja与Ninja初始原型之间的关联.
 * 这是一个问题, 因为constructor属性可用于检测一个对象是否由某一个函数创建的. 
 * 
 * 我们代码的使用者有这样一个非常合理的假设,运行以下测试将会通过: 
 * > assert(ninja.constructor === Ninja, "The ninja object was created by the Ninja constructor");
 * 
 * 但是在目前的程序状态中,这个测试无法通过. 如图7.14所示,无法查找到Ninja对象的constructor属性. 回到原型上,原型上也没有
 * constructor属性,继续在原型链上追溯,在Person对象的原型上具有指向Person本身的constructor属性. 事实上,如果我们询问Ninja对象
 * 的构造函数,我们得到的答案是Person, 但是这个答案是错误的. 这可能是某些严重缺陷的来源.
 * 
 * 1.1 配置对象的属性
 * 在JavaScript中,对象是通过属性描述(property descriptor) 进行描述的,我们可以配置以下关键字.
 * - configurable : 如果设为true,则可以修改或删除属性. 如果设为false,则不允许修改
 * - enumerable : 如果设为true, 则可在for-in循环对象属性时出现.
 * - value : 指定属性的值,默认为undefined
 * - writable : 如果设为true,则可通过赋值语句修改属性值
 * - get : 定义getter函数, 当访问属性时发生调用,不能与value与writable同时使用
 * - set : 定义setter函数, 当对属性赋值时发生调用,也不能与value与writable同时使用.
 * 
 * 通过简单赋值语句创建时对象属性,如:
 * > ninja.name = "Yoshi";
 * 该赋值语句创建的属性可被修改或删除,可遍历,可写,Ninja的name属性值被设置为Yoshi, get和set函数均为undefined.
 * 如果想调整属性的配置信息,可以使用内置的Object.defineProperty方法,传入3个参数: 属性所在的对象, 属性名 和 属性描述对象.
 * 
 * 清单7.9  配置属性
 * 
 * 将配置项enumerable设为false, 在for-in循环中无法遍历该属性. 为了理解为什么要这样做,回到最初的问题
 * 
 * 1.2 最后解决constructor属性被覆盖的问题
 * 为了实现Ninja继承Person,产生了这样的问题:
 * 当吧Ninja的原型设置为Person的实例对象后,我们丢失了原来在constructor中的Ninja原型. 我们不希望丢失constructor属性,
 * constructor属性可用于确定哦用于创建对象实例的函数,这可能也是使用我们的代码库的其他开发人员所期望的.
 * 
 * 通过使用我们刚刚获得的知识可以解决这个问题. 使用Object.defineProperty 方法在 Ninja.prototype 对象上增加新的
 * constructor属性,查看清单7.10
 * 
 * 清单7.10 解决constructor属性的问题
 */


/**
 * 2. instanceof操作符
 * 在JavaScript中, 操作符 instanceof使用在原型链中,例如, 查看如下表达式: 
 * > ninja instanceof Ninja
 * 
 * 操作符instanceof用于检测Ninja函数是否存在于ninja实例的原型链中. 回到person于ninja. 查看例子
 * 
 * 清单7.11 所示 探讨instanceof 操作符
 * 
 * ninja是Ninja的实例, 同时也是Person的实例. 为了确定这一点
 * 图7.16显示了幕后整个工作原理
 * 
 * ninja实例的原型链是由 new Person()对象与Person的原型组成的, 通过原型链实现继承. 当执行 ninja instanceof Ninja 表达式时,
 * JavaScript引擎检查 Ninja 函数的原型 -- new Person() 对象, 是否存在于 ninja 实例的原型链上. new Person() 对象是 ninja
 * 实例的原型, 因此, 表达式执行结果为true.
 * 
 * 在检查 ninja instanceof Person 时, JavaScript引擎查找Person函数的原型,检查它是否存在于在 ninja 实例的原型链上. 由于Person
 * 的原型的确存在于ninja实例的原型链上, Person是 new Person() 对象的原型, 所以Person也是ninja实例的原型.
 * 
 * instanceof 操作符会检查操作符右边的函数的原型 是否存在于操作符左边的对象的原型链上.
 * 
 * 2.1 instanceof操作符的警告
 * 当心动态修改一个构造函数的原型
 * 如清单7.12 所示
 * 
 * 在本例中, 我们又一次重复了创建 ninja 实例的基本步骤, 第一个测试正常.但是如果我们在 ninja实例创建完成之后, 修改Ninja构造函数的原型,
 * 再执行测试 ninja instanceof Ninja, 我们会发现结果发生了变化. 假设我们坚持错误的假设 instanceof操作符 检测对象是否是由某一个函数
 * 构造器创建, 就会对这种变化很惊讶. 另一方面, 如果我们理解 instanceof 操作符真正的语意义
 * - 检查右边的函数原型是否存在于操作符左边的对象的原型链上.
 * 
 */