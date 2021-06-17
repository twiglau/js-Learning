/**
 * 访问器属性
 * 1. 自有属性需要在类构造器中创建,而类还允许你在原型上定义访问器属性. 为了创建一个getter,
 * 要使用 get 关键字,并要与后方标识符之间留出空格;创建setter用相同方式,只是要换用 set
 * 关键字,如下:
 */
class CustomHTMLElement {
    constructor(element){
        this.element = element;
    }

    get html(){
        return this.element.innerHTML;
    }
    set html(value){
        this.element.innerHTML = value;
    }
}
var descriptor = Object.getOwnPropertyDescriptor(CustomHTMLElement.prototype,"html");
console.log("get" in descriptor);
console.log("set" in descriptor);
console.log(descriptor.enumerable);
/**
 * 此代码中的 CustomHTMLElement 类用于包装一个已存在的 DOM 元素. 它的属性 html 拥有 getter 与 setter,
 * 委托了元素自身的 innerHTML 方法. 该访问器属性被创建在 CustomHTMLElement.prototype 上,并且像其他类
 * 属性那样被创建为不可枚举属性.非类的等价如下:
 */

//直接等价于上个范例
let CustomHTMLElement01 = (function(){
    "use strict";

    const CustomHTMLElement = function(element){

        //确认函数被调用时使用了 new
        if(typeof new.target === "undefined"){
            throw new Error("Constructor must be called with new.");
        }
        this.element = element;
    }

    Object.defineProperty(CustomHTMLElement.prototype,"html",{
        enumerable:false,
        configurable:true,
        get:function() {
            return this.element.innerHTML;
        },
        set:function(value){
            this.element.innerHTML = value;
        }
    });

    return CustomHTMLElement;
}());

