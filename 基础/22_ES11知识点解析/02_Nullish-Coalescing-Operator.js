// 空值合并运算 ??

let foo  = null
// const bar = foo || "default"

const bar = foo ?? "default value"
console.log(foo, bar)