const obj = {
    name: "lau",
    age: 18
}

// Object.defineProperty(obj, "name", {
//     get: function() {
//         console.log("监听到obj对象的name属性被访问了")
//     },
//     set: function() {
//         console.log("监听到obj对象的name属性被设置值了")
//     }
// })

// console.log(obj.name)
// obj.name = "kobe"


Object.keys(obj).forEach(key => {
    let value = obj[key]
    Object.defineProperty(obj, key, {
        get: function() {
            console.log(`监听到obj对象的${key}属性被访问了`)
            return value
        },
        set: function(newVal) {
            console.log(`监听到obj对象的${key}属性被设置值`)
            value = newVal
        }
    })
})

obj.name = "kobe"
obj.age = 30

console.log(obj.name)
console.log(obj.age)