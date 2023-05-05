/**
 * 一, 定义
 * MDN 对闭包的定义为:
 * > 闭包是指那些能够访问自由变量的函数.
 * 那什么是自由变量呢?
 * > 自由变量是指在函数中使用的, 但既不是函数参数也不是函数的局部变量的变量.
 * 由此, 我们可以看出闭包共有两部分组成:
 * > 闭包 = 函数 + 函数能够访问的自由变量
 * 
 * 举个例子:
 */
var a = 1;
function foo() {
    console.log(a);
}
foo();
/**
 * foo函数可以访问变量 a, 但是 a 即不是 foo 函数的局部变量, 也不是 foo函数的参数,所以
 * a 就是自由变量.
 * 那么, 函数foo + foo函数访问的自由变量 a 不就是构成了一个闭包
 * 还真是这样的!
 * 所以在<JavaScript权威指南>中就讲到: 从技术的角度讲, 所有的JavaScript 函数都是闭包.
 * 嗯? 这怎么跟我们平时看到的讲到的闭包不一样呢?
 * 
 * 憋着急,这是理论上的闭包, 其实还有一个实践角度上的闭包, 让我们看看汤姆大叔翻译的关于闭包的文章
 * 中的定义:
 * ECMAScript中, 闭包指的是:
 * > 1. 从理论角度: 所有的函数. 因为它们都在创建的时候就将上下文的数据保存起来了.哪怕是简单的
 * 全局变量也是如此, 因为函数中访问全局变量就相当于是在访问自由变量,这个时候使用最外层的作用域.
 * > 2. 从实践角度: 以下函数才算是闭包:
 *   - 即使创建它的上下文已经销毁, 它仍然存在(比如, 内部函数从父函数中返回)
 *   - 在代码中引用了自由变量
 * 接下俩就来讲讲实践上的闭包.
 */

/**
 * 二, 分析
 * 让我们先写个例子, 例子依然是来自<JavaScript权威指南>,稍微做点改动:
 */
var scope = "global scope";
function checkscope() { 
    var scope = "local scope";
    function f() {
        return scope;
    }
    return f;
 }

 var foo = checkscope();
 foo();
 /**
  * 首先我们要分析一下这段代码中执行上下文栈和执行上下文的变化情况.
  * > 1. 进入全局代码, 创建全局执行上下文, 全局执行上下文压入执行上下文栈
  * > 2. 全局执行上下文初始化
  * > 3. 执行 checkscope 函数, 创建 checkscope 函数执行上下文, checkscope执行上下文
  * 被压入执行上下文栈
  * > 4. checkscope执行上下文初始化, 创建变量对象, 作用域链, this等
  * > 5. checkscope函数执行完毕, checkscope执行上下文从执行上下文栈中弹出
  * > 6. 执行 f 函数, 创建 f 函数执行上下文, f 执行上下文被压入执行上下文栈
  * > 7. f 执行上下文初始化, 创建变量对象, 作用域链, this等
  * > 8. f 函数执行完毕, f 函数上下文从执行上下文栈中弹出
  * 
  * 了解到这个过程, 我们应该思考一个问题,那就是:
  * 当 f 函数执行的时候, checkscope 函数上下文已经被销毁了啊(即从执行上下文栈中被弹出),
  * 怎么还会读取到 checkscope 作用域下的 scope 值呢?
  * 
  * 以上的代码, 要是转换成 PHP, 就会报错, 因为在PHP中, f函数只能读取到自己作用域和全局作用域里的
  * 值, 所以读不到 checkscope 下的 scope 值,
  * 
  * 然而 JavaScript 却是可以的.
  * 
  * 当我们了解了具体的执行过程后, 我们知道 f 执行上下文维护了一个作用域链:
  * fContext = {
  *    Scope: [AO,checkscopeContext.AO,globalContext.VO],
  * }
  * 对的, 就是因为这个作用域链, f函数依然可以读取到 checkscopeContext.AO 的值, 说明当 f 函数引用了
  * checkscopeContext.AO 中的值的时候, 即使checkscopeContext被销毁了, 但是 JavaScript 依然会让
  * checkscopeContext.AO 活在内存中, f函数依然可以通过f函数的作用域链找到它, 正式因为 JavaScript 做
  * 到了这一点, 从而实现了闭包这个概念.
  * 
  * 所以,让我们再看一遍实践角度上闭包的定义:
  * > 1. 即使创建它的上下文已经销毁, 它仍然存在(比如, 内部函数从父函数中返回)
  * > 2. 在代码中引用了自由变量
  * 
  * 在这里再补充一个<JavaScript权威指南>英文原版对闭包的定义:
  * > This combination of a function object and a scope(a set of variable bindings) in which
  * th function's variables are resolved is called a closure in the computer science literature.
  */

 /**
  * 必刷题
  */
 var data = [];
 for(var i = 0; i < 3; i++) {
     data[i] = function() {
         console.log(i);
     };
 }
 data[0]();
 data[1]();
 data[2]();

 /**
  * 分析原因:
  * 
  * 当执行到 data[0]函数之前, 此时全局上下文的 VO 为:
  * globalContext = {
  *    VO: {
  *        data: [...],
  *        i: 3
  *    }
  * }
  * 
  * 当执行data[0]函数的时候, data[0]函数的作用域链为:
  * data[0]Context = {
  *     Scope: [AO,globalContext.VO]
  * }
  * data[0]Context的AO并没有 i 值, 所以会从 globalContext.VO 中查找, i 为 3, 所以打印的结果就是 3.
  * data[1] 和 data[2] 是一样的道理.
  * 
  * 所以让我们改成闭包看看:
  */
 var data = [];
 for(var i = 0; i < 3; i++) {
     data[i] = (function(i) {
         return function() {
             console.log(i);
         }
     })(i);
 }
 data[0]();
 data[1]();
 data[2]();

 /**
  * 当执行到 data[0] 函数之前, 此时全局上下文的 VO 为:
  * globalContext = {
  *    VO: {
  *        data: [...],
  *        i: 3
  *    }
  * }
  * 跟没改之前一模一样
  * 
  * 当执行 data[0]函数的时候, data[0]函数的作用链发生了改变:
  * data[0]Context = {
  *    Scope: [AO, 匿名函数Context.AO, globalContext.VO]
  * }
  * 匿名函数执行上下文的AO为:
  * 倪敏函数Context = {
  *    AO: {
  *       arguments: {
  *          0: 0,
  *          length: 1
  *       },
  *       i: 0
  *    }
  * }
  * data[0]Context 的AO 并没有 i 值, 所以会沿着作用链从 匿名函数Context.AO 中查找,
  * 这时候就会找 i 为 0, 找到了就不会忘 globalContext.VO 中查找了, 即使 globalContext.VO
  * 也有 i 的值(值为3), 所以打印的结果就是 0.
  */