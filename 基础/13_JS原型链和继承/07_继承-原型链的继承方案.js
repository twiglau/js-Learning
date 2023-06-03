// 父类: 公共属性和方法
function Person() {
    this.name = "why"
    this.friends = []
}

Person.prototype.eating = function() {
    console.log(this.name + " eating~")
}


// 子类: 特有属性和方法
function Student() {
    this.sno = 101
}

var p = new Person()
Student.prototype = p

Student.prototype.studying = function() {
    console.log(this.name + " studying~")
}


var stu = new Student()
console.log(stu.name)
stu.eating()
stu.studying()


// 原型链实现继承的弊端:
// 1. 打印stu对象, 某些属性(继承)时看不到的
console.log(stu) // 看不到 name 属性, 打印的是 Person, 而不是 Student

// 2. 创建出来两个stu对象 , friends 应该是独立的.但时这种方式会相互影响
var stu1 = new Student()
var stu2 = new Student()

// 直接修改对象上的属性, 是给本对象添加了一个新属性
stu1.name = "lily"
console.log(stu2.name)

// 获取引用, 修改引用中的值, 会相互影响
stu1.friends.push("kobe")
console.log(stu1.friends, stu2.friends)

// 3. 第三个弊端: 在前面实现类的过程中都没有传递参数
var stu3 = new Student("lilei", 112) // 这样参数接收, 不好处理
