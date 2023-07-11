let name = "lau";
let age = 18;
const sayHello = function(name) {
    console.log("你好, " + name);
}

setTimeout(() => {
    name = "test reference"; // 测试变量引用
}, 1000);

// export 导出的是变量本身的引用;
export {
    name,
    age,
    sayHello
}
