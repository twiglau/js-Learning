/**
 * 对象字面量与类之间的相似点还不仅前面那些. 类方法与类访问器属性也都能使用需计算的名称.
 * 语法相同与对象字面量中的需计算名称:无须使用标识符,而是用方括号来包裹一个表达式,如下:
 */

let methodName = "sayName";

class PersonClass {

    constructor(name){
        this.name = name;
    }
    [methodName]() {
        console.log(this.name);
    }
}

let me = new PersonClass("Nicholas");
me.sayName();
/**
 * 此版本的 PersonClass 使用了一个变量来命名类定义内的方法. 字符串 "sayName" 被赋值给了
 * methodName 变量, 而 methodName 变量则被用于声明方法. sayName() 方法在此后能被直接访问.
 * 
 * 访问器属性能以相同方式使用需计算的名称,如下:
 */
let propertyName = "html";
class CustomHTMLElement {

    constructor(element){
        this.element = element;
    }

    get [propertyName]() {
        return this.element.innerHTML;
    }

    set [propertyName](value) {
        this.element.innerHTML = value;
    }
}
/**
 * 此处 html 的 getter 与 setter 被设置为需使用 propertyName 变量,使用 .html 依然能访问
 * 此属性,这里影响的只有定义方式.
 * 
 * 你已经看到了在类与对象字面量之间有许多相似点,包括方法,访问器属性,需计算的名称.
 * 此外还有一个相似点需要介绍,即生成器.
 */