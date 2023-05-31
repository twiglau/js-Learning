function add(x,y,z) {
    return x + y + z
}

var result = add(10, 20, 30)
console.log(result)

// 1. 柯里化
function sum1(x) {
    return function(y) {
        return function(z) {
            return x + y + z
        }
    }
}

var result1 = sum1(10)(20)(30)
console.log(result1)

// 2. 简化柯里化
var sum2 = x => y => z => {
    return x + y + z 
}

// 3. 简化
var sum3 = x => y => z => x + y + z