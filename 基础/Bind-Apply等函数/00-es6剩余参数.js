// 1. 剩余参数
function sum(...args) {
  console.log(args)
  // [10]
  // [10, 20]
  // [10, 20, 30, 40, 50]
}
sum(10)
sum(10, 20)
sum(10, 20, 30, 40, 50)

// 2. 展开运算符 spread
var names = ["abc","cba", "nba"]
var newNames = [...names]