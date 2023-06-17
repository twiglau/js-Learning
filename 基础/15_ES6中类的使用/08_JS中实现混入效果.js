class Person {}
class Runner {
    running() {}
}

function mixinRunner(BaseClass) {
    class NewClass extends BaseClass {
        running() {
            console.log("running~")
        }
    }
    return NewClass
}

function mixinEater(BaseClass) {
    return class extends BaseClass {
        eating() {
            console.log("eating~")
        }
    }
}

// JS中 类只能有一个父类: 单继承
// 如何实现混入?
class Student extends Person {}

// 实现1:
var NewStudent = mixinEater(mixinRunner(Person))
var stu1 = new NewStudent()
stu1.running()
stu1.eating()