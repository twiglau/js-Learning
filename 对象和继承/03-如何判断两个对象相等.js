/**
 * 判断两个对象相等, 实际上, 我们要做到的是如何判断两个参数相等,
 * 而这必然会涉及到多种类型的判断.
 */

/**
 * 1. 相等
 * 什么是相等? 我们认为只要 === 的结果为 true, 两者就相等, 然而今天我们会
 * 重新定义相等:
 * 
 * 我们认为:
 * > 1. NaN 和 NaN 是相等
 * > 2. [1] 和 [1] 是相等
 * > 3. {value:1} 和 {value:1} 是相等
 * 
 * 不仅仅是这些长得一样的,还有
 * > 1. 1 和 new Number(1)是相等
 * > 2. 'Curly' 和 new String('Curly')是相等
 * > 3. true 和 new Boolean(true)是相等
 * 更复杂的我们会在接下俩的内容中看到.
 */

/**
 * 2. 目标
 * 我们的目标是写一个 eq 函数用来判断两个参数是否相等, 使用效果如下:
 * function eq(a,b) { ... }
 * var a = [1];
 * var b = [1];
 * console.log(eq(a,b)) //true
 * 在写这个看似很简单的函数之前, 我们首先了解在一些简单的情况下是如何判断的?
 */

/**
 * 3. +0 与 -0
 * 如果 a === b 的结果为true, 那么a和b就是相等的吗? 一般情况下, 当然是这样的,但是有一个特殊的例子,就是
 * +0 和 -0.
 * JavaScript "处心积虑" 的想抹平两者的差异:
 */
//表现1
console.log(+0 === -0); //true
//表现2
console.log((-0).toString()) // '0'
console.log((+0).toString()) // '0'
//表现3
console.log(-0 < +0) // false
console.log(+0 < -0) // false
//即便如此, 两者依然是不同的:
console.log(1/+0)
console.log(1/-0)
console.log( 1 / +0 === 1 / -0)
/**
 * 也许你会好奇为什么要有 +0 和 -0 呢?
 * 这是因为 JavaScript 采用了 IEEE_754 浮点数表示法(几乎所有现代编程语言所采用),这是一种二进制
 * 表示法, 按照这个标准, 最高位符号位(0 代表正, 1代表负), 剩下的用于表示大小. 而对于零这个边界值,
 * 1000(-0) 和 0000(0) 都是表示0, 这才有了正负零的区别.
 * 
 * 也许你会好奇什么时候会产生 -0 呢?
 */
console.log(Math.round(-0.1))
//那么我们又该如何在 === 结果为 true 的时候, 区别 0 和 -0 得出正确的结果呢? 我们可以这样做:
function eq(a,b){
    if(a === b) return a !== 0 || 1 / a === 1 / b;
    return false;
}
console.log(eq(0,0)) // true
console.log(eq(0,-0)) //false

/**
 * 4. NaN
 * 在本篇, 我们认为 NaN 和 NaN 是相等的, 那又该如何判断出 NaN 呢?
 */
console.log(NaN === NaN); // false
//利用 NaN 不等于自身的特性, 我们可以区别出 NaN, 那么这个 eq 函数又该怎么写那?
function eq1(a,b) {
    if( a !== a) return b !== b;
}
console.log(eq1(NaN,NaN)); //true


/**
 * 5. eq 函数
 * 现在, 我们已经可以去写 eq 函数的第一版了.
 * 
 * // eq 第一版
 * // 用来过滤简单的类型比较, 复杂的对象使用 deepEq 函数进行处理
 */
function eq2(a,b) {

    // === 结果为 true 的区别出 +0 和 -0
    if(a === b) return a !== 0 || 1/a === 1/b;

    // typeof null 的结果为 object, 这里做判断, 是为了让有 null 的情况尽早退出函数
    if(a == null || b == null) return false;

    // 判断 NaN
    if(a !== a) return b !== b;

    // 判断参数 a 类型, 如果是基本类型, 在这里可以直接返回 false
    var type = typeof a;
    if(type !== 'function' && type !== 'object' && typeof b != 'object') return false;

    //更复杂的对象使用 deepEq 函数进行深度比较
    return deepEq(a,b);
}
/**
 * 也许你会好奇是不是少了一个 typeof b !== function ?
 * 试想如果我们添加上了这句, 当 a 是基本类型, 而 b 是函数的时候, 就会进入 deepEq 函数, 而去掉这一句,
 * 就会进入直接进入 false, 实际上 基本类型 和 函数 肯定是不会相等的, 所以这样做代码又少, 又可以让一
 * 种情况更早退出.
 */


/**
 * 6. String 对象
 * 现在我们开始写 deepEq 函数, 一个要处理的重大难题就是 'Curly' 和 new String('Curly')如何
 * 判断成相等?
 * 
 * 两者的类型都不一样的, 不信我们看 typeof 的操作结果:
 */
console.log( typeof 'Curly'); //string
console.log(typeof new String('Curly')); //object

//还有另中判断方法:
var toString = Object.prototype.toString;
console.log(toString.call('Curly')); // "[object String]"
console.log(toString.call(new String('Curly'))); // "[object String]"
/**
 * 神奇的是使用 toString 方法两者判断的结果却是一致的, 可是就算知道了这一点, 还是不知道如何判断
 * 字符串 和 字符串包装对象是相等的呢?
 * 
 * 那我们利用隐式类型转换呢?
 */
console.log('Curly' + '' === new String('Curly') + '');
//看来我们已经有了思路: 如果 a 和 b 的Object.prototype.toString的结果一致, 并且都是 "[object String]",
//那我们就使用 '' + a === '' + b 进行判断.
//可是不止有 String 对象呐, Boolean,Number,RegExp,Date呢?

/**
 * 7. 更多对象
 * 跟 String 同样的思路, 利用隐式类型转换.
 */

//Boolean
var a = true;
var b = new Boolean(true);
console.log(+a === +b) //true

//Date
var a = new Date(2009,9,25);
var b = new Date(2009,9,25);
console.log(+a === +b) //true

//RegExp
var a = /a/i;
var b = new RegExp(/a/i);
console.log( '' + a === '' + b) //true

//Number
var a = 1;
var b = new Number(1);
console.log(+a)
console.log(+b)
console.log(+a === +b) //true
//但是,你确定Number能这么简单的判断?
var a = Number(NaN);
var b = Number(NaN);
console.log(+a === +b); //false
//理论上 a 和 b 应该被判断成true~
//那么我们就改成这样:
function eq3(){
    //判断 Number(NaN) Object(NaN) 等情况
    if(+a !== +a) return +b !== +b;
    //其他判断 ...
}
console.log(eq3(a,b)); //true


/**
 * 8. deepEq 函数
 * 现在我们可以写一点 deepEq 函数了.
 */
var toString = Object.prototype.toString;
function deepEq(a,b) {
    var className = toString.call(a);
    if(className !== toString.call(b)) return false;

    switch(className) {
        case '[object RegExp]':
        case '[object String]':
            return '' + a === '' + b;
        case '[object Number]':
            if(+a !== +a) return +b !== +b;
            return +a === 0 ? 1 / +a === 1 / b : +a === +b;
        case '[object Date]':
        case '[object Boolean]':
            return +a === +b;
    }

    // 其他判断
}

/**
 * 9. 构造函数实例
 * 如下例子:
 */
function Person(name){
    this.name = name;
}
function Animal(name){
    this.name = name;
}
var person = new Person('Kevin');
var animal = new Animal('Kevin');
console.log(eq2(person,animal));
/**
 * 虽然 person 和 animal 都是 {name: 'Kevin'}, 但是 person 和 animal 属于不同构造
 * 函数的实例, 为了做出区分, 我们认为是不同的对象.
 * 
 * 如果两个对象所属的构造函数对象不同, 两个对象就一定不相等?
 * 并不一定, 我们再举个例子:
 */
var attrs = Object.create(null);
attrs.name = "Bob";
console.log(eq2(attrs,{name: "Bob"}));
//尽管 attrs 没有原型, {name: "Bob"} 的构造函数是 Object, 但是在实际应用中, 只要它们有着
//相同的键值对, 我们依然认为是相等.
function isFunction(obj) {
    return toString.call(obj) ==='[object Function]'
}
function deepEq2(a,b) {
    // 接着上面的内容
    var areArrays = className === '[object Array]';
    //不是数组
    if(!areArrays) {
        //过滤掉两个函数的情况
        if(typeof a != 'object' || typeof b != 'object') return false;

        var aCtor = a.constructor,bCtor = b.constructor;
        // aCtor 和 bCtor 必须都存在并且都不是 Object 构造函数的情况下,
        // aCtor 不等于 bCtor, 那这两个对象就真的不相等
        if(aCtor !== bCtor&& 
          !(isFunction(aCtor) && aCtor instanceof aCtor && isFunction(bCtor) && bCtor instanceof bCtor)&&
          ('constructor' in a && 'constructor' in b)
        ){
            return false;
        }
    }
    // 下面还有很多判断
}

/**
 * 10 .数组相等
 * 现在终于可以进入我们期待已久的数组和对象的判断, 不过其实这个很简单,
 * 就是递归遍历一遍.....
 */
function deepEq3(a,b) {
    //再接着上面的内容
    if(areArrays) {

        length = a.length;
        if(length !== b.length) return false;

        while(length--){
            if(!eq(a[length],b[length])) return false;
        }
    }
    else {
        var keys = Object.keys(a),key;
        length = keys.length;

        if(Object.keys(b).length !== length) return false;
        while(length--){
            key = keys[length];
            if(!(b.hasOwnProperty(key) && eq(a[key],b[key]))) return false;
        }
    }
    return true;
}


/**
 * 11. 循环引用
 * 循环引用问题?
 * 举个简单的例子:
 * a = {abc:null};
 * b = {abc:null};
 * a.abc = a;
 * b.abc = b;
 * 
 * 再复杂一点的,比如:
 * a = {foo: {b: {foo: {c: {foo: null}}}}};
 * b = {foo: {b: {foo: {c: {foo: null}}}}};
 * a.foo.b.foo.c.foo = a;
 * b.foo.b.foo.c.foo = b;
 * eq(a,b)
 * 
 * 为了给大家演示下循环引用, 大家可以把下面这段已经精简过的代码复制到浏览器中尝试:
 */
// demo
var a, b;

a = { foo: { b: { foo: { c: { foo: null } } } } };
b = { foo: { b: { foo: { c: { foo: null } } } } };
a.foo.b.foo.c.foo = a;
b.foo.b.foo.c.foo = b;

function eq(a, b, aStack, bStack) {
    if (typeof a == 'number') {
        return a === b;
    }

    return deepEq(a, b)
}

function deepEq(a, b) {

    var keys = Object.keys(a);
    var length = keys.length;
    var key;

    while (length--) {
        key = keys[length]

        // 这是为了让你看到代码其实一直在执行
        console.log(a[key], b[key])

        if (!eq(a[key], b[key])) return false;
    }

    return true;

}

eq(a, b)




//最终的 eq 函数:
var toString = Object.prototype.toString;

function isFunction(obj) {
    return toString.call(obj) === '[object Function]'
}

function eq(a, b, aStack, bStack) {

    // === 结果为 true 的区别出 +0 和 -0
    if (a === b) return a !== 0 || 1 / a === 1 / b;

    // typeof null 的结果为 object ，这里做判断，是为了让有 null 的情况尽早退出函数
    if (a == null || b == null) return false;

    // 判断 NaN
    if (a !== a) return b !== b;

    // 判断参数 a 类型，如果是基本类型，在这里可以直接返回 false
    var type = typeof a;
    if (type !== 'function' && type !== 'object' && typeof b != 'object') return false;

    // 更复杂的对象使用 deepEq 函数进行深度比较
    return deepEq(a, b, aStack, bStack);
};

function deepEq(a, b, aStack, bStack) {

    // a 和 b 的内部属性 [[class]] 相同时 返回 true
    var className = toString.call(a);
    if (className !== toString.call(b)) return false;

    switch (className) {
        case '[object RegExp]':
        case '[object String]':
            return '' + a === '' + b;
        case '[object Number]':
            if (+a !== +a) return +b !== +b;
            return +a === 0 ? 1 / +a === 1 / b : +a === +b;
        case '[object Date]':
        case '[object Boolean]':
            return +a === +b;
    }

    var areArrays = className === '[object Array]';
    // 不是数组
    if (!areArrays) {
        // 过滤掉两个函数的情况
        if (typeof a != 'object' || typeof b != 'object') return false;

        var aCtor = a.constructor,
            bCtor = b.constructor;
        // aCtor 和 bCtor 必须都存在并且都不是 Object 构造函数的情况下，aCtor 不等于 bCtor， 那这两个对象就真的不相等啦
        if (aCtor !== bCtor && !(isFunction(aCtor) && aCtor instanceof aCtor && isFunction(bCtor) && bCtor instanceof bCtor) && ('constructor' in a && 'constructor' in b)) {
            return false;
        }
    }


    aStack = aStack || [];
    bStack = bStack || [];
    var length = aStack.length;

    // 检查是否有循环引用的部分
    while (length--) {
        if (aStack[length] === a) {
            return bStack[length] === b;
        }
    }

    aStack.push(a);
    bStack.push(b);

    // 数组判断
    if (areArrays) {

        length = a.length;
        if (length !== b.length) return false;

        while (length--) {
            if (!eq(a[length], b[length], aStack, bStack)) return false;
        }
    }
    // 对象判断
    else {

        var keys = Object.keys(a),
            key;
        length = keys.length;

        if (Object.keys(b).length !== length) return false;
        while (length--) {

            key = keys[length];
            if (!(b.hasOwnProperty(key) && eq(a[key], b[key], aStack, bStack))) return false;
        }
    }

    aStack.pop();
    bStack.pop();
    return true;

}

console.log(eq(0, 0)) // true
console.log(eq(0, -0)) // false

console.log(eq(NaN, NaN)); // true
console.log(eq(Number(NaN), Number(NaN))); // true

console.log(eq('Curly', new String('Curly'))); // true

console.log(eq([1], [1])); // true
console.log(eq({ value: 1 }, { value: 1 })); // true

var a, b;

a = { foo: { b: { foo: { c: { foo: null } } } } };
b = { foo: { b: { foo: { c: { foo: null } } } } };
a.foo.b.foo.c.foo = a;
b.foo.b.foo.c.foo = b;

console.log(eq(a, b)) // true
