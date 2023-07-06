
// 一个迭代器
const iterator = {
    next: function() {
        return { done: true, value: 123 }
    }
}

// 数组
const names = ["abc", "cba", "nba"]


// 创建一个迭代器对象来访问数组
let index = 0
const namesIterator = {
    next: function() {
        // return { done: false, value: "abc" }
        // return { done: false, value: "cba" }
        // return { done: false, value: "nba" }
        // return { done: true, value: undefined }
        if (index < names.length) {
            return { done:false, value: names[index++] }
        } else {
            return { done: true, value: undefined }
        }
    }
}

console.log(namesIterator.next())
console.log(namesIterator.next())
console.log(namesIterator.next())
console.log(namesIterator.next())
console.log(namesIterator.next())
console.log(namesIterator.next())