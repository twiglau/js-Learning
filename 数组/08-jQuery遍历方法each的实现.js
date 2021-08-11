/**
 * -- each 介绍
 * jQuery 的 each 方法, 作为一个通用遍历方法, 可用于遍历对象和数组
 * 语法为:
 * > jQuery.each(object, [callback])
 * 
 * 回调函数拥有两个参数:
 * > 第一个为对象的成员或数组的索引.
 * > 第二个为对应变量或内容.
 * 
 * //遍历数组
 * $.each([0,1,2],function(i,n){
 *    console.log("Item #" + i + ": " + n);
 * });
 * 
 * //Item #0: 0
 * //Item #1: 1
 * //Item #2: 2
 * 
 * //遍历对象
 * $.each({name:"John",lang:"JS"},function(i,n){
 *     console.log("Name: " + i + ", Value: " + n);
 * });
 * 
 * // Name: name, Value: John
 * // Name: lang, Value: JS
 * 
 * -- 退出循环
 * 尽管ES5提供了forEach方法, 但是 forEach 没有办法中止 或者跳出 forEach 循环, 除了抛出一个异常.
 * 但是对于 jQuery 的 each 函数, 如果需要退出 each 循环可使回调函数返回 false, 其他返回值将被忽略.
 * $.each([0,1,2,3,4,5], function(i, n){
 *     if (i > 2) return false;
 *     console.log("Item #" + i + ": " + n);
 * });
 * 
 * // Item #0: 0
 * // Item #1: 1
 * // Item #2: 2
 */

/**
 * 一, 第一版
 * 该怎么实现这样一个 each 方法?
 * 首先,肯定要根据参数的类型进行判断, 如果是数组, 就调用 for 循环, 如果是对象, 就使用 for...in循环,
 * 有一个例外是类数组对象, 对于类数组对象, 我们依然可以使用 for 循环.
 * 那么又该如何判断类数组对象和数组呢?
 * 可以用jQuery数组和类数组对象判断函数 isArrayLike 的实现.
 * 
 * 我们可以轻松写出第一版:
 */
function  each(obj,callback) {
    var length,i = 0;

    if(isArrayLike(obj)) {
        length = obj.length;
        for( ; i < length; i++) {
            callback(i, obj[i])
        }
    } else {
        for ( i in obj) {
            callback(i, obj[i])
        }
    }

    return obj;
}

// 中止循环
// 现在已经可以遍历对象和数组了, 但是依然有一个效果没有实现, 就是中止循环, 按照 jQuery each
// 的实现, 当回调函数返回 false 的时候, 我们就中止循环, 这个实现起来也很简单:

// 我们只用把:
// callback(i,obj[i])
// 替换成:
// if(callback(i, obj[i]) === false){
//     break;
// }
//轻松实现中止循环的功能.


/**
 * 二, this
 * 我们在实际的开发中,我们有时会在 callback 函数中用到 this, 先举个不怎么恰当的例子:
 * 
 * //1. 我们给每个人添加一个 age 属性, age 的值为 18 + index
 * var person = [
 *    {name: 'kevin'},
 *    {name: 'daisy'}
 * ]
 * $.each(person, function(index,item){
 *     this.age = 18 + index;
 * })
 * console.log(person)
 * 这个时候, 我们就希望 this 能指向当前遍历的元素, 然后给每个元素添加 age 属性.
 * 
 * 指定 this, 我们可以使用 call 或者 apply, 其实也很简单:
 * 我们把:
 * if( callback(i, obj[i])  == false){
 *     break;
 * }
 * 替换成:
 * if(callback.call(obj[i],i,obj[i]) === false){
 *    break;
 * }
 * 
 * 
 * //2. 再举个常用的例子:
 * $.each($("p"), function(){
 *    $(this).hover(function(){})
 * })
 * 
 * 虽然我们经常会这样写:
 * $("p").each(function(){
 *    $(this).hover(function(){})
 * })
 * 但是因为 $("p").each() 方法是定义在 jQuery 函数的 prototype 对象上面的, 而 $each()
 * 方法是定义 jQuery 函数上面的, 调用的时候不从复杂的 jQuery 对象上调用, 速度快得多, 所
 * 以我们推荐使用第一种写法.
 * 
 * 回到第一种写法上, 就是因为将 this 指向了当前 DOM 元素, 我们才能使用 $(this) 将当前DOM
 * 元素包装成 jQuery 对象, 优雅的使用 hover 方法.
 * 
 * 所以最终的 each 源码为:
 */

function each(obj,callback) {
    var length, i = 0;

    if(isArrayLike(obj)){
        length = obj.length;
        for(; i < length; i++) {
            if(callback.call(obj[i],i,obj[i]) === false) {
                break;
            }
        }
    } else {
        for(i in obj) {
            if(callback.call(obj[i],i,obj[i]) === false) {
                break;
            }
        }
    }
    return obj;
}