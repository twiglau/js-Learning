/**
 * ES6之前, "方法"的概念从未被正式定义,它此前仅指对象的函数属性(而非数据属性).
 * ES6则正式做出了定义:
 * 方法是一个拥有 [[HomeObject]] 内部属性的函数,此内部属性指向该方法所属的对象.
 * 
 * 以下例子:
 */
let person = {
    //方法
    getGreeting() {
        return "Hello";
    }
};
//并非方法
function shareGreeting() {
    return "Hi!";
}
/**
 * 此例定义了拥有单个 getGreeting() 方法的 person 对象. 由于 getGreeting() 被直接赋给
 * 了一个对象,它的 [[HomeObject]] 属性值就是 person. 而另一方面, shareGreeting() 函数
 * 没有被指定 [[HomeObject]] 属性,因为它在被创建时并没有赋给一个对象. 大多数情况下,这种差异
 * 并不重要,然而使用 super 引用时就完全不同了.
 * 
 * 任何对 super 的引用都会使用 [[HomeObject]] 属性来判断要做什么. 第一步是在 [[HomeObject]]
 * 上调用 Object.getPrototypeOf() 来获取对原型的引用; 接下俩,在该原型上查找同名函数;最后,创建
 * this 绑定并调用该方法,如下:
 */
let man = {
    getGreeting(){
        return "Hello";
    }
};
let friend = {
    getGreeting() {
        return super.getGreeting() + ", hi!";
    }
};
Object.setPrototypeOf(friend,man);

console.log(friend.getGreeting());
/**
 * 调用 friend.getGreeting() 返回了一个字符串,也就是 man.getGreeting() 的返回值与 ", hi!"的合并结果.
 * 此时 friend.getGreeting() 的 [[HomeObject]] 值是 friend, 并且 friend 的原型是 man,
 * 因此 super.getGreeting() 就等价于 man.getGreeting.call(this).
 */