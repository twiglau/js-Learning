//假设有人给我们提供了一个计算任意数量数字平均值的函数.
/**
 * average(1,2,3)
 * average(1)
 * average(3,1,4,1,5,9,2,6,5)
 * .....
 * 
 * average函数是一个称为可变参数或可变元的函数(函数的元数是指其期望的参数个数)的例子.
 * 它可以接受任意数量的参数,相比较而言,固定元数的average函数的版本可能会使用单个数字数组
 * 作为其参数.
 * 
 * averageOfArray([1,2,3])
 * averageOfArray([1])
 * averageOfArray([3,1,4,1,5,9,2,6,5])
 * 
 * 又或有这样一个数字数组:
 * var scores = getAllScores();
 * 如何使用average函数计算平均值呢?
 * average();
 * 
 * 幸运的是,函数对象配有一个内置的apply方法,它与call方法非常类似,但它是专为这一目的而设计的.
 * apply方法需要一个参数数组,然后将数组的每一个元素作为调用的单独参数调用该函数,
 * 除了参数数组,
 * apply方法指定第一个参数绑定到被调用函数的this变量,由于average函数没有引用 this 变量,因此,
 * 我们可以简单地传递 null.
 * 
 * var scores = getAllScores();
 * average.apply(null,scores);
 * 
 * 例如,如果scores 有三个元素,那么以上代码的行为与 average(scores[0],scores[1],scores[2])
 * 一致,
 * 
 * apply方法也可用于可变参数方法,例如, buffer对象包含一个可变参数的append方法, 该方法添加元素
 * 到函数内部的 state 数组中
 */
var buffer = {
    state:[],
    append:function(){
        for(var i = 0, n = arguments.length; i < n; i++) {
            this.state.push(arguments[i]);
        }
    }
}
//append 方法可以接受任意数量的参数进行调用
buffer.append("Hello, ");
buffer.append("twig", " ","lau", "!");
buffer.append("ai");
console.table(buffer.state);
//借助于 apply 方法的 this 参数,我们也可以指定一个可计算的数组调用 append 方法:
// buffer.append.apply(buffer,getInputStrings())

/**
 * 1.使用 apply 方法指定一个可计算的参数数组来调用可变参数的函数.
 * 2.使用 apply 方法的第一个参数给可变参数的方法提供一个接收者.
 */
