/**
 * 第43和第44条讨论了属性枚举,但是我们并没有解决属性查找中原型污染的问题,
 * 很容易想到使用JavaScript的原生对象操作语法作为字典的所有操作.
 */
var dict = {};
console.log(
    "alice" in dict
) // membership test
dict.alice; //retrieval
dict.alice = 24; //update

//但是请记住JavaScript的对象操作总是以继承的方式工作,即使是一个空的对象字面量
//也继承了 Object.prototype 的大量属性.
console.log(
    "alice" in dict,
    "bob" in dict,
    "toString" in dict,
    "valueOf" in dict
)
//幸运的是, Object.prototype 提供了 hasOwnProperty 方法, 当测试字典条目是它
//可以避免原型污染, 因此正好是我们需要的方法.
console.log(
    dict.hasOwnProperty("alice"),//true
    dict.hasOwnProperty("toString"),//false
    dict.hasOwnProperty("valueOf")//false
)

//类似地,我们可以通过在属性查找是使用一个测试来防止其受污染的影响
console.log(
    dict.hasOwnProperty("alice") ? dict.alice : undefined,
    dict.hasOwnProperty("x") ? dict[x] : undefined
)
/**
 * 不幸的是, 我们并没有完全解决问题. 当调用 dict.hasOwnProperty时,我们请求查找dict对象
 * 的hasOwnProperty方法, 通常情况下, 该方法会简单地继承自Object.prototype对象.
 * 
 * 然而如果在字典中存储一个同为 "hasOwnProperty"名称的条目,那么原型中的hasOwnProperty方法不能再被获取到.
 */
//dict.hasOwnProperty = 10;
//dict.hasOwnProperty("alice");
//dict.hasOwnProperty is not a function

/**
 * 你可能认为字典绝不会存储箱 "hasOwnProperty" 这样奇异的属性名, 当然,这取决于你给定
 * 的应用程序环境是否有你期望的情形. 然而这确实可能发生, 尤其是当使用外部文件,网络资源
 * 或用户输入接口给字典填充条目时,你无法控制这些来自第三方的数据,因此你就无法确定字典中
 * 最终有哪些属性名.
 * 
 * 最安全的方法是不做任何假设, 我们可以采用第20条描述的call方法,而不用将 hasOwnProperty
 * 作为字典的方法来调用, 
 * 首先,我们提前在任何安全的位置提取出hasOwnProperty方法;
 */
var hasOwn = Object.prototype.hasOwnProperty;
//或更为简明地:
var hasOwn = {}.hasOwnProperty;
//现在有了绑定到正确函数的局部变量,我们可以通过函数的call方法在任意对象上调用它.
console.log( hasOwn.call(dict,"alice"));
//不管其接收者的hasOwnProperty 方法是否被覆盖,该方法都能工作.
var dict_01 = {};
dict.alice = 48;
dict.hasOwnProperty = 20;
console.log(
    hasOwn.call(dict,"hasOwnProperty"),
    hasOwn.call(dict,"alice"),
    hasOwn.call(dict,"hasOwnProperty"),
    hasOwn.call(dict,"alice")
)

//为了避免在所有查找属性的地方都插入这段样本代码, 我们可以将该模式抽象到dict的
//构造函数中, 该构造函数封装了所有在单一数据类型定义中编写健壮字典的技术细节.

function Dict_03(elements){
    //allow an optional initial table
    this.elements = elements || {}; //simple Object
}
Dict_03.prototype.has = function(key){
    //own property only
    return {}.hasOwnProperty.call(this.elements,key);
}
Dict_03.prototype.get = function(key){
    //own property only
    return this.has(key)
           ? this.elements[key]
           : undefined
}
Dict_03.prototype.set = function(key,val){
    this.elements[key] = val;
};
Dict_03.prototype.remove = function(key){
    delete this.elements[key];
}
/**
 * 请注意我们并没有保护Dict.prototype.set 函数的实现,因为即使在Object.prototype中
 * 已经存在一个同名的属性,给字典对象增加该key仍会成为elements 对象自己的属性.
 */
//该抽象比使用JavaScript默认的对象语法更健壮, 而且也同样方便使用.
var dict = new Dict_03({
    alice:34,
    bob:24,
    chris:62
})
console.log(
    dict.has("alice"),
    dict.get("bob"),
    dict.has("valueOf")
)
/**
 * 回顾第44条,在一些JavaScript的环境中,特殊的属性名 __proto__ 可能导致自身的
 * 污染问题. 在某些环境中, __proto__ 属性知识简单地继承自 Object.prototype, 因此
 * 空对象(幸运地)是真正的空对象.
 */
var empty = Object.create(null);
console.log("__proto__" in empty);
var hasOwn = {}.hasOwnProperty;
let has = hasOwn.call(empty,"__proto__");
console.log(has);
//在其他的环境中, 只有 in 操作符输入为true.

//但是不幸的是,某些环境会因为存在一个实例属性__proto__而永久地污染所有的对象
//这意味着,在不同的环境中, 下面的代码可能有不同的结果.
var dict = new Dict_03();
dict.has("__proto__"); // ? 可能有不同结果

/**
 * 为了达到最大的可移值行和安全性, 我们没有其他选择,只能为每个Dict方法的 "__proto__"
 * 关键字增加一种特例,结果便是下面更复杂但更安全的最终实现.
 */
function Dict_04(elements){
    //allow an optional initial table
    this.elements = elements || {}; //simple Object
    this.hasSpecialProto = false; // has "__proto__" key?
    this.specialProto = undefined; // "__proto__" element
}
Dict_04.prototype.has = function(key){
    if(key === "__proto__"){
        return this.hasSpecialProto;
    }
    //own property only
    return {}.hasOwnProperty.call(this.elements,key);
};
Dict_04.prototype.get = function(key){
    if(key === "__proto__"){
        return this.specialProto;
    }
    //own property only
    return this.has(key)
           ? this.elements[key]
           : undefined;
};
Dict_04.prototype.set = function(key,val){
    if(key === "__proto__"){
        this.hasSpecialProto = true;
        this.specialProto = val;
    }else{
        this.elements[key] = val;
    }
};
Dict_04.prototype.remove = function(key){
    if(key === "__proto__"){
        this.hasSpecialProto = false;
        this.specialProto = undefined;
    }else{
        delete this.elements[key];
    }
}
/**
 * 不管环境是否处理__proto__属性,该实现保证是可工作的,因为它避免了到处处理该名称的属性.
 */
var dict_04 = new Dict_04();
console.log( dict_04.has("__proto__"));

/**
 * 1.使用hasOwnProperty方法避免原型污染
 * 2.使用词法作用域和call方法避免覆盖hasOwnProperty方法
 * 3.考虑在封装hasOwnProperty测试样板代码的类中实现字典操作
 * 4.使用字典避免将 "__proto__" 作为key来使用
 */
