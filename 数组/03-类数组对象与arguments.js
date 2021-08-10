/**
 * 一, 类数组对象
 * > 拥有一个 length 属性和若干索引属性的对象
 * 举个例子:
 */
var array = ['name','age','sex'];
var arrayLike = {
    0:'name',
    1:'age',
    2:'sex',
    length:3
}
/**
 * 即便如此, 为什么叫做类数组对象呢?
 * 那让我们从读写,获取长度, 遍历三个方面看看这两个对象.
 * 
 * 读写
 */
console.log(array[0]);
console.log(arrayLike[0]);

array[0] = 'new name';
arrayLike[0] = 'new name';

//长度
console.log(array.length);
console.log(arrayLike.length);

//遍历
for(var i = 0,len = array.length; i < len; i++) {
    console.log(array[i])
}
for(var i = 0,len = arrayLike.length; i < len; i++){
    console.log(arrayLike[i])
}

//是不是很像?
//那类数组对象可以使用数组的方法吗?比如:
// arrayLike.push('4');
//arrayLike.push is not a function


/**
 * 二, 调用数组方法
 * 如果类数组就是任性的想用数组的方法怎么办呢?
 * 既然无法直接调用, 我们可以用 Function.call 间接调用:
 */
var arrayLike = {0:'name',1:'age',2:'sex',length:3}
Array.prototype.join.call(arrayLike,'&'); //name&age&sex
Array.prototype.slice.call(arrayLike,0); // ["name","age","sex"]
// slice 可以做到类数组 转 数组

Array.prototype.map.call(arrayLike, function(item) {
    return item.toUpperCase();
}); // ["NAME","AGE","SEX"]


/**
 * 三, 类数组转数组
 * 在上面的例子中已经提到了一种类数组转数组的方法, 再补充三个:
 */
var arrayLike = {0:'name',1:'age',2:'sex',length:3}
//1. slice
Array.prototype.slice.call(arrayLike); // ["name","age","sex"]
//2. splice
Array.prototype.splice.call(arrayLike,0); // ["name","age","sex"]
//3. ES6 Array.from
Array.from(arrayLike); // ["name","age","sex"]
//4. apply
Array.prototype.concat.apply([],arrayLike)
/**
 * 那么为什么会讲到类数组对象呢? 以及类数组有什么应用吗?
 * 要说到类数组对象, Arguments 对象就是一个类数组对象, 在客户端 JavaScript 中,
 * 一些 DOM 方法 (document.getElementsByTagName() 等)也返回类数组对象.
 * 
 * 举个例子:
 */
function  foo(name,age,sex) {
    console.log(arguments);
}
foo('name','age','sex')
//我们可以看到除了类数组的索引属性 和 length 属性之外, 还有一个 callee 属性, 接下
//来我们一个一个介绍.

/**
 * 1. length 属性
 * Arguments 对象的 length 属性, 表示实参的长度, 举个例子:
 */
function foo1(a,b,c) {
    console.log("实参的长度为: " + arguments.length)
}
console.log("形参的长度为: " + foo1.length)
foo1(1)

/**
 * 2. callee 属性
 * Arguments 对象的 callee 属性, 通过他可以调用函数自身.
 * 讲个闭包经典面试题 使用 callee 的解决方法:
 */
var data = [];
for(var i=0; i < 3; i++) {
    (data[i] = function(){
        console.log(arguments.callee.i)
    }).i = i;
}

data[0]();
data[1]();
data[2]();

/**
 * 四, arguments 和 对应参数的绑定
 */
function foo2(name,age,sex,hobbit) {
    console.log(name,arguments[0]); // name name

    // 改变形参
    name = "new name";

    console.log(name,arguments[0]); // new name new name

    //改变 arguments
    arguments[1] = "new age";

    console.log(age,arguments[1]); // new age new age

    //测试未传入的是否会绑定
    console.log(sex); // undefined

    sex = "new sex";

    console.log(sex,arguments[2]); // new sex undefined

    arguments[3] = "new hobbit";

    console.log(hobbit,arguments[3]); // undefined new hobbit
}
foo2("name","age")
/**
 * 以上, 传入的参数, 实参和arguments的值会共享, 当没有传入时, 实参与
 * arguments 值不会共享
 * 
 * 除此之外, 以上是在非严格模式下, 如果是在严格模式下, 实参和arguments
 * 是不会共享的.
 */

/**
 * 五, 传递参数
 * 将参数从一个函数传递到另一个函数
 */
// 使用 apply 将 foo 的参数传递给 bar
function foo3(){
    bar1.apply(this,arguments);
}
function bar1(a,b,c) {
    console.log(a,b,c)
}
foo3(1,2,3);

//强大的 ES6
//使用ES6的 ... 运算符, 我们可以轻松转成数组.
function func(...arguments){
    console.log(arguments); // [1,2,3]
}
func(1,2,3);

/**
 * 六, 应用
 * arguments 的应用其实很多, 在下个系列, 也就是 JavaScript 专题系列中, 我们会在
 * jQuery 的 extend 实现, 函数科里化, 递归等场景看见 arguments 的身影.
 * 
 * 应用场景:
 * > 1. 参数不定长
 * > 2. 函数柯里化
 * > 3. 递归调用
 * > 4. 函数重载
 * ...
 */


/**
 * 问题1: 
 * (data[i] = function(){
 *    console.log(arguments.callee.i)
 * }).i = i; 
 * 
 * 这个是什么用法?
 *
 * 答:
 * 举例
 * var fun1 = function(){}
 * fun1.test = 'test';
 * console.log(fun1.test)
 * > 函数也是一种对象, 我们可以通过这种方式给函数添加一个自定义的属性.
 * > 这个解决方式就是给 data[i] 这个函数添加一个自定义属性, 这个属性值
 *   就是 正确的 i 值.
 */

/**
 * 类数组检测  [JavaScript权威指南]
 */
function isArrayLike(o){
    if (o &&                                   // o is not null, undefined,etc.
        typeof o === 'object' &&               // o is an object
        isFinite(o.length) &&                  // o.length is a finite number
        o.length >= 0 &&                       // o.length is non-negative
        o.length===Math.floor(o.length) &&     // o.length is an integer
        o.length < 2^32                        // o.length < 2^32
       )
       return true;                            // Then o is array-like                   
    else 
       return false;                           // Otherwise it is not
}

/**
 * > 1. arguments 的长度只与实参的个数有关, 与形参定义的个数没有直接关系.
 * > 2. arguments 有一个 Symbol(Symbol.iterator) 属性这个表示该对象是 可迭代的
 *      https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of
 * 
 * > 3. 字符串可以像类数组一样操作是因为 js 自动包装成String对象的原因, String对象按照上面
 * 检测函数也是类数组对象. 不过因为本身值不能被改变, 所以给指定下标值不会改变.
 */

/**
 * jQuery 的实现:
 */

/**
 * underscore 实现:
 */