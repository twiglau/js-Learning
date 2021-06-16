/**
 * 1.通过 next() 方法向迭代器传递参数. 当一个参数被传递给 next() 方法时,该参数就会成为
 * 生成器内部 yield 语句的值. 这种能力对于更多高级功能(例如异步编程)来说非常重要.如下:
 */
function *createIterator(){
    let first = yield 1;
    let second = yield first * 2;
    yield second + 3;
}
let iterator = createIterator();
console.log(iterator.next());
console.log(iterator.next(4));
console.log(iterator.next(5));
console.log(iterator.next());

/**
 * 2.在迭代器中抛出错误
 * 能传递给迭代器的不仅是数据,还可以是错误条件. 迭代器可以选择实现一个 throw() 方法,用于指示
 * 迭代器应在恢复执行时抛出错误. 这是对异步编程来说很重要的一个能力,同时也会增加生成器内部的灵
 * 或度,能够即模仿返回一个值,又模仿抛出错误,可以传递一个错误对象给 throw() 方法,当迭代器继续
 * 进行处理时应当抛出此错误.如下:
 */
console.log(iterator.next());
console.log(iterator.next(4));
// console.log(iterator.throw(new Error("Boom")));

function *createIteratorTry(){
    let first = yield 1;
    let second;
    try {
        second = yield first * 2;
    }catch(ex){
        second = 6;
    }
    yield second + 3;
}
let iteratorTry = createIteratorTry();
console.log(iteratorTry.next());
console.log(iteratorTry.next(4));
console.log(iteratorTry.throw(new Error("Boom")));
console.log(iteratorTry.next());

/**
 * 3.生成器的Return语句
 * 在生成器内, return 表明所有的处理已完成,因此 done 属性会被设为 true,而如果提供了返回值,就
 * 会被用于 value 字段. 如下:
 */
function *createIteratorReturn(){
    yield 1;
    return;
    yield 2;
    yield 3;
}
let iteratorReturn = createIteratorReturn();
console.log(iteratorReturn.next());
console.log(iteratorReturn.next());
//也可以指定一个返回值,会被用于最终返回的结果对象中的 value 字段.如下:
function *createIteratorReturnValue(){
    yield 1;
    return 42;
}
let iteratorReturnValue = createIteratorReturnValue();
console.log(iteratorReturnValue.next());
console.log(iteratorReturnValue.next());
console.log(iteratorReturnValue.next());

/**
 * 4.生成器委托
 * 在某些情况下,将两个迭代器的值合并其一起会更有用. 生成器可以用星号( * )配合yield这一
 * 特殊形式来委托其他的迭代器. 正如生成器的定义,星号出现在何处是不重要的,只要落在yield
 * 关键字与生成器函数名之间即可,如下:
 */
function *createNumberIterator(){
    yield 1;
    yield 2;
}
function *createColorIterator(){
    yield "red";
    yield "green";
}
function *createCombinedIterator(){
    yield *createNumberIterator();
    yield *createColorIterator();
    yield true;
}
var iteratorCombined = createCombinedIterator()
console.log(iteratorCombined.next());
console.log(iteratorCombined.next());
console.log(iteratorCombined.next());
console.log(iteratorCombined.next());
console.log(iteratorCombined.next());
console.log(iteratorCombined.next());
