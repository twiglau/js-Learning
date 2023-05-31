var name = "window";
var person = {
    name: "person",
    sayName:function() {
        console.log(this.name)
    }
}

function sayName() {
    var sss = person.sayName();
    sss(); // 独立函数调用 => window
    person.sayName(); // 隐式绑定 => person
    (person.sayName)(); // 等价于 person.sayName() => person
    (b = person.sayName)(); // 间接函数引用(赋值表达式),独立函数调用 => window
}