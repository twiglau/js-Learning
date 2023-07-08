const info = {
    name: "lau",
    age: 18,
    foo: function() {
        console.log("foo 函数~")
    }
}

// 1. 验证是同一个对象: 这个过1s改变名称, 在到处文件里, 过2s再打印, 导入对象的name的值, 是否改变
setTimeout(() => {
    info.name = "过1秒"
}, 1000)

module.exports = info