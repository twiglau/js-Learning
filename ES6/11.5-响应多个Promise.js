/**
 * 1.Promise.all() 方法
 */
let p1 = new Promise(function(resolve,reject){
    resolve(42);
});
let p2 = new Promise(function(resolve,reject){
    resolve(43);
});
let p3 = new Promise(function(resolve,reject){
    resolve(44);
});
let p4 = Promise.all([p1,p2,p3]);
p4.then(function(value){
    console.log(Array.isArray(value));
    console.log(value[0]);
    console.log(value[1]);
    console.log(value[2]);
})

/**
 * 2.Promise.race() 方法
 * 在来源Promise中任意一个被完成时,Promise.race() 方法所返回的Promise就能
 * 做出响应.
 */

let p5 = Promise.resolve(42);
let p6 = new Promise(function(resolve,reject){
    resolve(43);
});
let p7 = new Promise(function(resolve,reject){
    resolve(44);
});
let p8 = Promise.race([p5,p6,p7]);
p8.then(function(value){
    console.log(value); //42
});