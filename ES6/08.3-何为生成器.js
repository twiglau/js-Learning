/**
 * ES6提供了生成器,让创建迭代器对象变得更简单.
 * 
 * 生成器(generator)是能返回一个迭代器的函数. 生成器函数由放在 function 关键字之后的一个星号(*)
 * 来表示,并能使用新的 yield 关键字. 将星号紧跟在 function 关键字之后,或是在中间留出空格,都是没
 * 问题的,如下:
 */

//生成器
function *createIterator() {
    yield 1;
    yield 2;
    yield 3;
}
//生成器能像正规函数那样被调用,但会返回一个迭代器
let iterator = createIterator();
console.log(iterator.next().value);
console.log(iterator.next().value);
console.log(iterator.next().value);
/**
 * createIterator() 前面的星号让此函数变成一个生成器. yield 关键字也是 ES6 新增的,
 * yield 指定了迭代器在被 next() 方法调用时应当按顺序返回的值.
 * 此例所生成的迭代器能够在 next() 方法调用成功时返回三个不同的值:先是1,然后是2,最后则是 3.
 * 生成器能像任意其他函数那样被调用,正如示例中创建 iterator 的代码.
 * 
 * 生成器函数最有意思的方面可能就是它们会在每个 yield 语句后停止执行. 例如, 此代码中 yield 1 
 * 执行后,该函数将不会再执行任何操作,直到迭代器的 next() 方法被调用,此时才继续执行 yield2,在函数
 * 中停止执行的能力是及其强大的,并能引出生成器函数的一些有趣的用法.
 * 
 * yield关键字可以和值或是表达式一起使用,因此你可以通过生成器给迭代器添加项目,而不是机械化地将项目
 * 一个个列出.作为一个例子,此处给出了在 for 循环内使用 yield 的方法:
 */
function *createIterator_01(items) {
    for(let i = 0; i < items.length; i++){
        yield items[i];
    }
}
let iterator_01 = createIterator_01([1,2,3])
console.log(iterator_01.next(),iterator_01.next(),iterator_01.next(),iterator_01.next());
//for 循环在循环执行时从数组中返回元素给迭代器. 每当遇到 yield,循环就会停止; 而每当 iterator 上的 next()
//方法被调用,循环就会再次执行到 yield 语句处.

//注意: yield 关键字只能用在生成器内部,用于其他任意位置都是语法错误,即使在生成器内部的函数中也不行.

/**
 * 1.生成器函数表达式
 * 你可以使用函数表达式来创建一个生成器,只要在 function 关键字与圆括号之间使用一个星号( * ) 即可,例如:
 */
let createIterator_02 = function *(items) {
    for(let i = 0; i < items.length; i++){
        yield items[i];
    }
};
let iterator_02 = createIterator_02([4,5,6]);
console.log(iterator_02.next());
console.log(iterator_02.next());
console.log(iterator_02.next());
console.log(iterator_02.next());
/**
 * 此代码中的 createIterator() 是一个生成器函数表达式,而不是一个函数声明. 星号放置在 function 关键字与圆括号
 * 之间,是因为这个函数表达式是匿名的. 除此之外,此例与前一个版本的 createIterator() 函数没有区别,都使用了一个for
 * 循环.
 * 
 * > 不能将箭头函数创建为生成器.
 */

/**
 * 2.生成器对象方法
 * 由于生成器就是函数,因此也可以被添加到对象中,例如,你可以在ES5风格的对象字面量中使用函数表达式来
 * 创建一个生成器:
 */
var o = {
    createIterator_03:function *(items) {
        for(let i = 0; i < items.length; i++){
            yield items[i];
        }
    }
};
let iterator_03 = o.createIterator_03([7,8,9,10]);

//也可以使用 ES6 方法的速记法,只要在方法名之前加上一个星号 ( * ) :
var oa = {
    *createIterator(items){
        for(let i = 0; i < items.length; i++){
            yield items[i];
        }
    }
};
let iterator_04 = oa.createIterator_04([11,12,13,14,15]);
