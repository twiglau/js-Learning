/**
 * 第一个事实:JavaScript允许你引用在当前函数以外定义的变量:
 */
function makeSandwich(){
    var magicIngredient = "peanut butter";
    function make(filling){
        return magicIngredient + " and " + filling;
    }
    return make("jelly")
}
console.log(makeSandwich());
//注意内部的make函数是如何引用定义在外部makeSandwich函数内的magicIngredient变量的.

/**
 * 第二个事实: 即使外部函数已经返回,当前函数仍然可以引用在外部函数所定义的变量.
 * 这意味着,你可以返回一个内部函数,并在稍后调用它.
 */
function sandwichMaker(){
    var magicIngredient = "peanut butter";
    function make(filling){
        return magicIngredient + " and " + filling;
    }
    return make;
}
var f = sandwichMaker();
console.log(f("jelly"),f("bananas"),f("marshmallows"));
//这与第一个例子几乎完全相同,不同的是,不是在外部的sandwichMaker函数中立即调用
//make("jelly"),而是返回make函数本身. 因此, f 的值为内部的 make 函数,调用 f
//实际上是调用 make 函数, 但即使 sandwichMaker 函数已经返回,make 函数仍能
//记住 magicIngredient 的值.

/**
 * 以上是如何工作的?
 * 
 * JavaScript 的函数值包含了比调用它们是执行所需要的代码还要多的信息.
 * 而且,JavaScript 函数值还在内部存储它们可能会引用的定义在其封闭作用域
 * 的变量. 那些在其所涵盖的作用域内跟踪变量的函数被称为 闭包.
 * make 函数就是一个闭包, 其代码引用了两个外部变量: magicIngredient 和 filling.
 * 每当 make 函数被调用是,其代码都能引用到这两个变量. 因为该闭包存储了这两个变量.
 * 
 * 函数可以引用在其作用域内的任何变量,包括参数和外部函数变量.可以利用这点来编写更加通用的
 * sandwichMaker 函数
 */
function sandwichMaker(magicIngredient){
    function make(filling){
        return magicIngredient + " and " + filling;
    }
    return make;
}
var hamAnd = sandwichMaker("ham");
console.log(hamAnd("cheese"),hamAnd("mustard"));

var turkeyAnd = sandwichMaker("turkey");
console.log(turkeyAnd("Swiss"),turkeyAnd("Provolone"));

/**
 * 闭包是JavaScript 最优雅,最有表现力的特性之一,也是许多惯用法的核心.
 * JavaScript甚至还提供了一种更为方便地构建闭包的字面量语法 --- 函数表达式
 */
function sandwichMaker(magicIngredient){
    return function(filling){
        return magicIngredient + " and " + filling;
    };
}
//该函数表达式是匿名的,由于我们只需要其能产生一个新的函数值,
//而不打算在局部调用它,因此根本没有必要给该函数命名. 函数表达式
//也可以有名称.

/**
 * 第三个事实:
 * 闭包可以更新外部变量的值.
 * 实际上,闭包存储的是外部变量的引用,而不是它们的值的副本.
 * 因此,对于任何具有访问这些外部变量的闭包,都可以进行更新.
 */
function box() {
    var val = undefined;
    return {
        set: function(newVal) { val = newVal;},
        get: function() { return val;},
        type:function() { return typeof val;}
    };
}
var b = box();
console.log(b.type());
b.set(98.6);
console.log(b.get(),b.type());

//该例子产生了一个包含三个闭包的对象, 这三个闭包是 set, get 和 type 属性.
//它们都共享访问 val 变量. set闭包更新val的值,
//随后调用 get 和 type 查看更新的结果.

/**
 * 1.函数可以引用定义在其外部作用域的变量
 * 2.闭包比创建它们的函数有更长的声明周期.
 * 3.闭包在内部存储其外部变量的引用,并能读写这些变量.
 */