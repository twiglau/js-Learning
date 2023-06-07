function createObject(o) {
    function Fn() {}
    Fn.prototype = o
    return new Fn()
}
function inheritPrototype(SubType, SuperType) {
    
    console.log(SubType.prototype.constructor)
    SubType.prototype =createObject(SuperType.prototype)
    console.log(SubType.prototype.constructor)

    Object.defineProperty(SubType.prototype, "constructor", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: SubType
    })

}


function Person() {

}

function Student() {

}

inheritPrototype(Student, Person)

var stu = new Student()


//1. instanceof
//用于检测 构造函数的prototype, 是否出现在 某个实例对象的原型链上
// Student.prototype 是否有出现 在 stu 的原型链上
console.log(stu instanceof Student)
console.log(stu instanceof Person)
console.log(stu instanceof Object)
