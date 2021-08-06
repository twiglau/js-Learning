/**
 * 一, 作用域
 * 作用域是指程序源代码中定义变量的区域.
 * 作用域规定了如何查找变量, 也就是确定当前执行代码对变量的访问权限.
 * JavaScript 采用词法作用域(lexical scoping),也就是静态作用域.
 */

/**
 * 二, 静态作用域与动态作用域
 * 因为 JavaScript 采用的是词法作用域, 函数的作用域在函数定义的时候就决定了.
 * 而与词法作用域相对的是动态作用域, 函数的作用域是在函数调用的时候才决定的.
 * 让我们认真看个例子就能明白之间的区别:
 */
var value = 1;

function foo() {
    console.log(value);
}
function bar() {
    var value = 2;
    foo();
}
bar();
// 结果是 ???
/**
 * 假设JavaScript采用静态作用域, 让我们分析下执行过程:
 * 执行foo函数, 先从foo函数内部查找是否有局部变量value,如果没有,就根据书写的位置,查找
 * 上面一层的代码, 也就是 value 等于 1, 所以结果会打印 1.
 * 
 * 假设JavaScript采用动态作用域,让我们分析下执行过程:
 * 执行foo函数,依然是从foo函数内部查找是否有局部变量value. 如果没有, 就从调用函数的作用
 * 域, 也就是 bar 函数内部查找 value 变量, 所以结果会打印2.
 * 
 * 前面我们已经说了, JavaScript采用的是静态作用域, 所以这个例子的结果是 1
 */

/**
 * 三, 动态作用域
 * 也许你会好奇什么语言是动态作用域?
 * bash 就是动态作用域,不信的话, 把下面的脚本存成例如 scope.bash, 然后进入相应的目录,用
 * 命令执行 bash ./scope.bash, 看看打印的值是多少.
 * 
 * value=1
 * function foo() {
 *   echo $value;
 * }
 * function bar() {
 *   local value=2;
 *   foo;
 * }
 * bar
 */

/**
 * 四, 思考题
 * 最后,让我们看一个<JavaScript权威指南>中的例子:
 */
var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        console.log(scope);
        return scope;
    }
    return f();
}
checkscope();

var scope2 = "global scope"
function checkscope2(){
    var scope2 = "lcoal scope";
    function f(){
        console.log(scope2);
        return scope2;
    }
    return f;
}
checkscope2()();

/**
 * 以上两段代码各自的执行结果是多少?
 * 这里直接告诉大家结果, 两段代码都会打印: local scope.
 * 原因也很简单, 因为 JavaScript 采用的是 词法作用域, 函数的作用域基于函数创建的位置.
 * 而引用<JavaScript权威指南>的回答就是:
 * 
 * JavaScript函数的执行用到了作用域链, 这个作用链是在函数定义的时候创建的. 嵌套的函数f()
 * 定义在这个作用域链里, 其中的变量 scope 一定是局部变量, 不管何时何地执行函数f(),这种
 * 绑定在执行f()时依然有效.
 * 
 * 但是在这里真正想让大家思考的是:
 * 虽然两段代码执行的结果一样,但是究竟有哪些不同呢?
 * 如果要回答这个问题, 就要牵涉到很多内容, 词法作用域只是其中的一小部分, 让我们期待下一篇
 */

/**
 * 问题核心: 函数的作用域在函数定义的时候就决定了.
 * 真正理解这句话的时候,闭包也就理解了.
 */
/**
 * Like most modern programming languages, JavaScript uses lexical scoping. 
 * This means that functions are executed using the variable scope that was in effect when they were defined, 
 * not the variable scope that is in effect when they are invoked. 
 * In order to implement lexical scoping, the internal state of a JavaScript function object must 
 * in- clude not only the code of the function 
 * but also a reference to the current scope chain. 
 * (Before reading the rest of this section, 
 * you may want to review the material on variable scope and the scope chain in §3.10 and §3.10.3.) 
 * This combination of a function object 
 * and a scope (a set of variable bindings) in which the function’s variables are resolved is called a closure in the computer science literature. 
 * (This is an old term that refers to the fact that the function’s variables have bindings in the scope chain 
 * and that therefore the function is “closed over” its variables.)

 * Technically, all JavaScript functions are closures: 
 * they are objects, and they have a scope chain associated with them. 
 * Most functions are invoked using the same scope chain that was in effect 
 * when the function was defined, 
 * and it doesn’t really matter that there is a closure involved. 
 * Closures become interesting when they are invoked 
 * under a different scope chain than the one that was in effect 
 * when they were defined. 
 * This happens most commonly 
 * when a nested function object is returned from the function within which it was defined. 
 * There are a number of powerful programming techniques
 *  that involve this kind of nested function closures, 
 * and their use has become relatively common in JavaScript programming. 
 * Closures may seem confusing when you first en- counter them, 
 * but it is important that you understand them well enough to use them comfortably.

 * JavaScript, The Definite Guide
 */

/**
 * 和大多数的现代化编程语言一样，JavaScript是采用词法作用域的，
 * 这就意味着函数的执行依赖于函数定义的时候所产生（而不是函数调用的时候产生的）的变量作用域。
 * 为了去实现这种词法作用域，JavaScript函数对象的内部状态不仅包含函数逻辑的代码，除此之外还包含当前作用域链的引用。
 * 函数对象可以通过这个作用域链相互关联起来，
 * 如此，函数体内部的变量都可以保存在函数的作用域内，这在计算机的文献中被称之为闭包。

 * 从技术的角度去将，所有的JavaScript函数都是闭包：
 * 他们都是对象，他们都有一个关联到他们的作用域链。
 * 绝大多数函数在调用的时候使用的作用域链和他们在定义的时候的作用域链是相同的，
 * 但是这并不影响闭包。当调用函数的时候闭包所指向的作用域链和定义函数时的作用域链不是同一个作用域链的时候，
 * 闭包become interesting。这种interesting的事情往往发生在这样的情况下： 
 * 当一个函数嵌套了另外的一个函数，外部的函数将内部嵌套的这个函数作为对象返回。
 * 一大批强大的编程技术都利用了这类嵌套的函数闭包，当然，javascript也是这样。
 * 可能你第一次碰见闭包觉得比较难以理解，但是去明白闭包然后去非常自如的使用它是非常重要的。

 * 通俗点说，在程序语言范畴内的闭包是指函数把其的变量作用域也包含在这个函数的作用域内，
 * 形成一个所谓的“闭包”，这样的话外部的函数就无法去访问内部变量。
 * 所以按照第二段所说的，严格意义上所有的函数都是闭包。

 * 需要注意的是：我们常常所说的闭包指的是让外部函数访问到内部的变量，也就是说，
 * 按照一般的做法，是使内部函数返回一个函数，然后操作其中的变量。
 * 这样做的话一是可以读取函数内部的变量，二是可以让这些变量的值始终保存在内存中。
 */
