/**
 * 类型判断在web开发中有非常广泛的应用,简单的有:
 * 判断数字还是字符串, 进阶一点的有判断数组还是对象,
 * 再进阶一点的有判断日期,正则,错误类型.
 * 再进阶一点还有比如判断 plainObject,空对象,Window对象等等.
 */

/**
 * 1. typeof
 * 我们最常用的莫过于typeof,注意,尽管我们会看到诸如:
 */
console.log(typeof('yayu')) //string
//的写法,但是typeof可是一个正宗的运算符,就跟加减乘除一样!,这就能解释
//为什么下面这种写法也是可行的:
console.log(typeof 'yayu') //string
//引用<JavaScript权威指南>中对 typeof 的介绍:
// -> typeof 是一元操作符,放在其单个操作数的前面,操作数可以是任意类型.
//    返回值为表示操作数类型的一个字符串

/**
 * 我们都知道,在ES6前, JavaScript共6种数据类型,分别是:
 * Undefined, Null, Boolean, Number, String, Object
 * 然而当我们使用 typeof 对这些数据类型的值进行操作的时候,返回的结果却不
 * 是一一对应,分别是:
 * undefined, object, boolean, number, string, object
 * 注意以上都是小写的字符串. Null 和 Object 类型都返回了 object 字符串
 * 
 * 尽管不能一一对应,但是 typeof 却能检测出函数类型:
 */
function a() {}
console.log(typeof a);// function

//所以 typeof 能检测出六种类型的值,但是,除此之外Object下还有很多细分的类型,
//如 Array, Function, Date, RegExp, Error 等.
//如果用typeof去检测这些类型,如下:
var date = new Date();
var error = new Error();
console.log(typeof date); //object
console.log(typeof error); //object
//返回的都是object, 该怎么区分

/**
 * 2. Object.prototype.toString
 * 为了更加细致的讲解这个函数,让我先献上ES5规范地址:
 * https://es5.github.io/#x15.2.4.2
 * 
 * 在第15.2.4.2 小节讲的就是 Object.prototype.toString(),为了不误导大家,
 * 我先奉上英文版:
 * When the toString method is called, the following steps are taken:
 *  -If the this value is undefined, return "[object Undefined]".
 *  -If the this value is null, return "[object Null]".
 *  -Let O be the result of calling ToObject passing the this value as the argument.
 *  -Let class be the value of the [[Class]] internal property of O.
 *  -Return the String value that is the result of concatenating the three Strings "[object ", class, and "]".
 * 
 * 凡是规范上加粗或者斜体的,在这里我也加粗或者斜体
 * 如果没有看懂,就不防看看我的理解的,
 * 当toString方法被调用的时候,下面的步骤会被执行:
 * 1. 如果 this 值是undefined, 就返回 [object Undefined]
 * 2. 如果 this 的值是null, 就返回 [object Null]
 * 3. 让 O 成为 ToObject(this) 的结果
 * 4. 让 class 成为 O 的内部属性 [[Class]] 的值
 * 5. 最后返回有 "[object" 和 class 和 "]" 三个部分组成的字符串
 * 
 * 通过规范,我们至少知道了调用 Object.prototype.toString 会返回一个由
 * "[object" 和 class 和 "]" 组成的字符串, 而 class 是要判断的对象的
 * 内部属性.
 * 
 * 让我们写个demo:
 */
console.log(Object.prototype.toString.call(undefined))// [object Undefined]
console.log(Object.prototype.toString.call(null))// [object Null]
var date = new Date();
console.log(Object.prototype.toString.call(date)) // [object Date]
/**
 * 由此我们可以看到这个class值就是识别对象类型的关键!
 * 正式因为这种特性,我们可以用Object.prototype.toString方法识别出更多类型!
 * 如下:
 * //以下是11种:
 */
var number = 1;              // [object Number]
var string = '123';          // [object String]
var boolean = true;          // [object Boolean]
var und = undefined;         // [object Undefined]
var nul = null;              // [object Null]
var obj = {a:1}              // [object Object]
var array = [1,2,3];         // [object Array]
var date = new Date();       // [object Date]
var error = new Error();     // [object Error]
var reg = /a/g;              // [object RegExp]
var func = function a(){};   // [object Function]

function checkType() {
    for(var i=0; i<arguments.length;i++){
        console.log(Object.prototype.toString.call(arguments[i]))
    }
}
checkType(number,string,boolean,und,nul,obj,array,date,error,reg,func);

//除了以上11种之外,还有:
console.log(Object.prototype.toString.call(Math)); // [object Math]
console.log(Object.prototype.toString.call(JSON)); // [object JSON]
//除了以上13种之外,还有:
function a(){
    console.log(Object.prototype.toString.call(arguments)); // [object Arguments]
}
a();
//所以我们可以识别至少14种类型,当然我们也可以算出来, [[class]] 属性至少有12个.

/**
 * 3. type API
 * 既然有了Object.prototype.toString 这个神奇! 那就让我们写个 type 函数帮助我们
 * 以后识别各种类型的值吧?
 * 设想:
 * 写一个type函数能检测各种类型的值,如果是"基本类型",就使用 typeof, "引用类型"就使用 toString.
 * 此外鉴于 typeof 的结果是小写,我也希望所有的结果都是小写.
 * 考虑到实际情况下并不会检测 Math 和 JSON, 所以去掉这两个类型的检测.
 * 
 * 我们来写一版代码:
 */

//第一版
var class2type = {};
//生成class2type映射
"Boolean Number String Function Array Date RegExp Object Error Null Undefined".split(" ").map(
    function(item,index){
        class2type["[object " + item + "]"] = item.toLowerCase();
    }
)
function type01(obj){
    return typeof obj === "object" || typeof obj === "function" ?
      class2type[Object.prototype.toString.call(obj)] || "object" : typeof obj;
}
//嗯,看起来很完美,但是,在IE6中,null和undefined会被Object.prototype.toString识别成
//[object Object]
//考虑到这个兼容性问题,需要再改进下type
function type02(obj){
    //一箭双雕
    if(obj == null){
        return obj + "";
    }
    return typeof obj === "object" || typeof obj === "function" ?
         class2type[Object.prototype.toString.call(obj)] || "object" :
         typeof obj;
}

/**
 * 4. isFunction
 * 有了type函数后,我们可以对常用的判断直接封装,比如
 */
function isFunction(obj) {
    return type02(obj) === "function";
}
/**
 * 5.数组
 * jQuery判断数组类型,旧版本是通过判断Array.isArray 方法是否存在, 如果存在就使用该方法,
 * 不存在就使用 type 函数.
 */
var isArray = Array.isArray || function(obj) {
    return type02(obj) === "array";
}
//但是在jQuery v3.0 中已经完全采用了 Array.isArray.
/**
 * 到此,类型判断的上篇就结束了,我们已经可以判断日期,正则,错误类型啦,但是还有更复杂的判断比如:
 * plainObject, 空对象, Window对象, 类数组对象等.
 * 关于这个type函数是 jQuery,https://github.com/jquery/jquery/blob/ac9e3016645078e1e42120822cfb2076151c8cbe/src/core.js#L269
 */

/**
 * 问题:
 * 1. 这里后面object在什么情况下会发生 ?
 * class2type[Object.prototype.toString.call(obj)] || "object"
 * 答:
 * 比如说ES6新增的Symbol,Map,Set等类型,它们并不在class2type列表中,所以使用type函数,返回的
 * 结果是object
 * 
 * 2. 判定方法?
 * > typeof
 * > constructor
 * > instanceof
 * > Object.prototype.toString
 * 对于数组类型,还有Array.isArray 可以用于判断
 * 
 * 3. 参考类型判断下一篇,里面讲到window的时候,用一段 obj === obj.window.
 * js对象还能用 === 来判断吗? 测试了下,发现,如 window,location,history 这样的浏览器
 * 的相关的对象, Object.prototype.toString.call 方法都是单独识别出来...
 * 这还是头一次发现,而且他们全部能通过 === 来自身相等,当然这一点应该是因为内存中这些浏览器相关对象
 * 都只有一份的原因.
 * 
 * 相关知识点:
 * js中的 === 并非对所有引用类型的数据进行判断时都为 false, 对于那些接近 "单例" 形式的对象,是可以和
 * 自身相等的.
 * 
 * 以下是测试:
 */
console.log(Object.prototype.toString.call(location)) // "[object Location]"
console.log(Object.prototype.toString.call(history))  // "[object History]"
//以上测试,它们跟自身相等是因为引用是相同的吧,就像:
var obj = {};
console.log(obj === obj) //true

/**
 * 4. Object.toString.call([])为什么报错?
 * 答:
 * Object.toString 是将Object作为一个对象访问,Object自身没有属性toString,toString在
 * Object的原型链上, Object.__proto__ === Function.prototype, toString是
 * Function.prototype 的一个属性
 * 
 * 以下为测试:
 */
console.log(Object.prototype.hasOwnProperty('toString'))
console.log(Object.hasOwnProperty('toString'))
console.log(Object.__proto__ === Function.prototype)
console.log(Function.prototype.hasOwnProperty('toString'))
/**
 * 对于以上,MDN中说, Function对象覆盖了从Object继承来的Object.prototype.toString方法. 函数
 * 的toString方法会返回一个表示函数源代码的字符串. 具体来说,包括function关键字,形参列表,大括号,
 * 以及函数体中的内容,若 this 不是 Function 对象, 则 toString() 方法将抛出 TypeError 异常
 */
console.log(Function.prototype.toString.call('aaa'))