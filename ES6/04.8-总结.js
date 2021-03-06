/**
 * 对象是 JS编程的中心,ES6 对它进行了一些有有益改进,让他更易用并且更加强大.
 * 
 * ES6为对象字面量做了几个改进:
 * > 速记属性定义能顾更轻易地将作用域的变量赋值给对象的同名属性;
 * > 需计算属性名允许你将非字面量的值指定为属性的名称,就像此前在其他场合的用法那样;
 * > 方法简写让你在对象字面量中定义方法是能省略冒号和function关键字,从而减少输入
 *   的字符数;
 * > ES6还舍弃了对象字面量中重复属性名的检查,意味着你可以在一个对象字面量中书写两个
 *   同名属性,而不会抛出错误.
 * > Object.assign() 方法使得一次性更改单个对象的多个属性变得更加容易,这在你使用
 *   混入模式时非常有用.
 * > Object.is() 方法对任何值都会执行严格相等比较,当在处理特殊的 JS 值时,它有效成
 *   为了 === 的一个更安全的替代品.
 * > 对象自由属性的枚举顺序在 ES6 中被明确定义了. 在枚举属性是,数字类型的键总是会首先
 *   出现,并按升序排列,此后是字符串类型的键,最后是符号类型的键,后两者都分别按添加顺
 *   序排列
 * > ES6 的 Object.setPrototypeOf() 方法,现在能够在对象已被创建之后更改它的原型
 * > 可以使用 super 关键字来调用对象原型上的方法,所调用的方法会被设置好其内部的 this
 *   绑定,以自动使用该 this 值来进行工作.
 */