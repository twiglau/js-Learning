/**
 * ES5严格模式为重复的对象字面量属性引入了一个检查,若找到重复的属性名,就会抛出错误.
 */
"use strict";
var person = {
    name:"Nicholas",
    name:"Greg"
};
/**
 * 在ES5严格模式下运行时,第二个 name 属性会造成语法错误. 但 ES6 移除了重复属性的检查,严格模式
 * 与非严格模式都不再检查重复的属性. 当存在重复属性时,排在后面的属性的值会成为该属性的实际值,如下:
 */
"use strict";
var person = {
    name:"Nicholas",
    name:"Greg" // 在ES6严格模式中不会出错
};
console.log(person.name); //"Greg"
//在本例中, person.name 的值为 "Greg",因为这是赋给该属性的最后一个值.