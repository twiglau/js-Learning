# es6

## 模版字符串

## 标签模版字符串使用

- 模版字符串还有另外一种用法: 标签模版字符串(Tagged Template Literals)
- React 的 styled-components 库

## 函数的剩余参数

- ES6 中引用了 rest parameter, 可以将不定数量的参数放入到一个数组中.
- 如果最后一个参数是 ... 为前缀的, 那么它会将剩余的参数放到该参数中, 并且作为一个数组;
- 那么剩余参数和 arguments 有什么区别呢?

> 剩余参数只包含哪些 没有对应形参的实参, 而 arguments 对象包含了传给函数的所有实参;
> arguments 对象不是一个真正的数组, 而 rest 参数是一个真正的数组, 可以进行数组的所有操作;
> arguments 是早期 ECMAScript 中为了方便去获取所有的参数提供的一个数据结构, 而 rest 参数是 ES6
> 中提供并且希望以此来替代 arguments 的

- 剩余参数必须放到最后

> Rest parameter must be last formal parameter

## Symbol 的基本使用

- Symbol 是什么呢? Symbol 是 ES6 中新增的一个基本数据类型, 翻译为符号.
- 那么为什么需要 Symbol 呢?

> 在 ES6 之前, 对象的属性名都是字符串的形式, 那么很容易造成 属性名的冲突;
> 比如原来有一个对象, 我们希望在其中添加一个新的属性和值, 但是我们在不确定它原来内部有什么内容的情况下, 很容易造成冲突, 从而
> 覆盖它内部的某个属性
> 比如我们前面在讲 apply, call, bind 实现时, 我们有给其中添加一个 fn 属性, 那么如果它内部原来已经有了 fn 属性了呢?
> 比如开发中我们使用混入, 那么混入中出现了同名的属性, 必然有一个会被覆盖掉;

- Symbol 就是为了解决上面的问题, 用来生成一个独一无二的值

> Symbol 值是通过 Symbol 函数来生成的, 生成后可以 作为属性名;
> 也就是在 ES6 中, 对象的属性名可以使用 字符 串, 也可以使用 Symbol 值

- Symbol 即使多次创建值, 它们也是不同的: Symbol 函数执行后每次创建出来的值都是独一无二的
- 我们也可以在创建 Symbol 值得时候传入一个描述 description: 这个是 ES2019(ES10) 新增的特性

## Set 的基本使用

- 在 ES6 之前, 我们存储数据的结构主要有两种: 数组, 对象.
- 在 ES6 中新增了另外两种数据结构: Set, Map, 以及它们的另外形式 WeakSet, WeakMap.

## WeakSet 使用

- 和 Set 类似的另外一个数据结构称之为 WeakSet, 也是内部元素不能重复的数据结构
- 那么和 Set 有什么区别呢?

> 区别一: WeakSet 中智能存放对象类型, 不能存放基本数据类型
> 区别二: WeakSet 对元素的引用是弱引用, 如果没有其他引用对某个对象进行再引用, 那么 GC 可以对该对象进行回收

- 注意: WeakSet 不能遍历

> 因为 WeakSet 只是对对象的弱引用, 如果我们遍历获取到其中的元素, 那么有可能造成对象不能正常的销毁.
> 所以存储到 WeakSet 中的对象是没办法获取的

- 那么这个东西有什么用呢?

> 事实上这个问题并不好回答, 我们来使用一个 Stack Overflow 上的答案

```JavaScript
const pwset = new WeakSet()
class Person {
    constructor() {
        pwset.add(this)
    }
    running() {
        if(!pwset.has(this)) throw new Error("不能通过其他对象调用running方法")
        console.log("running", this)
    }
}
```

## Map 的基本使用

- 另外一个新增的数据结构是 Map, 用于存储映射关系
- 但是我们可能会想, 在之前我们可以使用对象来存储映射关系, 它们有什么区别呢?

> 事实上我们对象存储映射关系只能用字符串(ES6 新增了 Symbol)作为属性名(key)
> 某些情况下我们可能希望通过其他类型作为 key, 比如对象, 这个时候会自动将对象转成字符串来作为 key

## WeakMap 的使用

- 和 Map 类型相似的另外一个数据结构称之为 WeakMap, 也是以键值对的形式存在的

- 那么和 Map 有什么区别呢?

> 区别一: WeakMap 的 key 只能使用对象, 不接受其他的类型作为 key;
> 区别二: WeakMap 的 key 对对象的引用是弱引用, 如果没有其他引用来引用这个对象, 那么 GC 可以回收该对象;
