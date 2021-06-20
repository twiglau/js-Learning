let p1 = new Promise(function(resolve,reject){
    resolve(42);
});
p1.then(function(value){
    console.log(value);
}).then(function(){
    console.log("Finished");
});
/**
 * 1.捕获错误
 * Promise链允许你捕获前一个Promise的完成或拒绝处理函数中发生的错误.如:
*/
let p2 = new Promise(function(resolve,reject){
      resolve(42);
});
p2.then(function(value){
    throw new Error("Boom!");
}).catch(function(error){
    console.log(error.message);
});

/**
 * 2.在Promise链中返回值
 * Promise链的另一重要方面是能从一个Promise传递数据给下一个Promise的能力. 传递给
 * 执行器中的 resolve() 处理函数的参数,会被传递给对应Promise的完成处理函数,这点如上,
 * 可以指定完成处理函数的返回值,以便沿着一个链继续传递数据,如下:
 */
let p3 = new Promise(function(resolve,reject){
    resolve(42);
});

p3.then(function(value){
    console.log(value);
    return value + 1;
}).then(function(value){
    console.log(value);
});

/**
 * 3.在Promise链中返回Promise
 * 从完成或拒绝处理函数中返回一个基本类型值,能够在Promise之间传递数据,但若你返回的是一个对象?
 * 若该对象是一个Promise,那么需要采取一个额外步骤来决定如何处理.
 */
let p4 = new Promise(function(resolve,reject){
    resolve(42);
});
let p5 = new Promise(function(resolve,reject){
    resolve(43);
});
p4.then(function(value){
    //第一个完成处理函数
    console.log(value);
    return p5;
}).then(function(value){
    //第二个完成处理函数
    console.log(value);
})