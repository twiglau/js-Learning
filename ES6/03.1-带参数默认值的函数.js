/**
 * 带参数默认值的函数
 * JS函数的独特之处是可以接受任意数量的参数,而无视函数声明处的参数数量.这让你定义的函数可以使用
 * 不同的参数数量来调用,调用时未提供的参数经常会使用默认值来代替.
 * 本章将介绍默认的参数值在ES6之中以及之前是如何实现的,顺带介绍的内容还有:
 * arguments 对象的一些重要信息,将表达式作为参数使用,以及另一种TDZ.
 */

/**
 * 1.1 在ES5 中模拟参数默认值
 * 在ES5或更早的版本中,你可能会使用下述模式来创建带有参数默认值的函数:
 */
function makeRequest(url,timeout,callback){
    timeout = timeout || 2000;
    callback = callback || function() {};

    //函数的剩余部分
}
/**
 * 在本例中,timeout 与 callback 实际上都是可选参数,因为他们都会在参数未被提供的情况下使用默认值.
 * 逻辑或运算符( || )在左侧的值为假的情况下总会返回右侧的操作数. 由于函数的具名参数在未被明确提供
 * 时会是 undefined, 逻辑或运算符就经常被用来给缺失的参数提供默认值.
 * 不过此方法有个瑕疵,此处的 timeout 的有效值实际上有可能是 0, 但因为 0 是假值,就会导致 timeout
 * 的值在这种情况下会被替换为 2000.
 * 
 * 在这种情况下,更安全的替代方式是使用 typeof 来检测参数的类型,正如下例:
 */
function makeRequest_fixed(url,timeout,callback){
    timeout = (typeof timeout !== "undefined") ? timeout : 2000;
    callback = (typeof callback !== "undefined") ? callback : function() {};
}
//虽然这种方法更安全,但依然为实现一个基本需求而书写了过多的代码. 它代表了一种公共模式,而流行
//的 JS库中都充斥着类似的模式.

/**
 * 1.2 ES6中的参数默认值
 * ES6 能更容易地为参数提供默认值,它使用了初始化形式,以便在参数未被正式传递进来时使用,例如:
 */
function makeRequest_fixed_02(url,timeout = 2000,callback = function(){}){
    //函数的剩余部分
}
//此函数只要求第一个参数始终要被传递. 其余两个参数则都有默认值,这使得函数体更为小巧,因为不需要
//再添加更多代码来检查缺失的参数值.
//如果使用全部三个参数来调用 makeRequest(),那么默认值将不会被使用,例如:

//使用默认的 timeout 与 callback
makeRequest_fixed_02("/foo");

//使用默认的 callback
makeRequest_fixed_02("/foo",500);

//不使用默认值
makeRequest_fixed_02("/foo",500,function(body){
    doSomething(body);
})
//ES6会认为 url 参数是必须的,这就是三次调用 makeRequest() 都传入了 "/foo" 的原因.
//而拥有默认值的两个参数都被认为是可选的.

//在函数声明中能指定任意一个参数的默认值,即使该参数排在为指定默认值的参数之前也是可以的.
//例如,下面这样是可行的:
function makeRequest(url,timeout = 2000,callback){
    //函数的剩余部分
}
//在本例中,只有在未传递第二个参数, 或明确将第二个参数值指定为 undefined时, timeout
//的默认值才会被使用,例如:

//使用默认的 timeout
makeRequest("/foo",undefined,function(body){
    doSomething(body);
});
//使用默认的 timeout
makeRequest("/foo");
//不使用默认值
makeRequest("/foo",null,function(body){
    doSomething(body);
})
//在关于参数默认值的这个例子中, null值被认为是有效的,意味着对于 makeRequest()的第三次调用
//并不会使用 timeout 的默认值.



/**
 * 1.3 参数默认值如何影响 arguments 对象
 * 需要记住的是, arguments 对象会在使用参数默认值时有不同的表现. 在ES5的非严格模式下,
 * arguments 对象会反映出具名参数的变化. 以下代码说明了该工作机制.
 */
function mixArgs(first,second){
    console.log(first === arguments[0]);
    console.log(second === arguments[1]);
    first = "c";
    second = "d";
    console.log(first === arguments[0]);
    console.log(second === arguments[1]);
}
// mixArgs("a","b");
//输出: true, true, true, true

/**
 * 在非严格模式下, arguments 对象总是会被更新以反映出具名参数的变化. 因此当 first 与 second 变量
 * 被赋予新值时, arguments[0] 与 arguments[1] 也就相应地更新了, 使得这里所有的 === 比较的结果
 * 都为 true .
 * 
 * 然而在ES5的严格模式下, 关于 arguments 对象的这种混乱情况被消除了,它不再反映出具名参数的变化.在
 * 严格模式下重新使用上例中的函数:
 */
function mixArgs(first,second){
    "use strict";

    console.log(first === arguments[0]);
    console.log(second === arguments[1]);
    first = "c";
    second = "d";
    console.log(first === arguments[0]);
    console.log(second === arguments[1]);
}
// mixArgs("a","b");
//输出: true, true, false, false
/**
 * 这一次更改 first 与 second 就不会再影响 arguments 对象,因此输出结果符合通常的期望.
 * 然而在使用 ES6 参数默认值的函数中, arguments 对象的表现总是会与 ES5 的严格模式一致,
 * 无论此时函数是否明确运行在严格模式下. 参数默认值的存在触发了 arguments 对象与具名参
 * 数的分离. 这是个细微但重要的细节,因为 arguments 对象的使用方式发生了变化,研究如下代码:
 */
function mixArgs(first,second = "b"){
    console.log(arguments.length);
    console.log(first === arguments[0]);
    console.log(second === arguments[1]);
    first = "c";
    second = "d";
    console.log(first === arguments[0]);
    console.log(second === arguments[1]);
}
mixArgs("a");
//输出: 1, true, false, false, false, false
/**
 * 本例中 arguments.length 的值为 1,因为只给 mixArgs()传递了一个参数. 这也意味着
 * arguments[1] 的值是 undefined, 符合将单个参数传递给函数时的预期; 这同时意味着 first
 * 与 arguments[0] 是相等的. 改变 frist 和 second 的值不会对 arguments 对象造成影响,
 * 无论是否在严格模式下,所以你可以始终依据 arguments  对象来反映初始调用状态.
 */


/**
 * 1.4 参数默认值表达式
 * 参数默认值最有意思的特性或许就是默认值并不要求一定是基本类型的值. 例如,你可以执行一个函数来
 * 产生参数的默认值,就像这样:
 */
function getValue(){
    return 5;
}
function add(first,second = getValue()){
    return first + second;
}
console.log(add(1,1));
console.log(add(1));
/**
 * 此处若未提供第二个参数, getValue() 函数就会被调用以获取正确的默认值.需要注意的是,
 * 仅在调用 add() 函数而未提供第二个参数是, getValue() 函数才会被调用, 而在 getValue()
 * 的函数声明初次被解析时并不会进行调用. 这意味着 getValue() 函数若被写为可变的, 则它有可能
 * 会返回可变的值,例如:
 */
let value = 5;
function getValue_a(){
    return value++;
}
function add_a(first,second = getValue_a()){
    return first + second;
}
console.log(add_a(1,1)); //2
console.log(add_a(1));//6
console.log(add_a(1));//7
/**
 * 本例中 value 的初始值是 5, 并且会随着对 getValue() 的每次调用而递增. 首次调用
 * add(1) 返回的值为 6, 再次调用则返回 7, 因为 value 的值已经被增加了. 由于 second
 * 参数的默认值总是在 add() 函数被调用的情况下才被计算,因此就能随时更改该参数的值.
 * 
 * 将函数调用作为参数的默认值时需要小心,如果你泄露了括号,例如在上面例子中使用 second = getValue,
 * 你就传递了对于该函数的一个引用,而没有传递调用该函数的结构.
 * 
 * 这种行为引出了另一种有趣的能力:  可以将前面的参数作为后面参数的默认值,这里有个例子:
 */
function add(first,second = first){
    return first + second;
}
console.log(add(1,1)); //2
console.log(add(1));
/**
 * 此代码中 first 为 second 参数提供了默认值,意味着只传入一个参数会让两个参数获得相同的值,
 * 因此 add(1,1) 与 add(1) 同样返回了 2. 进一步说,你可以将 first 作为参数传递给一个函数
 * 来产生 second 参数的值,正如下例:
 */
function getValue(value){
    return value + 5;
}
function add(first,second = getValue(first)){
    return first + second;
}
console.log(add(1,1));
console.log(add(1));
/**
 * 此例将 second 的值设为等于 getValue(first) 函数的返回值,因此 add(1) 会返回 7 ( 1 + 6),
 * 而 add(1,1) 仍然返回 2.
 * 
 * 引用其他参数来为参数进行默认赋值时,仅允许禁用前方的参数,因此前面的参数不能访问后面的参数,例如:
 */
function add(first = second,second){
    return first + second;
}
console.log(add(1,1)); //2
console.log(add(undefined,1)); //抛出错误
/**
 * 调用 add(undefined,1) 发生了错误,是因为 second 在 first 之后定义,因此不能将其作为
 * 后者的默认值,要理解为何会发生这种情况,需要着重回顾 "暂时性死区".
 */

/**
 * 1.5 参数默认值的暂时性死区
 * 第一章介绍了 let 与 const 的暂时性死区(TDZ),而参数默认值同样有着无法访问特定参数的暂时性
 * 死区,与 let 声明相似,函数每个参数都会创建一个新的标识符绑定,它在初始化之前不允许被访问,否则
 * 会抛出错误. 参数初始化会在函数被调用时进行,无论是给参数传递了一个值,还是使用了参数的默认值.
 * 
 * 为了探寻参数默认值中的暂时性死区,可再次研究 "参数默认值表达式"中的例子:
 */
function getValue(value){
    return value + 5;
}
function add(first,second = getValue(first)){
    return first + second;
}
console.log(add(1,1)); //2
console.log(add(1)); //7
//调用 add(1,1) 和 add(1) 事实上执行了以下代码来创建 first 与 second 的参数值:
//JS 调用 add(1,1) 可表示为
let first = 1;
let second = 1;
//JS 调用 add(1) 可表示为
let first = 1;
let second = getValue(first);
/**
 * 当函数 add() 第一次执行是, first 与 second 的绑定被加入了特定参数的暂时性死区
 * (类似于 let 声明的行为), 因此 second 可以使用 first 来初始化, 因为此处 first
 * 总是已经完成了初始化,但反之则不行,现在再研究以下重写过的 add() 函数:
 */
function add(first = second,second){
    return first + second;
}
console.log(add(1,1)); //2
console.log(add(undefined,1)); //抛出错误
//本例中调用 add(1,1) 与 add(undefined,1) 对应着以下的后台代码:
//JS 调用 add(1,1) 可表示为
let first = 1;
let second = 1;
//JS 调用 add(1) 可表示为
let first = second;
let second = 1;
/**
 * 本例中调用 add(undefined,1)抛出了错误,是因为在 first 被初始化时 second 尚未被
 * 初始化,此处的 second 存在于暂时性死区内, 对于 second 的引用就抛出了错误. 这反映
 * 出第一章讨论过的 let 绑定的行为.
 * 
 * 函数参数拥有各自的作用域和暂时性死区,与函数体的作用域相分离,这意味着参数的默认值不允许
 * 访问在函数体内部声明的任意变量.
 */
