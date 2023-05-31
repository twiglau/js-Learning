// var foo = ()=> {

//     //Uncaught ReferenceError: arguments is not defined
//     console.log(arguments)
// }

// foo()

function foo() {
    var bar = ()=> {
        //Arguments [123, callee: ƒ, Symbol(Symbol.iterator): ƒ]
        console.log(arguments)
    }
    return bar
}

var fn = foo(123)
fn()



var foo = (num1, num2, ...args) => {
    console.log(num1, num2, ...args)
}

foo(1,2,3,4,4,5,5)