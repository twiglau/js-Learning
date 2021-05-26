/**
 * 防止原型污染的最简单的方式之一就是一开始就不使用原型.
 * 但在ES5未发布之前,并没有标准的方式创建一个空原型的新对象. 
 * 你可能会尝试设置一个构造函数的原型属性为null 或 undefined.
 */
function C(){}
C.prototype = null;
//但实例化该构造函数仍然得到的是Object的实例
var o = new C();
console.log(
    Object.getPrototypeOf(o) === null,
    Object.getPrototypeOf(o) === Object.prototype
)
/**
 * ES5 首先提供了标准方法来创建一个没有原型的对象. 
 * 1. Object.create函数能够使用一个用户指定的原型链和一个属性描述符
 *    动态地构造对象.
 * 1.1属性描述符 描述了新对象属性的值及特性.
 * 1.2通过简单地传递一个 null 原型参数和一个空的描述符, 我们就可以建立一个真正的空对象.
 */
var x = Object.create(null);
console.log(
    Object.getPrototypeOf(x) === null
)
//原型污染无法影响这样的对象的行为.
/**
 * 一些不支持Object.create函数的旧的JavaScript环境可能支持另一种值得一提的方式.
 * 在许多环境总,特殊的属性__proto__ 提供了对 对象内部原型链的读写访问.
 * 
 * 对象字面量语法也支持初始化一个原型链为 null 的新对象.
 */
var y = { __proto__:null};
console.log(
    x instanceof Object
)//false
/**
 * 这样的语法同样方便, 但有了 Object.create 函数后, Object.create 函数是更值得
 * 信赖的方式. __proto__ 属性是非标准的并且并不是所有使用都是可移值的.JavaScript 的实现
 * 不能保证在未来仍然支持它, 所以应当尽可能地坚持使用标准的 Object.create 函数.
 * 
 * 不幸的是,虽然非标准的 __proto__ 可以解决一些问题, 但也带来了自身的额外问题, 及阻止
 * 自由原型(prototype-free) 对象作为真正健壮的字典实现.
 * 
 * 第45条描述了在某些JavaScript环境中,属性关键字 "__proto__" 自身是如何污染对象的,甚至
 * 可以污染没有原型的对象, 如果不能确定字典中从未将字符串 "__proto__"作为key使用,那么你应当
 * 考虑使用第45条中描述的更健壮的Dict类.
 */

/**
 * 1.在ES5环境中,使用 Object.create(null)创建的自由原型的空对象是不太容易被污染的
 * 2.在一些较老的环境中,考虑使用 { __proto__:null}
 * 3.但要注意 __proto__ 既不标准,也不是完全可移值的,并且可能再未来的JavaScript环境中去除.
 * 4.绝不要使用 "__proto__" 名作为字典中的key, 因为一些环境将其作为特殊的属性对待.
 */