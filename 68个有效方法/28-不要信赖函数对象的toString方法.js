/**
 * JavaScript函数有一个非凡的特性,即将其代码重视为为字符串的能力.
 */
let funcStr = (function(x){ return x + 1}).toString();
console.log(funcStr);
/**
 * 1.首先,ECMAScript标准对函数对象的toString方法的返回结果(即该字符串)并没有任何要求,
 *   这意味着不同的JavaScript引擎将产生不同的字符串,甚至产生的字符串与该函数并不相关.
 * 
 * 2.事实上,如果函数是使用纯JavaScript实现的,那么JavaScript引擎会试图提供函数的源代码
 *   的真实表示. 下面是一个失败的例子,该例子失败的原因是使用了又宿主环境的内置库提供的函数.
 */
console.log(
    (function(x) {
        return x + 1;
    }).bind(16).toString()
)
//Log: "function () { [native code] }"

/**
 * 1.首先,由于在许多宿主环境中,bind函数是由其他编程语言实现的,宿主环境提供的是一个
 *   编译后的函数,在此环境下该函数没有JavaScript的源代码供显示.
 * 2.其次,由于标准允许浏览器引擎改变toString方法的输出,这就很容易使编写的程序在一个JavaScript
 *    系统中正确运行,在其他JavaScript系统中却无法正确运行.
 *    程序对函数的源代码字符串的具体细节很敏感,即使JavaScript的实现有一点细微的变化(如空格格式化)
 *    都可能破坏程序.
 * 3. 最后,由toString方法生成的源代码并不展示闭包中保存的与内部变量引用相关的值
 */
console.log(
    (function(x){
        return function(y) { return x + y;}
    })(42).toString()
)
//注意,尽管函数实际上是一个绑定x为42的闭包,但结果字符串仍然包含一个引用了 x 的变量.
/**
 * 从某种意义上说,toString方法的这些局限使其用来提取函数源代码并不是特别有用和值得信赖.
 * 通常应该避免使用它, 对提取函数源代码相当复杂的使用应当采用精心制作的JavaScript解释器和处理库.
 */

/**
 * 1.当调用函数的 toString方法时,并没有要求JavaScript 引擎能够精确地获取到函数的源代码.
 * 2.由于在不同的引擎下调用toString方法的结果可能不同,所以绝不要信赖函数源代码
 *   的详细细节
 * 3.toString方法的执行结果并不会暴露存储在闭包中的局部变量值
 * 4.通常情况下,应该避免使用对象的 toString 方法.
 */