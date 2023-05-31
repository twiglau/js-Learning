function hyCompose(...fns) {
    var length = fns.length
    for(var i = 0; i < length; i++) {
        if(typeof fns[i] !== 'function') {
            throw new TypeError("Expect argument are functions")
        }
    }
    function compose(...args) {
        var index = 0
        var result = length ? fns[index].apply(this, args) : args
        while(++index < length) {
            result = fns[index].call(this,result)
        }
        return result
    }

    return compose
}
function double(m) {
    return m * 2
}
function square(n) {
    return n * 2
}

var newFn = hyCompose(double, square)
var res = newFn(10)
console.log(res)