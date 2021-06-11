/**
 * 1.创建符号值
 * 符号没有字面量形式,这在JS的基本类型中是独一无二的,有别与布尔类型的true 或数值类型的 42等等.
 * 你可以使用全局的 Symbol 函数来创建一个符号值.
 */
let firstName = Symbol();
let person = {};

person[firstName] = "Nicholas";
console.log(person[firstName]); // "Nicholas"
/**
 * 此代码创建了一个符号类型的 firstName 变量,并将它作为 person 对象的一个属性,而每次访问该
 * 属性都要使用这个符号值. 为符号变量适当命名是个好主意,这样你就可以很容易地说明它的含义.
 * 
 * 由于符号值的基本类型的值,因此调用 new Symbol() 将会抛出错误. 你可以通过 new Object(yourSymbol)
 * 来创建一个符号实例,但尚不清除有何用?
 * 
 * Symbol 函数还可以接受一个额外的参数用于描述符号值,该描述并不能用来访问对应属性,但它能用于调试,例如:
 */
let firstTag = Symbol("first Tag");
let animal = {};
animal[firstTag] = "Nicholas";
console.log(animal[firstTag]);
console.log(firstTag);
/**
 * 符号的描述信息被存储在内部属性 [[Description]] 中,当符号的 toString() 方法被显示或隐式调用时,
 * 该属性都会被读取. 在本例中, console.log() 隐式调用了 firstTag 变量的 toString() 方法,于是
 * 描述信息就被输出到日志. 此外没有任何办法可以从代码中直接访问 [[Description]] 属性.
 * 
 * 识别符号值
 * 由于符号是基本类型的值,因此你可以使用 typeof 运算符来判断一个变量是否为符号.
 * ES6 扩充了 typeof 的功能以便让他在作用域符号值的时候能够返回 "Symbol"
 */
let symbol = Symbol("test symbol");
console.log(typeof symbol);