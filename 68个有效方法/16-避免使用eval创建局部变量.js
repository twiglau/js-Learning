function test(x){
    eval("var y = x;"); //dynamic binding
    return y;
}
console.log(test("hello"));

//以上与此var声明语句与将其直接放置在test函数体中的行为略有不同.
//只有当eval函数被调用时此 var 声明语句才会被调用. 只有当条件语句被执行时,放置在
//该条件语句中的eval函数才会将其变量加入到作用域中.
var y = "global";
function test_01(x){
    if(x){
        eval("var y = 'local';"); //dynamic binding
    }
    return y;
}
console.log(test_01(true),test_01(false));

var y = "global";
function test_02(src){
    eval(src); // may dynamically bind
    return y;
}
console.log(test_02("var y = 'local';"),test_02("var z = 'local';"));
/**
 * 这段代码很脆弱,也不安全,它赋予了外部调用者能改变test函数内部作用域的能力,
 * 期望eval函数能修改自身包含的作用域对ES5严格模式的兼容性也是不可靠的. ES5严格
 * 模式将eval函数运行在一个嵌套的作用域中以防止这种污染.保证eval函数不影响外部作用
 * 域的一个简单方法是在一个明确的嵌套作用域中运行它.
 */
var y = "global";
function test_03(src){
    (function() { eval(src);})();
    return y;
}
console.log(test_03("var y = 'local';"),test_03("var z = 'local';"))

//1.避免使用 eval 函数创建的变量污染调用者的作用域
//2.如果eval函数代码可能创建全局变量,将次调用封装到嵌套的函数中以防止作用域污染.