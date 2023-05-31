/**
 * bind
 * > bind() 方法会创建一个新函数. 当这个新函数被调用时, bind() 的第一个参数将作为它
 * 运行时的 this, 之后的一序列参数将会在传递的实参前传入作为它的参数.
 * 
 * 由此我们可以首先得出 bind 函数的两个特点:
 * > 1. 返回一个函数
 * > 2. 可以传入参数
 */

/**
 * 一, 返回函数的模拟实现
 * 从第一个特点开始, 我们举个例子:
 */
// var foo = {
//     value: 1
// };
// function bar() {
//     console.log(this.value);
// }
// //返回了一个函数
// var bindFoo = bar.bind(foo);

// bindFoo(); //1

//关于指定 this 的指向, 我们可以使用 call 或者 apply 实现, 关于 call 和 apply 的模拟实现,
//我们来写第一版的代码:

// 第一版
Function.prototype.bind1 = function(context){
    var self = this;
    return function(){
        return self.apply(context);
    }
}
//此外, 之所以 return self.apply(context), 是考虑到绑定函数可能是有返回值的,依然是该例子:
// function bar() {
//    return this.value;
// }
// var bindFoo = bar.bind(foo);
// console.log(bindFoo()); //1


/**
 * 二, 传参的模拟实现
 * 截下来看第二点, 可以传入参数, 这个就有点让人费解, 我在 bind 的时候, 是否可以传参? 
 */
// var foo = {
//     value: 1
// };
// function bar(name,age) {
//     console.log(this.value);
//     console.log(name);
//     console.log(age);
// }
// var bindFoo = bar.bind(foo,'daisy')
// bindFoo('18');
//函数需要传 name 和 age 两个参数, 竟然还可以在 bind 的时候, 只传一个 name, 在执行
//返回的函数的时候, 再传另一个参数 age!

//这可咋办? 我们用 arguments 进行处理:

// 第二版
Function.prototype.bind2 = function(context){
    var self = this;
    //获取bind2函数从第二个参数到最后一个参数
    var args = Array.prototype.slice.call(arguments,1);

    return function() {
        //这个时候的 arguments 是指 bind 返回的函数传入的参数
        var bindArgs = Array.prototype.slice.call(arguments);
        return self.apply(context,args.concat(bindArgs));
    }
}

/**
 * 三, 构造函数效果的模拟实现
 * 完成了这两点, 最难的部分到啦, 因为 bind 还有一个特点,就是
 * > 一个绑定函数也能使用 new 操作符创建对象: 这种行为就像把原函数当成构造器. 提供的 this
 * 值被忽略, 同时调用时的参数被提供给模拟函数.
 * 
 * 也就是说当 bind 返回的函数作为构造函数的时候, bind 时指定的 this 值会失效, 但传入的参数
 * 依然生效. 举个例子:
 */
var value = 2;
var foo = {
    value: 1
};
function bar(name,age){
    this.habit = 'shopping';
    console.log(this.value);
    console.log(name);
    console.log(age);
}

bar.prototype.friend = 'kevin';
var bindFoo = bar.bind(foo,'daisy');
var obj = new bindFoo('18');

console.log(obj.habit);
console.log(obj.friend);
//注意: 尽管在全局和 foo 中都声明了 value 值, 最后依然返回了 undefined, 说明绑定的 this 失效了,
//如果大家了解 new 的 模拟实现, 就会知道这个时候的 this 已经指向了 obj.
//所以我们可以通过修改返回的函数的原型来实现,如下:
Function.prototype.bind3 = function(context){
    var self = this;
    var args = Array.prototype.slice.call(arguments,1);

    var fBound = function() {
        var bindArgs = Array.prototype.slice.call(arguments);
        // 当作为构造函数时, this 指向实例, 此时结果为 true, 将绑定函数的 this 指向该实例,
        // 可以让实例获得来自绑定函数的值

        // 以上面的是 demo 为例, 如果改成 `this instanceof fBound ? null : context`,
        // 实例只是一个空对象, 将null 改成 this, 实例会具有 habit 属性

        // 当作为普通函数时, this 指向 window, 此时结果为 false, 将绑定函数的 this 指向 context
        return self.apply(this instanceof fBound ? this : context, args.concat(bindArgs));
    }
    //修改返回函数的 prototype 为绑定函数的 prototype, 实例就可以继承绑定函数的原型中的值
    fBound.prototype = this.prototype;
    return fBound;
}

/**
 * 四, 构造函数效果的优化实现
 * 但是在这个写法中, 我么直接将 fBound.prototype = this.prototype, 我们直接修改 fBound.prototype
 * 的时候, 也会直接修改绑定函数的 prototype. 这个时候, 我们可以通过一个空函数来进行中转:
 */

// 第四版
Function.prototype.bind4 = function(context) {
    var self = this;
    var args = Array.prototype.slice.call(arguments,1);

    var fNOP = function(){};

    var fBound = function() {
        var bindArgs = Array.prototype.slice.call(arguments);
        return self.apply( this instanceof fNOP ? this : context, args.concat(bindArgs));
    }

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
    return fBound;
}


/**
 * 五, 三个小问题
 * 接下来处理这些问题:
 * 1. 分析例子:
 * var value = 2;
 * var foo = {
 *     value: 1,
 *     bar: bar.bind(null)
 * };
 * function bar() {
 *     console.log(this.value);
 * }
 * 
 * foo.bar() //2
 * 
 * 2. 调用 bind 的不是函数咋办?
 * 不行,要报错
 * if(typeof this !== "function"){
 *    throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
 * }
 * 
 * 3. 在线上用
 * 需要做个兼容:
 * Function.prototype.bind = Function.prototype.bind || function() {
 *     .....
 * };
 */


/**
 * 六, 最终代码
 */
Function.prototype.bind5 = function(context){
    if(typeof this !== "function"){
        throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
    }
    var self = this;
    var args = Array.prototype.slice.call(arguments,1);
    var fNOP = function () {}

    var fBound = function () {
        var bindArgs = Array.prototype.slice.call(arguments);
        return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
    }

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();

    return fBound;
}

/**
 * 问题:
 * 1. fNOP.prototype = this.prototype; fBound.prototype = new fNOP();
 * 答:
 * 等价于  fBound.prototype = Object.create(this.prototype);
 * 其中 Object.create 的模拟实现就是:
 * Object.create = function( o ) {
 *    function f(){}
 *    f.prototype = o;
 *    return new f;
 * }
 * 
 * 
 * 2. bind 最少的代码 - 
 * Function.prototype.bind = function() {
 *    var fn = this, args = Array.prototype.slice.call(arguments),object = args.shift();
 *    return function(){
 *        return fn.apply(object,args.concat(Array.prototype.slice.call(arguments)));
 *    };
 * };
 * 以上代码并没有完整的实现 bind 的特性, 比如 "当 bind 返回的函数作为构造函数的时候, bind 时指定的 this
 * 的值会失效"
 */
