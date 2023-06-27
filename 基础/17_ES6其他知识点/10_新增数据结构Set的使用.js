// 10, 20, 40, 333, 222, 18

// 1. 创建Set结构
const set = new Set()
set.add(10)
set.add(20)
set.add(40)
set.add(333)

set.add(10) // 只有一个10

// 2. 添加对象时特别注意:
// set.add({})
// set.add({}) // 两个对象分别有自己的内存地址

const obj = {}
set.add(obj)
set.add(obj) // 同一个引用对象, 一个内存地址

console.log(set)

// 3. 对数组去重(去除重复的元素)
const arr = [33, 10, 26, 30, 33, 26]
// const newArr = []
// for(const item of arr) {
//     if(newArr.indexOf(item) !== -1) {
//         newArr.push(item)
//     }
// }
// console.log(newArr)

const arrSet = new Set(arr)
const newArr = Array.from(arrSet)
const newArr1 = [...arrSet]
console.log(arrSet, newArr, newArr1)


// 4. size属性
console.log(arrSet.size)

// 5. Set的方法
arrSet.add(100)
console.log(arrSet)

arrSet.delete(33)
console.log(arrSet)

// has
console.log(arrSet.has(100))

// clear
arrSet.clear()
console.log(arrSet)

// 6. 对set进行遍历
arrSet.forEach(item => {
    console.log(item)
})

for(const item of arrSet) {
    console.log(item)
}
