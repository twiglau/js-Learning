/**
 * 一 , call
 * > call() 方法在使用一个指定的 this 值 和若干指定的参数值的前提下调用某个函数或方法.
 * 举个例子:
 */

var foo = {
    value: 1
};
function bar(){
    console.log(this.value)
}
bar.call(foo);

/**
 * 注意两点:
 * > 1. call 改变了 this 的指向, 指向到 foo
 * > 2. bar 函数执行了
 */

/**
 * 1. 模拟实现第一步
 * 那么我们该怎么模拟实现这两个效果呢?
 * 试想当调用 call 的时候, 把 foo 对象改造如下:
 */

// var foo = {
//     value: 1,
//     bar: function() {
//         console.log(this.value)
//     }
// };
// foo.bar(); //1

/**
 * 这个时候 this 就指向了 foo, 是不是很简单呢?
 * 但是这样却给 foo 对象添加了一个属性, 不过也不用担心, 我们用 delete 再删除它不就好了~
 * 所以我们模拟的步骤可以分为:
 * > 1. 将函数设为对象的属性
 * > 2. 执行该函数
 * > 3. 删除该函数
 * 
 * 以上个例子为例,就是:
 * - 第一步
 * foo.fn = bar
 * - 第二步
 * foo.fn()
 * - 第三步
 * delete foo.fn
 * 
 * fn 是对象的属性名, 反正最后也要删除它, 所以怎么命名都都无所谓.
 * 根据这个思路, 我们可以尝试着去写第一版的 call2 函数:
 */

//第一版
Function.prototype.call2 = function(context){
    //首先要获取调用 call 的函数, 用 this 可以获取
    context.fn = this;
    context.fn();
    delete context.fn;
}

//测试一下
// var foo = {
//     value: 1
// };
// function bar() {
//     console.log(this.value);
// }
// bar.call2(foo);

/**
 * 2. 模拟实现第二步
 * 最一开始也将了, call 函数还能给定参数执行函数. 举个例子:
 */
var foo = {
    value: 1
}
function bar(name,age) {
    console.log(name)
    console.log(age)
    console.log(this.value)
}
bar.call(foo,'kevin',18);
/**
 * 注意: 传入的参数并不确定,该怎么办?
 * 不急, 我们可以从 Arguments 对象中取值, 取出第二个到最后一个参数,然后放到一个数组里.
 * 比如遮掩:
 * 
 * 以上个例子为例, 此时的 arguments 为:
 * arguments = {
 *     0: foo,
 *     1: 'kevin',
 *     2: 18,
 *     length: 3
 * }
 * 
 * //因为arguments是类数组对象, 所以可以用 for 循环
 * var args = [];
 * for(var i=1, len = arguments.length; i < len; i++) {
 *    args.push('arguments[' + i + ']')
 * }
 * 
 * 执行后 args 为 ["arguments[1]", "arguments[2]", "arguments[3]"]
 * 
 * 不定长的参数问题解决了, 我们接着要把这个参数数组放到要执行的函数的参数里面去.
 * 
 * // 将数组里的元素作为多个参数放进函数的形参里
 * context.fn(args.join(','))
 * // (O_o)??
 * // 这个方法肯定是不行的
 * 
 * 也许有人想到用 ES6 的方法, 不过 call 的 ES3 的方法, 我们为了模拟实现一个 ES3
 * 的方法, 要用到ES6的方法,好像..., 但是我们这次用 eval 方法拼成一个函数,类似这样:
 * 
 * eval('context.fn(' + args + ')')
 * 
 * 这里 args 会自动调用 Array.toString() 这个方法
 * 所以我们的第二版克服了两个大问题, 代码如下:
 */

// 第二版
Function.prototype.call3 = function(context) {
    context.fn = this;
    var args = [];
    for(var i = 1,len = arguments.length; i < len; i++){
        args.push('arguments[' + i + ']');
    }
    eval('context.fn(' + args + ')');
    delete context.fn;
}

// 测试一下
bar.call3(foo,'kevin',18);

/**
 * 3. 模拟实现第三步
 * 模拟代码已经完成 80%, 还有两个小点要注意:
 * > 1. this 参数可以传 null, 当为 null 的时候, 视为指向 window
 * 举个例子:
 */
var value = 1;
function bar() {
    console.log(this.value);
}
bar.call(null); // 1
//虽然这个例子本身不使用 call, 结果依然一样.
//2. 函数是可以有返回值的!
//举个例子:
var obj = {
    value: 1
}
function bar(name,age){
    return {
        value: this.value,
        name: name,
        age: age
    }
}
console.log(bar.call(obj,'kevin',18));

//不过很好解决, 让我们直接看第三版也就是最后一版的代码:
Function.prototype.call3 = function(context) {
    var context = context || window;
    context.fn = this;

    var args = [];
    for(var i=1,len = arguments.length; i < len; i++) {
        args.push('arguments[' + i + ']');
    }

    var result = eval('context.fn(' + args + ')');

    delete context.fn
    return result;
}

var value = 2;
var obj = {
    value: 1
}
function bar(name,age){
    console.log(this.value)
    return {
        value: this.value,
        name: name,
        age: age
    }
}

bar.call3(null);
console.log(bar.call3(obj,'kevin',18));



/**
 * 二, apply的模拟实现
 * apply 的实现跟call类似, 在这里直接给代码
 */
Function.prototype.apply1 = function(context,arr){
    var context = Object(context) || window;
    context.fn = this;

    var result;
    if(!arr){
        result = context.fn();
    }else{
        var args = [];
        for(var i=0,len=arr.length;i<len;i++){
            args.push('arr[' + i + ']');
        }
        result = eval('context.fn(' + args + ')')
    }
    delete context.fn
    return result;
}



/**
 * 解释: eval函数
 * eval函数接收参数是个字符串
 * 定义和用法
 * > eval() 函数可计算某个字符串, 并执行其中的 JavaScript 代码.
 * 语法:
 * eval(string)
 * 
 * > string必需. 要计算的字符串, 其中含有要计算的 JavaScript 表达式或要执行的语句.
 * 该方法只接受原始字符串作为参数, 如果 string 参数不是原始字符串, 那么该方法将不作任何
 * 改变地返回. 因此请不要为 eval() 函数传递 String 对象来作为参数.
 * 
 * > 简单来说:
 * 就是用 JavaScript 的解析引擎来解析这一堆字符串里面的内容, 这么说,你可以这么理解,
 * 你把 eval 看成是 <script> 标签.
 */

/**
 * for 循环开始的位置
 * > call 的实现中, 是通过 arguments 取各个参数, 所以从 1 开始, 省略掉为 0 的context,
 * 而 apply的实现中, arr 直接就表示参数的数组, 循环这个参数数组, 直接就从 0 开始.
 */

//增加了封箱, 避免了 eval()
Function.prototype._call = function(context) {
    if(context === undefined || context === null) {
        context = globalThis
    }
    context = new Object(context)

    context.fn = this
    const args = []

    Array.prototype.forEach.call(
        Array.prototype.slice.call(arguments,1),
        item => args.push(item)
    )

    const result = context.fn(...args)

    delete context.fn
    return result
}

Function.prototype.apply2 = function (ctx,arr) { 
    // 在浏览器中需要指定为 window, 在 node 环境中, 则为 空对象
    ctx = ctx || typeof window === 'undefined' ? {} : window
    ctx.func = this

    let result 
    if(!arr) {
        result = ctx.func()
    } else {
        result = ctx.func(...arr)
    }

    delete ctx.func
    return result
 }