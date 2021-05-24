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

//2.一个清晰命名的实用工具函数
function isReallyNaN(x){
    return x !== x;
}

//3.对象也可以被强制转换为原始值,最常见的用法是转换为字符串:
console.log("the Math object:" + Math)
console.log("the JSON object:" + JSON) 
//转换为字符串
console.log(Math.toString(),JSON.toString())
//转换为数字,对象也可以通过其valueOf方法转换为数字.
console.log("J" + {toString:function() { return "S";}})
console.log(2 * {valueOf:function() {return 3;}})
//当一个对象同时包含toString和valueOf方法时,运算符 + 应该调用哪个方法并不
//明显---- 做字符串连接还是加法应该根据参数的类型,但是存在隐式的强制转换.
var obj = {
    toString:function(){
        return "[object MyObject]";
    },
    valueOf:function(){
        return 17
    }
};
console.log("object: " + obj)
//以上例子说明,valueOf方法才真正是为那些代表数值的对象(如Number对象)而设计的.
//不管是对象的链接还是对象的相加,重载的运算符 + 总是一致的行为.
//一般情况下,字符串的强制转换远比数字的强制转换更常见,更有用.

//4.最后一种强制转换有时称为 真值运算(truthiness).
//大多数的JavaScript值都为真值(truthy),也就是能隐式地转换为true.对于字符串和数字
//以外的其他对象, 真值运算不会隐式调用任何强制转换方法.JavaScript中有7个假值:
//false, 0, -0, "", NaN, null 和 undefined. 其他所有的值都为真值.
//由于数字和字符串可能为假值. 因此,使用真值运算检查函数或者对象属性是否已定义不是绝对安全
//的. 
function point(x,y){
    if(!x){
        x = 320;
    }
    if(!y){
        y = 240;
    }
    return {x: x, y: y};
}
//4.1此函数忽略任何为假值的参数,包括0:
console.log(point(0,0));
//4.2检查参数是否为undefined更为严格的方式是使用typeof:
function point_x(x,y){
    if(typeof x === 'undefined'){
        x = 320;
    }
    if(typeof y === 'undefined'){
        y = 240;
    }
    return {x: x, y: y};
}
//4.2.1 此版本的point函数可以正确地识别 0 和 undefined.
console.log(point());
console.log(point(0,0));
//4.3 另一种方式是与undefined进行比较.
if(x === undefined) {}

/**
 * 1.类型错误可能被隐式的强制转换所隐藏.
 * 2.重载的运算符 + 是进行加法运算还是字符串操作取决于其参数类型
 * 3.对象通过valueOf()方法强制转换为数字,通过toString方法强制转换为字符串.
 * 4.具有valueOf()方法的对象应该实现toString方法,返回一个valueOf方法产生的数字的
 *   字符串表示.
 * 5.测试一个值是否为未定义的值,应该使用typeof或者与undefined进行比较而不是使用真值运算.
 */

