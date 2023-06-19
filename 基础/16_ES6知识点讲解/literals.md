# 关键字


## let/const 基本使用

- 在ES5中我们声明变量都是使用var关键字, 从ES6开始新增了两个关键字可以声明变量: let, const

> let, const 在其他继承语言中都是有的, 所以也并不是新鲜的关键字;
> 但是 let, const 确确实实给JavaScript带来一些不一样的东西;

- let 关键字:

> 从直观的角度来说, let和var是没有太大的区别的, 都是用于声明一个变量


## let/const 作用域提升

- let, const和var的另一个重要区别是作用域提升;

> 我们知道var声明的变量是会进行作用域提升的;
> 但是如果我们使用let声明的变量, 在声明之前访问会报错;

- 那么是不是意味着foo变量只有在代码执行阶段才会创建的呢?

> 事实上并不是这样的, 我们可以看一下 ECMA262 对 let和const的描述:

> ## 这些变量会被创建在包含它们的词法环境被实例化时, 但是 是不可以访问它们的, 一直到词法绑定被求值##

> let and const declarations define variables that are scoped to the running execution context's LexicalEnvironment.
> The variables are created when their containing Lexical Environment is instantiated but may not be accessed in any way until the
> variable's LexcialBinding is evaluated. A variable defined by a LexicalBinding with an Initializar is assigned the value of its Initializer's
> AssignmentExpression when the LexicalBinding is evaluated, not when the variable is created. If a LexicalBinding in a let declaration does not
> have an Initializer the variable is assigned the value undefined when the LexicalBinding is evaluated.

## let/const有没有作用域提升呢?

- 从上面我们可以看出, 在执行上下恩的词法环境创建出来的时候, 变量事实上已经被创建了, 只是这个变量是不能被访问的.

> 那么变量已经有了, 但是不能被访问, 是不是一种作用域的提升呢?

- 事实上维基百科并没有对作用域提升有严格的概念解释, 那么我们自己从字面量上理解:

> 作用域提升: 在声明变量的作用域中, 如果这个变量可以在声明之前被访问, 那么我们可以称之为 作用域提升;
> 在这里, 它虽然被创建出来了, 但是不能被访问, 我认为不能称之为作用域提升;

- 所以, let/const 没有进行作用域提升, 但是会在执行上下文阶段被创建出来.

## window对象添加属性

- 我们知道, 在全局通过var来声明一个变量, 事实上会在window上添加一个属性;

> 但是let, const是不会给window上添加任何属性的.

- 那么我们可能会想这个变量是保存在哪里呢?

- 我们先回顾下最新的ECMA标准中对执行上下文的描述

> Every execution context has associated with it a variable object. Variables and functions declared in the source text are added as
> properties of the variable object. For function code, parameters are added as properties of the variable object.

> 每一个执行上下文会被关联到一个变量环境(variable object, VO), 在源代码中的变量和函数声明会被作为属性添加到VO中. 对于函数来说, 参数也会被添加到VO中.

> Every exection context has an associated VariableEnvironment. Variables and functions declared in ECMAScript code evaluated in an execution
> context are added as bindings in that VariableEnvironment's Environment Record For function code, parameters are also added as bindings to 
> that Environment Record.

> 每一个执行上下文会关联到一个变量环境(VariableEnvironment)中, 在执行代码中变量和函数的声明会作为环境记录(Environment Record) 添加到变量环境中.
> 对于函数来说, 参数也会被作为环境记录添加到变量环境中


## 变量被保存到 VariableMap 中

- 也就是说我们声明的变量和环境记录是被添加到变量环境中的:

> 但是标准有咩有规定这个对象是 window 对象或者其他对象呢?
> 其实并没有, 那么JS引擎在解析的时候, 其实会有自己的实现;
> 比如v8中其实是通过VariableMap的一个hashmap来实现它们的存储的.
> 那么window对象呢? 而window对象是早期的GO对象, 在最新的实现中其实是浏览器添加的全局对象, 并且一致保持了 window和var之间值得相等性.


## 暂时性死区

- 在ES6中, 我们还有一个概念称之为暂时性死区:

> 它表达的意思是在一个代码中, 使用let, const声明的变量, 在声明之前, 变量都是不可以访问的;
> 我们将这种现象称之为 temporal deal zone(暂时性死区, TDZ)

## var, let, const 的选择

- 那么在开发中, 我们到底应该选择使用哪一种方式来定义我们的变量呢?
- 对于var的使用:

> 我们需要明白一个事实, var所表现出来的特殊性: 比如作用域提升, window全局对象, 没有块级作用域 等都是一些历史遗留问题
> 其实是 JavaScript 在设计之初的一种语言缺陷
> 当然目前市场上也在利用这种缺陷出一系列的面试题, 来考察大家对 JavaScript 语言本身以及底层的理解
> 但是在实际工作中, 我们可以使用最新的规范来编写, 也就是不再使用var来定义变量了

- 对于let, const:

> 对于let和const来说, 是目前开发中推荐使用的;
> 我们会优先推荐使用const, 这样可以保证数据的安全性不会被随意的篡改
> 只有当我们明确知道一个变量后续会需要被重新赋值时, 这个时候再使用let
> 这种在很多其他语言里面也都是一种约定俗成的规范, 尽量我们也遵守这种规范
