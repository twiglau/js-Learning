function createPerson(name, age, height, address){
    var p = {}
    p.name = name
    p.age = age
    p.height = height 
    p.address = address

    p.eating = function() {
        console.log(this.name + "吃")
    }
    p.running = function() {
        console.log(this.name + "跑步")
    }
    return p
}

var p1 = createPerson("张", 19, 1.88, "杭州")
var p2 = createPerson("Laura", 14, 1.88, "西宁")
var p3 = createPerson("lau", 15, 1.88, "宁夏")

// 工厂模式的缺点 (获取不到对象最真实的类型)
// 不能看到 p1, p2, p3 具体的类型, 智能看到 Object 类型
console.log(p1, p2, p3)