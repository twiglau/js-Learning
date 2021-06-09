/**
 * 在ES3或更早版本中,在代码块中声明函数(即块级函数)严格来说应当是一个语法错误,但所有的浏览器
 * 却都支持该语法. 可惜的是, 每个支持该语法的浏览器都有轻微的行为差异,所以最佳实践就是
 * 
 * 不要的代码块中声明函数(更好的选择是使用函数表达式)
 * 
 * 为了控制这种不兼容行为,ES5 的严格模式为代码块内部的函数声明引入了一个错误:
 */
var a = `
"use strict";
if(true){
    //在 ES5 会抛出语法错误,ES6 则不会
    function doSomething(){
        // ...
    }
}
`
/**
 * 在 ES5 中,这段代码会抛出语法错误, 然而 ES6 会将 doSomething() 函数视为块级声明,并
 * 允许它在定义所在的代码块内部被访问,例如:
 */
var b = `
"use strict";
if(true){
    console.log(typeof doSomething); // "function"
    function doSomething() {
        // ...
    }
    doSomething();
}
console.log(typeof doSomething); // "undefined"

`
/**
 * 块级函数会被提升到定义所在的代码块的顶部, 因此 typeof doSomething 会返回 "function",
 * 即使该检查位于此函数定义位置之前. 一旦 if 代码块执行完毕, doSomething() 也就不复存在.
 */

/**
 * 1.决定何时使用块级函数
 * 块级函数与 let 函数表达式相似,在执行流跳出定义所在的代码块之后,函数定义就会被移除. 关键区别在于:
 * 块级函数会被提升到所在代码块的顶部; 而使用 let 的函数表达式则不会,如下:
 */
var c = `
"use strict";
if(true){
    console.log(typeof doSomething); //抛出错误

    let doSomething = function() {
        // ...
    }
    doSomething();
}
console.log(typeof doSomething);

`
/**
 * 此处代码在 typeof doSomething 被执行时中断了,因为 let 声明尚未被执行,将 doSomething()
 * 放入了暂时性死区. 知道这个区别之后,你就可以更具是否想要提升来选择应当使用块级函数还是 let 表达式.
 */

/**
 * 2.非严格模式的块级函数
 * ES6 在非严格模式下同样允许使用块级函数,但行为有细微不同. 块级函数的作用域会被提升到所在函数
 * 或全局环境的顶部,而不是代码块的顶部.
 */
//ES6 behavior
if(true){
    console.log(typeof doSomething); // "function"
    function doSomething() {
        // ...
    }
    doSomething();
}
console.log(typeof doSomething); // "function"