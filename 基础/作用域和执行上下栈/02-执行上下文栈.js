/**
 * 一, 执行顺序
 * 如果说到 JavaScript 代码执行顺序的话,想必都会有直观的印象,那就是顺序执行.
 * var foo = function() {
 *   console.log('foo1');
 * }
 * foo(); //foo1

 * var foo = function() {
 *   console.log('foo2');
 * }
 * foo();//foo2
 */

//然而去看这段代码:
function foo() {
    console.log('foo1');
}
foo();//foo2

function foo() {
    console.log('foo2');
}
foo();//foo2
//打印的结果却是两个foo2.
/**
 * 刷过面试题的都知道这是因为 JavaScript 引擎并非一行一行地分析和执行程序, 而是一段一段地分析
 * 执行. 当执行一段代码的时候, 会进行一个 "准备工作", 比如第一个例子中的变量提升, 和 第二个例子
 * 中的函数提升.
 * 
 * 但是本文真正让大家思考的是: 这个 "一段一段" 中的 "段" 究竟是怎么划分的呢?
 * 到底JavaScript引擎遇到一段怎样的代码才会做 "准备工作"?
 */

/**
 * 二, 可执行代码
 * 这就要说到 JavaScript 的可执行代码(executable code)的类型有哪些?
 * 其实很简单, 就三种:
 * 全局代码, 函数代码, eval代码.
 * 
 * 举个例子, 当执行到一个函数的时候, 就会进行准备工作, 这里的 "准备工作",
 * 让我们用个更专业一点的说法, 就叫做 "执行上下文(execution context)"
 */

/**
 * 三, 执行上下文栈
 * 接下来问题来了, 我们写的函数多了去, 如何管理创建那么多执行上下文呢?
 * 所以 JavaScript 引擎创建了 执行上下文栈(Execution context stack, ECS) 来管理执行
 * 上下文
 * 
 * 为了模拟执行上下文栈的行为, 让我们定义执行上下文栈是一个数组:
 * ECStack = [];
 * 
 * 试想当 JavaScript 开始要解释执行代码的时候, 最先遇到的就是全局代码, 所以初始化的时候首先
 * 就会向执行上下文栈 压入 一个全局执行上下文, 我们用 globalContext 表示它,并且只有当整个
 * 应用程序结束的时候, ESStack 才会被清空, 所以程序结束之前, ESStack 最底部永远有个globalContext:
 * ECStack = [
 *    globalContext
 * ];
 * 现在JavaScript 遇到下面的这段代码:
 * function fun3() {
 *    console.log('fun3)
 * }
 * function fun2() {
 *    fun3();
 * }
 * function fun1() {
 *    fun2();
 * }
 * fun1();
 * 
 * 当执行一个函数的时候, 就会创建一个执行上下文, 并且压入 执行上下文栈, 当函数执行完毕的时候,
 * 就会将函数的执行上下文从栈中弹出. 知道了这样的工作原理, 让我们来看看如何处理上面这段代码:
 * 
 * //伪代码
 * //fun1()
 * ECStack.push(<fun1> functionContext);
 * 
 * //fun1中竟然调用了fun2, 还要创建fun2的执行上下文
 * ECStack.push(<fun2> functionContext)
 * 
 * //而, fun2还调用了fun3!
 * ECStack.push(<fun3> functionContext)
 * 
 * //fun3 执行完毕
 * ECStack.pop();
 * 
 * //func2 执行完毕
 * ECStack.pop();
 * 
 * //fun1 执行完毕
 * ECStack.pop();
 * 
 * //javascript接着执行下面的代码, 但是ECStack底层永远有个globalContext
 */

/**
 * 四, 思考题
 * var scope = "global scope";
 * function checkscope(){
 *    var scope = "local scope";
 *    function f(){
 *        return scope;
 *    }
 *    return f();
 * }
 * checkscope();
 * 
 * var scope = "global scope";
 * function checkscope(){
 *    var scope = "local scope";
 *    function f(){
 *        return scope;
 *    }
 *    return f;
 * }
 * checkscope()();
 * 
 * 两段代码执行的结果一样, 但是两段代码究竟有哪些不同呢?
 * 答案:
 * 就是执行上下文栈的变化不一样.
 * 
 * 让我们模拟第一段代码:
 * ECStack.push(<checkscope> functionContext);
 * ECStack.push(<f> functionContext);
 * ECStack.pop();
 * ECStack.pop();
 * 
 * 让我们模拟第二段代码:
 * ECStack.push(<checkscope> functionContext);
 * ECStack.pop();
 * ECStack.push(<f> functionContext);
 * ECStack.pop();
 * 
 * 当然了, 这样概括的回答执行上下栈的变化不同, 是不是依然有一种意犹未尽的感觉?为了更详细讲解这
 * 两个函数执行上的区别,我们需要探究下 执行上下文到底包含了那些内容.
 */

/**
 * 问题: 函数执行结束之后,如果没有显示地返回值,默认是undefined, chrome中会把函数执行的结果
 * 打印出来(不过应该只是打印最外层的函数)
 * function fn3() {
 *   return true
 * }
 * function fn2() {
 *   fn3()
 * }
 * function fn1() {
 *   fn2()
 * }
 * 调用:
 * fn1() // undefined
 * 
 * function fn3() {
 *   return true
 * }
 * function fn2() {
 *   return fn3()
 * }
 * function fn3() {
 *   return fn2()
 * }
 * 调用:
 * fn1() // true
 * 
 */

/**
 * 问题: 思考题中栈的顺序为啥不一致?
 * 答:
 * 1在 return f() 的时候 会先在 checkscope 执行f函数, 再完成checkscope函数的整体执行
 * 所以是 先push(),再pop,再pop
 * 
 * 2在return f的时候, 会先执行完checkscope ,等到调用checkscope()()的第二个括号的时候,才
 * 执行f函数
 * 所以先pop, 再push(),再pop()
 */