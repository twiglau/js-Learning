class Person {
    constructor(name, age) {
        this.name = name
        this.age = age
    }

    eating() {
        console.log(this.name + " eating~")
    }
    running() {
        console.log(this.name + " running~")
    }
}

var p = new Person("why", 19)
p.eating()
p.running()


console.log(Object.getOwnPropertyDescriptors(Person.prototype))