function log(date, type, message) {
    console.log(`[${date.getHours()}:${date.getMinutes()}][${type}]:[${message}]`)
}

function add(x, y, z) {
    x = x + 2
    y = y * 2
    z = z * 2
    return x + y + z 
}

function sum(m, n) {
    return m + n
}

// 柯里化函数的实现 hyCurrying
function hyCurrying(fn) { // 函数对象的Length属性,就是该函数的参数的个数
    function curried(...args) {
        // 判断 当前已经接收的参数的个数,和参数本身需要接收的参数是否一致了
        // 1. 当已经传入的参数 大于等于 需要的参数时, 就执行函数
        if(args.length >= fn.length) {
            // fn.call(this, ...args)
            return fn.apply(this, args) // apply this 绑定
        }else{
            // 没有达到个数时, 需要返回一个新的函数, 继续来接收参数
            function curried2(...args2) {
                // 接收到参数后, 需要递归调用 curried 来检查函数的个数是否达到
                return curried.apply(this, args.concat(args2))
            }
            return curried2
        }
    }
    return curried
}

var curryAdd = hyCurrying(add)

var res1 = curryAdd(10, 20)(30)
var res2 = curryAdd(10)(20)(30)
console.log(res1, res2)


function foo(x, y, z) {
    return x + y + z 
}

foo.call({}, 1, 2, 3)

var curryFoo = hyCurrying(foo)
curryFoo.call({}, 1)