/**
 * arguments对象自身并不是标准Array类型的实例,我们不能直接调用argument.shift()方法.
 * 多亏了call方法,才有希望能够从数组中提取出shift方法,并在arguments对象上调用它.
 * 这似乎是实现如callMethod这样的函数的一种合理的方式.callMethod函数需要一个对象
 * 和一个方法名,并尝试使用剩余的参数调用该对象的指定方法.
 */
function callMethod(obj,method){
    var shift = [].shift;
    shift.call(arguments)
    shift.call(arguments)
    return obj[method].apply(obj,arguments);
}
//但是,此函数的行为远远超出预期:
var obj = {
    add: function(x,y) { return x + y;}
};
// callMethod(obj,"add",17,25);
//error: cannot read property "apply" of undefined
/**
 * 以上原因:
 * 该函数出错的原因是 arguments 对象并不是函数参数的副本,特别是,所有命名参数都是
 * arguments 中对应索引的别名. 
 * 因此,即使通过shift方法移除arguments对象中的元素之后,obj仍然是 arguments[0]的别名,
 * method仍然是arguments[1]的别名. 
 * 这意味着,尽管我们似乎是在提取 obj["add"],但实际上是在提取 17[25]! 此时一切开始失控.
 * 由于JavaScript的自动强制转换规则,引擎将17转换为Number对象并提取其 "25" 属性(该属性
 * 并不存在),结果产生undefined,然后试图提取undefined的 "apply" 属性并将其作为方法来
 * 调用,结果当然失败了.
 * 
 * 该例子表明, arguments对象与函数的命名参数之间的关系极其脆弱,修改arguments对象需要
 * 承担是函数的命名参数失去意义的风险.在ES5的严格模式下,情况甚至更为复杂,在严格模式下,
 * 函数参数不支持对其arguments对象去别名.如下:
 */
function strict(x){
    "use strict";
    arguments[0] = "modified";
    return x === arguments[0];
}
function nonstrict(x) {
    arguments[0] = "modified";
    return x === arguments[0];
}
console.log(strict("unmodified"))
console.log(nonstrict("unmodified"));

/**
 * 因此,永远不要修改arguments对象是更为安全的,通过一开始赋值参数中的元素到
 * 一个真正的数组的方式,很容易避免修改 arguments 对象.
 * 
 * 下面是实现复制的简单惯用法
 */
// var args = [].slice.call(arguments)

/**
 * 当不使用额外的参数调用数组的slice方法时,它会复制整个数组,其结果是一个真正的标准Array类型实例.
 * 该实例保证不会有任何别名,并且可以直接使用标准Array类型中的所有方法.
 * 
 * 我们可以通过复制arguments对象修复callMethod函数的实现,由于我们只需要 obj 和
 * method 之后的元素, 因此,我们可以指定 slice方法的开始索引位置为2.
 */
function callMethod(obj,method){
    var args = [].slice.call(arguments,2);
    return obj[method].apply(obj,args)
}
var obj = {
    add: function(x,y) { return x + y;}
}
console.log(callMethod(obj,"add",17,25))


/**
 * 1.永远不要修改 arguments 对象
 * 2.使用 [].slice.call(arguments)将 arguments 对象复制到一个真正的数组中再进行修改.
 */
