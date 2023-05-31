var name = 'window';
var person1 = {
    name: 'person1',
    foo1: function() {
        console.log(this.name)
    },
    foo2: ()=> console.log(this.name),
    foo3: function() {
        return function() {
            console.log(this.name)
        }
    },
    foo4: function() {
        return ()=> {
            console.log(this.name)
        }
    }
}

var person2 = { name: 'person2' }

person1.foo1(); // 隐式绑定 person1
person1.foo1.call(person2); // 隐式绑定 < 显式绑定  person2

person1.foo2(); // 箭头函数 没有绑定 this, 会在上层作用域里面找,找到全局作用域  window
person1.foo2.call(person2); // 箭头函数 依然从上层作用域里面找  window

person1.foo3()(); // 独立函数调用  window
person1.foo3.call(person2)(); // foo3 里面指向 person2, 但是拿到外层函数后, 有做了 独立函数调用  window
person1.foo3().call(person2); // 对返回函数做了 显式绑定  指向 person2

person1.foo4()(); // 箭头函数,不绑定this, 这个 this 是上层作用域 foo4 绑定的 this, 应该是 person1
person1.foo4.call(person2)(); // 将上层作用域里面的 this, 显式绑定到了 person2, 箭头函数会找上层作用域 输出 person2
person1.foo4().call(person2); // person1 显式绑定的是箭头函数,但箭头函数会向上层作用域里找

