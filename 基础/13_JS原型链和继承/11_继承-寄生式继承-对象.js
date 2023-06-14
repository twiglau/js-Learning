
// 原型式继承
var personObj = {
    running: function() {
        console.log("running")
    }
}

// 1. 如果这么做
var stuObj = Object.create(personObj)

// 那么添加属性时, 只能这样处理
stuObj.name = "why"
stuObj.studying = function() {
    console.log(this.name + ' studying')
}


// 2. 方式二: 工厂函数 + 原型式继承 = 寄生式继承
function createStudent(name) {
    var stu = Object.create(personObj)
    stu.name = name 
    stu.studying = function() { // 这个函数会创建多次
        console.log("studying~")
    }
}

var stu1 = createStudent("lau")
var stu2 = createStudent("li")
var stu3 = createStudent("zhao")