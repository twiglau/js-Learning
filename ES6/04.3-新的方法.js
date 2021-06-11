/**
 * ES 从 ES5 开始就有一个设计意图:避免创建新的全局函数,避免在 Object 对象的原型上添加新方法,
 * 而是尝试寻找哪些对象应该被添加新方法,因此,对其他对象不使用的新方法就被添加到全局的Object对象上,
 * ES6 在 Object 对象上引入了两个新方法,以便让特定任务更容易完成.
 */

/**
 * 1. Object.is() 方法
 * 当在 JS 中要比较两个值时,你可能会使用相等运算符( == ) 或严格相等运算符 ( === ).为了避免在比较
 * 时放生强制类型转换,许多开发者更倾向于使用后者,但严格相等运算符也并不完全准确,例如,它认为 +0 与 -0 
 * 相等,即使这两者在 JS 引擎中有不同的表示: 另外 NaN === NaN 会返回 false,因此有必要使用 isNaN()
 * 函数来正确检测 NaN.
 * 
 * ES6 引入了 Object.is() 方法来弥补严格相等运算符残留的怪异点. 此方法接受两个参数,并会在二者的值相等
 * 时返回 true, 此时要求二者类型相同并且值也相等. 下面:
 */
console.log(
    "+0 == -0: ",
    +0 == -0,
    "+0 === -0: ",
    +0 === -0,
    "Object.is(+0,-0): ",
    Object.is(+0,-0),
    "NaN == NaN: ",
    NaN == NaN,
    "NaN === NaN: ",
    NaN === NaN,
    "Object.is(NaN,NaN): ",
    Object.is(NaN,NaN),
    "5 == 5: ",
    5 == 5,
    "5 == \"5\": ",
    5 == "5",
    "5 === 5: ",
    5 === 5,
    "5 === \"5\": ",
    5 === "5",
    "Object.is(5,5): ",
    Object.is(5,5),
    "Object.is(5,\"5\"): ",
    Object.is(5,"5")
)
/**
 * 在许多情况下, Object.is() 的结果与 === 运算符是相同的,仅有的例外是:
 * 它会认为 +0 与 -0 不相等,而且 NaN 等于 NaN. 不过仍然要停止使用严格
 * 相等运算符, 而选择 Object.is() , 还是选择 == 或 === ,取决于代码的
 * 实际情况.
 */

/**
 * 2. Object.assign() 方法
 * 混入(Mixin) 是在 JS 中组合对象时最流行的模式. 在一次混入中,一个对象会从另一个对象中
 * 接收属性与方法. 很多 JS 的库中都有类似下面的混入方法:
 */
function mixin(receiver,supplier) {
    Object.keys(supplier).forEach(function(key) {
        receiver[key] = supplier[key];
    });
    return receiver;
}
/**
 * mixin() 函数在 supplier 对象的自有属性上进行迭代,并将这些属性复制到 receiver 对象
 * (浅复制,当属性值为对象是,仅复制其引用). 这样 receiver 对象就能获得新的属性而无须使用
 * 继承,如下:
 */
function EventTarget() {// ...
}
EventTarget.prototype = {
    constructor:EventTarget,
    emit: function() {//...
    },
    ons: function() {//...
    }
};
var myObject = {};
mixin(myObject,EventTarget.prototype);
myObject.emit("somethingChanged");

/**
 * 此处 myObject 对象接收了 EventTarget.prototype 对象的行为,这给了它分别使用
 * emit() 与 on() 方法来发布事件与订阅事件的能力.
 * 
 * 此模式已足够流行,于是 ES6 就添加了 Object.assign() 方法来完成同样的行为. 该方法接受一个接收者,
 * 以及任意数量的供应者,并会返回接收者. 方法名称从 mixin() 变更为 assign() 更能反映出实际发生的操作.
 * 由于 mixin() 函数使用了赋值运算符 ( = ),它就无法将访问器属性复制到接收者上, Object.assign() 体现
 * 了这种区别.
 * 
 * 你可以在任意使用 mixin() 函数的地方使用 Object.assign(),此处有个例子:
 */

var myObject_01 = {}
Object.assign(myObject_01,EventTarget.prototype);
myObject_01.emit("somethingChanged");
/**
 * Object.assign() 方法接受任意数量的供应者,而接收者会按照供应者在参数中的顺序来依次接收它们的属性.这
 * 意味着在接收者中 ,第二个供应者的属性可能会覆盖第一个供应者的,如下:
 */
var receiver = {};
Object.assign(receiver,
    {
        type:"js",
        name:"file.js",
    },
    {
        type:"css"
    }
);
console.log(receiver.type);
console.log(receiver.name);
//receiver.type 的值为 "css",这是因为第二个供应者覆盖了第一个供应者的值.
//Object.assign() 方法并不是ES6 的一项重大扩展,但它确实将很多 JS 库中的一个公共方法标准化了.