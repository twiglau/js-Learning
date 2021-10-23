/**
 * 在JavaScript中,我们可以通过 3 个关键字定义变量: 
 * var, let  和 const. 这3个关键字有两点不同: 可变性, 与词法环境的关系
 */

/**
 * 1. 变量可变性
 * 如果通过变量的可变性来进行分类,那么可以将const放在一组, var 和 let 放在一组. 通过
 * const定义的变量都不可变, 也就是说通过 const 声明的变量的值只能设置一次.
 * 通过var或let声明的变量的值可以便跟任意次数.
 * 
 * 现在,来深入了解下通过 const 声明的变量是如何工作的.
 * 
 * const 变量
 * 通过const声明的 "变量" 与普通变量类似, 但在声明时需要写初始值,一旦声明完成之后,其值就无法更改.
 * 听起来它不可变
 * 
 * -> const 变量常用于两种目的: 
 * 
 * > 不需要重新赋值的特殊变量
 * > 指向一个固定的值,例如球队人数的最大值,可通过const变量 MAX_RONIN_COUNT来表示,而不是仅仅通过
 * 数字 234 来表示. 这使得代码更加易于理解和维护
 * 
 * 清单5.6显示了 const 变量为行为
 * 
 * const变量只能在声明时被初始化一次,之后再也不允许将全新的值赋值给 const 变量即可. 但是,我们仍然
 * 可以修改 const 变量已经存在的值,只是不能重写 const 变量.
 */


/**
 * 2. 定义变量的关键字  与 词法环境
 * 定义变量的3个关键字 -- var, let 与 const, 还可以通过与词法环境的关系将其进行分类(换句话说,按照作用域分类):
 * 可以将var分为一组, let与const分为一组.
 * 
 * > 使用关键字var时, 该变量是在距离最近的函数内部或是在全局词法环境中定义的.
 * (注意: 忽略块级作用域) 这是JavaScript由来已久的特性,也困扰了许多从其他语言转向JavaScript的开发者.
 * 见清单 5.7
 * 
 * 解释: 
 * > 2.1. 我们首先定义全局变量 globalNinja, 接着定义函数 reportActivity,在该函数中使用循环并验证变量 globalNinja
 * 的行为. 可以看出,在循环体内可以正常访问: 
 * 块级作用域中的变量(变量 i 与 forMessage), 函数体内的变量(functionActivity) 以及
 * 全局变量(globalNinja)
 * 
 * 但是JavaScript中特殊的并使得许多从其他语言转向 JavaScript的开发者困惑的是, 即使在块级作用域内定义的变量,在块级
 * 作用域外仍然能够被访问
 * 
 * 这源于通过var声明的变量实际上总是在距离最近的函数内或全局词法环境中注册的, 不关注块级作用域. 图5.11描述了这一现象,
 * 图中展示了 reportActivity 函数内的 for 循环执行后的词法环境.
 * 
 * 图5.11 示例
 * 
 * > 2.2. 这里有3众词法环境: 
 * - 变量globalNinja是在全局环境中定义的(距离最近的函数内或全局词法环境).
 * - reportActivity函数创建的函数环境,包含变量functionActivity,i 与 forMessage,这3个变量均通过关键字 var 定义的,
 * 与它们距离最近的是 reportActivity 函数.
 * - for循环的块级作用域,关键字var定义的变量忽略块级作用域.
 * 
 * 这种行为看起来有些怪异, 因此, ES6中提供了两个新的声明变量的关键字: let 与 const.
 * 
 * 2.1 使用 let 与 const 定义具有块级作用域的变量
 * var 是在距离最近的函数或全局词法环境中定义变量, 与var不同的是, let和const更加直接.
 * let和const直接在最近的词法环境中定义变量( 可以是在块级作用域内,循环内,函数内或全局环境内). 我们可以使用 let和const定义
 * 块级别,函数级别,全局级别的变量.
 * 
 * 让我们使用 const 与 let 重写之前的实例, 清单5.8所示
 * //Using const and let keywords
 * 
 * 图5.12展示了 reportActivity函数内的 for 循环执行完成之后的词法环境. 此时我们仍然看到3个词法环境: 
 * 全局环境(函数和块级作用域之外的全局代码), reportActivity函数环境 和 for循环体. 
 * 但是由于我们使用了关键字 let 和 const, 那么变量则是在距离最近的词法环境中定义的: 
 * -> 变量GLOBAL_NINJA是在全局环境中定义的,
 * -> 变量functionActivity是在函数reportActivity中定义的,
 * -> 变量 i 与 forMessage 是在for循环的块级作用域中定义的.
 * 
 * 我们理解了词法环境中是如何保存标识符的映射表, 理解了词法环境与程序执行的关系,那么接下来讨论在词法环境中定义的标识符的
 * 准确的处理过程.
 */

/**
 * 3. 在词法环境中注册标识符
 * JavaScript作为一门编程语言,其设计的基本原则是易用性. 这也是不需要指定函数返回值类型,函数参数类型,变量类型等的主要原因.
 * 你已经了解到JavaScript是逐行执行的,查看如下
 * firstRonin = "Kiyokawa";
 * secondRonin = "Kondo";
 * 
 * 将KiyoKawa赋值给标识符firstRonin, 将Kondo赋值给标识符secondRonin.看起来没有什么
 * 特殊的地方,接着,
 * const firstRonin = "Kiyokawa";
 * check(firstRonin);
 * function check(ronin){
 *    assert(ronin === "Kiyokawa","The ronin was checked!");
 * }
 * 
 * 在本例中, 我们将值Kiyokawa 赋给 firstRonin, 然后调用 check 函数, 传入参数 firstRonin. 先等一下,如果JavaScript是逐行执行的,
 * 我们此时可以调用 check 函数吗? 程序还没执行到函数check的声明,所以JavaScript引擎不应该认识 check 函数.但是,程序运行得很顺利.
 * 
 * 
 */