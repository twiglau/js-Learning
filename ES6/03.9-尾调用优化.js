/**
 * 在ES6 中对函数最有趣的改动或许就是一项引擎优化,它改变了尾部调用的系统. 尾调用
 * (tall call) 指的是调用函数的语句是另一个函数的最后语句:
 */
function doSomething() {
    return doSomethingElse(); //尾调用
}
/**
 * 在 ES5 引擎中实现的尾调用,其处理就像其他函数调用一样:
 * 一个新的栈帧(stack frame) 被创建并推到调用栈之上,用于表示该次函数调用.
 * 这意味着之前每个栈帧都被保留在内存中,当调用栈太大时会出问题.
 */

/**
 * 1.有何不同?
 * ES6 在严格模式下力图为特定尾调用减少调用栈的大小(非严格模式的尾调用则保持不变),当满足
 * 以下条件,尾调用优化会清除当前栈帧并再次利用它,而不是为尾调用创建新的栈帧:
 * 
 * > 尾调用不能引用当前栈帧中的变量(意味着该函数不能是闭包);
 * > 进行尾调用的函数在尾调用返回结果后不能做额外操作;
 * > 尾调用的结果作为当前函数的返回值.
 * 
 * 作为一个例子,下面代码满足了全部三个条件,因此能被轻易地优化:
 */
"use strict";
function doSomething(){
    //被优化
    return doSomethingElse()
}
/**
 * 该函数对 doSomethingElse() 进行了一次尾调用,并立即返回了其结果,同时并未访问局部作用域
 * 的任何变量. 一个小改动 --- 不返回结果,就会产生一个无法被优化的函数:
 */
"use strict";
function doSomething() {
    // 未被优化: 缺少 return
    doSomethingElse();
}
//类似的,如果你的函数在尾调用返回结果之后进行了额外操作,那么该函数也无法被优化:
"use strict";
function doSomething(){
    //未被优化: 在返回之后还有执行加法
    return 1 + doSomethingElse();
}
//此例在 doSomethingElse() 的结果上对其进行了加 1 操作,而没有直接返回该结果,这已足以关闭
//优化.

//无意中关闭优化的另一个常见方式,是将函数调用的结果储存在一个变量上,之后才返回了结果,就像这样:
"use strict";
function doSomething() {
    //未被优化: 调用并不在尾部
    var result = doSomethingElse();
    return result;
}
//本例之所以不能被优化,是因为 doSomethingElse() 的值并没有立即被返回.
//使用闭包或许就是需要避免的最困难情况,因为闭包能过访问上层作用域的变量,会导致尾调用优化
//被关闭.
"use strict";
function doSomething(){
    var num = 1, func = () => num;
    //为被优化: 此函数是闭包
    return func();
}

/**
 * 2. 如何控制尾调用优化
 * 在实践中,尾调用在后台运行,所以不必对此考虑太多,除非要尽力去优化一个函数.尾调用优化的主要作用
 * 倒是递归函数中,而且其其中的优化具有最大效果.
 */
function factorial(n) { 
    if(n <= 1){
        return 1;
    }else {
        //未被优化: 在返回之后还要执行乘法
        return n*factorial(n-1);
    }
 }
 /**
  * 此版本的函数并不会被优化,因为在递归调用 factorial() 之后还要执行乘法运算. 如果
  * n 是一个大数字,那么调用栈的大小会增长,并且可能导致堆栈溢出.
  * 
  * 为了优化此函数,你需要确保在最后的函数调用之后不会发生乘法运算. 为此你可以使用一个默认
  * 参数来将乘法操作移出 return 语句. 有结果的函数携带着临时结果进入下一次迭代,这样创建
  * 的函数的功能与前例相同,但它能被ES6 的引擎所优化.
  */
 function factorial(n,p = 1) {
     if(n <= 1){
         return 1 * p;
     }else {
         let result = n * p;
         //被优化
         return factorial(n-1,result);
     }
 }
 /**
  * 在重写的 factorial() 函数中,添加了第二个参数 p, 其默认值为 1, p 参数保存这前
  * 一次乘法的结果,因此下一次的结果就能在进行函数调用之前被算出. 当 n 大于 1 时,会先
  * 进行乘法运算并将其结果作为第二个参数传入 factorial(). 这就允许 ES6 引擎去优化这个递归
  * 调用.
  */