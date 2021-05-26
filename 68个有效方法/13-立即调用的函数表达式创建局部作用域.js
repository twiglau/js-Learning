//考虑输出?
function wrapElements(a) {
    var result = [],i,n;
    for(i = 0,n = a.length; i < n; i++){
        result[i] = function() { return a[i]; };
    }
    return result;
}
var wrapped = wrapElements([10,20,30,40,50]);
var f = wrapped[0];
console.log(f()); // undefined
/**
 * 搞清楚该例子的方法是理解 绑定与赋值的区别. 
 * 在运行时进入一个作用域,JavaScript会为每一个绑定到该作用域的变量在内存中分配一个 "槽"(slot).
 * wrapElements函数绑定了三个局部变量: result, i 和 n.
 * 因此,当它被调用是, wrapElements函数会为这三个变量分配 "槽".
 * 在循环的每次迭代中,循环体都会为嵌套函数分配一个闭包.
 * 该程序的Bug在于这样一个事实: 期望该函数存储的是嵌套函数创建时变量i的值.
 * 但事实上,它存储的是变量i的引用. 由于每次函数创建后变量i的值都发生了变化,因此内部函数最终看到的是变量
 * i最后的值. 值得注意的是, 闭包存储的是其外部变量的引用而不是值.
 * 
 * 所以,所有由wrapElements函数创建的闭包都引用在循环之前创建的变量 i 的同一个共享 "槽".
 * 由于每次循环迭代都递增变量 i 直到运行到数组结束, 因此,这时候其实当我们调用其中任何一个闭包时,
 * 它都会查找数组的索引5并返回 undefined 值.
 */

/**
 * 解决的办法是通过创建一个嵌套函数并立即调用它来强制创建一个局部作用域.
 */
function wrapElements(a){
    var result = [];
    for(var i = 0, n = a.length; i < n; i++){
        (function(){
            var j = i;
            result[i] = function() { return a[j];};
        })();
    }
    return result;
}
/**
 * 这种技术被称为 立即调用的函数表达式, 或 IIFE. 它是一种不可或缺的解决JavaScript
 * 缺少块级作用域的方法. 另一种变种是将作为形参的局部变量绑定到 IIFE 并将其值作为实参传入.
 */
function wrapElements(a){
    var result = [];
    for(var i = 0, n = a.length; i < n; i++) {
       (function(j){
           result[i] = function() { return a[j];};
       })(i);
    }
    return result;
}

/**
 * 1.理解绑定与赋值的区别.
 * 2.闭包通过引用而不是值捕获它们的外部变量.
 * 3.使用立即调用的函数表达式(IIFE)来创建局部作用域.
 * 4.当心在立即调用的函数表达式中包裹代码块可能改变其行为的情形.
 */