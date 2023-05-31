
// 严格模式下, 自执行函数(默认绑定)的this,会指向 undefined
// 之前编写的代码中, 自执行函数我们是没有使用过this直接去引用window
function foo() {
    console.log(this)
}

foo()


var obj = {
    name: "why",
    foo: foo
}

obj.foo()
var bar = obj.foo
bar()

// setTimeout 的 this 
// fn.apply(this = window)
setTimeout(function(){
    console.log(this) 
}, 1000);

// v8 中实现 setTimeout
fakeWin.setTimeout = function(fn, time) {
    fakeWin.setTimeout.called = true;
    fakeWin.setTimeout.that = this;
    if(typeof fn === 'string') {
        eval(fn);
    } else {
        fn.apply(this, Array.prototype.slice.call(arguments, 2))
    }
}