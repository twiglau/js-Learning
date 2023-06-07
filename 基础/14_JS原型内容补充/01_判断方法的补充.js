var obj = {
    name: "why",
    age: 18
}

var info = Object.create(obj, {
    address: {
        value: "北京市",
        enumerable: true
    }
})

console.log(info)
console.log(info.__proto__)

//1. 判断某个属性 是否由自己所有

// hasOwnProperty - 对象是否有某一个自己的属性(不是在原型上的属性)
console.log(info.hasOwnProperty("address"))
console.log(info.hasOwnProperty("name"))


//2. in 操作符: 不管在当前对象还是原型中返回的 都是 true
// 判断某个属性是否在某个对象或者对象的原型上
console.log("address" in info)
console.log("name" in info)

for(var key in info) {
    console.log(key) // address, name, age
}



