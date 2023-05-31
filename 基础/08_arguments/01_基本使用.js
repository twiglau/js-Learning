function foo(num1, num2, num3) {
    // 类数组对象中(像数组,本质上是一个对象): arguments
    console.log(arguments) //Arguments(5)
    console.log(num1, num2, num3)

    // 1. 常见的对arguments的操作是三个
    console.log(arguments.length)

    // 2. 根据索引值
    console.log(arguments[2])

    // 3. callee获取当前arguments所在的函数
    console.log(arguments.callee)
}

foo(1,2,3,4,5)