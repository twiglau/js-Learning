// 最小授权 或 最小暴露原则

//1.立即执行函数
// var a = 2;
// (function IIFE(global){
//     var a = 3;
//     console.log( a ); // 3
//     console.log( global.a); // 2
// })(window);

// console.log( a );// 2

//2.块作用域
//2.1 for 循环 , with关键字, try/catch 创建一个块作用域
//2.2 let 关键字,提供了除var 以外的另一种变量声明方式
//2.3 let 关键字可以将变量绑定到所在的任意作用域中(通常是 {...}内部).
//    换句话说, let 为其声明的变量隐式地提供了所在的块作用域.

// function something(bar){
//     return bar;
// }
// var foo = true;
// if(foo){
//     let bar = foo * 2;
//     bar = something(bar);
//     console.log(bar);
// }

// 2.4 for 循环头部的let 不仅将 i 绑定到了 for 循环的块中,事实上它将其重新
//     绑定到了循环的每一个迭代中,确保使用上一个 循环迭代结束时的值重新进行赋值
// for(let i=0;i<10;i++){
//     console.log( i );
// }
// console.log( i ); //ReferenceError

//2.4 提升是指声明会被视为存在于其所出现的作用域的整个范围内
// 使用 let 进行的声明不会在块作用域中进行提升.声明的代码被运行之前,声明
// 并不 "存在"
// {
//     console.log(bar);
//     let bar = 2;
// }

//另一个块作用域非常有用的原因和闭包及回收内存垃圾的回收机制相关.
/**
 * 由于let声明附属于一个新的作用域而不是当前的函数作用域(也不属于全局作用域),
 * 当代码中存在对于函数作用域中var声明的隐式依赖时,就会有很多隐藏的陷阱,如果
 * 用let 来替代 var 则需要在代码重构的过程中付出额外的精力
 */
//1. 
// var foo = true,baz=10;
// if(foo){
//     var bar = 3;
//     if(baz > bar){
//         console.log(baz);
//     }
//     // ...
// }
//2.进行以下重构
// var foo = true,baz = 10;
// if(foo){
//     var bar = 3;
//     // ....
// }
// if(baz > bar){
//     console.log(baz);
// }

//3. 但是在使用块级作用域的变量时需要注意以下变化:
// var foo = true,baz = 10;
// if(foo){
//     let bar = 3;
//     if(baz > bar){
//         console.log(baz);
//     }
// }

