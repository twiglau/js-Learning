/**
 * ES6最有意思的一个新部分就是 箭头函数(arrow function). 箭头函数正如名称所示那样
 * 使用一个 "箭头"( => )来定义,但它的行为在很多重要方面与传统的JS函数不同:
 * 
 * 没有 this, super, arguments, 也没有 new.target 绑定: this, super, arguments,
 * 以及函数内部的 new.target 的值由所在的,最靠近的非箭头函数来决定 (super 详见第四章)
 * 
 * 不能被使用 new 调用: 箭头函数没有 [[Construct]] 方法,因此不能被用为构造函数,使用 new
 * 调用箭头函数会抛出错误.
 * 
 * 没有原型: 既然不能对箭头函数使用 new, 那么它也不需要原型,也就是没有 prototype 属性.
 * 
 * 不能更改 this: this的值在函数内部不能被修改,在函数的整个生命周期内其值会保持不变.
 * 
 * 没有 arguments对象: 既然箭头函数没有 arguments 绑定,你必须依赖于具名参数或剩余参数来
 * 访问函数的参数
 * 
 * 不允许重复的具名参数: 箭头函数不允许拥有重复的具名参数,无论是否在严格模式下;而相对来说,
 * 传统函数只有在严格模式下才禁止这种重复.
 * 
 * 注意: 箭头函数也拥有 name 属性,并且遵循与其他函数相同的规则.
 */

/**
 * 1. 箭头函数语法
 * 箭头函数的语法可以有多种变体,取决于你要完成的目标. 所有变体都以函数参数为开头,紧跟着
 * 的是箭头,再接下来则是函数体 参数与函数体都根据实际使用有不同的形式.
 * 例如,以下箭头函数接收单个参数并返回它:
 */
var reflect = value => value;
//有效等价于:
var reflect = function(value){
    return value;
}
/**
 * 当箭头函数只有单个参数是,该参数可以直接书写而不需要额外的语法; 接下来是箭头以及箭头
 * 右边的表达式,该表达式会被计算并返回结果. 即使此处没有明确的 return 语句, 该箭头
 * 仍然会将所传入的参数返回出来.
 * 
 * 如果需要传入多于一个的参数,就需要将它们放在括号内
 */
var sum = (num1,num2) => num1 + num2;
//有效等价于:
var sum = function(num1,num2) {
    return num1 + num2;
};
/**
 * sum() 函数简单地将两个参数相加并返回结果. 此箭头函数与上面的 reflect()之间唯一区别在于:
 * 此处的参数被封闭在括号内,相互之间使用逗号分隔(就像传统函数那样).
 * 
 * 如果函数没有任何参数,那么在声明时就必须使用一对空括号:
 */
var getName = () => "Nicholas";
//有效等价于:
var getName = function(){
    return "Nicholas";
};
/**
 * 当你想使用更传统的函数体,也就是可能包含多个语句的时候,需要将函数体用一对花括号进行包裹,
 * 并明确定义一个返回值,正如下面这个版本的 sum():
 */
var sum = (num1,num2) => {
    return num1 + num2;
};
//有效等价于:
var sum = function(num1,num2){
    return num1 + num2;
};
/**
 * 你基本可以将花括号内部的代码当做传统函数那样对待,除了 arguments 对象不可用之处,
 * 若你想创建一个空函数,就必须使用空的花括号:
 */
var doNothing = () => {};
//有效等价于:
var doNothing = function() {};
/**
 * 花括号被用于表示函数的主体,它在你至今看到的例子中都工作正常. 但若箭头函数想要从函数体内
 * 向外返回一个对象字面量,就必须将该字面量包裹在圆括号内:
 */
var getTempItem = id => ({id:id,name:"Temp"});
//有效等价于:
var getTempItem = function(id){
    return {
        id:id,
        name:"Temp"
    }
}
//将对象字面量包裹在括号内,标示了括号内是一个字面量而不是函数体.

/**
 * 2.创建立即调用表达式
 * JS中使用函数的一种流行方式是创建立即调用函数表达式(immediately-invoked function 
 * expression, IIFE). IIFE 允许你定义一个匿名函数并在未保存引用的情况下立刻调用它.
 * 当你想创建一个作用域并隔离在程序其他部分外,这种模式就很有用:
 */
let person = function(name){
    return {
        getName:function(){
            return name;
        }
    };
}("Nicholas");
console.log(person.getName());
/**
 * 此代码中 IIFE 被用于创建一个包含 getName() 方法的对象,该方法使用 name 参数作为返回值,
 * 有效地让 name 称为所返回对象的一个私有成员.
 * 
 * 你可以使用箭头函数来完成同样的事情,只要将其包裹在括号内即可:
 */
let person_01 = ((name) => {
    return {
        getName:function(){
            return name;
        }
    }
})("Nicholas");
console.log(person_01.getName());
/**
 * 需要注意的是括号仅包裹了箭头函数的定义,并未包裹("Nicholas"). 这有别与使用传统
 * 函数时的方式 --- 括号即可以连函数定义与参数调用一起包裹,也可以只用于包裹函数定义.
 * 
 * 使用传统函数时, (function(){ //...})(); 与 (function(){//...}()) 这
 * 两种方式都是可行的.
 * 但若使用箭头函数,则只有下面的写法是有效的: (() => { //...})();
 */

/**
 * 3.没有 this 绑定
 * JS最常见的错误领域之一就是在函数内的 this 绑定. 由于一个函数内部的 this 值可以被改变,
 * 这取决于调用该函数时的上下文,因此完全可能错误地影响了一个对象,尽管你本意是要
 * 修改另一个对象:
 */
var PageHandler = {
    id: "123456",
    init: function() {
        document.addEventListener("click",function(event){
            this.doSomething(event.type); //错误
        },false);
    },
    doSomething:function(type){
        console.log("Handling " + type + " for " + this.id);
    }
};
/**
 * 此代码的 PageHandler 对象被设计用于处理页面上的交互. init() 方法被调用以建立该
 * 交互,并注册了一个事件处理函数来调用 this.doSomething().然而此代码并未按预期工作.
 * 
 * 调用 this.doSomething() 被中断是因为 this 是对事件目标对象(在此案例中就是 document)
 * 的一个引用而不是被绑定到 PageHandler 上,若试图运行此代码,你将会在事件处理函数被触发时得
 * 到一个错误,因为 this.doSomething() 并不存在于 document 对象上.
 * 
 * 你可以明确使用 bind() 方法将函数的 this 值绑定到 PageHandler 上, 以修正这段代码:
 */
var PageHandler = {
    id: "123456",
    init: function() {
        document.addEventListener("click",(function(event){
            this.doSomething(event.type); //没有错误
        }).bind(this),false);
    },
    doSomething: function(type){
        console.log("Handling " + type + " for " + this.id);
    }
};
/**
 * 现在此代码能像预期那样运行,但看起来有点奇怪. 通过调用 bind(this), 你实际上创建了一个新函数,
 * 它的 this 被绑定到当前 this (也就是 PageHandler) 上. 为了避免额外创建一个函数,修正此代码的
 * 更好方式是使用箭头函数.
 * 
 * 箭头函数没有 this 绑定,意味着箭头函数内部的 this 值只能通过查找作用域链来确定,如果箭头函数被
 * 包含在一个非箭头函数内, 那么 this 值就会与该函数的相等; 否则,this 值就会是全局对象(在浏览器
 * 中是 window, 在 nodejs 中是 global). 你可以使用箭头函数来书写:
 */
var PageHandler = {
    id: "123456",
    init:function() {
        document.addEventListener("click",event => this.doSomething(event.type),false);
    },
    doSomething:function(type) {
        console.log("Handling " + type + " for " + this.id);
      }
};
/**
 * 本例中的事件处理函数是一个调用 this.doSomething() 的箭头函数,它的 this 值与 init() 方法的相同,
 * 因此这个版本的代码的工作方式类似于使用了 bind(this)的上个例子,尽管 doSomething() 方法并不返回任何
 * 值,它仍然是函数体内唯一被执行的语句,因此无须使用花括号来包裹它.
 * 
 * 箭头函数被设计为 "抛弃型"的函数,因此不能被用于定义新的类型; prototype 属性的缺失让这个特性显而易见.
 * 对箭头函数使用 new 运算符会导致错误:
 */
// var MyType = () => {},object = new MyType(); //错误:你不能对箭头函数使用 'new'
//MyType is not a constructor
/**
 * 此代码调用 new MyType() 的操作失败了,由于 MyType() 是一个箭头函数,它就不存在 [[Construct]] 方法,
 * 了解箭头函数不能被用于 new 的特性后, JS 引擎就能进一步对其进行优化.
 * 
 * 同样,由于箭头函数的 this 值由包含它的函数决定,因此不能使用 call(), apply() 或 bind() 方法来改变
 * 其 this 值.
 */


/**
 * 4. 箭头函数与数组
 * 箭头函数的简洁语法也让它成为进行数组操作的理想选择. 例如,若你想使用自定义比较器来对数组进行排序.
 */
var values = [1,2,3,4,3,6]
var result = values.sort(function(a,b){
    return a - b;
});
//这里为一个非常简单的工序使用了过多代码,可以比较一下使用了箭头函数的更简洁版本:
var result = values.sort((a,b) => a - b);

/**
 * 5. 没有 arguments 绑定
 * 尽管箭头函数没有自己的 arguments 对象,但仍然能访问包含它的函数的 arguments 对象,无论
 * 此后箭头函数在何处执行,该对象都是可用的:
 */
function createArrowFunctionReturningFirstArg(){
    return () => arguments[0];
}
var arrowFunction = createArrowFunctionReturningFirstArg(5);
console.log(arrowFunction());
/**
 * 在 createArrowFunctionReturnFirstArg() 内部, arguments[0] 元素被已创建的箭头函数 arrowFunction
 * 所引用,该引用包含了传递给 createArrowFunctionReturnFirstArg() 函数的首个参数,当箭头函数在此后被执行是,
 * 它返回了 5, 这也正是传递给 createArrowFunctionReturningFirstArg() 的首个参数. 尽管箭头函数 arrowFunction
 * 已不再创建它的函数的作用域内,但由于 arguments 标识符的作用域链解析, arguments 对象依然可被访问.
 */


/**
 * 6.识别箭头函数
 * 尽管语法不同,但箭头函数依然属于函数,并能被照常识别:
 */
var comparator = (a,b) => a - b;
console.log(typeof comparator);
console.log(comparator instanceof Function);
/**
 * console.log() 的输出揭示了 typeof 与 instanceof 在作用于箭头函数时的行为,与作用在其他
 * 函数上完全一致.
 * 
 * 也像对其他函数那样,你仍然可以对箭头函数使用 call() , apply() 与 bind() 方法,虽然函数的 this
 * 绑定并不会影响.
 */
var sum = (num1,num2) => num1 + num2;
console.log(sum.call(null,1,2));
console.log(sum.apply(null,[1,2]));
var boundSum = sum.bind(null,1,2);
console.log(boundSum());
/**
 * sum() 函数被使用 call() 与 apply() 方法调用并传递了参数,就像对其他函数所做的那样, bind() 方法
 * 被用于创建 boundSum(), 后者的两个参数已被绑定为 1 与 2, 因此不在需要直接传入这两个参数.
 * 
 * 箭头函数能再任意位置替代你当前使用的匿名函数,例如回到函数.
 */
