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
 * checkscope()();
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
 

 /**
  * 理解:
  * function checkscope() {
  *    var scope = "local scope";
  *    function f(){
  *       return scope;
  *    }
  *    return f();
  * }
  * 
  * > 执行函数checkscope时, 分为预编译阶段 和 执行阶段.
  * > 预编译阶段:
  * > 就是所说的: 1. 创建执行上下文. 2. 执行上下文初始化 ( 复制函数[[scopoe]] 属性创建作用域链,
  * 使用arguments创建活动对象, 初始化活动对象{即形参,函数声明,变量声明}, 将活动对象压入作用域链的
  * 顶端)
  * > 当函数checkscope执行, 处于预编译阶段中-函数声明-的时候, 此时只是创建了 f 函数(只是创建了 f 函数
  * 的 [[scope]] 属性, 这个属性只包含了 checkscope 函数的活动对象和全局变量对象,并不包含 f 函数的活动
  * 对象)
  * 
  * > 执行阶段:
  * > 等到函数checkscope处于执行阶段时, 就是 return f(); 此时调用 f(), 这个时候才会创建 f 函数的上下文.
  * 以及上面所提到的相同四步骤.
  */