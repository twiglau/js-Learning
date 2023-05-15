var name = 'window'

function Person(name) {
    this.name = name
    this.foo1 = function() {
        console.log(this.name)
    },
    this.foo2 = () => console.log(this.name),
    this.foo3 = function() {
        return function() {
            console.log(this.name)
        }
    },
    this.foo4 = function() {
        return () => {
            console.log(this.name)
        }
    }
}

var person1 = new Person('person1')
var person2 = new Person('person2')

person1.foo1() // 隐式绑定 person1
person1.foo1.call(person2) // 隐式绑定 < 显式绑定 person2

person1.foo2() // 箭头函数 的上层作用域 => 函数 Person    person1
person1.foo2.call(person2) // person1

person1.foo3()() // window  独立函数调用
person1.foo3.call(person2)() // window  独立函数调用
person1.foo3().call(person2) // person2

person1.foo4()() // 箭头函数会在 上层作用域里找 person1
person1.foo4.call(person2)() // 箭头函数会在 上层作用域里找  person2
person1.foo4().call(person2) //person1