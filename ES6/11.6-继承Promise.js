/**
 * 正像其他内置类型,你可将一个Promise用作派生类的基类. 这允许你自定义变异的Promise,在
 * 内置Promise的基础上扩展功能.例如,假设你想创建一个可以使用 success() 与 failure() 
 * 方法的Promise,对常规的 then() 与 catch() 方法进行扩展,如下:
 */
class MyPromise extends Promise {

    //使用默认构造器

    success(resolve,reject){
        return this.then(resolve,reject);
    }
    failure(reject){
        return this.catch(reject);
    }
}

let promise = new MyPromise(function(resolve,reject){
    resolve(42);
});
promise.success(function(value){
    console.log(value);
}).failure(function(value){
    console.log(value);
})
/**
 * 在此例中,MyPromise 从 Promise 上派生出来,并拥有两个附加方法. success() 方法模拟了 resolve(),
 * failure() 方法则模拟了 reject().
 * 
 * 每个附加方法都使用了 this 来调用它所模拟的方法. 派生的Promise函数与内置的Promise几乎一样,除了可以
 * 随你需要调用 success() 与 failure().
 * 
 * 由于静态方法被继承了, MyPromise.resolve() 方法, MyPromise.reject() 方法, MyPromise.race() 方法
 * 与 MyPromise.all() 方法在派生的Promise上都可用. 后两个方法的行为等同于内置的方法,但前两个方法
 * 则有轻微的不同.
 * 
 * MyPromise.resolve() 与 MyPromise.reject() 都会返回 MyPromise 的一个实例,无视传递进来的值的类型,
 * 这是由于这两个方法使用了 Symbol.species 属性 (详见第九章 )来决定需要返回的Promise的类型.若传递内置Promise
 * 给这两个方法,将会被决议或被拒绝,并且会返回一个新的 MyPromise,以便绑定完成或拒绝处理函数.如:
 */

let p1 = new Promise(function(resolve,reject){
    resolve(42);
});
let p2 = MyPromise.resolve(p1);
p2.success(function(value){
    console.log(value);
});
console.log(p2 instanceof MyPromise);
/**
 * 此处的 p1 是一个内置的Promise,被传递给了 MyPromise.resolve() 方法.作为结果的 p2 是 MyPromise 的一个实例,
 * 来自 p1 的决议值被传递给了 p2 的完成处理函数.
 * 
 * 若MyPromise 的一个实例被传递给了 MyPromise.resolve() 或 MyPromise.reject() 方法,它会在未被决议的情况下
 * 就被直接返回. 在其他情况下,这两个方法的行为都会等同于 Promise.resolve() 与 Promise.reject().
 */
