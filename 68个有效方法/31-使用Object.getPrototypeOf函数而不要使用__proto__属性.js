/**
 * ES5引入Object.getPrototypeOf函数作为获取对象原型的标准API,
 * 但在这之前大量的JavaScript引擎早就使用一个特殊的 __proto__属性来达到相同的目的.
 * 然而,并不是所有的JavaScript环境都支持通过 __proto__属性来获取对象的原型,因此,该属性
 * 并不是完全兼容的.
 * 
 * 例如,对用拥有null原型的对象,不同的环境处理的不一样,在一些环境中, __proto__属性继承自
 * Object.prototype, 因此,拥有null原型的对象没有这个特殊的 __proto__属性
 */

var empty = Object.create(null); // object with no prototype
console.log( "__proto__" in empty); // true (in some environments)

/**
 * 无论在什么情况下, Object.getPrototypeOf函数都是有效的, 而且,它也是提取对象原型
 * 更加标准, 可移值的方法.  由于 __proto__属性会污染所有的对象,因此它会导致大量的Bug.
 * 当前支持这一扩展的JavaScript引擎可能选择在未来允许程序禁用它已避免这些Bug.
 * 使用Object.getPrototypeOf()函数确保即使禁用了__proto__属性,代码也能继续工作.
 * 
 * 对于那些没有提供该ES5 API的JavaScript环境,也可以很容易地利用 __proto__ 属性来
 * 实现 Object.getPrototypeOf 函数.
 */
if(typeof Object.getPrototypeOf === "undefined"){
    Object.getPrototypeOf = function(obj){
        var t = typeof obj;
        if(!obj || (t !== "object" && t !== "function")){
            throw new TypeError("not an object");
        }
        return obj.__proto__;
    }
}

/**
 * 1.使用符合标准的 Object.getPrototypeOf 函数而不要非标准的 __proto__ 属性.
 * 2.在支持 __proto__属性的非 ES5 环境中实现 Object.getPrototypeOf 函数.
 */