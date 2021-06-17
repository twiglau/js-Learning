/**
 * 直接在构造器上添加额外方法来模拟静态成员,这在 ES5 及更早版本中是另一个通用
 * 的模式,如下:
 */

function PersonType(name){
    this.name = name;
}

//静态方法
PersonType.create = function(name){
    return new PersonType(name);
};
//实例方法
PersonType.prototype.sayName = function(){
    console.log(this.name);
};

var person = PersonType.create("Nicholas");
/**
 * 在其他编程语言中,工厂方法 PersonType.create() 会被认定为一个静态方法,它的数据不
 * 依赖 PersonType 的任何实例. ES6的类简化了静态成员的创建,只要在方法与访问器属性的
 * 名称前添加正式的 static 标注. 与上例等价的类:
 */
class PersonClass {

    //等价于 PersonType 构造器
    constructor(name){
        this.name = name;
    }
    //等价于 PersonType.prototype.sayName
    sayName() {
        console.log(this.name);
    }

    //等价于 PersonType.create
    static create(name){
        return new PersonClass(name);
    }
}

let person = PersonClass.create("Nicholas");
/**
 * PersonClass 的定义拥有名为 create() 的单个静态方法,此语法与 sayName() 基本相同,
 * 只多了一个 static 关键字. 你能在类中的任何方法与访问器属性上使用 static 关键字,唯一
 * 限制是不能将它用于 constructor 方法的定义.
 * 
 * 注意:
 * 静态成员不能用实例来访问,你始终需要直接用类自身来访问它们.
 */