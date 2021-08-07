/**
 * 当 JavaScript 代码执行一段可执行代码(executable code)时, 会创建对应的执行
 * 上下文(execution context).
 * 
 * 对于每个执行上下文, 都有三个重要属性:
 * > 变量对象(Variable object, VO)
 * > 作用域链(Scope chain)
 * > this
 * 
 * 
 * 思考题
 * var scope = "global scope";
 * function checkscope(){
 *    var scope = "local scope";
 *    function f(){
 *       return scope;
 *    }
 *    return f();
 * }
 * checkscope();
 * 
 * var scope = "global scope";
 * function checkscope(){
 *    var scope = "local scope";
 *    function f(){
 *       return scope;
 *    }
 *    return f;
 * }
 * checkscope();
 * 
 * 两段代码都会打印 'local scope'. 虽然两段代码执行的结果一样, 但是两段代码究竟有哪些不同?
 * 本篇就会详细的解析执行上下文栈 和执行上下文的具体变化过程.
 */

/**
 * 一, 具体执行分析
 * 分析第一段代码:
 */
 var scope = "global scope";
 function checkscope(){
     var scope = "local scope";
     function f(){
         return scope;
     }
     return f();
 }
 checkscope();

 /**
  * 执行过程如下:
  * 
  * 1. 执行全局代码, 创建全局执行上下文, 全局上下文被压入执行上下文栈
  * ECStack = [
  *     globalContext
  * ];
  * 
  * 2.全局上下文初始化
  * globalContext = {
  *    VO: [global],
  *    Scope: [globalContext.VO],
  *    this: globalContext.VO
  * }
  * 
  * 2.1 初始化的同时, checkscope 函数被创建, 保存作用域链到函数的内部属性 [[scope]]
  * checkscope.[[scope]] = [
  *    globalContext.VO
  * ];
  * 
  * 3. 执行checkscope函数, 创建 checkscope 函数执行上下文, checkscope 函数执行上下文被压入执行
  * 上下文栈
  * ECStack = [
  *    checkscopeContext,
  *    globalContext
  * ]
  * 
  * 4.checkscope 函数执行上下文初始化:
  * > 1. 复制函数 [[scope]] 属性创建作用域链,
  * > 2. 用 arguments 创建活动对象,
  * > 3. 初始化活动对象, 即加入形参, 函数声明, 变量声明
  * > 4. 将活动对象压入 checkscope 作用域链顶端.
  * 同时 f 函数被创建, 保存作用域链到 f 函数的内部属性 [[scope]]
  * checkscopeContext = {
  *    AO: {
  *       arguments: {
  *           length: 0
  *       },
  *       scope:undefined,
  *       f: reference to function f(){}
  *    },
  *    Scope: [AO, globalContext.VO],
  *    this: undefined
  * }
  * 
  * 5.执行 f 函数, 创建 f 函数执行上下文, f 函数执行上下文被压入执行上下文栈
  * ECStack = [
  *     fContext,
  *     checkscopeContext,
  *     globalContext
  * ]
  * 
  * 6.f 函数执行上下文初始化, 以下限第4步相同:
  * > 1. 复制函数 [[scope]] 属性创建作用域链
  * > 2. 用arguments 创建活动对象
  * > 3. 初始化活动对象, 即加入形参, 函数声明, 变量声明
  * > 4. 将活动对象压入 f 作用域链顶端
  * fContext = {
  *     AO: {
  *        arguments: {
  *           length: 0
  *        }
  *     },
  *     Scope: [AO, checkscopeContext.AO, globalContext.VO],
  *     this: undefined
  * }
  * 
  * 7.f 函数执行, 沿着作用域链查找 scope 值, 返回 scope 值
  * 
  * 8.f 函数执行完毕, f 函数上下文从执行上下文栈中弹出
  * ECStack = [
  *     checkscopeContext,
  *     globalContext
  * ]
  * 
  * 9.checkscope 函数执行完毕, checkscope 执行上下文从执行上下文中弹出
  * ECStack = [
  *   globalContext
  * ]
  */
 