/**
 * 设想有两个不同类的API. 第一个是位向量:有序的位集合.
 */
/*

var bits = new BitVector();
bits.enable(4);
bits.enable([1,3,8,17]);
console.log(
    bits.bitAt(4),
    bits.bitAt(8),
    bits.bitAt(9)
)

 */

//注意enable方法被重载了,你可以传入一个索引或索引的数组.
//第二个类的API是字符串集合: 无序的字符串集合.

/*


var set = new StringSet();
set.add("Hamlet");
set.add(["Rosencrantz","Guildenstern"]);
set.add({"Ophelia":1,"Polonius":1,"Horatio":1});
console.log(
    set.contains("Polonius"),
    set.contains("Guildenstern"),
    set.contains("Falstaff")
)

 */

/**
 * 与位向量的enable方法类似,add方法也被重载了,除了可以接受字符串和字符串数组外,它还可以
 * 接受一个字典对象.
 * 
 * 为了实现BitVector.prototype.enable方法,我们可以通过首先测试其他情况来避免如何
 * 判断一个对象是否为数组的问题.
 */
BitVector.prototype.enable = function(x){
    if(typeof x === "number"){
        this.enableBit(x);
    }else { // assume x is array-like
        for(var i = 0, n = x.length; i < n; i++){
            this.enableBit(x[i]);
        }
    }
};
/**
 * 这很简单. 那如何实现StringSet.prototype.add方法呢? 现在我们似乎要区分数组和对象.
 * 但这个问题完全没道理,因为JavaScript数组就是对象.我们真正想做的就是分离数组对象和非
 * 数组对象.
 * 
 * 这样的区分其实与JavaScript的灵活的类数组对象(请参阅第51条)的概念是有争执的.任何对象
 * 都可被视为数组,只要它遵循正确的接口.而且也没有明确的方法来测试一个对象是否满足一个接口.
 * 我们可能尝试猜测具有length属性的对象被视为数组,但这并不保险.如果我们碰巧使用一个哦拥有
 * key为"length"的字段对象呢?
 */
dimensions.add({
    "length":1, //implies array-like?
    "height":1,
    "width":1
})
/**
 * 使用不精确的启发探索法来确定接口是一个容易被误解和滥用的方法. 猜测一个对象是否实现了结构
 * 类型有时被称为鸭子测试(duck testing)(第57条描述了鸭子类型),这是不好的实践. 因为对象
 * 没有明确的信息标记来表示它们实现的结构类型,并没有可靠的编程方法来检测该信息.
 * 
 * 重载两种类型意味着必须有一种方法来区分这两种情况. 不可能检测一个值是否实现了一种结构性
 * 的接口.这引出了以下规则.
 */

//API绝不应该重载与其他类型有重叠的类型.

/**
 * 对于StringSet,答案是一开始就不要使用结构性的类数组接口,相反,我们应当选择一种类型,这种
 * 类型具有明确定义的"标签",可以表明用户真想将其作为一个数组. 
 * 1. --> 一个显而易见但不完美的选择是使用 instanceof 操作符测试一个对象是否继承自 Array.prototype
 */
StringSet.prototype.add = function(x){
    if(typeof x === "string"){
        this.addString(x);
    }else if(x instanceof Array) {//too restrictive
        x.forEach(function(s){
           this.addString(s);
        },this);
    }else {
        for(var key in x){
            this.addString(key);
        }
    }
}
/**
 * 以上,我们知道任何时候一个对象如果是Array的实例,它的行为则会像一个数组. 但这次
 * 截然不同. 在一些允许多个全局对象的环境中可能会有标准的Array构造函数和原型对象
 * 的多份副本.在浏览器中有这种情况,每个frame会有标准库的一份单独副本. 当跨frame
 * 通信是,一个frame中的数组不会继承自另一个frame的Array.prototype.
 * 
 * 2. ---> 出于这个原因,ES5引入了 Array.isArray函数,其用于测试一个值是否是数组,而不管
 * 原型继承. 在 ECMAScript标准中,该函数测试对象的内部 [[Class]] 属性值是否是
 * Array. 当需要测试一个对象是否是真数组,而不仅仅是类数组对象, Array.isArray
 * 方法比 instanceof 操作符更可靠.
 */
StringSet.prototype.add = function(x){
    if(typeof x === "string"){
        this.addString(x);
    }else if(Array.isArray(x)) {//tests for true arrays
        x.forEach(function(s){
           this.addString(s);
        },this);
    }else {
        for(var key in x){
            this.addString(key);
        }
    }
}
/**
 * 3. ---> 在不支持ES5的环境中,可以使用标准的 Object.prototype.toString 方法测试一个对象是否
 * 为数组.
 */
var toString = Object.prototype.toString;
function isArray(x) {
    return toString.call(x) === "[object Array]";
}
/**
 * Object.prototype.toString 函数使用对象内部的 [[Class]] 属性创建结果字符串,所以在
 * 测试一个对象是否为数组时,它比 instance of 操作符更可靠.
 * 
 * 注意:
 * 该版本的add方法存在不同的影响该API的使用者的行为. 重载API的数组版本不接收随意的类数组对象.
 * 例如, 你不能传入 arguments 对象并期待它被视为数组.
 */
function MyClass(){
    this.keys = new StringSet();
    // ...
}
MyClass.prototype.update = function() {
    this.keys.add(arguments); //treated as a dictionary
};
//相反,使用add方法的正确方式是将对象转换为真正的数组.可以使用第51条中描述
//的方法.
MyClass.prototype.update = function() {
    this.keys.add([].slice.call(arguments));
};
/**
 * 当调用者想传递一个类数组对象给一个期望接收真数组的API时,需要做这种转换.
 * 基于这个原因,很有必要使用文档注明 API 接收哪两种类型. 在上面的例子中,
 * enable方法接收数字和类数组对象,而add方法接收字符串,真数组及(非数组)对象.
 */

/**
 * 提示:
 * 1.绝不重载与其他类型有重叠的结构类型.
 * 2.当重载一个结构类型与其他类型是,先测试其他类型.
 * 3.当重载其他对象类型时,接收真数组而不是类数组对象.
 */
