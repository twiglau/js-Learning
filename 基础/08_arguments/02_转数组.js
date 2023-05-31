function foo(num1, num2) {
    console.log(arguments)
    
    // 1. arguments 不是数组, 但是需要调用 数组的slice 函数, slice 函数 this 是 arguments
    var newArr = Array.prototype.slice.call(arguments)
    console.log(newArr)

    // 2. 隐式绑定 < 显式绑定
    var newArr3 = [].slice.call(arguments)
    console.log(newArr3)

    // 3. ES6语法
    var newArr4 = Array.from(arguments)
    console.log(newArr4)

    // 4. ...展开运算符
    var newArr5 = [...arguments]
    console.log(newArr5)
}

foo(10, 20, 30, 40, 50)


// slice 实现
Array.prototype.hyslice = function(start, end) {
    var arr = this
    start = start || 0
    end = end || arr.length
    var newArray = []
    for(var i = start; i < end; i++) {
        newArray.push(arr[i])
    }
    return newArray
}

var newArray = Array.prototype.hyslice.call(["aaaa","bbbb","cccc"], 1, 3)
console.log(newArray)