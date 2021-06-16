/**
 * 可迭代对象(iterable)是包含 Symbol.iterator 属性的对象.这个 Symbol.iterator 知名符号定义了为指定对象
 * 返回迭代器的函数. 在 ES6 中, 所有的集合对象 (数组, Set 与 Map) 以及字符串都是可迭代对象,因此它们都被指
 * 定了默认的迭代器. 可迭代对象被设计用于与 ES 新增的 for-of 循环配合使用.
 * 
 * 生成器创建的所有迭代器都是可迭代对象,因为生成器默认就会为 Symbol.iterator 属性赋值.
 * 
 * 在开头提过在 for 循环中追踪索引的问题. 迭代器是解决此问题的第一部分; for-of 循环则是第二部分; 它完全
 * 删除了追踪集合索引的需要,让你无拘束地专注于操作集合内容.
 * 
 * for-of 循环在循环每次执行时会调用可迭代对象的 next() 方法,并将结果对象的 value 值存储在一个变量上,
 * 循环过程会持续到结果对象的 done 属性变成 true 为止. 此处有个范例:
 */
let values = [4,5,6];
for(let key in values){
    console.log(key);
}
for(let num of values){
    console.log(num);
}
/**
 * 这个 for-of 循环首先调用了 values 数组的 Symbol.iterator 方法,获取了一个迭代器
 * (对 Symbol.iterator 的调用发生在 JS 引擎后台). 接下来 iterator.next() 被调用,
 * 迭代器结果对象的 value 属性被读出并放入了 num 变量. num 变量的值开始为1, 接下来是2,
 * 最后变成3. 当结果对象的 done 变成 true, 循环就退出了,因此 num 绝不会被赋值为 undefined.
 * 
 * 如果只是简单地迭代数组或集合的值,那么使用for-of 循环而不是 for 循环就是个好主意. for-of 循环
 * 一般不易出错,因为需要留意的条件更少; 传统的 for 循环被保留用于处理更复杂的控制条件.
 */

/**
 * 1.访问默认迭代器
 * 你可以使用 Symbol.iterator 来访问对象上的默认迭代器,如下:
 */
let valuesDefault = [1,2,3];
let iteratorDefault = valuesDefault[Symbol.iterator]();
console.log(iteratorDefault.next());
console.log(iteratorDefault.next());
console.log(iteratorDefault.next());
console.log(iteratorDefault.next());
//以上代码获取了 values 数组的默认迭代器,并用它来迭代数组中的项,这个过程与使用 for-of 循环时在后台发生
//的过程一致.

//既然 Symbol.iterator 指定了默认迭代器,你就可以使用它来检测一个对象是否可以进行迭代,如下:
function isIterable(object) {
    return typeof object[Symbol.iterator] === "function";
}
console.log(isIterable[1,2,3]);
console.log(isIterable("Hello"));
console.log(isIterable(new Map()));
console.log(isIterable(new Set()));
console.log(isIterable(new WeakMap()));
console.log(isIterable(new WeakSet()));
//这个 isIterable() 函数仅仅查看对象是否存在一个类型为函数的默认迭代器. for-of 循环在执行之前会做
//类似的检查.

//2.创建可迭代对象
/**
 * 开发者自定义对象默认情况下不是可迭代对象,但你可以创建一个包含生成器的 Symbol.iterator 属性,使之成为可迭代对象.
 */
let collection = {
    items:[],
    *[Symbol.iterator](){
        for(let item of this.items){
            yield item;
        }
    }
};
collection.items.push(1);
collection.items.push(2);
collection.items.push(3);
for(let x of collection){
    console.log(x);
}
/**
 * 本例首先为 collection 对象定义了一个默认的迭代器,这个默认迭代器是用Symbol.iterator方法创建的,
 * 此方法是一个生成器(注意名称之前依然有星号). 接下来该生成器使用了一个 for-of 循环来对 this.items
 * 中的值进行迭代,并使用了 yield 来返回每个值. collection 对象依靠 this.items 的默认迭代器来工作,
 * 而非定义的值上手动进行迭代.
 */