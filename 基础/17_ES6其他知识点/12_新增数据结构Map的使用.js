

// 1. JavaScript中对象中是不能使用对象来作为key的
const obj = { name: "lau" }
const obj2 = { name: "kk" }

// 用对象转成字符串形式 '[object object]` 作为key来使用的
// obj 和 obj2 转成 字符串 是一样的
const info = {
    [obj]: "aaa",
    [obj2]:"bbb"
}

console.log(info)


// 2. Map允许对象类型来作为key
const map = new Map()
map.set(obj, "aaa")
map.set(obj2, "bbb")
map.set(1, "ccc")
console.log(map)

// 2.1
const map2 = new Map([[obj, "aaa"], [obj2, "bbb"], [2, "ddd"]])
console.log(map2)


// 3. 常见的属性和方法
console.log(map2.size)

// set
map2.set("why", 'eee')
console.log(map2)

// get(key)
console.log(map2.get("why"))

// has
console.log(map2.has("why"))

// delete(key)
map2.delete("why")
console.log(map2)

// clear
// map2.clear()
// console.log(map2)


// 4. 遍历map
map2.forEach((item, key) => {
    console.log(item, key)
})

for(const item of map2) {
    console.log(item[0], item[1])
}
for(const [key, value] of map2) {
    console.log(key, value)
}