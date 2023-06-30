function Student(name, age) {
    this.name = name
    this.age = age
    console.log("Student 函数执行完毕~")
}

function Teacher() {}

// const stu = new Student("lau", 18)
// console.log(stu)
// console.log(stu.__proto__ === Student.prototype)

// 15_ES6中类的使用: 06_ES6转ES5的继承.js
// result = Reflect.construct(Super, arguments, NewTarget);
// 不允许使用普通的方式 super 来实现继承

// 要求: new Student 时, 调用的依然是 Student 函数, 执行 Student 函数的内容
// 但是, 希望最终创建出来的对象的类型是 Teacher 类型
const teach = Reflect.construct(Student, ["kobe", 100], Teacher)
console.log(teach)
console.log(teach.__proto__ == Teacher.prototype)
