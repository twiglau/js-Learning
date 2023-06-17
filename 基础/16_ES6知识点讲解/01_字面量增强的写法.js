// ES6中对 对象字面量 进行了增强, 称之为 Enhanced object literals (增强对象字面量)
var gender = "man"
var age = 18

var obj = {
    // 1. property shorthand(属性的简写)
    gender,
    age,
    // 2. method shorthand(方法的简写)
    foo:function() {
        console.log(this == obj)
    },
    baz: () => {
        console.log(this)
    },
    //  3. computed property name(计算属性)
    [gender + 123]: "computed property"
}
obj.foo()
obj.baz()