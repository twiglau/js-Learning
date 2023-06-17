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