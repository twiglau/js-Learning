//这段代码中mean的输出是?
var scores = [98,74,85,77,93,100,89,35,20];
var total = 0;
for(var score in scores){
    total += score;
}
var mean = total / scores.length;
console.log(total);//17636.571428571428
//程序混淆了数字数组key 和 value 这是极易犯下的错误. for...in循环始终枚举
//所有key

//下一个看似合理的猜测是
var exo = [0,1,2,3,4,5,6]
var total_exo = 0;
for(var e in exo){
    total_exo += e;
}
var res = total_exo / exo.length;
console.log(
    total_exo
)
//记住: 即使是数组的索引属性,对象属性key始终的字符串,因此,
// "+=" 操作符将执行字符串的连接操作,结果便得到一个意想不到的total值 "00123456",

//迭代数组内容的正确方法是使用传统的for循环.
for(var i = 0, n = scores.length; i < n; i++) {
    total += scores[i];
}
var mean = total / scores.length;
console.log(mean)
/**
 * 该方法确保当你需要整数索引和数组元素值时就能获取它们,并且绝不会混淆它们或
 * 引发意想不到的字符串强制转换,此外,它还确保以正确的顺序迭代数组,并且不会意外
 * 地包括存储在数组对象或其原型链中的非整数属性.
 * 
 * 请注意上面for循环中数组长度变量n的使用,如果循环体不修改该数组,那么在每次迭代中,
 * 循环都会简单地重新计算数组的长度.
 * for(var i = 0; i < scores.length; i++) { ... }
 * 另外,在循环的一开始就计算出数组的长度还有几个小的好处, 首先,即使是优化的JavaScript
 * 编译器可能有时也很难保证避免重新计算scores.length是安全的,不过更重要的是,
 * 它给阅读该代码的程序员传递了一个信息:
 * 循环的终止条件是简单且确定的.
 */

/**
 * 1.迭代数组的索引属性应当总是使用for循环而不是for...in循环.
 * 2.考虑在循环之前将数组的长度存储在一个局部变量中以避免重新计算数组长度.
 */