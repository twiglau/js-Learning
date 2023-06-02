function Person(name, age, height, address) {
    this.name = name 
    this.age = age 
    this.height = height 
    this.address = address
}

Person.prototype.eating = function() {
    console.log(this.name + ' eating')
}
Person.prototype.running = function() {
    console.log(this.name + ' running')
}

var p1 = new Person("lau", 19, 1.88, "北京市")
var p2 = new Person("li", 20, 1.98, "洛宁")

p1.eating()
p2.eating()
