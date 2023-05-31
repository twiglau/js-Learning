/**
 * 在<JavaScript深入执行上下文栈>中将到, 当JavaScript代码执行一段可执行代码(executable code)
 * 时,会创建对应的执行上下文(execution context).
 * 
 * 对于每个执行上下文, 都有三个重要属性:
 * > 变量对象(Variable object,VO)
 * > 作用域链(Scope chain)
 * > this
 * 
 * 该章讲讲作用域链
 */

/**
 * 一, 作用域链
 * 在上一讲中,当查找变量的时候,会先从当前上下文的变量对象中查找,如果没有找到,就会从父级(词法层面上的父级)
 * 执行上下文的变量对象中查找,一致找到全局上下文的变量对象,也就是全局对象. 这样由多个执行上下文的变量
 * 对象构成的链表 就叫 作用域链.
 * 
 * 下面, 让我们以一个函数的创建和激活两个时期来讲解作用域链是如何创建和变化的.
 */

/**
 * 二, 函数创建
 * 在<词法作用域和动态作用域>中讲到, 函数的作用域在函数定义的时候就决定了.
 * 
 * 这是因为函数有一个内部属性 [[scope]], 当函数创建的时候,就会保存所有父变量对象到其中,你
 * 可以理解 [[scope]] 就是所有父变量对象的层级链, 但是注意: [[scope]] 并不代表完整的
 * 作用域链.
 * 
 * 举个例子:
 * function foo() {
 *    function bar() {
 *        ...
 *    }
 * }
 * 函数创建时,各自的[[scope]]为:
 * foo.[[scope]] = [
 *     globalContext.VO
 * ];
 * bar.[[scope]] = [
 *     fooContext.AO,
 *     globalContext.VO
 * ]
 */

/**
 * 三, 函数激活
 * 当函数激活时, 进入函数上下文, 创建 VO/AO 后, 就会将活动对象添加到作用链的前端.
 * 
 * 这时候执行上下文的作用链端,我们命名为Scope:
 * Scope = [AO].concat([[Scope]]);
 * 
 * 至此,作用域链创建完毕.
 */

/**
 * 四, 整个过程
 * 以下面的例子为例, 结合着之前将的变量对象和执行上下文栈, 我们来总结下函数执行上下文中
 * 作用域链和变量对象的创建过程:
 */
var scope = "global scope";
function checkscope(){
    var scope2 = "local scope";
    return scope2;
}
checkscope();
//执行过程如下:
/**
 * 1.checkscope 函数被创建, 保存 作用域链 到 内部属性[[scope]]
 * checkscope.[[scope]] = [
 *     globalContext.VO
 * ]
 * 
 * 2.执行checkscope函数, 创建 checkscope 函数执行上下文,
 * checkscope函数执行上下文被压入执行上下文栈
 * ECStack = [
 *    checkscopeContext,
 *    globalContext
 * ]
 * 
 * 3.checkscope函数并不立刻执行,开始做准备工作, 第一步: 复制函数
 * [[scope]]属性创建作用域链
 * checkscopeContext = {
 *   Scope: checkscope.[[scope]]
 * }
 * 
 * 4.第二步: 用arguments创建活动对象,随后初始化活动对象,加入形参,
 * 函数声明,变量声明
 * checkscopeContext = {
 *    AO: {
 *        arguments: {
 *            length: 0
 *        },
 *        scope2: undefined
 *    },
 *    Scope: checkscope.[[scope]],
 * }
 * 
 * 5.第三步: 将活动对象压入checkscope作用链顶端
 * checkscopeContext = {
 *    AO: {
 *       arguments: {
 *           length: 0
 *       },
 *       scope2: undefined
 *    },
 *    Scope: [AO, [[Scope]]]
 * }
 * 
 * 6.准备工作做完,开始执行函数,随着函数的执行,修改AO的属性值
 * checkscopeContext = {
 *    AO: {
 *       arguments: {
 *           length: 0
 *       },
 *       scope2: 'local scope'
 *    },
 *    Scope: [AO,[[Scope]]]
 * }
 * 
 * 7.查找到scope2的值,返回后函数执行完毕,函数上下文从执行上下文栈中弹出
 * ECStack = [
 *    globalContext
 * ];
 */

/**
 * 问题: 1,3的区别?[checkscope函数被创建时,保存到[[scope]]的作用域链和
 * checkscope执行前的准备工作中,复制函数[[scope]]属性创建的作用域链有什么
 * 不同], 为甚么有两个作用域链?
 * 
 * 答:
 * checkscope函数创建的时候,保存的是根据词法所生成的作用域链, checkscope执行
 * 的时候,会复制这个作用域链,作为自己作用域链的初始化,然后根据环境生成变量对象,然
 * 后将这个变量对象,添加到这个复制的作用域链,这才完整的构建了自己的作用域链.
 * > 至于为什么会有两个作用域链?
 * 是因为在函数创建的时候并不能确定最终的作用域的样子,
 * > 为什么会采用复制的方式而不是直接修改呢?
 * 应该是因为函数会被调用很多次.
 * 
 * 
 * 问题: 函数有一个内部属性 [[scope]],当函数创建的时候,就会保存所有父变量对象到其中,
 * 想问下: 变量对象是创建上下文的时候才有的吧?
 * function foo() {
 *    function bar(){
 *      //...
 *    }
 * }
 * 要是foo没有创建上下文, 那bar怎么保存foo的变量对象?
 * 
 * 答: 
 * 1. 以上例子, 当foo函数的执行上下文初始化的时候,才会创建bar函数, bar函数保存foo的变量
 *    对象,那更外层的变量对象- 就是全局对象.所以 bar 的 [[scope]]属性值就是
 *    barscope.[[scope]] = [
 *       fooContext.AO,
 *       globalContext.VO
 *    ]
 * 2. 在源码中当你定义(书写)一个函数的时候(并未调用),js引擎也能根据你函数书写的位置,函数嵌套的位置,
 *    给你生成一个[[scope]],作为该函数的属性存在(这个属性属于函数的). 即使函数不调用,所以说基于
 *    词法作用域 (静态作用域)
 * 
 *    然后进入函数执行阶段, 生成执行上下文, 执行上下文你可以宏观的看成一个对象, (包含vo,scope,this),
 *    此时, 执行上下文里的 scope 和之前属于函数的那个 [[scope]] 不是同一个, 执行上下文里的 scope,
 *    是之前函数的 [[scope]] 的基础上, 又新增一个当前的 AO 对象构成的.
 *    
 *    函数定义时候的 [[scope]] 和 函数执行时候的scope,前者作为函数的属性, 后者作为函数执行上下文的
 *    属性.
 * 
 * 问题: 第4和第5步的时候,感觉应该叫变量对象,如果是活动对象应该已经完成了赋值操作,但是如果是变量对象的话,
 *      这个时候作用链不应该有活动对象  
 * --> checkscopeContext = {
 *         VO: {
 *             arguments: {
 *                length: 0
 *             },
 *             scope2:undefined
 *         },
 *         Scope: [AO, [[Scope]]]
 *     }
 * 
 * 答:
 * 执行上下文分为两个阶段, 创建阶段和代码执行阶段,
 * 第4.5步处于执行上下文的创建阶段,这时候 会进行AO的初始化操作, 只是对作用域内的形参, 函数声明, 变量定义 的属性 定义初始值,
 * 赋值阶段 是在代码执行阶段.
 */