/**
 * <JavaScript高级程序设计> 笔记
 */

/**
 * 1. 原型链继承
 */
function Parent() {
    this.name = 'kevin';
}
Parent.prototype.getName = function () {
    console.log(this.name);
}
function Child() {}
Child.prototype = new Parent();
var child1 = new Child();
console.log(child1.getName()); //kevin
/**
 * 问题:
 * 1. 引用类型的属性被所有实例共享,举个例子:
 * 2. 在创建 Child 的实例时, 不能向Parent传参
 */
function Parent1() {
    this.names = ['kevin','daisy'];
}
function Child1() {}
Child1.prototype = new Parent1();
var child2 = new Child1();
child2.names.push('yoga')
console.log(child2.names);
var child3 = new Child1();
console.log(child3.names);

/**
 * 2. 借用构造函数(几点继承)
 */
function Parent02(params) {
    this.names = ['kevin','daisy'];
}
function Child02() {
    Parent02.call(this);
}
var child01 = new Child02();
child01.names.push('yoga');
console.log(child01.names);
var child02 = new Child02();
console.log(child02.names);
/**
 * 优点:
 * 1. 避免了引用类型的属性被所有实例共享
 * 2. 可以在Child中向Parent传参
 * 举个例子:
 * 
 * 缺点:
 * 方法都在构造函数中定义, 每次创建实例都会创建一遍方法
 */
function  Parent03(name) {
    this.name = name;
}
function Child03(name) {
    Parent03.call(this,name);
}
var child03 = new Child03('kevin');
console.log(child03.name); //kevin
var child04 = new Child03('daisy');
console.log(child04.name); //daisy


/**
 * 3. 组合继承
 * 原型链继承 和 经典继承双剑合璧
 */
function Parent04(name) {
    this.name = name;
    this.colors = ['red','blue','green'];
}
Parent04.prototype.getName = function () {
    console.log(this.name)
}
function Child04(name,age) {
    Parent04.call(this,name);
    this.age = age;
}
Child04.prototype = new Parent04();
Child04.prototype.constructor = Child04;

var child05 = new Child04('kevin','18');
child05.colors.push('black');

console.log(child05.name); // kevin
console.log(child05.age);  // 18
console.log(child05.colors); // ["red","blue","green","black"]

var child06 = new Child04('daisy','20');
console.log(child06.name); // daisy
console.log(child06.age); // 20
console.log(child06.colors); // ["red","blue","green"] 
//优点: 融合原型链继承 和 构造函数的优点, 是 JavaScript 中最常用的 继承模式


/**
 * 4. 原型式继承
 */
function createObj(o) {
    function F() {}
    F.prototype = o;
    return new F();
}
//就是 ES5 Object.create 的模拟实现, 将传入的对象作为创建的对象的原型.
//缺点:
//包含引用类型的属性值始终都会共享相应的值, 这点跟原型链继承一样.
var person = {
    name: 'kevin',
    friends: ['daisy','kelly']
}
var person01 = createObj(person);
var person02 = createObj(person);

person01.name = 'person1';
console.log(person02.name); // kevin

person01.friends.push('taylor');
console.log(person02.friends); // ["daisy","kelly","taylor"]
/**
 * 注意: 修改 person01.name 的值, person02.name 的值并未发生改变, 并不是因为 person01
 * 和 person02 有独立的 name 值, 而是因为 person01.name = 'person1',给person01添加
 * 了 name 值, 并非修改了原型上的 name 值.
 */


/**
 * 5. 寄生式继承
 * 创建一个仅用于封装继承过程的函数, 该函数在内部以某种形式来做增强对象, 最后返回对象.
 */
function createObj(o) {
    var clone = Object.create(o);
    clone.sayName = function () {
        console.log('hi');
    }
    return clone;
}
//缺点: 跟借用构造函数模式一样, 每次创建对象都会创建一遍方法.


/**
 * 6. 寄生组合式继承
 * 为了方便大家阅读, 在这里重复一下组合继承的代码:
 */
function Parent06(name){
    this.name = name;
    this.colors = ['red','blue','green'];
}
Parent06.prototype.getName = function(){
    console.log(this.name)
}
function Child06(name,age){
    Parent06.call(this,name);
    this.age = age;
}
Child06.prototype = new Parent06();
var child06 = new Child06('kevin','18');
console.log(child06);
//组合继承最大的缺点是会调用两次父构造函数.
//一个是设置子类型实例的原型的时候:
//Child06.prototype = new Parent06();

//一次在创建子类型实例的时候:
//var child06 = new Child('kevin','18')

//会想下 new 的模拟实现, 其实在这句中,我们会执行:
//Parent06.call(this,name);
//在这里,我们又会调用了一次Parent06构造函数.
//所以, 在这个例子中,如果我们打印 child06 对象, 我们会发现 Child06.prototype 和
//child06 都有一个属性为 colors, 属性值为 ['red','blue','green']

//那么我们该如何精益求精, 避免这一次重复调用呢?
//如果我们不使用 child06.prototype = new Parent06(), 而是间接的让 Child06.prototype
//访问到 Parent06.prototype 呢?

//看看如何实现:
function Parent07(name){
    this.name = name;
    this.colors = ['red','blue','green'];
}
Parent07.prototype.getName = function() {
    console.log(this.name);
}
function Child07(name,age){
    Parent07.call(this,name);
    this.age = age;
}
//关键的三步
var F = function(){};
F.prototype = Parent07.prototype;
Child07.prototype = new F();

var child07 = new Child07('kevin','18');
console.log(child07);

//最后我们封装一下这个继承方法:
function object(o){
    function F(){}
    F.prototype = o;
    return new F();
}
function prototype(child,parent){
    var prototype = object(parent.prototype);
    prototype.constructor = child;
    child.prototype = prototype;
}

// 当我们使用的时候:
prototype(Child07,Parent07);
/**
 * 这种方式的高效率体现它只调用了一次 Parent 构造函数, 并且因此避免了在 Parent.prototype
 * 上面创建不必要的, 多余的属性. 与此同时, 原型链还能保持不变; 因此, 还能够正常使用 instanceof
 * 和 isPrototypeOf. 开发人员普遍认为 > 寄生组合式继承是引用类型最理想的继承范式.
 */