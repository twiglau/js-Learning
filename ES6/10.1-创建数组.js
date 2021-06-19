/**
 * 在ES6之前创建数组主要存在两种方式:
 * Array 构造器与数组字面量写法.ES6又新增了 Array.of() 与 Array.from() 方法.
 */
/**
 * 1.Array.of() 方法
 * ES6为数组新增创建方法的目的之一,是帮助开发者在使用 Array 构造器时避开 JS 语言的
 * 一个怪异点. 调用 new Array() 构造器时,根据传入参数的类型与数量的不同,实际上会
 * 导致一些不同的结果.如下:
 */
let items = new Array(2);
console.log(items.length);
console.log(items[0]);
console.log(items[1]);

items = new Array("2");
console.log(items.length);
console.log(items[0]);

items = new Array(1,2);
console.log(items.length);
console.log(items[0]);
console.log(items[1]);

items = new Array(3,"2");
console.log(items.length);
console.log(items[0]);
console.log(items[1]);
/**
 * 当使用单个数值参数来调用 Array 构造器时,数组的长度属性会被设置为该参数;而如果使用单个
 * 的非数值型参数来调用,该参数就会成为目标数组的唯一项;如果使用多个参数(无论是否为数值类型)
 * 来调用,这些参数也会成为目标数组的项. 数组的这种行为即混乱又有风险,因为有时可能不会留意
 * 所传参数的类型.
 * ES6引入了 Array.of() 方法来解决这个问题.该方法的作用非常类似 Array 构造器,但在使用
 * 单个数值参数的时候并不会导致特殊结果. Array.of() 方法总会创建一个包含所有传入参数的数组,
 * 而不管参数的数量与类型. 如下用法:
 */

items = Array.of(1,2);
console.log(items.length);
console.log(items[0]);
console.log(items[1]);

items = Array.of(2);
console.log(items.length);
console.log(items[0]);

items = Array.of("2");
console.log(items.length);
console.log(items[0]);
/**
 * 在使用 Array.of() 方法创建数组时,只需要想要包含在数组内的值作为参数传入. 第一个例子创建
 * 了一个包含两个项的数组,第二个数组只包含了单个数值项,而最后一个数组则包含了单个字符串项.这
 * 个结果类似于使用数组字面量写法,通常你都可以在原生数组上使用字面量写法来代替 Array.of(),但
 * 若想向函数传递参数,使用 Array.of() 而非 Array 构造器能够确保行为一致,如下:
 */
function createArray(arrayCreator,value){
    return arrayCreator(value);
}
items = createArray(Array.of,2);
//此代码中的 createArray() 函数接收两个参数: 一个数组创建其与一个值,并会将后者插入到目标数组中.
//你应当向 createArray() 函数传递 Array.of() 作为第一个参数来创建新数组;相反,若传递 Array 构造
//器则会有危险,因为你无法保证第二个参数不是数值类型.

//Array.of()方法并没有使用 Symbol.species 属性来决定返回值的类型,而是使用了当前的构造器(即 of()
//方法内部的 this ) 来做决定.

/**
 * 2.Array.from() 方法
 * 在JS中将非数组对象转换为真正的数组总是很麻烦,例如,若想将类数组的 arguments 对象当做数组来使用,那么
 * 你首先需要对其进行转换. 在ES5中, 进行这种转换需要编写一个函数,如下:
 */
function makeArray(arrayLike){
    var result = [];
    for(var i = 0,len = arrayLike.length; i < len; i++){
        result.push(arrayLike[i]);
    }
    return result;
}
function doSomething(){
    var args = makeArray(arguments);

    //使用 args
}
//该方式手动创建一个 result 数组,并将 arguments 对象的所有项复制到该数组中,这种方式虽然有效,却
//为一个简单操作书写了过多的代码. 开发者最终发现他们可以调用数组原生的 slice() 方法来减少代码量,
//如下:
function makeArray(arrayLike){
    return Array.prototype.slice.call(arrayLike);
}
function doSomething() {
    var args = makeArray(arguments);
    //使用 args
}
//这段代码的功能与前一段代码等效,它能正常工作是因为将 slice() 方法的 this 设置为类数组对象,slice()
//只需要有数值类型的索引与长度属性就能正常工作,而类数组对象能满足这些要求.

//尽管这种技巧所用的代码量更少,但调用 Array.prototype.slice.call(arrayLike) 并没有明确提现出
//"要将类数组对象转换为数组" 的目的. 幸运的是, ES6 新增了 Array.from() 方法来提供一种明确清晰的方式
//以解决这方面的需求.

//将可迭代对象或者类数组对象作为第一个参数传入, Array.from() 就能返回一个数组.
//如下:
function doSomething() {
    var args = Array.from(arguments);
    //使用 args
}
//此处调用 Array.from() 方法,使用 arguments 对象创建了一个新数组 args,它是一个数组实例,并且包含了
//arguments 对象的所有项,同时还保持了项的顺序.
//Array.from() 方法同样使用 this 来决定要返回什么类型的数组.

/**
 * 2.1 映射转换
 * 如果你想实行进一步的数组转换,你可以向 Array.from() 方法传递一个映射用的函数作为第二个参数.此函数会将
 * 类数组对象的每一个值转换为目标形式,并将其存储在目标数组的对应位置上,如下:
 */
function translate(){
    return Array.from(arguments,(value) => value + 1);
}
let numbers = translate(1,2,3)
console.log(numbers);
//此代码将 (value) => value + 1 作为映射函数传递给了 Array.from() 方法,对每个项进行了一次 +1 处理.
//如果映射函数需要在对象上工作,你可以手动传递第三个参数给 Array.from() 方法,从而指定映射函数内部的 this 值.

let helper = {
    diff:1,
    add(value){
        return value + this.diff;
    }
};
function translateObj() {//ReferenceError: Cannot access 'helper' before initialization
    return Array.from(arguments,helper.add,helper);
}
let nums = translateObj(4,5,6);
console.log(nums);
//这个例子使用了helper.add()作为映射函数,由于该函数使用了 this.diff 属性,你必须向 Array.from() 方法
//传递第三个参数用于指定 this, 借助这个参数, Array.from() 就可以方便地进行数据转换,而无须调用 bind() 方法,
//或用其他方式指定 this 值.

/**
 * 2.2 在可迭代对象上使用
 * Array.from() 方法不仅可用于类数组对象,也可用于可迭代对象,这意味着该方法可以将任意包含Symbol.iterator 属性
 * 的对象转换为数组,如下:
 */
let num2 = {
    *[Symbol.iterator]() {
        yield 1;
        yield 2;
        yield 3;
    }
};
let num3 = Array.from(num2,(value) => value + 1);
console.log(num3);
//由于代码中的 num2 对象是一个可迭代对象,你可以把它直接传递给 Array.from() 方法,从而将它包含的值转换为数组,
//映射函数对每个数都进行了 +1 处理,因此目标数组的内容就是2,3,4, 而不是 1,2,3.

//如果一个对象即是类数组对象,又是可迭代对象,那么迭代器就会使用 Array.from() 方法来决定需要转换的值.
