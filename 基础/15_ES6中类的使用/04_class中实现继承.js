class Person {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
    eating(){
        console.log(this.name + " eating~")
    }
    running(){
        console.log(this.name + " running~")
    }
    personMethod() {
        console.log("处理逻辑1")
        console.log("处理逻辑2")
        console.log("处理逻辑3")
    }

    static PersonStaticMethod() {
        console.log("PersonStaticMethod")
    }
}

// Student 称之为 子类(派生类)
class Student extends Person {
    // JS引擎在解析子类的时候就有要求:
    // 如果我们有实现继承, 那么子类的构造方法中, 在使用this之前
    constructor(name, age, sno) {
       super(name, age)
       this.sno = sno
    }
    studying() {
        console.log(this.name + 'studing~')
    }
    // 类对父类的方法的重写
    running() {
        console.log("student " + this.name + " is running~")
    }
    // 重写personMehtod方法
    personMethod() {
        // 复用父类中的处理逻辑
        super.personMethod()

        console.log("处理逻辑4")
        console.log("处理逻辑5")
        console.log("处理逻辑6")
    }

    // 重写静态方法
    static PersonStaticMethod() {
        super.PersonStaticMethod()
        console.log("StudentPersonStaticMethod")
    }
}

var stu = new Student("lau", 18, 111)
console.log(stu)

// 0. 是否可以调用
stu.eating()
stu.running()
// 1. 以上方法来自哪里?
console.log(Object.getOwnPropertyDescriptors(stu.__proto__))
console.log(Object.getOwnPropertyDescriptors(stu.__proto__.__proto__))