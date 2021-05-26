/**
 * JavaScript环境都提供检查调用栈的功能.
 * 调用栈是指当前正在执行的活动函数链. 在某些宿主环境中,每个arguments
 * 对象都含有两个额外的属性:
 * arguments.callee 和 arguments.caller. 
 * 前者指向使用该arguments对象被调用的函数;
 * 后者指向调用该arguments对象的函数.
 * 
 * 1.许多环境仍然支持arguments.callee, 但它除了允许匿名函数递归地引用其自身之外,就没有更多的用途了.
 */
var factorial = (function(n){
    return ( n <= 1) ? 1 : (n * arguments.callee( n - 1));
})
//以上写法并不是特别有用,因为更直接的方式是使用函数名来引用函数自身
function factorial_a(n) {
    return ( n <= 1) ? 1 : (n * factorial_a(n - 1));
}

//2.arguments.caller 属性更为强大,它指向的是使用该 arguments 对象调用函数的函数.
//出于安全的考量,大多数环境已经移除了此特性,因此他是不可靠的.
//许多JavaScript环境也提供了一个相似的函数对象属性-----非标准单普遍使用的caller属性.
//它指向函数最近的调用者.
function revealCaller(){
    return revealCaller.caller;
}
function start(){
    return revealCaller();
}
console.log(revealCaller(),start())
console.log(start() === start);

/**
 * 使用该属性来获取栈跟踪(stack trace) 是很有诱惑力的, 栈跟踪是一个提供
 * 当前调用栈快照的数据结构,构建一个栈跟踪看上去似乎很简单.
 */
function getCallStack(){
    var stack = [];
    for(var f = getCallStack.caller; f; f = f.caller) {
        stack.push(f);
    }
    return stack;
}
//对于简单的调用栈,getCallStack函数可以很好地工作
function f1() { return getCallStack(); }
function f2() { return f1();}
var trace = f2();
// console.log(trace);// [f1,f2]

//但getCallStack函数非常脆弱,如果某个函数在调用栈中出现了不止一次,那么栈检查逻辑将会陷入循环.
function f(n){
    return n === 0 ? getCallStack() : f(n-1);
}
// var trace_01 = f(1); // infinite loop
// console.log(trace_01);

/**
 * Qs? 由于函数f递归地调用其自身,因此其caller属性会自动更新,指回到函数f.
 * 所以,函数 getCallStack 会陷入无限地查找函数f的循环之中.即使我们试图检测该循环,
 * 但在函数f调用自身之前也没有关于哪个函数调用了她的信息,因为其他调用栈的信息已经丢失了.
 * 
 * 这些栈检查属性是非标准的,在移值行或适用性上很受限制.而且,在ES5的严格函数中,它们是被
 * 命令禁止使用的. 试图获取严格函数或arguments对象的caller 或 callee 属性都将抛出
 * 一个错误.
 */
function f() {
    "use strict";
    return f.caller;
}
console.log(f());

/**
 * 1.避免使用非标准的arguments.caller 和 arguments.callee属性,因为它们不具备良好的移值性.
 * 2.避免使用非标准的函数对象caller属性,因为在包含全部栈信息方面,它是不可靠的.
 */