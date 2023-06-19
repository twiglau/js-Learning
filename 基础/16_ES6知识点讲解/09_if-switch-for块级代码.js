


// if语句的代码块就是块级作用域
// if(true) {
//     var foo = "foo"
//     let bar = "bar"
// }
// console.log(foo)
// console.log(bar)

// var color = "red"

// switch(color) {
//     case "red":
//         var foo = "foo"
//         let bar = "bar"
// }

// console.log(foo)
// console.log(bar)


// for语句的代码也是块级作用域
for(let i = 0; i < 10; i++) {
    console.log("Hello world" + i)
}
// console.log(i)

