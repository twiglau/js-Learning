# iterator

## 迭代器?

* 迭代器(iterator), 是 确使 用户可在容器对象(container, 例如链表或数组) 上遍访的对象, 使用该接口无需关心对象的内部实现细节

> 其行为像数据库中的光标, 迭代器最早出现在1974年设计的CLU编程语言中
> 在各种编程语言的实现中, 迭代器的实现方式各部相同, 但是基本都有迭代器, 比如 Java, Python等

* 从迭代器的定义我们可以看出来, 迭代器是帮助我们对某个数据结构进行遍历的对象
* 在JavaScript中, 迭代器也是一个具体的对象, 这个对象需要符合迭代器协议(iterator protocol)

> 迭代器协议定义了产生一系列值(无论是有限还是无限个) 的标准方式
> 那么在js中这个标准就是一个特定的next方法

* next方法有如下的要求:
* 一个无参数或一个函数, 返回一个应当拥有以下两个属性的对象

> done (boolean)
>> 如果迭代器可以产生序列中的下一个值, 则为false  (这等价于没有特定 done 这个属性)
>> 如果迭代器已将序列迭代完毕, 则为 true. 这种情况下, value 是可选的, 如果它依然存在, 即为迭代结束之后的默认返回值
> value
>> 迭代器返回的任何 JavaScript值. done 为 true 时可省略

## 可迭代对象

* 但是上面的代码整体来说看起来是有点奇怪的:

> 我们获取一个数组的时候, 需要自己创建一个 index 变量, 再创建一个所谓的迭代器对象
> 事实上我们可以对上面的代码进行进一步的封装, 让其变成一个柯迭代对象

* 什么是可迭代对象?

> 它和迭代器是不同的概念
> 当一个对象实现了 iterable protocol 协议时, 它就是一个可迭代对象
> 这个对象的要求是必须实现 @@iterator 方法, 在代码中我们使用 Symbol.iterator 访问该属性

## 注意迭代器和可迭代对象区别

* 迭代器是一个对象

> 符合迭代器协议 (iterator protocol) => next函数
> `const iterator = { next: function() { return {} }}`

* 可迭代对象 是一个对象

> 符合可迭代协议 (iterable protocol) => [Symbol.iterator] 函数
> `const iterableObj = {[Symbol.iterator]: function() { return 迭代器 }}`

## 原生迭代器对象

* 事实上我们平时创建的很多原生对象已经实现了可迭代协议, 会生成一个迭代器对象的:

> String, Array, Map, Set, arguments对象, NodeList集合

## 可迭代对象的应用

* 这些内容可以被用在哪里

> JavaScript中语法: for...of, 展开语法(spread syntax), yield*, 结构赋值(Destructuring_assignment);
> 创建一些对象时: new Map([Iterable]), new WeakMap([Iterable]), new Set([iterable]), new WeakSet([iterable])
> 一些方法的调用: Promise.all(iterable), Promise.race(iterable), Array.form(iterale)

## 迭代器的中断

* 迭代器在某些情况下会在没有完全迭代的情况下中断:

> 比如遍历的过程中通过 break, continue, return, throw 中断了循环操作
> 比如在解构的时候, 没有解构所有的值

* 那么这个时候我们想要监听中断的话, 可以添加 return 方法

```js
[Symbol.iterator]() {
    let index = 0
    return {
        next: () => {
            if(index < this.students.length) {
                return { done: false, value: this.students[length]}
            } else {
                return { done: true, value: undefined }
            }
        },
        return: () => {
            console.log("迭代器提前终止了~")
            return { done: true, value: undefined }
        }
    }
}
```