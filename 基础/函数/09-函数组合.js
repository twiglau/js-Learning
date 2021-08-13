/**
 * 需求
 * 需要写一个函数, 输入 'kevin', 返回 'HELLO,KEVIN'
 * 
 * https://github.com/mqyqingfeng/Blog/issues/45
 */

// 柯里化函数
function curry(fn, args, holes) {
    length = fn.length;

    args = args || [];

    holes = holes || [];

    return function() {

        var _args = args.slice(0),
            _holes = holes.slice(0),
            argsLen = args.length,
            holesLen = holes.length,
            arg, i, index = 0;

        for (i = 0; i < arguments.length; i++) {
            arg = arguments[i];
            // 处理类似 fn(1, _, _, 4)(_, 3) 这种情况，index 需要指向 holes 正确的下标
            if (arg === _ && holesLen) {
                index++
                if (index > holesLen) {
                    _args.push(arg);
                    _holes.push(argsLen - 1 + index - holesLen)
                }
            }
            // 处理类似 fn(1)(_) 这种情况
            else if (arg === _) {
                _args.push(arg);
                _holes.push(argsLen + i);
            }
            // 处理类似 fn(_, 2)(1) 这种情况
            else if (holesLen) {
                // fn(_, 2)(_, 3)
                if (index >= holesLen) {
                    _args.push(arg);
                }
                // fn(_, 2)(1) 用参数 1 替换占位符
                else {
                    _args.splice(_holes[index], 1, arg);
                    _holes.splice(index, 1)
                }
            }
            else {
                _args.push(arg);
            }

        }
        if (_holes.length || _args.length < length) {
            return curry.call(this, fn, _args, _holes);
        }
        else {
            return fn.apply(this, _args);
        }
    }
}
/**
 * 1. 尝试
 */
var toUpperCase = function(x){ return x.toUpperCase(); };
var hello = function(x) { return 'HELLO, ' + x;}
var greet = function(x) {
    return hello(toUpperCase(x));
}
greet('kevin');
// 还好只有两个步骤, 首先小写转大写, 然后拼接字符串, 如果有更多的操作, greet
// 函数里就需要更多的嵌套, 类似于 fn3(fn2(fn1(fn0(x))))

/**
 * 2. 优化
 * 写个 compose 函数:
 */
var compose = function(f,g) {
    return function(x) {
        return f(g(x));
    };
};
//greet 函数就可以被优化为:
var greet = compose(hello,toUpperCase);
greet('lucy');
//利用 compose 将两个函数组合成一个函数, 让代码从右向左运行, 而不是由内而外运行, 可
//读性大大提升. 这便是函数组合.

//但是现在的 compose函数也只是支持两个参数, 如果有更多的步骤呢? 
// compose(d, compose(c, compose(b,a)))
//为什么不写一个 compose 函数支持传入多个函数?
// compose(d,c,b,a)

/**
 * 3. compose
 * 直接看 underscore 的 compose 函数的实现:
 */
function compose02(){
    var args = arguments;
    var start = args.length - 1;
    return function() {
        var i = start;
        var result = args[start].apply(this,arguments);
        while(i--) result = args[i].call(this,result);
        return result;
    };
};
//测试
var greet02 = compose02(hello,toUpperCase)
greet02('lilian');

//现在的 compose 函数已经可以支持多个函数了,然而有了这个又有什么用?
//在此之前, 我们先了解一个概念叫做 pointfree.
//pointfree 指的是函数无须提及将要操作的数据是什么样的. 依然是以最初的需求为例:
// 需求: 输入 'kevin', 返回 'HELLO, KEVIN'
// 非 pointfree, 因为提到了数据: name

/**
 * 4. pointfree
 * pointfree 指的是函数无须提及将要操作的数据是什么样的. 依然是以最初的需求为例:
 */
//需求: 输入 'kevin', 返回 'HELLO,KEVIN'.
//非 pointfree, 因为提到了数据: name
var greet = function(name){
    return ('hello' + name).toLowerCase();
}
// pointfree
// 先定义基本运算, 这些可以封装起来复用
var toUpperCase = function(x) { return x.toUpperCase();};
var hello = function(x) { return 'HELLO, ' + x;};
var greet = compose02(hello,toUpperCase);
greet02('kevin');

//我们再举个稍微复杂一点的例子, 为了方便书写,需要借助在<函数柯里化> 中写到的
//curry 函数:

// 需求: 输入 'kevin daisy kelly', 返回 'K.D.K'

// -> 非 pointfree, 因为提到了数据: name
var initials = function (name) {
    return name.split(' ').map(compose02(toUpperCase,head)).join('. ');
};

// ->pointfree 先定义基本运算

