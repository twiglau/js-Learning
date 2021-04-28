// 例子如下:
// function identify(){
//     return this.name.toUpperCase();
// }
// function speak(){
//     var greeting = "Hello, I'm " + identify.call(this);
//     console.log(greeting)
// }
// var me = {
//     name:"Kyle"
// }
// var you = {
//     name:"Reader"
// }
// identify.call(me);
// identify.call(you);

// speak.call(me);
// speak.call(you);

/**
 * 该段代码可以在不同的上下文对象(me 和 you) 中重复使用函数 identify() 和 speak().
 * this 提供了一个更优雅的方式来隐式 "传递" 一个对象引用.
 */

/**
 * this并不像我们所想象的那样指向函数本身
 */
// function foo(num){
//     console.log("foo: " + num);
//     //记录foo被调用的次数
//     this.count++;
// }
// foo.count = 0;
// var i;
// for(i=0;i<10;i++){
//     if(i > 5){
//         foo(i);
//     }
// }
// console.log(foo.count); //NaN
/**
 * 分析: 执行foo.count = 0 时,的确向函数对象foo添加了一个属性count.但是函数内部代码
 * this.count 中的 this 并不是指向那个函数对象.
 * 
 * 解释: 以上这段代码在无意中创建了一个全局变量count,它的值为NaN ---> 稍后解释
 */

/**
 * 解决方法: 1. 使用foo标识符替代this来引用函数对象:
 *          2. 这种方法同样回避了this的问题,并且完全依赖于变量foo的词法作用域
 */
 function foo(num){
    console.log("foo: " + num);
    //记录foo被调用的次数
    foo.count++;
}
foo.count = 0;
var i;
for(i=0;i<10;i++){
    if(i > 5){
        foo(i);
    }
}
console.log(foo.count); //NaN
