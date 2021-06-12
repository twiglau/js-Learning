/**
 * ES6 定义了 "知名符号" 来代表JS中的一些公共行为,而这些行为此前被人问只能是内部操作,
 * 每个知名符号都对应全局 Symbol 对象的一个属性,如 Symbol.create.
 * 
 * 这些知名符号是:
 * >Symbol.hanInstance : 供instanceof 运算符使用的一个方法,用于判断对象继承关系.
 * >Symbol.isConcatSpreadable : 一个布尔类型值,在集合对象作为参数传递给Array.prototype.concat()
 *  方法时,指示是否要将该集合的元素扁平化.
 * >Symbol.iterator :返回迭代器(参阅第七章)的一个方法
 * >Symbol.match :供String.prototype.replace() 函数使用的一个方法,用于替换子字符串.
 * >Symbol.search :供String.prototype.search() 函数使用的一个方法,用于定位子字符串.
 * >Symbol.species :用于产生派生对象(参阅第八章)的构造器
 * >Symbol.split :供String.prototype.split() 函数使用的一个方法,用于分割字符串.
 * >Symbol.toPrimitive :返回对象所对应的基本类型值的 一个方法
 * >Symbol.toStringTag :供String.prototype.toString() 函数使用的一个方法,用于创建对象的描述信息.
 * >Symbol.unscopables :一个对象,该对象的属性指示了那些属性名不允许被包含在 with 语句中.
 */

/**
 * 1. Symbol.hasInstance 属性
 * 每个函数都具有一个 Symbol.hasInstance 方法,用于判断指定对象是否为本函数的一个实例.
 * 这个方法定义在 Function.prototype 上, 因此所有函数都继承了面对 instanceof 运算符
 * 时的默认行为.  Symbol.hasInstance 属性自身是 不可写入,不可配置,不可枚举的,从而保证它不会被错误
 * 地重写
 * 
 * Symbol.hanInstance 方法只接受单个参数,即需要检测的值. 如果该值是本函数的一个实例,则方法
 * 会返回 true.
 * 理解如下代码:
 */
let obj = [];
console.log(obj instanceof Array);
console.log(Array[Symbol.hasInstance](obj));
//ES6 本质上将 instanceof 运算符重定义为上述方法调用的简写语法,这样使用 instanceof 便会触发一次方法调用,
//实际上允许你改变运算符的工作

/**
 * 例如,假设你想定义一个函数,使得任意对象都不会被判断为该函数的一个实例,你可采用硬编码的方式让该函数的
 * Symbol.hasInstance 方法始终返回 false,如下:
 */
function MyObject() {
    // ...
}
Object.defineProperty(MyObject,Symbol.hasInstance,{
    value:function(v) {
        return false;
    }
});
let obj1 = new MyObject();
console.log(obj1 instanceof MyObject);
/**
 * 要重写一个不可写入的属性,你必须像这个例子一样使用 Object.defineProperty(). 此代码将 Symbol.hasInstance 
 * 方法重写为一个始终返回 false 的函数,所以此后即使传入的对象确实是 MyObject 类的一个实例, instanceof 运算符
 * 仍然会返回 false.
 * 
 * 当然,你可以基于各种条件来决定一个值是否应当被判断为某个类的实例,例如,将介于 1 到 100 之间的数值认定为一个特殊
 * 的数值类型,为此你可以书写如下代码:
 */
function SpecialNumber() {
    // empty
}

Object.defineProperty(SpecialNumber,Symbol.hasInstance,{
    value:function(v) {
        return ( v instanceof Number) && ( v >= 1 && v <= 100);
    }
});
let two = new Number(2),zero = new Number(0);
console.log(
    two instanceof SpecialNumber,
    zero instanceof SpecialNumber
);
/**
 * 此代码重写了 Symbol.hasInstance 方法,在目标对象是数值对象的实例,并且其值介于 1 到 100 之间时,返回 true.
 * 于是, SpecialNumber 类会把变量 two 判断为自身的一个实例,即使二者之间并不存在直接的定义关联. 需要注意的是:
 * instanceof 的操作数必须是一个对象,以便触发 Symbol.hasInstance 调用; 若操作数并非对象, instanceof 只会简单
 * 地返回 false.
 * 
 * 你可以重写所有的内置函数(例如 Date 或 Error ) 的 Symbol.hasInstance 属性,但并不建议这么做,因为这会让你的
 * 代码变得难以预测而有混乱,最好仅在必要时对你自己的函数重写 Symbol.hasInstance.
 */

/**
 * 2. Symbol.isConcatSpreadable
 * JS在数组上设计了 concat() 方法用于将两个数组连接到一起,此处示范了如何使用该方法:
 */
let colors1 = ["red","green"],colors2 = colors1.concat(["blue","black"]);
console.log(colors2.length);console.log(colors2);
/**
 * 此代码将一个新数组连接到 color1 末尾,并创建了 colors2, 后者包含了前两个数组中所有的项. 不过, concat() 方法
 * 也可以接受非数组的参数,此时这些参数只是简单地被添加到数组末尾,如:
 */
let colors3 = ["red","green"],colors4 = colors3.concat(["blue","black"],"brown");
console.log(colors4.length);console.log(colors4);

/**
 * 此代码向 concat() 方法传递了一个额外参数 "brown", 使得它成为数组 color4 的第5项.为何数组类型的参数与字符串类型
 * 的参数与字符串类型的参数会被区别对待? 这是因为 JS 规范要求此时数组类型的参数需要被自动分离出各个子项,而其他类型的参
 * 数无需如此处理. 在 ES6 之前,没有任何手段可以改变这种行为.
 * 
 * Symbol.isConcatSpreadable 属性是一个布尔类型的属性,它表示目标对象拥有长度属性与数值类型的键,并且数值类型键所
 * 对应的属性值在参与 concat() 调用时需要被分离为个体. 该符号与其他的知名符号不同,默认情况下并不会作为任意常规对象
 * 的属性. 它只出现在特定类型的对象上,用来标示该对象在作为 concat() 参数时应如何工作,从而有效改变该对象的默认行为.
 * 你可以用它来定义任意类型的对象,让该对象在参与 concat() 调用时能够表现的像数组一样
 * 如下:
 */
let collection = {
    0:"Hello",
    1:"world",
    length:2,
    [Symbol.isConcatSpreadable]:true
};
let messages = ["Hi"].concat(collection);
console.log(messages.length,messages);
/**
 * 本例中的 collection 对象的特征类似于数组: 拥有长度属性以及两个数值类型的键,并且 Symbol.isConcatSpreadable
 * 属性值被设为 true, 用于指示该对象在被添加到数组时应该使用分离的属性值,当 collection 对象被传递给 concat()方
 * 法时, "Hello" 与 "world" 被分离为独立的项,并跟在 "hi" 元素之后.
 * 
 * 你也可以将数组的子类的 Symbol.isConcatSpreadable 属性值设为 false, 用于在 concat() 调用是避免项目被分离.
 * 子类的介绍位于第八章.
 */

/**
 * 3. Symbol.match, Symbol.replace, Symbol.search 与 Symbol.split
 * 在JS中,字符串与正则表达式有着密切的联系,尤其是字符串具有几个可以接受正则表达式作为参数的方法:
 * > match(regex) :判断指定字符串是否与一个正则表达式相匹配
 * > replace(regex,replacement) :对正则表达式的匹配结构进行替换;
 * > search(regex) :在字符串内对正则表达式的匹配结构进行定位;
 * > split(regex) :使用正则表达式将字符串分割为数组.
 */
/**
 * 这些与正则表达式交互的方法,在ES6之前其实现细节是对开发者隐藏的,是的开发者无法将自定义对象模拟成正则表达式(并将它们
 * 传递给字符串的这些方法). 而ES6定义了4个符号以及对应的方法,将原生行为外包到内置的 RegExp 对象上.
 * 
 * 这4个符号表示可以将正则表达式作为字符串对应方法的第一个参数传入, Symbol.match 对应 match 方法, Symbol.replace
 * 对应 replace(), Symbol.search 对应 search(), Symbol.split 则对应 split(),这些符号睡醒被定义在 RegExp.prototype
 * 上作为默认实现,以供对应的字符串方法使用.
 * 
 * 了解这些后,就可以创建一个一个类似于正则表达式的对象,以便配合字符串的那些方法使用,在代码中使用下面的符号函数即可:
 * 
 * >Symbol.match :此函数接受一个字符串参数,并返回一个包含匹配结果的数组;若匹配失败,则返回 null.
 * >Symbol.replace :此函数接受一个字符串参数与一个替换用的字符串,并返回替换后的结果字符串
 * >Symbol.search :此函数接受一个字符串参数,并返回匹配结果的数值索引;若匹配失败,则返回 -1.
 * >Symbol.split :此函数接受一个字符串参数,并返回一个用匹配值分割而成的字符串数组.
 * 
 * 在对象上定义这些属性,允许你创建能够进行模式匹配的对象,而无需使用正则表达式,并且允许在任何需要正则表达式的方法中使用该对象.
 * 如下例:
 */
let hasLengthOf10 = {
    [Symbol.match]:function(value) {
        return value.length === 10 ? [value.substring(0,10)] : null;
    },
    [Symbol.replace]:function(value,replacement) {
        return value.length === 10 ?
               replacement + value.substring(10) : value;
    },
    [Symbol.search]:function(value) {
        return value.length === 10 ? 0 : -1
    },
    [Symbol.split]:function(value) {
        return value.length === 10 ? ["", ""] : [value];
    }
};
let message1 = "Hello world";
let message2 = "Hello John";

let match1 = message1.match(hasLengthOf10),match2 = message2.match(hasLengthOf10);
console.log(match1,match2);

let replace1 = message1.replace(hasLengthOf10,"Howdy!"),replace2 = message2.replace(hasLengthOf10,"Howdy!");
console.log(replace1,replace2);

let search1 = message1.search(hasLengthOf10),search2 = message2.search(hasLengthOf10);
console.log(search1,search2);

let split1 = message1.split(hasLengthOf10),split2 = message2.split(hasLengthOf10);
console.log(split1,split2);


/**
 * 3. Symbol.toPrimitive
 * JS经常在使用特定运算符的时候试图进行隐式转换,以便将对象转换为基本类型值.
 * 例如,当你使用相等( == )运算符来对字符串与对象进行比较的时候,该对象会在比较之前被转换为一个基本类型值.到底
 * 转换为什么基本类型值,在此前属于内部操作,而ES6则通过Symbol.toPrimitive 方法将其暴露出来,以便让对应方法
 * 可以被修改.
 * 
 * Symbol.toPrimitive 方法被定义在所有常规类型的原型上,规定了在对象被转换为基本类型值的时候会发生什么,
 * 当需要转换时, Symbol.toPrimitive 会被调用,并按照规范传入一个提示性的字符串参数
 * 该参数有3种可能:
 * > 当参数为 "number" 的时候, Symbol.toPrimitive 应当返回一个数值
 * > 当参数值为 "string" 的时候,应当返回一个字符串;
 * > 当参数为 "default" 的时候,对返回值类型没有特别要求.
 * 
 * 对于大部分常规对象, "数值模式" 依次会有以下行为:
 * >调用 valueOf() 方法,如果方法返回值是一个基本类型值,那么返回它;
 * >否则,调用 toString() 方法,如果方法返回值是一个基本类型值,那么返回它;
 * >否则,抛出错误
 * 
 * "字符串模式"依次会有以下行为:
 * >调用 toString()方法,如方法返回值是一个基本类型值,则返回它;
 * >调用 valueOf()方法,如方法返回值一个基本类型值,则返回它;
 * >否则,抛出错误
 * 
 * 在多数情况下,常规对象的默认模式都等价于数值模式(只有 Date 类型例外,
 * 它默认使用字符串模式).通过定义 Symbol.toPrimitive 方法,你可以重写这些默认的转换行为.
 * 
 * "默认模式"只在使用 == 运算符, +运算符,或者传递单一参数给 Date 构造器的时候被使用,而大部分运算符
 * 都使用字符串模式或是数值模式
 * 
 * 使用 Symbol.toPrimitive 属性并将一个函数赋值给它,便可以重写默认的转换行为,例如:
 */
function Temperature(degrees) {
    this.degrees = degrees;
}
Temperature.prototype[Symbol.toPrimitive] = function(hint) {
    switch(hint){
        case "string":
            return this.degrees + "\u00b0"; //温度符号
        case "number":
            return this.degrees;
        case "default":
            return this.degrees + " degrees";
    }
};
let freezing = new Temperature(32);
console.log(freezing + "!");
console.log(freezing / 2);
console.log(String(freezing));
/**
 * 这段脚本定义了一个 Temperature 构造器,并重写了其原型上的 Symbol.toPrimitive 方法.返回值会依据方法的提示
 * 性参数而有所不同,可以使用字符串模式,数值模式或是默认模式,而该提示性参数会在调用时由JS引擎自动填写.
 * 字符串模式中, Temperature 函数返回的温度会附带这 Unicode 温度符号; 数值模式之后返回温度数值;而
 * 默认模式中,返回的温度会附带这字符串 "degrees".
 */

/**
 * 4.Symbol.toStringTag
 * ES6通过Symbol.toStringTag 重定义了相关行为,该符号代表了所有对象的一个属性,定义了 Object.prototype.toString.call()
 * 被调用时应当返回什么值.对于数组来说,在 Symbol.toStringTag 属性中存储了 "Array" 值,于是该函数的返回值也就是 "Array".
 * 同样,你可以在自设对象上定义 Symbol.toStringTag 的值:
 */
function Personive(name) {
    this.name = name;
}
Personive.prototype[Symbol.toStringTag] = "Personive";

Personive.prototype.toString = function() {
    return this.name;
}
let me = Personive("Nicholas");
console.log(
    me.toString(),
    Object.prototype.toString.call(me)
)