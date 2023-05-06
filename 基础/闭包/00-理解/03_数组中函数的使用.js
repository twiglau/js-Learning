var nums = [10, 5, 11, 100, 55]

var newNums = []
for(var i = 0; i < nums.length; i++) {
    var num = nums[i]
    if(num%2 == 0) {
        newNums.push(num)
    }
}
console.log(newNums)

// 函数 function: 独立的 function, 那么称之为一个函数
// 方法 method: 当我们一个函数属于某一个对象时, 我们称这个函数是这个对象的方法

// filter: 过滤
var newNums1 = nums.filter(function(item, index, arr) {
    return item % 2 === 0
})
console.log(newNums1)

// map: 映射
var newNums2 = nums.map(function(item) {
    return item
})
console.log(newNums2)

// forEach: 迭代
nums.forEach(function(item) {
    console.log(item)
})

// reduce: