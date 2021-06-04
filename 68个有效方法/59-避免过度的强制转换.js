/**
 * JavaScript语言是若类型的(请参阅第3条).许多标准的操作符和代码库会自动地将
 * 非预期的输入参数强制转换为期望的类型而不是抛出异常.
 * 如果未提供额外的逻辑,使用这些内置操作符构建的程序会继承其强制转换的行为.
 */
function square(x){
    return x*x;
}
console.log(square("3")); //9
/**
 * 强制转换无疑是很方便的,但正如第3条指出的一样,它们也会引起麻烦的,隐匿的错误,
 * 并导致不稳定的和难以诊断的行为.
 * 
 * 当强制转换与重载的函数一起工作是尤其令人困惑,就像第58条中所涉及的位向量
 * 类的enable方法. 该方法使用其参数的类型来决定其行为. 如果 enable 方法
 * 尝试将其参数强制转换为一个期望的类型,那么方法签名可能会变得更难理解,我们
 * 应该选择哪种类型?将方法的参数强制转换为一个数字完全破坏了重载.
 */
BitVector.prototype.enable = function(x) {
    x = Number(x);
    if(typeof x === "number"){ //always true
        this.enableBit(x);
    }else{
        for(var i = 0, n = x.length; i < n; i++){
            this.enableBit(x[i]);
        }
    }
}
/**
 * 作为一般规则,在那些使用参数类型来决定重载函数行为的函数中避免强制转换参数是明智的,
 * 强制转换使得很难识别出最终会的到哪个变量.
 */
bits.enable("100"); // number or array-like
/**
 * 这种enable方法的使用时含糊不清的. 调用者可以合理地认为参数可以为一个数字或一个位数组值,
 * 然而我们的构造函数并不是为字符串设计的,因此无法识别它. 这很可能表明调用者没有理解API. 事实上,
 * 如果我们想要更小心地设计 API, 我们可以强制只接受数字和对象.
 */
BitVector.prototype.enable = function(x){
    if(typeof x === "number"){
        this.enableBit(x);
    }else if(typeof x === "object" && x){
        for(var i = 0, n = x.length; i < n; i++){
            this.enableBit(x[i]);
        }
    }else{
        throw new TypeError("expected number or array-like");
    }
}
/**
 * enable方法的最终版本是一种风格更加谨慎的示例,被称为防御性编程. 防御性编程视图已额外的检查
 * 来抵御潜在的错误,一般情况下,抵御所有可能的错误是不可能的.
 * 例如, 我们可能使用检查来确保如果x具有length属性,那么它应该是一个对象,然而这并不是安全的,
 * 比如,一个意外使用的String对象. JavaScript除了提供实现这些检查的基本工具外,比如typeof操作符,
 * 还可以编写更加简洁的工具函数来监视函数签名.例如,我们可以使用一个预先检查来监视BitVector的构造函数.
 */
function BitVector(x){
    uint32.or(arrayLike).guard(x);
    // ...
}
/**
 * 为了使其工作,我们可以借助于共享原型对象来实现guard方法以构建一个监视对象的工具库.
 */
var guard = {
    guard:function(x){
        if(!this.test(x)){
            throw new TypeError("expected " + this);
        }
    }
};
//每个监视对象实现自己的test方法和错误消息的字符串描述.
var uint32 = Object.create(guard);
uint32.test = function(x){
    return typeof x === "number" && x === (x >>> 0);
};
uint32.toString = function() {
    return "uint32";
}
/**
 * uint32的监视对象使用JavaScript位操作符的一个诀窍来实现到32位无符号证书的转换.
 * 无符号右移位运算符在执行移位运算符会将其第一个参数转换为一个32位的无符号整数(请参阅第2条)
 * 移入零位对整数值没有影响. 因此, uint32.test 实际上是把一个数字与该数字转换为32位无符号整数
 * 的结果做比较.
 * 
 * 接下来,我们来实现arrayLike的监视对象
 */
var arrayLike = Object.create(guard);
arrayLike.test = function(x) {
    return typeof x === "object" && x && uint32.test(x.length);
};
arrayLike.toString = function() {
    return "array-like object";
};
/**
 * 请注意我们又进一步地采取了防御性编程来确保一个类数组对象应该具有一个无符号整数的
 * length属性.
 * 
 * 最后,我们实现一些作为原型方法的 "链" 方法(请参阅第60条,) 比如 or 方法.
 */
guard.or = function(other){
    var result = Object.create(guard);
    var self = this;
    result.test = function(x){
        return self.test(x) || other.test(x);
    };
    var description = this + " or " + other;
    result.toString = function(){
        return description;
    };
    return result;
}
/**
 * 该方法合并了接收者监视对象(绑定到this的对象)和另一个监视对象(other参数),产生
 * 一个新的监视对象. 新监视对象的 test 和 toString 方法合并了这两个输入对象的方法.
 * 请注意我们使用了一个局部的self变量来保存this的引用(请参阅第25条和第37条)以确保
 * 能再合成的监视对象的test方法中引用.
 * 
 * 当遇到错误时,这些测试能帮助我们更早地捕获错误,这使得它们更容易诊断. 然而,它们可能
 * 扰乱代码库并潜在地影响应用程序的性能.是否使用防御性编程是一个成本和收益的问题.
 */

/**
 * 提示:
 * 1.避免强制转换和重载的混用.
 * 2.考虑防御性地监视非预期的输入.
 */