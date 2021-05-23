//1. JavaScript下:
console.log( 3 + true)
//1.1 算术运算符 - ,  * , / 和  % 在计算之前都会尝试将其参数转换为数字.
//1.2 而运算符 + 更加微妙, 因为它即重载了数字相加,有重载了字符串连接操作.
//具体是数字相加还是字符串连接,这取决于其参数的类型:
console.log('=====>')
console.log( 2 + 3)
console.log('hello' + ' world')
//合并一个数组和一个字符串会发生什么?
console.log("2" + 3)
console.log(2 + "3")
//类似这样的混合表达式令人困惑,因为JavaScript对操作顺序是敏感的.
console.log( 1 + 2 + "3")
console.log( (1 + 2) + "3")

//1.3标准的库函数isNaN也不是很可靠,因为它带有自己的隐式强制转换,在测试其参数之前,会将
//参数转换为数字(isNaN函数的一个更精确的名称可能是 coercesToNaN).
//如果你已经知道一个值的数字,你可以使用isNaN函数测试它是否为NaN.
console.log('=====>')
console.log(isNaN(NaN))
//但是对于其他绝对不是NaN,但会被强制转换为NaN的值,使用isNaN方法是无法区分的.
console.log(
    isNaN("foo"),
    isNaN(undefined),
    isNaN({}),
    isNaN({valueOf:"foo"})
)
//幸运的是,有一个既简单有可靠的习惯用法用于测试NaN,
//由于NaN是JavaScript中唯一一个不等于其自身的值,因此,你可以随时通过检查一个值是否
//等于自身的方式来测试该值是否为NaN
var a = NaN;
console.log( a !== a);
var b = "foo";
console.log( b !== b);
var c = undefined;
console.log( c !== c);
var d = {};
console.log( d !== d);
var e = { valueOf: "foo"}
console.log( e !== e);

//一个清晰命名的实用工具函数
function isReallyNaN(x){
    return x !== x;
}
