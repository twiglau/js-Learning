var foo = "foo"

// if(true) {
//     console.log(foo)  // 不能在声明之前, 做任何的访问 => 暂时性死区

//     let foo = "abc"
// }

function bar() {
    console.log(foo)

    let foo = "abc"
}
bar()