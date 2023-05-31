//比较下面两段代码, 试讲述两段代码的不同之处
//https://github.com/kuitos/kuitos.github.io/issues/18
var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f();
}
checkscope();

//B-------------
var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f;
}
checkscope()();