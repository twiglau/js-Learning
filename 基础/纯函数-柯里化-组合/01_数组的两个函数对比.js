var names = ["abc","cba","nba","dna"];

// slice只要给它输入一个start/end, 那么对于同一个数组来说,它会给我们返回确定的值
// slice函数本身它是不会修改原来的值
// slice -> this
// slice函数本身就是一个纯函数
var newNames1 = names.slice(0, 3)
console.log(newNames1)

// splice在执行时, 有修改调用的数组对象本身, 修改的这个操作就是产生的副作用
// splice 不是一个纯函数
var newNames2 = names.splice(2)
console.log(newNames2, names)