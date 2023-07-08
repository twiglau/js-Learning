const name = "lau";
const age = 18;
const sayHello = function(name) {
    console.log("你好, " + name);
}

// 导出方式有三种

// 1. 方式一:
// export const name = "lau";
// export const age = 18;
// export const sayHello = function(name) {
//     console.log("你好, " + name);
// }

// 2. 方式二: {} 大括号, 但不是一个对象
// { 放置要导出的变量的引用列表 }
export {
    name,
    age,
    sayHello
}

// 3. 方式三: {} 导出是, 可以给变量起别名
// export {
//     name as fName,
//     age as fAge,
//     sayHello as fSayHello
// }

export default function() {
    console.log("对某个内容格式化");
}