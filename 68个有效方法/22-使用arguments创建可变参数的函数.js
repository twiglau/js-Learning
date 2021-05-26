/**
 * 如何实现可变参数的函数?
 * 固定元数版本的 averageOfArray 函数是很容易实现
 */
function averageOfArray(a){
    for(var i = 0, sum = 0, n = a.length ; i < n; i++) {
        sum += a[i];
    }
    return sum / n;
}
// console.log(averageOfArray([2,7,1,8,2,8,1,8]))

//可以利用JavaScript的一个事实,即JavaScript给每个函数都隐式地
//提供了一个名为 arguments 的局部变量.
//arguments对象给实参提供了一个类似数组的接口.它为每个实参提供了一个索引属性,
//还包含一个length属性用来指示参数的个数,从而可以通过遍历arguments对象的每个
//元素来实现可变元数的 average函数.
function average(){
    for(var i = 0,sum = 0, n = arguments.length; i < n; i++){
        sum += arguments[i];
    }
    return sum / n;
}

console.log(average(1,3,2,4,5),average(1,2,3,6,9,7))
/**
 * 可变参数函数提供了灵活的接口,不同的调用者可使用不同数量的参数来调用它们,但它们自身也失去了
 * 一点便利. 
 * 
 * --->如果使用者想使用计算的数组参数来调用可变参数的函数,只能使用apply方法 <----
 * 
 * 好的经验法则是,如果提供了一个便利的可变参数的函数,也最好提供一个需要显式指定数组的固定元数的版本.
 * 
 * 可以编写一个轻量级的封装,并委托给固定元数的版本实现可变参数的函数
 */
function average(){
    return averageOfArray(arguments);
}

/**
 * 1.使用隐式的 arguments 对象实现可变参数的函数.
 * 2.考虑对可变参数的函数提供一个额外的固定元数的版本,从而使 使用者无需借助 apply 方法.
 */

