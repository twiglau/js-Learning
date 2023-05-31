/**
 * 在上篇<执行上下文栈>中讲到, 当JavaScript代码执行一段可执行代码(executable code)时,
 * 会创建对应的执行上下文(execution context).
 * 
 * 对于每个执行上下文, 都有三个重要属性:
 * > 变量对象(Variable object, VO)
 * > 作用域链(Scope chain)
 * > this
 * 
 * 这篇重点将创建变量对象的过程
 */

/**
 * 一, 变量对象
 * 变量对象是与执行上下恩相关的数据作用域, 存储了在上下文中定义的变量和函数声明.
 * 因为不同执行上下文的变量对象稍有不同, 所有我们来聊聊全局上下文的变量对象和函数上下文下的变量对象.
 */

/**
 * 全局上下文
 * 我们先了解一个概念, 叫全局对象. 在W3School中也有介绍:
 * > 全局对象是预定义的对象, 作为 JavaScript 的全局函数 和 全局属性的占位符. 通过使用全局对象,可
 *   以访问所有其他预定义的对象, 函数和属性.
 * > 在顶层 JavaScript 代码中, 可以用关键字 this 引用全局对象. 因为全局对象是作用域链的头,这意味着
 *   所有非限定性的变量 和 函数名都会作为该对象的属性来查询.
 * > 例如, 当JavaScript代码引用 parseInt() 函数时, 它引用的是全局对象的 parseInt 属性. 全局对象
 *   是作用域链的头, 还意味着在顶层JavaScript代码中声明的所有变量都将成为全局对象的属性.
 * 
 * 如果看的不是很懂的话, 看下面的全局对象
 */

//1. 可以通过 this 引用, 在客户端 JavaScript 中, 全局对象就是 Window 对象.
console.log(this);
//2. 全局对象是由Object构造函数实例化的一个对象.
console.log(this instanceof Object);
//3. 预定义了一堆函数和属性
console.log(Math.random());
console.log(this.Math.random());
//4. 作为全局变量的宿主.
var a = 1;
console.log(this.a);
//5. 客户端JavaScript中, 全局对象有window属性指向自身.
var a = 2;
console.log(window.a);
this.window.b = 2;
console.log(this.b);

//以上介绍的全局对象,就是:
//全局上下文中的变量对象就是全局对象.


/**
 * 函数上下文
 * 在函数上下文中, 我们用活动对象(activation object,AO) 来表示变量对象.
 * 
 * 活动对象和变量对象其实是一个东西, 只是变量对象是规范上的 或者说是 引擎实现上的, 不可在
 * JavaScript环境中访问, 只有到当进入一个执行上下文中, 这个执行上下文的变量对象才会被激活,
 * 所以才叫 activation object, 而只有被激活的变量对象, 也就是活动对象上的各种属性才能被
 * 访问.
 * 
 * 活动对象是在进入函数上下文时刻被创建的, 它通过函数的 arguments 属性初始化. arguments属性
 * 值是 Arguments 对象.
 */

/**
 * 二, 执行过程
 * 执行上下文的代码会分成两个阶段进行处理: 分析和执行, 我们也可以叫做:
 * 1. 进入执行上下文
 * 2. 代码执行
 * 
 * 进入执行上下文
 * 当进入执行上下文, 这时候还没有执行代码.
 * 
 * 变量对象会包括:
 * 1. 函数的所有形参(如果是函数上下文)
 *    > 由名称和对应值组成的一个变量对象的属性被创建
 *    > 没有实参, 属性值设为undefined
 * 
 * 2. 函数声明
 *    > 由名称和对应值(函数对象(function-object))组成一个变量对象的属性被创建
 *    > 如果变量对象已经存在相同名称的属性,则完全替换这个属性
 * 
 * 3. 变量声明
 *    > 由名称和对应值(undefined)组成一个变量对象的属性被创建;
 *    > 如果变量名称跟已经声明的形式参数或函数相同, 则变量声明不会干扰已经存在的这类属性
 * 
 * 举个例子:
 */
function foo(a) {
    var b = 2;
    function c() {}
    var d = function() {};

    b = 3;
}
foo(1);
/**
 * 在进入执行上下文后, 这时候的AO是:
 * AO = {
 *     arguments: {
 *       0: 1,
 *       length: 1
 *     }
 *     a: 1,
 *     b: undefined,
 *     c: reference to function c(){},
 *     d: undefined
 * }
 */

/**
 * 代码执行
 * 在代码执行阶段, 会顺序执行代码, 更具代码, 修改变量对象的值
 * 还是上面的例子, 当代码执行完后 这时候的 AO 是:
 * AO = {
 *    arguments: {
 *       0: 1,
 *       length: 1
 *    },
 *    a: 1,
 *    b: 3,
 *    c: reference to function c(){},
 *    d: reference to FunctionExpression "d"
 * }
 * 
 * 到这里变量对象的创建过程就介绍完,总结:
 * 1. 全局上下文的变量对象初始化是全局对象
 * 2. 函数上下文的变量对象初始化只包括 Arguments 对象
 * 3. 在进入执行上下文时会给变量对象添加形参,函数声明,变量声明等初始的属性值
 * 4. 在代码执行阶段, 会再次修改变量对象的属性值
 */

/**
 * 三, 思考题
 * 1. 第一题
 */
function foo() {
    console.log(a);
    a = 1;
}
foo(); // ???

function bar() {
    a = 1;
    console.log(a);
}
bar(); // ???
/**
 * 第一段会报错: Uncaught ReferenceError: a is not defined.
 * 第二段会打印: 1.
 * 这是因为函数中的 "a" 并没有通过 var 关键字声明, 所以不会被存放在 AO 中.
 * 第一段执行console的时候,AO 的值是:
 * AO = {
 *    arguments: {
 *      length: 0
 *    }
 * }
 * 没有a的值, 然后就会到全局去找, 全局也没有,所以会报错.
 * 
 * 当第二段执行console的时候, 全局对象已经被赋予了 a 属性, 这时候就可以从全局
 * 找到 a 的值, 所以会打印1.
 */

/**
 * 2. 第二题.
 */
console.log(foo);

function foo() {
    console.log("foo");
}
var foo = 1;
/**
 * 会打印函数,而不是 undefined.
 * 
 * 这是因为在进入执行上下文时, 首先会处理函数声明,其次会处理变量声明,如果变量名称跟
 * 已经声明的形式参数或函数相同, 则变量声明不会干扰已经存在的这类属性.
 */


/**
 * 问题:
 * 1. VO 和 AO 到底是什么关系?
 * 未进入执行阶段之前, 变量对象(VO)中的属性都不能访问! 但是进入执行阶段之后, 变量对象
 * (VO) 转变为活动对象(AO), 里面的属性都能被访问了, 然后开始进行执行阶段的操作.
 * 
 * 它们其实都是同一个对象, 只是出于执行上下文的不同生命周期.
 * 
 * AO 实际上是包含了 VO 的, 因为除了VO之外, AO 还包含函数的 parameters,以及arguments
 * 这个特殊对象. 也就是说AO 的确是在进入执行阶段的时候被激活,但是激活的除了VO之外, 还包括
 * 函数执行时传入的参数 和 arguments 这个特殊对象.
 * 
 * 2. 思考题第二题,如果更换顺序
 * var foo = 1;
 * console.log(foo);
 * function foo() {
 *    console.log("foo");
 * }
 * // 这次打印结果就是 "1"
 * 所以对于第二点,这么解释比较好:
 * > 进入执行上下文时, 首先会处理函数声明,其次会处理变量声明,如果变量名称跟已经声明的形式参数
 *   或 函数相同, 则变量声明不会干扰已经存在的这类属性.
 * > 进入代码执行阶段,先执行console.log(foo),此时foo是函数的应用,再执行var foo=1; 将foo
 *   赋值为1, 而在改写的例子里,先执行foo=1这个操作; 再执行console.log(foo),所以打印1.
 * 
 * 对于思考题2:
 * 一个执行上下文的声明周期可以分为两个阶段.
 * 1. 创建阶段
 * > 在这个阶段中, 执行上下文辉分别创建变量对象, 建立作用域链,以及确定this的指向
 * 2. 代码执行阶段
 * > 创建完成之后,就会开始执行代码, 这个时候,会完成变量赋值, 函数引用, 以及执行其他代码.
 * 
 * 补充分析:
 * 
 * 分解:
 * var foo; //如果变量名称跟已经声明的形式参数或函数相同,则变量声明不会干扰已经存在的这类属性
 * foo = 1; //代码执行. PS: 如果没有这行, 打印结果是 function foo() {console.log('foo')};
 * console.log(foo); //1
 * function foo() {
 *   console.log("foo");
 * };
 * 
 * 执行上下文的时候:
 * VO = {
 *    foo: reference to function foo(){}
 * }
 * 然后再执行了 foo=1 的操作, 修改变量对象的foo属性值
 * AO = {
 *    foo: 1
 * }
 * 执行代码console.log(foo)的结果: 1
 */

/**
 * 思考题第二题:
 * console.log(foo);
 * function foo(){
 *   console.log("foo");
 * }
 * var foo = 1;
 * 
 * 解:
 * JavaScript发现了 一段可执行代码(executable code),准备创建对应的 执行上下文(execution context):
 * > 在此之前:
 * 因为JavaScript的函数提升特性,将代码等量变换为:(1)
 * function foo(){//函数提升
 *     console.log("foo");
 * }
 * console.log(foo);
 * var foo = 1;
 * 
 * 又因为JavaScript的变量提升特性,将代码等量变换为:(2)
 * function foo(){ //函数提升
 *    console.log("foo");
 * }
 * var foo;//变量提升
 * console.log(foo);
 * foo=1;
 * 
 * 开始创建对应的 执行上下文(execution context):(3)
 * > 变量对象(Variable object, VO)
 * > 作用域链(Scope chain)
 * > this
 * 其中,此处探讨的VO只是被初始化(4)
 * 
 * 当javaScript扫描到console.log(foo)时, 执行代码之前, 先进入 执行上下文(execution context),(5)
 * > 因为在进入执行上下文时, 首先会处理函数声明, 其次会处理变量声明, 如果变量名称更已经声明的形式参数或
 *   函数相同,则变量声明不会干扰已经存在的这类属性.
 * 
 * VO = {
 *    foo: reference to function foo(){},
 *    ~foo:undefined//此处疑问: 此处变量声明的foo是否保存在VO中,以何种形式保存
 * }
 * 执行代码console.log(foo),查找到了VO中的foo,输出结果.(6)
 * 接着执行foo=1,执行之后,VO为:(7)
 * VO = {
 *    foo:1
 * }
 */