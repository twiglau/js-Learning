/**
 * 在上篇中,我们抄袭jQuery写了一个 type 函数, 可以检测出常见的数据类型,
 * 然而在开发中还有更加复杂的判断,比如 plainObject, 空对象, Window对象
 * 等, 这一篇就让我们接着抄袭 jQuery 去看下这些类型的判断
 */

/**
 * 1. plainObject
 * plainObject 来自于 jQuery, 可以翻译成纯粹的对象, 所谓 "纯粹的对象",就是
 * 该对象是通过 "{}" 或 "new Object" 创建的, 该对象含有零个或者多个键值对.
 * 
 * 之所以要判断是不是plainObject, 是为了跟其他的 JavaScript 对象如 null,
 * 数组, 宿主对象(documents) 等作区分, 因为这些 typeof 都会返回 object.
 * 
 * jQuery 提供了 isPlainObject 方法进行判断, 先让我们看看使用的效果:
 */
`function Person(name){
    this.name = name;
}
console.log($.isPlainObject()) //true
console.log($.isPlainObject(new Object)) //true
console.log($.isPlainObject(Object.create(null))) //true
console.log($.isPlainObject(Object.assign({a:1},{b:2}))) //true
console.log($.isPlainObject(new Person('yayu'))) //false
console.log($.isPlainObject(Object.create({}))) //false
`
/**
 * 由此我们可以看到,除了 {} 和 new Object 创建的之外, jQuery认为一个没有原型的
 * 对象也是一个纯粹的对象.
 * 实际上随着jQuery版本的提升, isPlainObject的实现也在变化,我们今天将的是3.0版本
 * 下的 isPlainObject, 直接看源码:
 */
//上节中写 type 函数时, 用来存放 toString 映射结果的对象
var class2type = {};
//相当于 Object.prototype.toString
var toString = class2type.toString;
//相当于 Object.prototype.hasOwnProperty
var hasOwn = class2type.hasOwnProperty;

function isPlainObject(obj){
    var proto,Ctor;
    //排除掉明显不是obj的以及一些宿主对象如window
    if(!obj || toString.call(obj) !== "[object Object]"){
        return false;
    }
    /**
     * getPrototypeOf es5 方法, 获取 obj 的原型
     * 以 new Object 创建的对象为例的话
     * obj.__proto__ === Object.prototype
     */
    proto = Object.getPrototypeOf(obj);

    //没有原型的对象是纯粹的, Object.create(null) 就在这里返回 true
    if(!proto) {
        return true;
    }

    /**
     * 以下判断通过 new Object 方式创建的对象
     * 判断 proto 是否有 constructor 属性, 如果有就让 Ctor 的值为 proto.constructor
     * 如果是 Object 函数创建的对象, Ctor 在这里就等于 Object 构造函数
     */
    Ctor = hasOwn.call(proto,"constructor") && proto.constructor;

    //在这里判断 Ctor 构造函数是不是 Object 构造函数, 用于区分自定义构造函数 和 Object 构造函数
    return typeof Ctor === "function" && hasOwn.toString.call(Ctor) === hasOwn.toString.call(Object);
}
/**
 * 注意: 我们判断 Ctor 构造函数是不是Object构造函数, 用的是 hasOwn.toString.call(Ctor),这个方法可
 * 不是 Object.prototype.toString,不信的话,我们在函数里加上下面这两句话:
 * console.log(hasOwn.toString.call(Ctor)); // function Object() { [native code]}
 * console.log(Object.prototype.toString.call(Ctor)); // [object Function]
 * 
 * 会发现返回的值并不一样, 这是因为 hasOwn.toString 调用的其实是 Function.prototype.toString,
 * 毕竟 hasOwnProperty 可是一个函数.
 * 
 * 而且Function 对象覆盖了从 Object 继承来的 Object.prototype.toString 方法. 函数的 toString 方法
 * 会返回一个表示函数源代码的字符串. 具体来说, 包括 function关键字, 形参列表, 大括号, 以及 函数体中的内容.
 */


/**
 * 2. EmptyObject
 * jQuery 提供了 isEmptyObject 方法来判断是否是空对象, 代码简单, 我们直接看源码:
 */
function isEmptyObject( obj ) {
    var name;
    for (name in obj) {
        return false;
    }
    return true;
}
//其实所谓的 isEmptyObject 就是判断是否有属性, for 循环一旦执行, 就说明有属性, 有属性就会返回false.
//但是根据这个源码我们可以看出 isEmptyObject 实际上判断的并不仅仅是空对象.
//如下:
console.log(isEmptyObject({}));
console.log(isEmptyObject([]));
console.log(isEmptyObject(null));
console.log(isEmptyObject(undefined));
console.log(isEmptyObject(1));
console.log(isEmptyObject(''));
console.log(isEmptyObject(true));
//以上都会返回 true
//但是既然jQuery是这样写, 可能是因为考虑到实际开发中 isEmptyObject 用来判断 {} 和 {a:1} 是足够的吧.
//如果真的是只判断 {}, 完全可以结合上篇写的 type 函数筛选掉不适合的情况.

/**
 * 3. Window 对象
 * Window对象作为客户端JavaScript的全局对象, 它有一个 window 属性指向自身, 这点在 <JavaScript深入之变量对象>
 * 中将到过. 我们可以利用这个特性判断是否是 Window 对象.
 */
function isWindow( obj ) {
    return obj != null && obj === obj.window;
}

/**
 * 4. isArrayLike
 * isArrayLike, 看名字可能会让我们觉得这是判断类型数组对象的, 其实不仅仅是这样, jQuery 实现的 isArrayLike, 数组
 * 和类数组都会返回 true.
 */
function isArrayLike(obj) {

    //obj 必须 length 属性
    var length = !!obj && "length" in obj && obj.length;
    var typeRes = type(obj); // 第一节中函数

    //排除掉函数和 Window 对象
    if(typeRes === "function" || isWindow(obj)){
        return false;
    }

    return typeRes === "array" || length === 0 ||
       typeof length === "number" && length > 0 && (length - 1) in obj;
}
/**
 * 重点分析 return 这一行, 使用了 || 语句, 只要一个为 true, 结果就返回 true.
 * 所以如果 isArrayLike 返回true, 至少要满足三个条件之一:
 * 1. 是数组
 * 2. 长度为0
 * 3. lengths 属性是大于0的数字类型, 并且 obj[length - 1]必须存在
 * 
 * 第一个就不说了,第二个,为什么长度为0就可以直接判断为true呢?
 * 那我们写个对象:
 * var obj = {a:1,b:2,length:0}
 * isArrayLike函数就会返回true, 那这个合理吗?
 * 回答合不合理之前,先看例子:
 * 
 * function a() {
 *    console.log(isArrayLike(arguments))
 * }
 * a();
 * 
 * 如果我们去掉length === 0 这个判断,以上例子就会打印false, 然而我们都知道 arguments 是一个
 * 类数组对象, 这里是应该返回 true 的.
 * 
 * 所以是不是为了放过空的 arguments 时也放过了一些存在争议的对象呢?
 * 
 * 第三个条件: length是数字, 并且 length > 0 且最后一个元素存在.
 * 为什么仅仅要求最后一个元素存在呢?
 * 让我们先想下数组是不是可以这样写:
 * var arr = [,,3]
 * 
 * 当我们写一个对应的类数组对象就是:
 * var arrLike = {
 *   2: 3,
 *   length: 3
 * }
 * 
 * 也就是说当我们在数组中用逗号直接跳过的时候, 我们认为元素是不存在的, 类数组对象中也就不用写这个元素, 但
 * 是最后一个元素是一定要写的, 要不然length 的长度就不会是最后一个元素的key值加1. 比如数组可以这样写
 * var arr = [1,,];
 * console.log(arr.length) //2
 * 
 * 但是类数组对象就只能写成:
 * var arrLike = {
 *   0:1,
 *   length:1
 * }
 * 所以符合条件的类数组对象是一定存在最后一个元素的!
 * 
 * 这就是满足 isArrayLike 的三个条件, 其实除了 jQuery 之外, 很多库都有对 isArrayLike 的实现,
 * 比如 underscore:
 */
var MAX_ARRAY_INDEX = Math.pow(2,53) - 1;
var isArrayLike = function(collection) {
    var length = getLength(collection);
    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
};

/**
 * 5. isElement
 * isElement 判断是不是 DOM 元素.
 */

isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
};

