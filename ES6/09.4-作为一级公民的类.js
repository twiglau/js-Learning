/**
 * 在编程中,能被当做值来使用的就称为一级公民(first-class citizen),意味着它能作为参数
 * 传给函数,能作为函数返回值,能用来给变量赋值. JS 的函数就是一级公民.
 * 
 * ES6延续了传统,让类同样称为一级公民,这就使得类可以被多种方式所使用.如:
 * 它能作为参数传入函数:
 */
function createObject(classDef){
    return new classDef();
}
let obj = createObject(class {
    sayHi(){
        console.log("Hi!");
    }
});
obj.sayHi();
/**
 * 此例中的 createObject() 函数被调用时接收了一个匿名类表达式作为参数,使用 new 创建
 * 了该类的一个实例,并将其返回出来,随后变量 obj 储存了所返回的实例.
 * 类表达式的另一个有趣用途是立即调用类构造器,以创建单例(Singleton). 
 * 为此,你必须使用 new 来配合类表达式,并在表达式后面添加括号,如下:
 */
let person = new class {
    constructor(name){
        this.name = name;
    }
    sayName(){
        console.log(this.name);
    }
}("Nicholas");

person.sayName(); // "Nicholas"
/**
 * 此处创建了一个匿名类表达式,并立即执行了她. 此模式允许你使用类语法来创建单例,从而不留下
 * 任何可被探查的类引用(回忆下 PersonClass 的例子,匿名类表达式只在类的内部创建了绑定,而
 * 外部无绑定). 类表达式后面的圆括号标示要调用前面的函数,并且还允许传入参数.
 * 
 * 本章至今的例子都集中与带有方法的类,但你还能在类上创建访问属性,所用的语法类似于对象字面量.
 */