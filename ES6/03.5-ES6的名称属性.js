/**
 * 定义函数有各种各样的方式,在 JS 中识别函数就变的很有挑战性. 此外,匿名函数表达式的
 * 流行使得调试有点困难,经常导致堆栈跟踪难以被阅读与理解. 正因为此,ES6给所有函数添
 * 加了 name 属性.
 */

/**
 * 1.选择合适的名称
 * ES6 中所有函数都有适当的 name 属性值. 为了理解其实际运作,请看下例 ---它展示了一个
 * 函数与一个函数表达式,并将二者的 name 属性都打印出来:
 */
function doSomething(){
    // ...
}
var doAnotherThing = function(){
    // ...
};
console.log(doSomething.name);    // "doSomething"
console.log(doAnotherThing.name); // "doAnotherThing"
/**
 * 在此代码中,由于是一个函数声明, doSomething() 就拥有一个值为 "doSomething" 的
 * name 属性. 而匿名函数表达式 doAnotherThing() 的 name 属性值则是 "doAnotherThing"
 * 因为这是该函数所赋值的变量的名称.
 * 注: 匿名函数的名称属性在 FireFox 与 Edge 中仍然不被支持(值为空字符串),而Chrome直到
 * 51.0版本才提供了该特性.
 */

/**
 * 2.名称属性的特殊情况
 * 虽然函数声明与函数表达式的名称易于查找,但ES6更进一步确保了所有函数都拥有合适的名称
 * 如下:
 */
var doSomething = function doSomethingElse(){
    // ...
};
var person = {
    get firstName(){
        return "Nicholas"
    },
    sayName:function(){
        console.log(this.name);
    }
}
console.log(doSomething.name);
console.log(person.sayName.name);
var descriptor = Object.getOwnPropertyDescriptor(person,"firstName");
console.log(descriptor.get.name);
/**
 * 本例中的 doSomething.name 的值是 "doSomethingElse",因为该函数表达式自己拥有一个名称,并且
 * 此名称的优先级要高于赋值目标的变量名. person.sayName() 的 name 属性值是 "sayName",正如
 * 对象字面量指定的那样,类似的, person.firstName 实际是个 getter 函数,因此它的名称是 "get firstName",
 * 以标明它的特征: 同样, setter函数也会带有 "set" 的前缀
 * (getter 与 setter 函数都必须用 Object.getOwnPropertyDescriptor() 来检索).
 * 
 * 函数名称还有另外两个特殊情况,使用 bind() 创建的函数会在名称属性值之前带有 "bound"前缀;
 * 而使用 Function 构造器创建的函数,其名称属性则会有 "anonymous" 前缀,如:
 */
var doSomething = function(){
    // ...
};
console.log(doSomething.bind().name); // "bound doSomething"
console.log((new Function().name));
console.log(doSomething.name);
/**
 * 绑定产生的函数拥有原函数的名称,并总会附带 "bound" 前缀,因此 doSomething() 函数的绑定版本就
 * 具有 "bound doSomething" 名称.
 * 
 * 需要注意的是,函数的 name 属性值未必会关联到同名变量. name 属性是为了在调用时获得有用的相关
 * 信息,所以不能用 name 属性值去获取对函数的引用.
 */