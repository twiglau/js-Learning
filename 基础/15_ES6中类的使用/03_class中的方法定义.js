var names = ["abc","nba","cba"]

class Person {
    constructor(name, age) {
        this.name = name
        this.age = age
        this._address = "洛阳"
    }

    eating() {
        console.log(this.name + " eating~")
    }
    running() {
        console.log(this.name + " running~")
    }
    get address() {
        return this._address
    }
    set address(val) {
        this._address = val
    }

    // 类的静态方法
    static randomPerson() {
        var nameIndex = Math.random()*names.length
        nameIndex = Math.floor(nameIndex)
        var name = names[nameIndex]
        return new Person(name, 18)
    }
}

var p = new Person("why", 19)
p.eating()
p.running()
console.log(p.address)

// console.log(Object.getOwnPropertyDescriptors(Person.prototype))

var p1 = Person.randomPerson()
console.log(p1.name)