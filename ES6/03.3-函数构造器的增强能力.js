/**
 * Function 构造器允许你动态创建一个新函数,但在JS中并不常用. 传给该构造器
 * 的参数都是字符串,它们就是目标函数的参数与函数体,范例:
 */
var add = new Function("first","second","return first + second");
console.log(add(1,1)); //2
/**
 * ES6 增强了 Function 构造器的能力,允许使用默认参数以及剩余参数.对于默认参数来说,
 * 你只需为参数名称添加等于符号以及默认值,正如下例:
 */
var add = new Function("first","second = first","return first + second");
console.log(add(1,1)); //2
console.log(add(1)); //2
/**
 * 在此例中,当只传递了一个参数时, first 的值会被赋给 second 参数,此处的语法与不使用
 * Function 的函数声明一致.
 * 而对剩余参数来说,只需在最后一个参数前添加 ... 即可,就像这样:
 */
var pickFirst = new Function("...args","return args[0]");
console.log(pickFirst(1,2)); //1
/**
 * 此代码创建了一个仅使用剩余参数的函数,让其返回所传入的第一个参数.
 * 默认参数和剩余参数的添加,确保了 Function 构造器拥有与函数声明形式相同的所有能力.
 */