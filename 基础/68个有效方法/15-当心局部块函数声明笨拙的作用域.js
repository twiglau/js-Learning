//1.

function f() { return "global";}
function test(x){
    function f() {return "local";}
    var result = [];
    if(x){
        result.push(f());
    }
    result.push(f());
    return result;
}
console.log(test(true))
console.log(test(false))

//2.如果把函数f移到局部块里呢?
/*
function a(){ return "global";}
function test_01(x){
    var result = [];
    if(x){
        function a() { return "partial";} //block-local
        result.push(a());
    }
    result.push(a()) // a is not a function
    return result;
}
console.log(test_01(true))
console.log(test_01(false))
*/
/**
 * 由于内部的函数a出现在if语句中,因此你可能认为第一次调用test_01产生
 * 数组["local","global"], 第二次调用产生数组["global"],
 * 但是,
 * JavaScript没有块级作用域,所以内部函数f的作用域应该是整个test函数.
 * 
 * 第二个例子的合理猜测是["local","local"] 和 ["local"],而事实上,
 * 一些JavaScript环境的确如此行事,但并不是所有的JavaScript环境都这样.
 * 其他一些环境在运行时根据包含函数f的块是否被执行来有条件地绑定函数f.
 * 
 * 编写可移值的函数的最好方式是始终避免将函数声明置于局部块或子语句中.
 * 如果你想写嵌套函数声明,
 * 1. 应该将它置于其父函数的最外层,正如最开始的实例所示.
 * 2. 另外,如果你需要有条件地选择函数,最好的办法是使用var声明和函数表达式来
 *    实现.
 */

//2.fixed
function f() { return "global";}
function test(x) {
    var g = f, result = []
    if(x) {
        g = function() { return "local";}
        result.push(g());
    }
    result.push(g());
    return result;
}

/**
 * 始终将函数声明置于程序或被包含的函数的最外层已避免不可移值的行为
 * 使用 var 声明和有条件的赋值语句替代有条件的函数声明.
 */