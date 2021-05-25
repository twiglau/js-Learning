/**
 * 迭代器(iterator)是一个可以顺序存取数据集合的对象.
 * 其一个典型的 API 是 next 方法,该方法获得序列的下一个值,
 * 假设我们希望编写一个便利的函数,它可以接受任意数量的参数,并为这些值建立一个迭代器
 */
//  var it = values(1,4,1,4,2,1,3,5,6)
// console.log(it.next(),it.next(),it.next())

//由于values函数必须能够接受任意数量的参数,所以我们可以构造迭代器对爱那个来遍历
//arguments对象的元素
function values(){
    var i = 0, n = arguments.length;
    return {
        hasNext:function(){
            return i < n;
        },
        next:function(){
            if( i >= n){
                throw new Error("end of iteration");
            }
            return arguments[i++]; // wrong arguments
        }
    };
}
//但是这段代码有问题,当试图使用迭代器对象时这个问题立马就会暴露出来.
var it = values(1,3,1,2,4,5,6)
console.log(it.next(),it.next(),it.next()) // undefined undefined undefined
/**
 * 一个新的arguments变量被隐式地绑定到每个函数体内,所以导致了这个问题.
 * 我们目的是 arguments 对象是与values函数相关的那个,但是迭代器的 next 方法含有自己的
 * arguments变量,所以当返回 arguments[i++]时,我们访问的是 it.next 的参数,而不是values
 * 函数中的参数.
 * 
 * 解决方案很简单: 只需简单地在我们感兴趣的 arguments 对象作用域内绑定一个新的局部变量,
 * 并确保嵌套函数只能引用这个现实命名的变量.
 */
function values_at() {
    var i = 0, n = arguments.length, a = arguments;
    return {
        hasNext: function() {
            return i < n;
        },
        next: function() {
            if( i >= n){
                throw new Error("end of iteration");
            }
            return a[i++];
        }
    }
}
var it_at = values_at(1,4,1,4,2,1,3,5,0);
console.log(it_at.next(),it_at.next(),it_at.next());

/**
 * 1.当引用 arguments 时当心函数嵌套层级
 * 2.绑定一个明确作用域的引用到arguments变量,从而可以在嵌套的函数中引用它.
 */
