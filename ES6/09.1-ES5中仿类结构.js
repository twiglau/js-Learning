/**
 * JS在ES5及更早版本中都不存在类,与类最接近的是:
 * 创建一个构造器,然后将方法指派到该构造器的原型上,这种方式通常被称为创建一个
 * 自定义类型,如下:
 */
function PersonType(name){
    this.name = name;
}
PersonType.prototype.sayName = function(){
    console.log(this.name);
};

let person = new PersonType("Nicholas");
person.sayName(); //输出 "Nicholas"
console.log(person instanceof PersonType);
console.log(person instanceof Object);

/**
 * 此代码中的 PersonType 是一个构造器函数,并创建了单个属性 name. sayName() 方法被
 * 指派到原型上,因此在 PersonType对象的所有实例上都共享了此方法. 接下来,使用 new 运算
 * 符创建了 PersonType 的一个新实例 person, 此对象会被认为是一个通过原型继承了 PersonType
 * 与 Object 的实例.
 * 
 * 这种基本模式在许多对类进行模拟的 JS库中都存在,而这也是ES6类的出发点.
 */