

// ES6 之前, 对象的属性名(key)
// var obj = {
//     name: "lau",
//     friend: { name: "coco" },
//     age: 18
// }

// // 覆盖掉前面的属性
// obj['name'] = "james"
// console.log(obj)


// ES6中symbol的使用
const s1 = Symbol()
const s2 = Symbol()

console.log(s1 === s2)

// ES2019(ES10), Symbol还有一个描述(description)
const s3 = Symbol("aaa")
console.log(s3.description)

// 3. Symbol值作为key
// 3.1 在定义对象字面量时使用
const obj = {
    [s1]: "abc",
    [s2]: "cba"
}

// 3.2 新增属性
obj[s3] = "nba"

// 3.3 Object.defineProperty 方式
const s4 = Symbol()
Object.defineProperty(obj, s4, {
    enumerable: true,
    configurable: true,
    writable: true,
    value: "mba"
})

console.log(obj[s1], obj[s2], obj[s3], obj[s4])
// 注意: 不能通过 . 语法获取

// 4. 使用Symbol作为key的属性名, 在遍历/Object.keys等中是获取不到这些Symbol值的
console.log(Object.keys(obj))
console.log(Object.getOwnPropertyNames(obj))
console.log(Object.getOwnPropertySymbols(obj))

const sKeys = Object.getOwnPropertySymbols(obj)
for(const sKey of sKeys) {
    console.log(obj[sKey])
}


// 5. Symbol.for(key)
const sa = Symbol.for("aaa")
const sb = Symbol.for("aaa")
console.log(sa === sb)

const key = Symbol.keyFor(sa)
const sc = Symbol.for(key)
console.log(key)
console.log(sa === sc)

