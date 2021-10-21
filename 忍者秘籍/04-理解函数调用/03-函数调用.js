/**
 * 函数的调用方式对函数内代码的执行有很大的影响, 主要体现在 this 参数以及函数
 * 上下文时如何建立的.
 * 
 * 我们可以通过4种方式调用一个函数,每种方式之间有一些细微差别.
 * - 作为一个函数(function)--skulk(),直接被调用.
 * - 作为一个方法(method)--ninja.skulk(),关联在一个对象上,实现面向对象编程.
 * - 作为一个构造函数(constructor)--new Ninja(), 实例化一个新的对象.
 * - 通过函数的apply或者call方法--skulk.apply(ninja)或者skulk.call(ninja).
 */

function skulk(name){}
function Ninja(name){}
skulk('Hattori');
//作为函数调用
(function(who){return who;})('Hattori');
var ninja = {
    skulk: function(){}
};
//作为ninja对象的一个方法调用
ninja.skulk('Hattori');
//作为构造函数调用
ninja = new Ninja('Hattori');
//通过call方法调用
skulk.call(ninja,'Hattori');
//通过apply方法调用
skulk.apply(ninja,['Hattori']);

/**
 * 1. 作为函数直接被调用
 * 作为函数调用? 这里所说的函数"作为一个函数"被调用是为了区别与其他的调用方式: 
 * 方法, 构造函数 和 apply/call. 如果一个函数没有作为方法,构造函数或者通过apply和call调用的话,
 * 我们就称之为作为函数被直接调用.
 * 
 * 通过()运算符调用一个函数,且被执行的函数表达式不是作为一个对象的属性存在时,就属于这种调用类型.
 * 
 * 当以这种方式调用时,函数上下文(this关键字的值)有两种可能性: 
 * 在非严格模式下, 它将是全局上下文(window对象),而在严格模式下,它将是undefined.
 */

/**
 * 2. 作为方法被调用
 * 当一个函数被赋值给一个对象的属性,并且通过对象属性引用的方式调用函数时,函数会作为对象的方法被调用.
 * var ninja = {};
 * ninja.skulk = function(){};
 * ninja.skulk();
 * 
 * 这种情况下函数被称为方法,它有什么有趣或者不同之处? 如果你有面向对象编程的经历,一定会联想到是否可以
 * 在方法内部通过this访问到对象主体. 这种情况下同样适用. 当函数作为某个对象的方法被调用时,该对象会
 * 成为函数的上下文,并且在函数内部可以通过参数访问到. 这也是JavaScript实现面向对象编程的主要方式之一.
 */

function whatsMyContext(){
    return this; //返回函数上下文,从而让我们能从函数外面检查函数上下文
}

// 作为函数被调用并将其上下文设置为window对象
assert(whatsMyContext() === window, "Function call on widnow");

var getMyThis = whatsMyContext(); //变量getMyThis得到了函数whats MyContext的引用

//使用变量 getMyThis 来调用函数,该函数仍然作为函数被调用,函数上下文也依然是window对象
assert(getMyThis() === window, "Another function call in window");

var ninjal = {
    getMyThis: whatsMyContext
}; // 创建一个对象ninjal,其属性getMyThis得到了函数 whatMyContext 的引用

// 使用ninjal对象的方法 getMyThis来调用函数, 函数上下文现在是 ninjal 了. 这就是面向对象
assert(ninjal.getMyThis() === ninjal,"Working with 1st ninja");

var ninja2 = {
    getMyThis: whatsMyContext
}; //创建一个对象ninja2, 其属性 getMyThis 得到了函数 whatsMyContext 的引用

// 使用ninja2对象的方法 getMyThis 来调用函数. 函数上下文现在是 ninja2
assert(ninja2.getMyThis() === ninja2,"Working with 2nd ninja");

/**
 * 这段测试代码中设置了一个名为 whatsMyContext 的函数,在整个程序中都将用到它. 这个函数的唯一功能
 * 就是返回它的函数上下文, 这样就可以在函数外部看到调用的函数的上下文.
 * 
 * 当直接通过函数名调用,也就是将函数作为函数调用时,因为是在非严格模式下执行,因此预期的函数上下文
 * 结果应当是全局上下文(window).
 * 
 * 然后通过变量 getMyThis 创建了 whatsMyContext 函数的一个引用: var getMyThis = whatsMyContext.
 * 这样不会重复创建函数的实例, 它仅仅是创建了原函数的一个引用.
 */


/**
 * 3. 作为构造函数调用
 * 一般来讲, 当调用构造函数时会发生一系列特殊的操作,使用关键字 new 调用函数会触发以下几个动作
 * - 创建一个新的空对象.
 * - 该对象作为this参数传递给构造函数,从而成为构造函数的函数上下文.
 * - 新构造的对象作为new运算符的返回值(除了我们很快要提到情况之外)
 */
function Ninja(){
    this.skulk = function(){
        return this;
    };
}
var ninja1 = new Ninja();
var ninja2 = new Ninja();
assert(ninja1.skulk() === ninja1,"The 1st ninja is skulking");
assert(ninja2.skulk() === ninja2,"The 2nd ninja is skulking");
/**
 * 3.1 构造函数返回值
 * 我们之前提到过,构造函数的目的是初始化新创建的对象,并且新构造的对象会作为构造函数的调用结果
 * (通过 new 运算符) 返回. 但当构造函数自身有返回值时会是什么结果?
 */

//定义一个叫做Ninja1的构造函数
function Ninja1(){
    this.skulk = function(){
        return true;
    }
    return 1; // 构造函数返回一个确定的原始类型值,即数字1
}
//该函数以函数的形式被调用,正如预期,其返回值为数字1
assert(Ninja1() === 1,"Return value honored when not called as a constructor");

var ninja = new Ninja1(); //该函数通过 new 关键字以构造函数的形式被调用
assert(typeof ninja == "object","Object returned when called as a constructor");
//测试表明,返回值1 被忽略了, 一个新的被初始化的对象被通过关键字 new 所返回
assert(typeof ninja.skulk === "function","ninja object has a skulk method");

/**
 * 如果执行这段代码,会发现一切正常. 事实上,这个 Ninja 函数虽然返回简单的数字1, 但对代码的行为没有显著的
 * 影响. 如果将Ninja作为一个函数调用, 的确会返回1, 但如果通过 new 关键字将其作为构造函数调用, 会构造并
 * 返回一个新的 ninja 对象. 
 * 
 * 但如果尝试做一些改变,一个构造函数返回另一个对象.
 */
var puppet = {
    rules: false
}; //创建一个全局对象,该对象的 rules 属性设置为 false

function Emperor(){
    this.rules = true;
    return puppet;
} //尽管初始化了传入的 this 对象, 返回该全局对象

var emperor = new Emperor(); //作为构造函数调用该函数

assert(emperor === puppet, "The emperor is merely a puppet!");
//测试表明,变量emperor的值为由构造函数返回的对象, 而不是 new 表达式所返回的对象
assert(emperor.rules == false,"The puppet doest not know how to rule!");
//这个示例中采用的方式略有不同,首先创建了一个全局对象,通过puppet引用它,并将其包含的 rules
//属性设置为 false: 

/**
 * 3.2 编写构造函数的注意事项
 * 构造函数的目的是根据初始条件对函数调用创建的新对象进行初始化. 虽然这些函数也可以被 "正常" 调用,
 * 或者被赋值为对象属性从而作为方法调用, 但这样并没有太大的意义.
 */
function Ninja(){
    this.skulk = function(){
        return this;
    };
}
var whatever = Ninja();
/**
 * 我们可以将Ninja作为一个简单函数调用, 如果在非严格模式下调用的话, skulk属性将创建在 window 对象上
 * -- 这并非一个十分有效的操作. 严格模式下情况会更糟, 因为在严格模式下犯这样的错误,很可能被忽略, 但在
 * 严格模式下则暴露无遗.
 */


/**
 * 4. 使用 apply 和 call 方法调用
 * 不同类型函数调用之间的主要区别在于: 
 * 最终作为函数上下文(可以通过 this 参数隐式引用到) 传递给执行函数的对象不同.
 * 对于方法而言, 即为方法所在的对象; 对于顶级函数而言是 window 或者 undefined(取决于是否处于严格模式下);
 * 对于构造函数而言是一个新创建的对象实例.
 * 
 * 如想要改变函数上下文? 想要显式指定它怎么版?
 * 
 * 查看例子 03.1
 * 
 * // 随后会为该按钮附加事件处理器
 * <button id="test">Click Me! </button>
 * <script>
 *    
 * </script>
 */