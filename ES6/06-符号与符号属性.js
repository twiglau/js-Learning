/**
 * ES6 引入了一种新的基本类型:符号(Symbol).
 * 符号起初被设计用于创建对象私有成员,而这也是JS开发者期待已久的特性.在符号诞生之前,将字符串作为属性
 * 名称导致属性可以被轻易访问,无论命名规则如何. 而"私有名称"意味着开发者可以创建非字符串类型的属性
 * 名称,由此可以防止使用常规手段来探查这些名称.
 * 
 * "私有名称"提案最终发展成为ES6中的符号
 * 1.创建符号值
 * 2.使用符号值
 * 3.共享符号值
 * 4.符号值的转换
 * 5.检索符号属性
 * 6.使用知名符号暴露内部方法
 *   6.1 Symbol.hasInstance 属性
 *   6.2 Symbol.isConcatSpreadable
 *   6.3 Symbol.match, Symbol.replace, Symbol.search 与 Symbol.split
 *   6.4 Symbol.toPrimitive
 *   6.5 Symbol.toStringTag
 *       6.5.1 识别问题的变通解决方法
 *       6.5.2 ES6给出的答案
 *   6.6 Symbol.unscopables
 * 7.总结
 */