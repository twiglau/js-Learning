const names = ["a", "b", "c"]

console.log(names[Symbol.iterator])
// 1. 获取数组迭代器
const iterator1 = names[Symbol.iterator]()

console.log(iterator1.next())
console.log(iterator1.next())
console.log(iterator1.next())
console.log(iterator1.next())
console.log(iterator1.next())

// 2. Map/Set
const set = new Set()
set.add(10)
set.add(100)
set.add(1000)

console.log(set[Symbol.iterator])
for(const item of set) {
    console.log(item)
}

// 3. 函数中arguments也是一个可迭代对象
function foo(x, y, z) {
    console.log(arguments[Symbol.iterator])
    for(const item of arguments) {
        console.log(item)
    }
}