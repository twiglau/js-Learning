/**
 * 需求
 * 现在需要写一个 foo 函数, 这个函数返回首次调用时的 Date 对象, 注意是首次.
 */

/**
 * 1. 普通方法
 */
var t;
function foo() {
    if(t) return t;
    t = new Date();
    return t;
}
//问题有两个, 一是污染了全局变量, 二是每次调用 foo 的时候都需要进行一次判断.

/**
 * 2. 闭包
 * 用闭包避免污染全局变量
 */
var foo = (function() {
    var t;
    return function(){
        if(t) return t;
        t = new Date();
        return t;
    }
})();
//然而还是没有解决调用时必须进行一次判断的问题.

/**
 * 3. 函数对象
 * 函数也是一种对象, 利用这个特性, 我们也可以解决这个问题.
 */
function foo() {
    if(foo.t) return foo.t;
    foo.t = new Date();
    return foo.t;
}
//依旧没有解决调用时必须进行一次判断的问题.

/**
 * 4. 惰性函数
 * 不错, 惰性函数就是解决每次都要进行判断的这个问题, 解决原理很简单,重写函数.
 */
var foo = function(){
    var t = new Date();
    foo = function() {
        return t;
    };
    return foo();
}

/**
 * 5. 更多应用
 * DOM 事件添加中, 为了兼容现代浏览器 和 IE 浏览器, 我们需要对浏览器环境进行
 * 一次判断:
 */
function addEvent(type,el,fn) {
    if(window.addEventListener){
        el.addEventListener(type,fn,false);
    }
    else if(window.attachEvent){
        el.attachEvent('on' + type, fn);
    }
}
//问题在于我们每当使用一次 addEvent 时都会进行一次判断.
//利用惰性函数, 可以这样做:
function addEvent(type,el,fn) {
    if(window.addEventListener){
        addEvent = function (type,el,fn) {
            el.addEventListener(type,fn,false);
        }
    }
    else if(window.attachEvent){
        addEvent = function (type,el,fn) {
            el.attachEvent('on' + type, fn);
        }
    }
}

//当然我们也可以使用闭包的形式:
var addEvent = (function() {
    if(window.addEventListener){
        return function(type,el,fn) {
            el.addEventListener(type,fn,false);
        }
    }
    else if(window.attachEvent){
        return function(type,el,fn){
            el.attachEvent('on' + type,fn);
        }
    }
})();

/**
 * 6. once函数
 */
function once(fn) {
    var fire,ret
    return function(){
        var self = this
        if(!fire){
            fire = true
            ret = fn.apply(self,arguments)
        }
        return ret
    }
}
