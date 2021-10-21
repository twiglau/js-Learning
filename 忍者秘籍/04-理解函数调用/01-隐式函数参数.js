/**
 * 1. arguments 参数
 * arguments对象有一个名为 length 的属性, 表示实参的确切个数. 通过数组索引
 * 的方式获取单个参数的值, 例如, arguments[2] 将获取第三个参数. 具体的使用
 * 方式可参考如下: 
 */
function whatever(a,b,c) {
    assert(a === 1, 'The value of a is 1');
    assert(b === 2, 'The value of b is 2');
    assert(c === 3, 'The value of c is 3');
    assert(arguments.length === 5, "We've passed in 5 parameters");
    assert(arguments[0] === a, 'The first argument is assigned to a');
    assert(arguments[1] === b, 'The second argument is assigned to b');
    assert(arguments[2] === b, 'The third argument is assigned to c');
    assert(arguments[3] === 4, 'We can access the fourth argument');
    assert(arguments[4] === 5, 'We can access the fifth argument');
}
whatever(1,2,3,4,5);

// 注意: arguments 是一个类数组对象
// 使用 arguments 参数对所有函数参数执行操作
function sum() {
    var sum = 0;
    for(var i = 0; i < arguments.length; i++) {
        sum += arguments[i];
    }
    return sum;
}

/**
 * 2. arguments对象作为函数参数的别名
 * arguments参数有一个有趣的特性: 它可以作为函数参数的别名. 例如, 如果为 arguments[0] 赋一个新值,
 * 那么,同时也会改变第一个参数的值,具体如下.
 */
function infiltrate(person) {
    assert(person === 'gardener','The person is a gardener');
    assert(arguments[0] === 'gardener','The first argument is a gardener');
    arguments[0] = 'ninja';
    assert(person === 'ninja','The person is a ninja now');
    assert(arguments[0] === 'ninja','The first argument is a ninja');
    person = 'gardener';
    assert(person === 'gardener','The person is a gardener once more');
    assert(arguments[0] === 'gardener','The first argument is a gardener again');
}
/**
 * 这里可以说明 arguments 对象是如何作为函数参数别名的. 我们定义了一个函数 infiltrate, 它只接
 * 收一个参数person, 接着我们调用它并传入参数gardener. 可以同时通过函数形参 person 和 arguments
 * 对象访问到参数值 gardener.
 * 
 * 将arguments对象作为函数参数的别名使用时会影响代码的可读性, 因此在JavaScript提供的严格模式(strict mode)
 * 中将无法再使用它.
 */
