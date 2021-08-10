/**
 * 1. Math.max
 * JavaScript 提供了 Math.max 函数返回一组数中的最大值,用法是:
 * Math.max([value1[,value2,...]])
 * 
 * 值得注意的是:
 * > 1. 如果有任一参数不能被转换为数值,则结果为 NaN.
 * > 2. max 是 Math 的静态方法, 所以应该像这样使用: Math.max(), 而不是作为
 * Math 实例的方法(简单的来说, 就是不使用 new)
 * > 3. 如果没有参数, 则结果为 -Infinity(注意是负无穷大)
 * 
 * 而我们需要分析的是:
 * > 1. 如果任一参数不能被转换为数值, 这就意味着如果参数可以被转换成数字, 就是可以
 * 进行比较的, 比如:
 */
Math.max(true,0) //1
Math.max(true,'2',null) //2
Math.max(1,undefined) //NaN
Math.max(1,{}) //NaN
/**
 * > 2. 如果没有参数, 则结果为 -Infinity, 对应的, Math.min 函数, 如果没有参数,则
 * 结果为 Infinity, 所以:
 */
var min = Math.min();
var max = Math.max();
console.log(min > max);
//了解了 Math.max 方法, 我们以求数组最大值的为例, 思考有哪些方法可以实现这个需求

/**
 * 2. 原始方法
 * 最原始的方法, 莫过于循环遍历一遍:
 */
var arr = [6,4,1,8,2,11,23];
var result = arr[0];
for(var i = 1; i < arr.length; i++){
    result = Math.max(result,arr[i]);
}
console.log(result);

/**
 * 3. reduce
 * 既然是通过遍历数组求出一个最终值, 那么我们就可以使用 reduce 方法:
 */
var arr = [6,4,1,8,2,11,23];
function max_red(prev,next) {
    return Math.max(prev,next);
}
console.log(arr.reduce(max_red));

/**
 * 4. 排序
 * 如果我们先对数组进行一次排序, 那么最大值就是最后一个值:
 */
arr.sort(function(a,b){return a - b;});
console.log(arr[arr.length - 1])

/**
 * 5. eval
 * Math.max 支持多个参数来进行比较, 那么我们如何将一个数组转换成参数传进 Math.max
 * 函数呢? eval 便是一种
 */
var max_eval = eval("Math.max(" + arr + ")");
console.log(max_eval);


/**
 * 6. apply
 * 使用 apply 是另一种
 */
console.log(Math.max.apply(null,arr))


/**
 * 7. ES6...
 */
console.log(Math.max(...arr));