/**
 * 除了对象之外,JavaScript有5个原始值类型: 布尔值,数字,字符串,null和undefined.
 * 注意:对null类型进行typeof操作得到的结果为 "object",而,ECMScript标准描述其为
 * 一个独特的类型.  同时,标准库提供了构造函数来封装 布尔值, 数字和字符串作为对象.
 * 你可以创建一个String对象,该对象封装了一个字符串值.
 */
console.log (typeof null)
var s = new String("hello");
//1.在某些方面,String对象的行为与其封装的字符串值类似,可通过他与另一个值连接来创建
//字符串.
console.log( s + " world");
//2.也可以提取其引索的子字符串
console.log(s[0]);
//3.但是不同于原始的字符串,String对象是一个真正的对象
console.log(typeof "hello");
console.log(typeof s);
//3.1这是一个重要的区别,意味着你不能使用内置的操作符来比较两个截然不同的String对象的内容
var s1 = new String("hello");
var s2 = new String("hello");
console.log( s1 === s2);
//3.2有个每个String对象都是一个单独的对象,其总是只等于自身,对于非严格相等运算符,结果也是如此:
console.log( s1 == s2);
//3.3这里有另一个隐式转换:
//当对原始值提取属性和进行方法调用时,它表现得就像已经使用了对应的对象类型封装了该值一样.
//3.3.1 String的原型对象有一个toUpperCase方法,可以将字符串转换Wie大写,你就可以对原始字符串值调用这个方法:
console.log("hello".toUpperCase());
//3.3.2 这种隐式封装的一个奇怪后果是你可以对原始值没有属性,但是对其丝毫没有影响:
"hello".someProperty = 17;
console.log("hello".someProperty);
//3.3.3 以上结果是:因为每次隐式封装都会产生一个新的String对象,更新第一个封装对象并不会造成持久
//的影响. 对原始值设置属性的确是没有意义的,但是觉察到这种行为啊是值得的.

/**
 * TIPS
 * ->当做相等比较时,原始类型的封装对象与原始值行为不一样.
 * ->获取和设置原始类型值的属性会隐式地创建封装对象.
 */