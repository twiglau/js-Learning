/**
 * Node 中实现CommonJS的本质: 就是对象引用赋值
 * 1. exports { name, age, sayHello }
 */
// bar = exports = { name, age, sayHello }
const bar = require('./bar');
setTimeout(() => {
    console.log('name timeout: ', bar.name);
}, 2000);

console.log(exports);
// module.exports = exports
console.log(module);

// const { name, age, sayHello } = require('./bar');
// console.log(name);
// console.log(age);
// sayHello("Kobe");

/**
 * 2. 对象引用赋值
 */
const obj = {
    name: "twig",
    age: 20
}

const info = obj;
obj.name = "test_change";
console.log('obj', obj);
console.log('info', info);