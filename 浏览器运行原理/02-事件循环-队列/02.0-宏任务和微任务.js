setTimeout(() => {
    console.log("setTimeout")
}, 1000)

queueMicrotask(()=> {
    console.log("queueMicroTask")
})

Promise.resolve().then(res => {
    console.log("Promise then")
})

function foo() {
    console.log("foo")
}
function bar() {
    console.log("bar")
    foo()
}

bar()

console.log("其他代码~")
