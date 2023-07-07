# ---

## Error类型

- 事实上, JavaScript已经给我们提供了一个Error类, 我们可以直接创建这个类的对象

```js
function foo() {
    throw new Error("error message", "123")
}
```

- Error包含三个属性:

> message: 创建Error对象时传入 message
> name: Error的名称, 通常和类的名称一致
> stack: 整个Error的错误信息, 包括函数的调用栈, 当我们直接打印Error对象时, 打印的就是stack

- Error有一些自己的子类:

> RangeError: 下标值越界时使用的错误类型
> SynatxError: 解析语法错误时使用的错误类型
> TypeError: 出现类型错误时, 使用的错误类型
