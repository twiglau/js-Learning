# Proxy Reflect

## 监听对象的操作

- 先来看一个需求: 有一个对象, 我们希望监听这个对象中的属性被设置或获取的过程

> 通过我们前面所学的知识, 能不能做到这一点呢?
> 其实是可以的, 可以通过之前的属性描述符中的存储属性描述符来做到

- 但是这样做有什么缺点呢?

> 首先 Object.defineProperty 设计的初衷, 不是为了去监听截止一个对象中所有的属性的.
> 我们在定义某些属性的时候, 初衷其实是定义普通的属性, 但是后面我们强行将它变成了数据属性描述符
> 其次,如果我们想监听更加丰富的操作, 比如新增属性, 删除属性, 那么Object.defineProperty是无能为力的
> 存储数据描述符设计的初衷并不是为了去监听一个完整的对象

## Proxy基本使用

- 在ES6中, 新增了一个Proxy类, 这个类从名字就可以看出来, 是用于帮助我们创建一个代理的

> 也就是说, 如果我们希望监听一个对象的相关操作, 那么我们可以先创建一个代理对象(Proxy对象);
> 之后对该对象的所有操作, 都通过代理对象来完成, 代理对象可以监听我们想要对原对象进行哪些操作;

- 我们可以将上面的案例用Proxy来实现一次:

> 首先, 我们需要new Proxy 对象, 并且传入需要侦听的对象以及一个处理对象, 可以称之为handler;
> const p = new Proxy(target, handler)
> 其次, 我们之后的操作都是直接对Proxy的操作, 而不是原有的对象, 因为我们需要在handler里面进行侦听;


## Proxy的set和get捕获器

- 如果我们想要侦听某些具体的操作, 那么就可以在handler中添加对应的捕捉器(Trap):
- set和get分别对应的是函数类型:
- set函数有四个参数:

> target: 目标对象(侦听的对象)
> property: 将被设置的属性key
> value: 新属性值
> receiver: 调用的代理对象

- get函数有三个参数:

> target: 目标对象(侦听的对象)
> property: 被获取的属性Key
> receiver: 调用的代理对象

## Proxy所有捕获器

- 13个捕获器分别是做什么呢?

> handler.getPrototypeOf()
>> Object.getPrototypeOf 方法的捕捉器
> handler.setPrototypeOf()
>> Object.setPrototypeOf() 方法的捕捉器
> handler.isExtensible()
>> Object.isExtensible() 方法的捕捉器
> handler.preventExtensions()
> handler.getOwnPropertyDescriptor()
> handler.defineProperty()
> handler.ownKeys()
>> Object.getOwnPropertyNames方法和Object.getOwnPropertySymbols方法的捕捉器
> handler.has()
>> in 操作符的捕捉器
> handler.get()
> handler.set()
> handler.deleteProperty()
>> delete 操作符的捕捉器
> hanlder.apply()
>> 函数调用操作的捕捉器 
> handler.construct()
>> new 操作符的捕捉器

## Reflect的作用

- Reflect也是ES6新增的一个API, 它是一个对象, 字面的意思是 反射
- Reflect有什么用?

> 它主要提供了很多操作javaScript对象的方法, 有点像Object中操作对象的方法
> 比如Reflect.getPrototypeOf(target)类似于Object.getPrototypeOf()
> 比如Reflect.defineProperty(target, propertyKey, attributes)类似于Object.defineProperty()

- 如果有Object可以做这些操作, 那么为什么还需要有Reflect这样的新增对象?

> 这是因为在早期的ECMA规范中没有考虑到这种 对 对象本身 的操作如何设计会更加规范, 所以 将这些API放到了Object上面
> 但是Object作为一个构造函数, 这些操作实际上 放到它身上并不合适
> 另外还包含一些 类似于 in, delete 操作符, 让JS看起来是会有一些奇怪的
> 所以在ES6中新增了Reflect, 让我们这些操作都集中到了 Reflect对象上

## Reflect 的常见方法

- 它和Proxy是一一对应的, 也是13个
