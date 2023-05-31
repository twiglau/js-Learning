/**
 * 分析第二段代码
 */
var scope = "global scope";
function checkscope() {
    var scope = "local scope";
    function f() {
        return scope;
    }
    return f;
}
checkscope();


/**
 * 1. 执行全局代码, 创建全局执行上下文, 全局上下文被压入执行上下文栈:
 * ECStack = [
 *    globalContext
 * ]
 * 
 * 2. 开始执行代码, 全局上下文初始化:
 * globalContext = {
 *    VO: [ global ],
 *    Scope: [ globalContext.VO ],
 *    this: globalContext.VO
 * }
 * 
 * 3. 初始化的同时, checkscope函数被创建, 保存作用域链到内部属性 [[scope]]:
 * checkscope.[[scope]] = [
 *     globalContext.VO
 * ];
 * 
 * 4. 开始执行 checkscope 函数, 创建 checkscope 函数执行上下文, 并将 checkscope
 * 函数上下文压入执行上下文栈:
 * ECStack = [
 *     checkscopeContext,
 *     globalContext
 * ];
 * 
 * 5. checkscope函数上下文初始化:
 * > 1. 复制函数 [[scope]] 属性创建作用域链
 * > 2. 用arguments 创建活动对象.
 * > 3. 初始化活动对象 即加入形参,函数声明, 变量声明
 * > 4. 将活动对象压入 checkscope 函数作用域链顶端
 * 
 * checkscopeContext = {
 *     AO: {
 *        arguments: {
 *           length: 0
 *        },
 *        scope: undefined,
 *        f: reference to function f(){}
 *     },
 *     Scope: [AO,globalContext.VO],
 *     this: undefined
 * }
 * 初始化的同时, f函数 被创建, 保存作用域链到 f函数 的内部属性[[scope]]:
 * f.[[scope]] = [checkscopeContext.AO, globalContext.VO]
 * 
 * 6. checkscope 函数执行, 随着函数的执行, 修改AO的值, 所以此时 checkscopeContext
 * 变更为:
 * checkscopeContext = {
 *     AO: {
 *         arguments: {
 *              length: 0
 *         },
 *         scope: "local scope",
 *         f: reference to function f(){}
 *     },
 *     Scope: [AO,globalContext.VO],
 *     this: checkscopeContext.AO
 * }
 * 接着返回了 f函数.
 * 
 * 7. checkscope 函数执行完毕, checkscope 执行上下文从执行上下文栈中弹出:
 * ECStack = [
 *    globalContext
 * ]
 * 
 * 8. 开始执行 f 函数, 创建 f 函数执行上下文, 并将 f 函数上下文压入执行上下文栈:
 * ECStack = [
 *     fContext,
 *     globalContext
 * ];
 * 
 * 9. f 函数上下文初始化:
 * > 1. 复制函数 [[scope]] 属性创建作用域链.
 * > 2. 用 arguments 创建活动对象.
 * > 3. 初始化活动对象, 即加入形参, 函数声明, 变量声明.
 * > 4. 将活动对象压入 f函数 作用域链顶端
 * fContext = {
 *     AO: {
 *         arguments: {
 *              length: 0
 *         }
 *     },
 *     Scope: [AO, checkscopeContext.AO, globalContext.VO],
 *     this:undefined
 * }
 * 
 * 10. f 函数执行, 沿着作用域链查找 scope 的值, 找到并返回了 scope.
 * 
 * 可是当 f函数 执行的时候, checkscope 函数上下文已经被销毁了( 即从执行上下文栈中被弹出),
 * 怎么还会读取到 checkscope 作用域下的 scope 值呢?
 * 
 * 这是因为 checkscope 函数执行上下文初始化是, f函数 同时被创建, 保存作用域链 到 f函数 的
 * 内部属性[[scope]], 所以即使 checkscope 函数执行完毕, 被弹出执行上下文栈, 但是
 * checkscopeContext.AO 依然存在于 f函数 的内部属性 [[scope]] 中:
 * 
 * f.[[scope]] = [checkscopeContext.AO, globalContext.VO]
 * 
 * 所以在 f函数 执行的时候仍然可以通过 f函数 的作用域链能找到 scope. 所以这里就产生了闭包:
 * > 即使创建它的上下文已经销毁, 它仍然存在(比如, 内部函数从父函数中返回)
 * > 在代码中引用了 自由变量
 * 
 * 11. f函数执行完毕, f 执行上下文从执行上下文栈中弹出:
 * ECStack = [
 *     globalContext
 * ]
 */