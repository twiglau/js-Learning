var names = ["abc","cba","nba","dna"];

// slice只要给它输入一个start/end, 那么对于同一个数组来说,它会给我们返回确定的值
// slice函数本身它是不会修改原来的值
// slice -> this
var newNames1 = names.slice(0, 3)
console.log(newNames1)