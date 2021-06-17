/**
 * 类在ES6中最简单的形式就是类声明,它看起来很像其他语言中的类.
 */

/**
 * 1.基本的类声明
 * 类声明以 class 关键字开始,其后是类的名称;剩余部分的语法看起来就像对象字面量中
 * 方法简写,并且在方法之间不需要使用逗号.如下:
 */
class PersonClass {
    //等价于 PersonType 构造器
    constructor(name){
        this.name = name;
    }

    //等价于 PersonType.prototype.sayName
    sayName(){
        console.log(this.name);
    }
}
let person = new PersonClass("Nicholas");
person.sayName();
console.log(person instanceof PersonClass);
console.log(person instanceof Object);
console.log(typeof PersonClass);
console.log(typeof PersonClass.prototype.sayName);
/**
 * 这个 PersonClass 类声明的行为非常类似上个例子中的 PersonType. 类声明允许你在其中
 * 使用特殊的 constructor 方法名称直接定义一个构造器,而不需要先定义一个函数再把它当做
 * 构造器使用.由于类的方法使用了简写语法,于是就不再需要使用 function 关键字. constructor
 * 之外的方法名称则没有特别的含义,因此可以随你高兴自由添加方法.
 * 
 * 自有属性(Own properties): 该属性出现在实例上而不是原型上,只能在类的构造器或方法内部进行
 * 创建.在本例中,name 就是一个自有属性.
 * 
 * 建议:
 * 在构造函数内创建所有可能出现的自有属性,这样在类中声明变量就会被限制在单一位置.
 */

/**
 * 相对于已有的自定义类型声明方式来说,类声明仅仅是以它为基础的一个语法糖. PersonClass
 * 声明实际上创建了一个拥有 constructor 方法及其行为的函数,这也是 typeof PersonClass
 * 会得到 "function" 结构的原因. 此例中的 sayName() 方法最终也成为 PersonClass.prototype
 * 上的一个方法,类似于上个例子中 sayName() 与 PersonType.prototype 之间的关系.
 */

/**
 * 2.为何要使用类的语法
 * >类声明不会被提升,这与函数定义不同. 类声明的行为与 let 相似,因此在程序的执行到达声明处之前,
 * 类会存在于暂时性死区内.
 * >类声明中的所有代码会自动运行在严格模式下,并且也无法退出严格模式.
 * >类的所有方法都是不可枚举的,这是对于自定义类型的显著变化,后者必须用Object.defineProperty()
 *  才能将方法改变为不可枚举
 * >类的所有方法内部都没有 [[Construct]],因此使用 new 来调用它们会抛出错误.
 * >调用类构造器时不使用 new, 会抛出错误.
 * >视图在类的方法内部重写类名,会抛出错误.
 */

//这样看来,上例中的 PersonClass 声明实际上就直接等价于以下未使用类语法的代码:
let PersonType2 = (function(){
    "use strict";
    const PersonType2 = function(name){
        //确认函数被调用时使用了 new
        if(typeof new.target === "undefined"){
            throw new Error("Method cannot be called with new.")
        }
        this.name = name;
    }
    Object.defineProperty(PersonType2.prototype,"sayName",{
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
    return PersonType2;
}());

/**
 * 首先要注意这里有两个 PersonType2 声明:
 * 一个在外部作用域的 let 声明,一个在 IIFE 内部的 const 声明.这就是为何类的方法不能对
 * 类名进行重写,而类外部的代码则被允许. 构造器函数检查了 new.target, 以保证被调用时使用
 * 了 new, 否则就抛出错误.接下来, sayName() 方法被定义为不可枚举,并且此方法也检查了
 * new.target, 它则要保证在被调用时没有使用 new. 最后一步是将构造器函数返回出去.
 * 
 * 此例子说明了尽管不使用新语法也能实现类的任何特性,但类语法显著简化了所有功能的代码.
 */

/**
 * 不变的类名
 * 只有在类的内部,类名才被视为是使用 const 声明的. 这意味着你可以在外部重写类名,但不能在
 * 类的方法内部这么做.
 */