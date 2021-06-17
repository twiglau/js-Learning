/**
 * 类与函数有相似之处,即它们都有两种形式:声明与表达式. 函数声明与类声明都以适当的
 * 关键词为起始(分别是 function 与 class),随后是标识符(即函数名或类名).函数具
 * 有一种表达式形式,无须在 function 后面使用标识符; 类似的,类也有不需要标识符的
 * 表达式形式.类表达式被设计用于变量声明,或可作为参数传递给函数.
 */

/**
 * 1.基本的类表达式
 * 此处是与上例中的 PersonClass 等效的类表达式.
 */
let PersonClass = class {
    //等价于PersonType 构造器
    constructor(name){
        this.name = name;
    }
    //等价于 PersonType.prototype.sayName
    sayName(){
        console.log(this.name);
    }
};
let person = new PersonClass("Nicholas");
person.sayName(); //输出 "Nicholas"
console.log(person instanceof PersonClass);
console.log(person instanceof Object);
console.log(typeof PersonClass);
console.log(typeof PersonClass.prototype.sayName);
/**
 * 类表达式不需要在 class 关键字后使用标识符,除了语法差异,类表达式的功能等价于类声明.
 * 使用类声明还是类表达式,主要是代码风格问题. 相对于函数声明与函数表达式之间的区别,类
 * 声明与类表达式都不会别提升,因此对代码运行时的行为影响甚微.
 */

/**
 * 2.具名类表达式
 * 以上示例使用了一个匿名的类表达式,不过就像函数表达式那样,也可以为类表达式命名,为此需要
 * 在 class 关键字后添加标识符,如下:
 */
let PersonClass1 = class PersonClass2 {
    //等价于 PersonType 构造器
    constructor(name){
        this.name = name;
    }
    //等价于 PersonType.prototype.sayName
    sayName(){
        console.log(this.name);
    }
};
console.log(typeof PersonClass1);
console.log(typeof PersonClass2);
/**
 * 此例中的类表达式被命名为 PersonClass2. PersonClass2 标识符只在类定义内部存在,因此
 * 只能用在类方法内部(如本例的 sayName() 内). 在类的外部, typeof PersonClass2 的结果
 * 为 "undefined", 这是因为外部不存在 PersonClass2 绑定. 要理解为何如此,请查看未使用
 * 类语法的等价声明:
 */

//直接等价于 PersonClass1 具名的类表达式
let PersonClass3 = (function(){
    "use strict";

    const PersonClass2 = function(name){
        //确认函数被调用时使用了 new
        if(typeof new.target === "undefined"){
            throw new Error("Constructor must be called with new.");
        }
        this.name = name;
    }

    Object.defineProperty(PersonClass2.prototype,"sayName",{
        value:function(){

            //确认函数被调用时没有使用 new
            if(typeof new.target !== "undefined"){
                throw new Error("Method cannot be called with new.");
            }
            console.log(this.name);
        },
        enumerable:false,
        writable:true,
        configurable:true
    });

    return PersonClass2;
}());
/**
 * 创建具名的类表达式稍微改变了在 JS 引擎内部发生的事. 对于类声明来说,外部绑定(用 let 定义)
 * 与内部绑定 ( 用 const 定义) 有着相同的名称. 而类表达式可在内部使用 const 来定义它的不同
 * 名称,因此此处的 PersonClass2 只能在类的内部使用.
 * 
 * 尽管具名类表达式的行为异于具名函数表达式,但它们之间仍然有许多相似点.二者都能被当做值来使用,
 * 这开启了许多可能性.
 */