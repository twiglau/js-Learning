// 一个模块

let name = "lau";
const age = 18;

let message = "bar log out";

function sayHello(name) {
    console.log("Hello " + name );
}


// 1. 到出方案 module.exports
module.exports = {
    name,
    age,
    sayHello
}
// exports.name = name;
// exports.age = age;
// exports.sayHello = sayHello;


// setTimeout(() => {
//     exports.name = "1s 在bar中修改"
// }, 1000);
// // 1.  本质上是: module.exports 在导出
// // setTimeout(() => {
// //     module.exports.name = "😄"
// //     console.log(exports.name)
// // }, 2000)

// // 2. 如果一致覆盖,就会创建一块新的内存
// module.exports = {}