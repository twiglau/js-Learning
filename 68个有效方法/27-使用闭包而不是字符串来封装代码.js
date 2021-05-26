/**
 * 函数是一种将代码作为数据结构存储的遍历方式,这些代码可以随后被执行.这使得富有表现力的
 * 高阶函数抽象如 map 和 forEach 成为可能. 它也是JavaScript异步 I/O 方法的核心.
 * 与此同时,也可以将代码表示为字符串的形式传递给eval函数以达到同样的功能.
 */

//假设有一个简单的多次重复用户提供的动作的函数
function repeat(n,action){
    for(var i = 0; i < n; i++) {
        eval(action);
    }
}
//该函数在全局作用域会工作的很好,意味eval函数会将出现在字符串中的所有变量引用
//作为全局变量来解释.
//例如,一个测试函数基准执行速度的脚本可能恰好使用全局的 start 和 end 变量来存储时间.
var start = [], end = [],timings = [];
function f() {
    console.log("Hello world");
}
repeat(1000,"start.push(Date.now());f();end.push(Date.now())");
for(var i = 0,n = start.length; i < n; i++) {
    timings[i] = end[i] - start[i]
}
console.log(timings)

//但是,该脚本很脆弱,如果我们简单地将代码移到一个函数中,那么 start 和 end 变量将不再
//是全局变量
function benchmark(){
    var start = [],end = [],timings = [];
    repeat(1000,"start.push(Date.now());f();end.push(Date.now())");
    for(var i = 0, n = start.length; i < n; i++) {
        timings[i] = end[i] - start[i];
    }
    return timings;
}
/**
 * 该函数会导致repeat函数引用全局的 start 和 end 变量. 最好的情况是,其中一个全局变量
 * 未定义,调用benchmark函数抛出 ReferenceError异常,若真的不走运,代码就会
 * 调用恰好绑定到 start 和 end 全局对象的 push 方法,那么程序的行为将不可测.
 */


//更健壮的API应该接受函数而不是字符串
//这样一来,benchmark 脚本就能安全地引用闭包中的局部变量,该闭包以 repeat 函数的回调
//函数传递进来.
function benchmark() {
    var start = [],end = [],timings = [];
    repeat(1000,function() {
        start.push(Date.now());
        f();
        end.push(Date.now());
    });
    for(var i = 0,n = start.length; i < n; i++) {
        timings[i] = end[i] - start[i];
    }
    return timings;
}

/**
 * eval函数的另一个问题是,通常一些高性能的引擎很难优化字符串中的代码, 因为编译器不能
 * 尽可能早地获得源代码来及时优化代码, 然而函数表达式在其代码出现的同事就能被编译,
 * 这使得它更适合标准化编译.
 */

/**
 * 1.当将字符串传递给eval函数以执行它们的API是,绝不要在字符串中包含局部变量引用.
 * 2.接收函数调用的API优于使用eval函数执行字符串的API.
 */