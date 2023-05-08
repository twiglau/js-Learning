// 1. this指向什么, 根该函数所处的位置是没有关系的
// 2. 更函数被调用的方式时有关系的
function foo() {
    console.log(this)
}

// 1. 直接调用这个函数
foo()

// 2. 创建一个对象, 对象中的函数指向foo
var obj = {
    name: "lau",
    foo: foo
}

obj.foo()


//3. apply调用
foo.apply("abc")