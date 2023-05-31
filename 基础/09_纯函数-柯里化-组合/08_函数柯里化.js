/**
 * 1. 定义
 * > In mathematics and computer science, currying is the technique of translating
 * the evaluation of a function that takes multiple arguments (or a tuple of arguments)
 * into evaluating a sequence of functions, each with a single argument.
 * > 在数学和计算机科学中, 柯里化是一种将使用多个参数的一个函数转换成一系列使用一个参数
 * 的函数的技术.
 * 
 * 举个例子:
 * function add(a,b) {
 *     return a + b;
 * }
 * 
 * // 执行 add 函数, 一次传入两个参数即可
 * add(1, 2) // 3
 * 
 * //假设有一个 curry 函数可以做到柯里化
 * var addCurry = curry(add);
 * addCurry(1)(2) // 3
 */

/**
 * 2. 用途
 * 我们会讲到如何写出这个curry函数, 并且会将这个curry函数写的很强大, 但是在编写之前,我们需要知道
 * 柯里化到底有什么用?
 * 
 * 举个例子:
 * function ajax(type,url,data){
 *     var xhr = new XMLHttpRequest()
 *     xhr.open(type,url,true)
 *     xhr.send(data);
 * }
 * 
 * //虽然 ajax 这个函数非常通用,但在重复调用的时候参数冗余
 * ajax('POST','www.test.com','name=kevin')
 * ajax('POST','www.test2.com','name=kevin')
 * ajax('POST','www.test3.com','name=kevin')
 * 
 * //利用 curry
 * var ajaxCurry = curry(ajax);
 * 
 * //以 POST 类型请求数据
 * var post = ajaxCurry('POST');
 * post('www.test.com','name=kevin');
 * 
 * //以 POST 类型请求来自于 www.test.com 的数据
 * var postFromTest = post('www.test.com');
 * postFromTest('name=kevin')
 * 
 * 想想jQuery虽然有 $.ajax 这样通用的方法, 但是也有 $.get 和 $.post 的语法糖.
 * 
 * curry的这种用途可以理解为: 参数复用. 本质上是降低通用性, 提高适用性.
 * 
 * 可是即便如此, 是不是依然感觉没什么用?
 * 
 * 如果我们仅仅是把参数一个一个传进去, 意义可能不大, 但是如果我们是把柯里化后的函数传
 * 给其他函数比如 map 呢?
 * 
 * 举个例子:
 * 比如我们有这样一段数据:
 * var person = [{name:'kevin'}, {name:'daisy'}]
 * 
 * 如果我们要获取所有的 name 值, 我们可以这样做:
 * var name = person.map(function(item){
 *     return item.name;
 * })
 * 
 * 不过如果我们有 curry 函数:
 * var prop = curry(function(key,obj) {
 *     return obj[key]
 * });
 * var name = person.map(prop('name'))
 * 
 * 我们为了获取 name 属性还要编写一个 prop 函数, 是不是又麻烦了?
 * 但是要注意, prop 函数编写一次后, 以后可以多次使用, 实际上代码从原本的三行精简成了
 * 一行, 而且你看代码是不是更加易懂?
 * 
 * person.map(prop('name')) 就好像直白的告诉你:
 * person 对象遍历(map) 获取(prop) name 属性.
 */


/**
 * 3. 第一版
 */
var curry = function (fn) {
    var args = [].slice.call(arguments,1);
    return function() {
        var newArgs = args.concat([].slice.call(arguments));
        console.log(this);
        return fn.apply(this,newArgs);
    };
};
//我们可以这样使用:
function add(a,b) {
    return a + b;
}
var addCurry = curry(add,1,2);
addCurry()
//或者
var addCurry = curry(add,1)
addCurry(2)
//或者
var addCurry = curry(add);
addCurry(1, 2)


/**
 * 4. 第二版
 */
function  sub_curry(fn) {
    var args = [].slice.call(arguments,1);
    return function() {
        return fn.apply(this,args.concat([].slice.call(arguments)));
    }
}

function curry02(fn,length) {
    
    length = length || fn.length;

    var slice = Array.prototype.slice;

    return function() {
        if(arguments.length < length){
            var combined = [fn].concat(slice.call(arguments));
            return curry02(sub_curry.apply(this,combined), length - arguments.length);
        }else{
            return fn.apply(this,arguments);
        }
    };
}
//验证该函数:
var fn = curry02(function(a,b,c) {
    return [a,b,c];
})
console.log(fn("a","b","c"))  // ["a","b","c"]
console.log(fn("a","b")("c")) // ["a","b","c"]
console.log(fn("a")("b")("c"))// ["a","b","c"]
console.log(fn("a")("b","c")) // ["a","b","c"]

//为了更好的理解这个 curry 函数, 写个简版代码:
function sub_curry_simple(fn) {
    return function() {
        return fn()
    }
}
function curry_simple(fn,length) {
    length = length || 4;
    return function() {
        if(length > 1){
            return curry_simple(sub_curry_simple(fn),--length)
        }
        else {
            return fn()
        }
    }
}
var fn0 = function() {
    console.log(1)
}
var fn1 = curry_simple(fn0)
fn1()()()() //1
// 先从理解这个 curry_simple 函数开始
// 当执行 fn1() 时, 函数返回
/**
 * curry_simple(sub_curry_simple(fn0))
 * // 相当于
 * curry_simple(function(){
 *    return fn0()
 * })
 * 
 * 
 * 当执行 fn1()()时, 函数返回:
 * curry_simple(sub_curry_simple(function(){
 *      return fn0()
 * }))
 * // 相当于
 * curry_simple(function(){
 *     return (function(){
 *         return fn0()
 *     })()
 * })
 * // 相当于
 * curry_simple(function(){
 *     return fn0()
 * })
 * 
 * 
 * 当执行 fn1()()()时, 函数返回:
 * // 跟 fn1()() 的分析过程一样
 * curry_simple(function(){
 *     return fn0()
 * })
 * 
 * 
 * 当执行 fn1()()()()时, 因为此时 length > 2 为false, 所以执行fn():
 * fn()
 * // 相当于
 * (function(){
 *    return fn0()
 * })()
 * // 相当于
 * fn0()
 * // 执行 fn0 函数, 打印 1
 */


/**
 * 再回到真正的 curry 函数, 我们以下面的例子为例:
 * var fn0 = function(a,b,c,d) {
 *     return [a,b,c,d]
 * }
 * var fn1 = curry(fn0);
 * fn1("a","b")("c")("d")
 * 
 * 
 * -> 当执行 fn1("a","b")时:
 * fn1("a","b")
 * // 相当于
 * curry(fn0)("a","b")
 * // 相当于
 * curry(sub_curry(fn0,"a","b"))
 * // 相当于
 * // 注意... 只是一个示意, 表示该函数执行时传入的参数会作为 fn0 后面的参数传入
 * curry(function(...){
 *    return fn0("a","b", ...)
 * })
 * 
 * 
 * -> 当执行 fn1("a","b")("c")时, 函数返回:
 * curry(sub_curry(function(...){
 *     return fn0("a","b", ...)
 * }),"c")
 * // 相当于
 * curry(function(...){
 *     return (function(...){ return fn0("a","b", ...)})("c")
 * })
 * // 相当于
 * curry(function(...){
 *     return fn0("a","b","c", ...)
 * })
 * 
 * 
 * -> 当执行fn1("a","b")("c")("d")时, 此时 arguments.length < length 为 false,执行fn(arguments),相当于:
 * (function(...){
 *     return fn0("a","b","c", ...)
 * })("d")
 * //相当于
 * fn0("a","b","c","d")
 */


/**
 * 5. 简易实现
 * 当然,如果你觉得还是无法理解, 可以选择下面这种方式.
 */
function curry_sm(fn,args) {
    var length = fn.length;

    args = args || [];

    return function(){
        var _args = args.slice(0),arg,i;
        for(i = 0; i < arguments.length; i++){
            arg = arguments[i];
            _args.push(arg);
        }
        if(_args.length < length){
            return curry_sm.call(this,fn,_args);
        }
        else {
            return fn.apply(this,_args);
        }
    }
}

var fn2 = curry_sm(function(a,b,c) {
    console.log([a,b,c]);
});
fn2("a","b","c");
fn2("a","b")("c");
fn2("a")("b")("c");
fn2("a")("b","c");


/**
 * 6. 第三版
 * curry 函数写到这里其实已经很完善了, 但是注意这个函数的传参顺序必须是从左到右, 根据形参的顺序
 * 依次传入, 如果我不想根据这个顺序传呢?
 * 我们可以创建一个占位符,比如这样:
 * var fn = curry(function(a,b,c){
 *     console.log([a,b,c]);
 * });
 * fn("a",_,"c")("b") // ["a","b","c"]
 * 
 * 我们直接看第三版的代码:
 */
function curry_fn(fn,args,holes) {
    length = fn.length;
    args = args || [];
    holes = holes || [];

    return function() {
        
        var _args = args.slice(0),
            _holes = holes.slice(0),
            argsLen = args.length,
            holesLen = holes.length,
            arg, i, index = 0;

        for(i=0;i<arguments.length;i++){
            arg = arguments[i];
            //处理类似 fn(1, _, _, 4)(_, 3) 这种情况, index 需要指向 holes 正确的下标
            if( arg === _ && holesLen) {
                index++
                if(index > holesLen) {
                    _args.push(arg);
                    _holes.push(argsLen - 1 + index - holesLen)
                }
            }
            //处理类似 fn(1)(_) 这种情况
            else if(arg === _){
                _args.push(arg);
                _holes.push(argsLen + i);
            }
            //处理类似 fn(_, 2)(1) 这种情况
            else if(holesLen){
                // fn(_, 2)(_, 3)
                if(index >= holesLen){
                    _args.push(arg);
                }
                // fn(_, 2)(1) 用参数 1 替换占位符
                else{
                    _args.splice(_holes[index],1,arg);
                    _holes.splice(index,1)
                }
            }
            else{
                _args.push(arg);
            }
        }
        if(_holes.length || _args.length < length) {
            return curry_fn.call(this,fn,_args,_holes);
        }
        else {
            return fn.apply(this,_args);
        }
    }
}

var _ = {};
var fn = curry_fn(function (a,b,c,d,e){
    console.log([a,b,c,d,e])
});
//验证输出
fn(_,2,3,4,5)(1);
fn(1,_,3,4,5)(2);
fn(1,_,_,4)(_,4)(2)(5);