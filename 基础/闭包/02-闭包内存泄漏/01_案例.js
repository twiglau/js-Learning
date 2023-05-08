function createFnArray() {
    // 占据的空间是 4M = 4 byte * 1024 * 1024
    var arr = new Array(1024*1024).fill(1)
    return function () {
        console.log(arr.length)
    }
}

// var arrayFn = createFnArray()
var arrayFns = []
for(var i = 0; i < 100; i++) {
    setTimeout(()=> {
        arrayFns.push(createFnArray())
    }, i * 100)
}

setTimeout(() => {
    for( var i = 0; i < 50; i++) {
        setTimeout(() => {
            arrayFns.pop()
        }, 100 * i)
    }
}, 10000)