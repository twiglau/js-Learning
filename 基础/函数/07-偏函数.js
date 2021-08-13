/**
 * 1. 定义
 * 偏函数(Partial application)的定义:
 * > In computer science, partial application (or partial function application) refers
 * to the process of fixing a number of arguments to a function, producing another function
 * of smaller arity.
 * > 在计算机科学中, 局部应用是指固定一个函数的一些参数, 然后产生另一个更小元的函数.
 * > 什么是元? 元是指函数参数的个数, 比如一个带有两个参数的函数被称为二元函数.
 * 
 * 例子:
 * function add(a,b){
 *     return a + b;
 * }
 * 
 * // 执行 add 函数, 一次传入两个参数即可
 * add(1,2) //3
 * 
 * //假设有一个 partial 函数可以做到局部应用
 * var addOne = partial(add, 1);
 * 
 * addOne(2) // 3
 */

/**
 * 2. 柯里化与局部应用
 * > 柯里化是将一个多参数函数转换成多个单参数函数, 也就是将一个 n 元函数转换成 n个一元函数.
 * > 局部应用则是固定一个函数的一个或者多个参数, 也就是将一个 n 元函数转换成一个 n - x 元函数.
 * 
 * 如果说 两者有什么关系的话:
 * > Curried functions are automatically partially applied.
 */

/**
 * 3. partial
 * 今天模仿 underscore 写一个 partial 函数, 比起 curry 函数, 这个显然简单了很多.
 * 也许你在想我们可以直接使用 bind, 举个例子:
 * function add(a,b) {
 *     return a + b;
 * }
 * var addOne = add.bind(null, 1);
 * addOne(2); //3
 * 然而使用 bind 我们还是改变了 this 指向, 我们要写一个不改变 this 指向的方法.
 */

/**
 * 4. 仿写第一版
 */
function partial(fn) {
    var args = [].slice.call(arguments, 1);
    return function(){
        var newArgs = args.concat([].slice.call(arguments));
        return fn.apply(this,newArgs);
    };
};
//来写个 demo 验证下 this 的指向:
function  add(a, b) {
    return a + b + this.value;
}
var addOne_bind = add.bind(null,1);
var addOne_part = partial(add,1);

var value = 1;
var obj = {
    value: 2,
    addOne_bind: addOne_bind,
    addOne_part: addOne_part
}
const bind_one = obj.addOne_bind(2); // this 指向 windows
const part_one = obj.addOne_part(2); // this 指向 obj
console.log(bind_one,part_one);

/**
 * 5. 第二版
 * 然而正如 curry 函数可以使用占位符一样, 希望 partial 函数也可以实现这个功能.
 */
var _ = {};
function partial02(fn) {
    var args = [].slice.call(arguments,1);
    return function() {
        var position = 0, len = args.length;
        for(var i = 0; i < len; i++){
           args[i] = args[i] === _ ? arguments[position++] : args[i]
        }
        while(position < arguments.length) args.push(arguments[position++])
        return fn.apply(this,args);
    };
};
//验证一下:
var subtract = function(a,b) {
    return b - a;
};
var subFrom20 = partial02(subtract, _, 20);
console.log(subFrom20(5));