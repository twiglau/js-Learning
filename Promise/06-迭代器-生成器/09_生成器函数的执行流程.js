// 生成器函数
/**
 * 当遇到 yield 时候是 暂停函数的执行
 * 当遇到 return 时候是 生成器就停止执行
 */
function* foo() {
    console.log("函数开始执行~")
    const value1 = 100
    console.log("第一段代码:",value1)
    yield

    const value2 = 200
    console.log("第二段代码:",value2)
    yield

    const value3 = 300
    console.log("第三段代码:",value3)
    yield

    console.log("函数执行结束~")
    // 相当于 return undefined
}

// generator 本质上是一个特殊的 iterator
const generator = foo()
console.log("返回值1: ", generator.next()) // { value: undefined, done: false }
console.log("返回值2: ", generator.next()) // { value: undefined, done: false }
console.log("返回值3: ", generator.next()) // { value: undefined, done: false }
console.log("返回值4: ", generator.next()) // { value: undefined, done: true }


function* foo1() {
    console.log("函数开始执行~")
    const value1 = 100
    console.log("第一段代码:",value1)
    yield value1

    const value2 = 200
    console.log("第二段代码:",value2)
    yield value2 => { value2 * 2 }

    const value3 = 300
    console.log("第三段代码:",value3)
    yield value3

    console.log("函数执行结束~")
    return 400
}



const generator1 = foo1()
console.log("返回值1: ", generator1.next()) // { value: 100, done: false }
console.log("返回值2: ", generator1.next()) // { value: [Function], done: false }
console.log("返回值3: ", generator1.next()) // { value: 300, done: false }
console.log("返回值4: ", generator1.next()) // { value: 400, done: true }