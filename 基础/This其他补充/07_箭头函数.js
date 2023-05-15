// 1. 编写箭头函数
// 1> (): 参数
// 2> =>: 箭头
// 3> {}: 函数的执行体
var foo = (item) => {}

// 高阶函数在使用时, 也可以传入箭头函数
var nums = [10, 20, 45, 78]
nums.forEach((item, index, arr) => {})

// 箭头函数有一些常见的简写:
// 1. 如果参数只有一个, ()可以省略
nums.forEach(item => {
    console.log(item)
})

// 2. 如果函数执行体只有一行代码, 那么{}可以省略
// 强调: 并且他会默认将这行代码的执行结果作为返回值
nums.forEach(item => console.log(item))
var newNums = nums.filter(item => item % 2 === 0)
console.log(newNums)

// filter/map/reduce
var results = nums.filter(item => item%2 === 0)
                  .map(item => item*100)
                  .reduce((preValue, item) => preValue + item)

// 3. 如果一个箭头函数, 只有一行代码, 并且返回一个对象, 这个时候如何编写简写
var bar = () => {
    return { name: 'tw', age: 18}
}
var bar = () => ({ name: 'twig', age: 18})