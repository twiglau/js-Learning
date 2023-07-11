const name = "lau";
const age = 18;
const sayHello = function(name) {
    console.log("你好, " + name);
}

// 导出方式有三种

// 1. 方式一:  声明语句
// export const name = "lau";
// export const age = 18;
// export const sayHello = function(name) {
//     console.log("你好, " + name);
// }

// 2. 方式二: {} 大括号,是一个固定的语法, 但不是一个对象
// export 导出 和 声明分开
// { 放置要导出的变量的引用列表 }
export {
    name,
    age,
    sayHello
}

// 3. 方式三: {} 导出方式, 可以给变量起别名
// export {
//     name as fName,
//     age as fAge,
//     sayHello as fSayHello
// }

// 4. 默认导出
 function format() {
    console.log("对某个内容格式化");
}
// export {
//     format as default
// }
export default format