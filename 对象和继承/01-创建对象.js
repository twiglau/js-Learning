/**
 * <JavaScript高级程序设计>的笔记
 */

//1. 工厂模式
function createPerson(name){
    var o = new Object();
    o.name = name;
    o.getName = function() {
        console.log(this.name);
    };
    return o;
}
var person1 = createPerson('kevin');
//缺点: 对象无法识别, 因为所有的实例都指向一个原型.

//2. 构造函数模式
function Person(name){
    this.name = name;
    this.getName = function(){
        console.log(this.name);
    };
}
var person1 = new Person('kevin');
//优点: 实例可以识别为一个特定的类型
//缺点: 每次创建实例时, 每个方法都要被创建一次

//2.1 构造函数模式优化
function Person(name){
    this.name = name;
    this.getName = getName;
}
function getName(){
    console.log(this.name);
}
var person1 = new Person('kevin');
//优点: 解决了每个方法都要被重新创建的问题
//缺点: 这叫啥封装....

//3. 原型模式
function Person(name){}
Person.prototype.name = 'kevin';
Person.prototype.getName = function(){
    console.log(this.name);
};
var person1 = new Person();
//优点: 方法不会重新创建
//缺点: 1. 所有的属性 和 方法 都共享 2.不能初始化参数

//3.1 原型模式优化
function Person(name){}
Person.prototype = {
    name: 'kevin',
    getName:function () { 
        console.log(this.name);
    }
};
var person1 = new Person();
//优点: 封装性好一点
//缺点: 重写了原型, 丢失了 constructor 属性


/**
 * 3.2 原型模式优化
 */
function Person(name) {}
Person.prototype = {
    constructor:Person,
    name:'kevin',
    getName:function () {
        console.log(this.name);
    }
};
var person1 = new Person();
//优点: 实例可以通过 constructor 属性找到所属构造函数
//缺点: 原型模式该有的缺点还有

/**
 * 4. 组合模式
 * 构造函数模式 与 原型模式 双剑合璧.
 */
function Person(name) {
    this.name = name;
}
Person.prototype = {
    constructor: Person,
    getName:function() {
        console.log(this.name);
    }
};
var person1 = new Person();
//优点: 该共享的共享, 该私有的私有, 使用最广泛的方式
//缺点: 有的人就是希望全部都写在一起, 即更好的封装性

/**
 * 4.1 动态原型模式
 */
function  Person(name) {
    this.name = name;
    if(typeof this.getName != "function"){
        Person.prototype.getName = function(){
            console.log(this.name);
        }
    }
}
// var person1 = new Person();
//注意: 使用动态原型模式时, 不能用对象字面量重写原型
//解释下为什么?
var person1 = new Person('kevin');
var person2 = new Person('daisy');

//报错,并没有该方法
person1.getName();
//注释掉上面的代码, 这句是可以执行的.
person2.getName();

/**
 * 为了解释这个问题, 假设开始执行 var person1 = new Person('kevin')
 * 如果对 new 和 apply 的底层执行过程不是很熟悉,可查看相关文章.
 * 
 * 回顾下 new 的实现步骤:
 * > 1. 首先新建一个对象
 * > 2. 然后将对象的原型指向 Person.prototype
 * > 3. 然后Person.apply(obj)
 * > 4. 返回这个对象
 * 
 * 注意这个时候, 回顾下 apply 的实现步骤, 会执行 obj.Person 方法, 这个时候就会
 * 执行 if 语句里的内容, 注意构造函数的 prototype 属性指向了实例的原型,使用字面
 * 量方式直接覆盖 Person.prototype, 并不会更改实例的原型的值, person1 依然是
 * 指向了以前的原型, 而不是Person.prototype. 而之前的原型是没有 getName 方法的,
 * 所以就报错了.
 * 
 * 问题: 动态原型的模式, "使用字面量方式直接覆盖 Person.prototype, 并不会更改实例
 * 的原型的值" 这是为什么?
 * 
 * 答: 以上面例子为例, 当执行 var person1 = new Person('kevin') 的时候, person1
 * 的原型并不是指向 Person.prototype, 而是指向 Person.prototype 指向的原型对象,我
 * 们假设这个原型对象名字为 O, 然后再修改 Person.prototype 的值为一个字面量, 只是将
 * 一个新的值赋值给 Person.prototype, 并没有修改 O 对象, 也不会切断已经建立的 person1
 * 和 O 的原型关系, 访问 person.getName 方法, 依然会从 O 上查找
 * 
 * 进一步: 原型也是一个对象, 我们假设这个对象叫做 O,
 * var a = {
 *     b: O
 * }
 * a.b 指向了 O 对象, 就相当于 Person.prototype 指向了原型对象 这句话
 * 再看这个例子:
 * function Person(name){
 *     this.name = name;
 *     if(typeof this.getName != "function"){
 *        Person.prototype = {
 *            constructor: Person,
 *            getName: function() {
 *               console.log(this.name)
 *            }
 *        }
 *     }
 * }
 * var person1 = new Person('kevin');
 * 当 new Person() 的时候, 是先建立的原型关系, 即 person.__proto__ = Person.prototype,
 * 而后修改了 Person.prototype 的值, 这就相当于:
 * // O 表示原型对象
 * var O = {};
 * var a = {
 *    b: O
 * }
 * 先建立原型关系, 值的是 c.__proto__ = a.b = O
 * 而后修改 Person.prototype 的值, 相当于
 * var anotherO = {};
 * a.b = anotherO;
 * 即便修改了 Person.prototype 的值, 但是 c.__proto__ 还是指向以前的 O
 * 
 * 如果你就是想用字面量方式写代码,可以尝试下这种:
 */
function Person(name){
    this.name = name;
    if(typeof this.getName != "function"){
        Person.prototype = {
            constructor: Person,
            getName: function () {
                console.log(this.name);
            }
        }

        return new Person(name);
    }
}
var person1 = new Person('kevin');
var person2 = new Person('daisy');

person1.getName();
person2.getName();

/**
 * 5.1 寄生构造函数模式
 */
function Person(name) {
    var o = new Object();
    o.name = name;
    o.getName = function () {
        console.log(this.name);
    };
    return o;
}
var person1 = new Person('kevin');
console.log(person1 instanceof Person); //false
console.log(person1 instanceof Object); //true

/**
 * 寄生构造函数模式,可以这样读:
 * 寄生-构造函数-模式, 也就是说寄生在构造函数的一张方法.
 * 也就是说打着构造函数的幌子挂羊头卖狗肉, 你看创建的实例使用 instanceof 都无法指向
 * 构造函数.
 * 
 * 这样的方法可以在特殊情况下使用. 比如我们想创建一个具有额外方法的特殊数组, 但是又不想
 * 直接修改Array构造函数,我们可以这样写:
 */
function  SpecialArray() {
    var values = new Array();

    for(var i = 0, len = arguments.length; i < len; i++){
        values.push(arguments[i]);
    }
    values.toPipedString = function () {
        return this.join("|");
    };
    return values;
}
var colors = new SpecialArray('red','blue','green');
var colors2 = SpecialArray('red2','blue2','green2');

console.log(colors);
console.log(colors.toPipedString());

console.log(colors2);
console.log(colors2.toPipedString());

/**
 * 你会发现, 其实所谓的寄生构造函数模式就是比工厂模式在创建对象的时候, 多使用了一个 new,
 * 实际上两者的结果是一样的.
 * 
 * 但是作者可能是希望能像使用普通Array 一样使用 SpecialArray, 虽然把 SpecialArray 当
 * 成函数也一样能用, 但是这并不是作者的本意, 也变得不优雅.
 * 
 * 在可以使用其他模式的情况下, 不要使用这种模式.
 * 但是值得一提的是,上面例子中的循环:
 * for(var i=0,len= arguments.length;i < len; i++){
 *    values.push(arguments[i]);
 * }
 * //可以替换成:
 * values.push.apply(values,arguments);
 */

/**
 * 5.2 稳妥构造函数模式
 */
function person(name) {
    var o = new Object();
    o.sayName = function () {
        console.log(name);
    };
    return o;
}
var person1 = person('kevin');
person1.sayName();
person1.name = "daisy";
person1.sayName();
console.log(person1.name);
/**
 * 所谓稳妥对象 值的是没有公共属性, 而且其方法也不引用 this 的对象.
 * 与寄生构造函数模式有两点不同:
 * 1. 新创建的实例犯法不引用 this
 * 2. 不使用 new 操作符调用构造函数
 * 
 * 稳妥对象最适合在一些安全的环境中.
 * 稳妥构造函数模式也跟工厂模式一样, 无法识别对象所属类型.
 */
