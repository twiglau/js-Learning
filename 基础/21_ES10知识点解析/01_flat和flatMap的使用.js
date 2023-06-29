
// 1. flat 的使用
const nums = [10, 20, [2, 9], [[30, 40], [10, 45]], 78, [55, 88]]

const newNums1 = nums.flat()
console.log(newNums1)
const newNums2 = nums.flat(2)
console.log(newNums2)


// 2. flatMap的使用
const nums2 = [10, 20, 30]
const newNums3 = nums.flatMap(item => {
    return item * 2
})

console.log(newNums3)


// 3. flatMap的应用场景
const messages = ["Hello world", "你好啊 lalaai", "my name is twigliu"]
const words = messages.flatMap(item => {
    return item.split(" ")
})
console.log(words)