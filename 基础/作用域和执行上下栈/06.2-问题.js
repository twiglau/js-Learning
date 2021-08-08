/**
 * 执行上下文的具体处理过程
 * http://www.cnblogs.com/TomXu/archive/2012/01/30/2326372.html
 */
var b = 10;
(function b(){
    b = 20;
    console.log(b);
})();
/**
 * 简要解释:
 * 当解释器在代码执行阶段遇到命名的函数表达式是, 会创建辅助的特定对象,然后将函数表达式
 * 的名称即b添加到特定对象上作为唯一的属性, 因此函数内部才可以读取到 b, 但是这个值是
 * DontDelete 以及 ReadOnly 的, 所以对它的操作并不生效,所以打印的结果自然还是
 * 这个函数,而外部的 b 值也没有发生更改.
 */

/**
 * 以下代码执行过程
 */
var p = (function(a){
    this.a = a;
    return function(b){
        return this.a + b;
    }
}(function(a,b){
    return a;
}(1,2)))

console.log(p(4));

/**
 * 分析:
 *
 * 1. 简化结构
 * var p = (function _a(){
 * 
 * }(function _b(){
 * 
 * }()))
 * 相当于先执行 _b 函数, 然后将函数的执行结果作为参数传入 _a 函数
 * 
 * 2. _b 函数为:
 * function (a,b) {
 *     return a;
 * }
 * 
 * _b 函数执行
 * (function(a,b){
 *    return a;
 * }(1,2))
 * 
 * 函数返回1, 然后将 1 作为参数传入 _a, 相当于:
 * function (a) {
 *     this.a = a;
 *     return function(b) {
 *         return this.a + b;
 *     }
 * }(1)
 * 
 * 2. 变量p的值就是一个函数为:
 * function(b) {
 *     return 1 + b
 * }
 * p(4) 的结果自然是 5
 */