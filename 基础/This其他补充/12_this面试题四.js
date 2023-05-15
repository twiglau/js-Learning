var name = 'window'

function Person (name) {
    this.name = name
    this.obj = {
        name: 'obj',
        foo1: function() {
            return function() {
                console.log(this.name)
            }
        },
        foo2: function() {
            return () => {
                console.log(this.name)
            }
        }
    }
}

var person1 = new Person('person1')
var person2 = new Person('person2')

person1.obj.foo1()() // 独立函数调用 window
person1.obj.foo1.call(person2)() // 依然是 独立函数调用 window
person1.obj.foo1().call(person2) // person2

person1.obj.foo2()() // 箭头函数没有绑定this,只有从上层里查找 this => obj. 
person1.obj.foo2.call(person2)() // person2
person1.obj.foo2().call(person2) // obj