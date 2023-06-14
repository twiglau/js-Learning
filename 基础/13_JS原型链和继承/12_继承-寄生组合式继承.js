function createObject(o) {
    function Fn() {}
    Fn.prototype = o
    return new Fn()
}
function inheritPrototype(SubType, SuperType) {
    
    console.log(SubType.prototype.constructor)
    SubType.prototype = Object.create(SuperType.prototype)
    console.log(SubType.prototype.constructor)

    Object.defineProperty(SubType.prototype, "constructor", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: SubType
    })

}
function Person(name,age,friends) {
    this.name = name 
    this.age = age
    this.friends = friends
}

Person.prototype.running = function() {
    console.log(this.name + " running~")
}
Person.prototype.eating = function() {
    console.log(this.name + " eating~")
}

function Student(name, age, friends, sno, score) {
    Person.call(this, name, age, friends)
    this.sno = sno
    this.score = score
}

inheritPrototype(Student, Person)

Student.prototype.studying = function() {
    console.log("studying~")
}

var stu = new Student("why", 18, ["kobe"], 111, 100)
console.log(stu)
stu.studying()
stu.running()
stu.eating()

// Person { name: 'why', age: 18, friends: ['kobe'], sno: 111, score: 100}
// 打印的Person 是constructor.name 属性 console.log(stu.constructor.name)