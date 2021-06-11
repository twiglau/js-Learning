/**
 * Object.keys() 与 Object.getOwnPropertyNames() 方法可以检索对象的所有属性名称,前者
 * 返回所有的可枚举属性名称,而后者则返回所有属性名成而无视是否可枚举. 然而两者都不能返回符号
 * 类型的属性,以保持它们在 ES5 中的功能不发生变化. 而ES6 新增了 Object.getOwnPropertySymbols
 * 方法,以便让你可以检索对象的符号类型属性.
 * 
 * Object.getOwnPropertySymbols() 方法会返回一个数组,包含了对象自有属性名中的符号值,如:
 */
let uid = Symbol.for("uid");
let object = {
    [uid]: "12345"
};
let symbols = Object.getOwnPropertySymbols(object);

console.log(symbols.length);
console.log(symbols[0]);
console.log(object[symbols[0]]);