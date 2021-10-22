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
 *    function Button(){
 *      // 为对象赋值事件处理器的构造函数,该事件处理器反映了按钮的状态,通过这个事件处理器,
 *      // 我们能够跟踪按钮是否被单击
 *      this.clicked = false;
 *      this.click = function(){
 *         // 单击事件处理器的声明函数, 由于该函数是对象的方法,所以在函数中
 *         // 使用this来获取对象的引用
 *         this.clicked = true;
 *         // 在该方法中, 我们测试了按钮是否在单击后正确地改变了状态
 *         assert(button.clicked,"The button has been clicked");
 *      };
 *    }
 *    
 *    // 创建一个用于跟踪按钮是否被单击的实例
 *    var button = new Button();
 *    var elem = document.getElementById("test");
 *    // 在按钮上添加单击处理器
 *    elem.addEventListener("click",button.click);
 * </script>
 * 
 * 在这个例子中,我们定义了一个按钮 <button id="test">Click Me!</button>,并且想知道
 * 它是否曾被单击过. 为了保存单击的状态信息, 我们使用构造函数创建一个名为 button 的实例化
 * 对象,通过该对象我们可以存储被单击的状态.
 * 
 * 在该对象中,我们还定义了一个 click 方法作为单击按钮时触发的事件处理函数. 该方法将 clicked
 * 属性设置为 true, 然后测试实例化对象中的状态是否正确(我们有意使用 button 标识符而非 this
 * 关键字 --- 毕竟,它们应该具有相同的指向.)
 * 
 * 通常情况下, 事件回调函数的上下文是触发事件的对象(在本例中是 HTML 中的按钮, 而非 button 对象)
 */

/**
 * 2. 使用 apply 和 call 方法
 * apply 方法调用函数, 需要为其传递两个参数: 作为函数上下文的对象 和 一个数组作为函数调用的参数.
 * call 方法的使用方式类似, 不同点在于是直接以参数列表的形式, 而不再是作为数组传递.
 */
// 使用 apply 和 call 方法来设置函数上下文
function juggle(){
    var result = 0;
    for(var n = 0; n < arguments.length; n++){
        result += arguments[n];
    }
    this.result = result;
    // 函数"处理"了参数,并将结果result变量放在任意一个作为该函数上下文的对象上
}
var ninja1 = {};
var ninja2 = {}; // 这些对象的初始值为空,它们会作为测试对象

juggle.apply(ninja1,[1,2,3,4]); //使用apply方法向ninja1传递一个参数数组
juggle.call(ninja2,5,6,7,8); //使用call方法向ninja2传递一个参数列表

assert(ninja1.result === 10, "juggled via apply");
assert(ninja2.result === 26, "juggled via call"); //测试展现了传入 juggle 方法中
//的对象拥有了结果值

//apply 和 call 之间唯一的不同之处在于如何传递参数
/**
 * 传入call 和 apply 方法的第一个参数都会被作为函数上下文, 不同处在于后续的参数.
 * apply方法只需要一个额外的参数,也就是一个包含参数值的数组; call方法则需要传入
 * 任意数量的参数值,这些参数将用作函数的实参
 */

//使用call和apply方法手动设置函数上下文,产生函数上下文(this)与arguments
/**
 * 2.1 call和apply这两个方法对于我们要特殊指定一个函数的上下文对象时特别有用,在执行回调函数时
 * 可能会经常用到.
 * > 强制指定回调函数的函数上下文
 * 
 * 如下例子,将使用一个简单的函数对数组的每个元素执行相应的操作.
 * 在命令式编程中,常常将数组传给函数,然后使用for循环遍历数组,再对数组的每个元素执行具体操作: 
 * function(collection){
 *   for(var n = 0; n < collection.length;n++){
 *        do something to collection[n]
 *   }
 * }
 * 而函数式方法创建的函数只处理单个元素: 
 * function(item){
 *   do something to item
 * }
 * 
 * 以上二者的区别在于是否将函数作为程序的主要组成部分. 也许你会认为这么做毫无意义,仅仅只是删除For循环,
 * 也没有对实例做任何优化.
 * 
 * 为了实现更加函数式的风格,所有数组对象均可使用forEach函数,对每个数组元素执行回调. 对于熟悉函数式编程
 * 的开发者来说,这种方法比传统的for循环更加简洁. forEach遍历函数将每个元素传给回调函数,将当前元素作为
 * 回调函数的上下文.
 * 
 * function forEach(list,callback){
 *   // forEach函数接收两个参数: 需要遍历的集合和回调函数
 *   for(var n = 0; n < list.length; n++) {
 *       callback.call(list[n],n); //当前遍历到的元素作为函数上下文调用回调函数
 *   }
 * }
 * 
 * 使用call方法调用回调函数,将当前遍历到的元素作为第一个参数,循环索引作为第二个参数,使得当前元素作为
 * 函数上下文,循环索引作为回调函数的参数.
 * 
 * var weapons = [
 *    {type:'shuriken'},
 *    {type: 'katana'},
 *    {type: 'nunchucks'}
 * ]; // 测试数组
 * 
 * forEach(weapons,function(index){
 *    assert(this == weapons[index],"Got the expected value of " + weapons[index].type);
 * }); //调用迭代函数forEach,确保每个回调函数的上下文正确
 * 
 * 
 */