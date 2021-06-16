/**
 * 文档对象模型(DOM)具有一种 NodeList 类型,用于表示页面文档中元素的集合.对于需要书写在
 * 浏览器中运行的JS代码的开发者,要理解 NodeList 对象与数组之间的差异总是稍有困难. NodeList
 * 对象与数组都使用了 length 属性来标明项的数量,并且都使用方括号表示法来访问各个项,然而本质
 * 上来说, NodeList 与数组的行为是完全不同的,这会引发许多混乱.
 * 
 * 随着默认迭代器被附加到ES6, DOM关于 NodeList 的规定也包含了一个默认迭代器,其表现方式
 * 与数组的默认迭代器一致. 这意味着你可以将 NodeList 用于 for-of 循环,或用于其他使用
 * 对象默认迭代器的场合,如下:
 */
var divs = document.getElementsByTagName("div");
for(let div of divs){
    console.log(div.id)
}
/**
 * 此代码调用 getElementsByTagName() 来获取一个包含 document 对象中的所有 <div> 元素的NodeList,
 * 接下来 for-of 循环迭代了每个元素并打印出它们的ID,实际上这段代码与在标准数组上使用时并无二致.
 */

/**
 * 1. 扩展运算符与非数组的可迭代对象
 * 第七章,扩展运算符( ... ) 可以被用于将一个Set转换为数组
 * 如下:
 */
let set = new Set([1,2,3,3,4,4,5]),array = [...set];
console.log(array);
/**
 * 此代码在数组字面量中使用扩展运算符,以便将 set 中的值填充到数组.扩展运算符能作用于所有可迭代对象,并且
 * 会使用默认迭代器来判断需要使用那些值.所有的值都从迭代器中被读取出来并插入数组,遵循迭代器返回值的顺序.
 * 此例工作正常是由于Set是可迭代对象,但这种方式同样还能用于任意的可迭代对象.
 */
let map = new Map([["name","Nicholas"],["age",25]]),arrayMap = [...map];
console.log(arrayMap)
/**
 * 同时也可以不限次数地在数组字面量中使用扩展运算符,而且可以在任意位置用扩展运算符将可迭代对象的多个项插入
 * 数组,这些项在新数组中将会出现在扩展运算符对应的位置,如下:
 */
let smallNumbers = [1,2,3],bigNumbers = [100,101,102],allNumbers = [0,...smallNumbers,...bigNumbers];
console.log(allNumbers.length);
console.log(allNumbers);
/**
 * 此处的扩展运算符使用 smallNumbers 与 bigNumbers 中的数据来创建 allNumbers 数组. 在allNumbers被
 * 创建时,值在其中的排列顺序与数组被添加的顺序一致: 首先是 0,其次是来自 smallNumbers 数组的元素,最后是
 * 来自 bigNumbers 数组的元素. 原始数组并没有被改变,只是它们的值被复制到了 allNumbers 数组中.
 */