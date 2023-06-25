# es6

## 模版字符串

## 标签模版字符串使用

- 模版字符串还有另外一种用法: 标签模版字符串(Tagged Template Literals)
- React 的 styled-components库


## 函数的剩余参数

- ES6中引用了 rest parameter, 可以将不定数量的参数放入到一个数组中.
- 如果最后一个参数是 ... 为前缀的, 那么它会将剩余的参数放到该参数中, 并且作为一个数组;
- 那么剩余参数和arguments有什么区别呢?

> 剩余参数只包含哪些 没有对应形参的实参, 而 arguments 对象包含了传给函数的所有实参;
> arguments对象不是一个真正的数组, 而 rest参数是一个真正的数组, 可以进行数组的所有操作;
> arguments是早期ECMAScript中为了方便去获取所有的参数提供的一个数据结构, 而rest参数是ES6
> 中提供并且希望以此来替代arguments的

- 剩余参数必须放到最后

> Rest parameter must be last formal parameter