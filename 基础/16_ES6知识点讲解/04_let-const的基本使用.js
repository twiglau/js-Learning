var foo = "foo"

let bar = "bar"

// const constant (常量/衡量)
const angular = "angular"
// TypeError: Assignment to constant variable.
// angular = "vue"
console.log(angular)

// 注意事项一:
// const本质上是传递的值不可以修改
// 但是如果传递的是一个引用类型(内存地址)
// 可以通过引用找到对应的对象, 去修改对象内的属性, 这个是可以的
const obj = {
    foo: "foo"
}
obj.foo = "aaa000"
console.log(obj.foo)


// 注意事项二: 通过let/const定义的变量名是不可以重复定义的

let foo = "abc"
let foo = "cba"
//SyntaxError: Identifier 'foo' has already been declared
console.log(foo)