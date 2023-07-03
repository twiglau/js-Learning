

const promise = new Promise((resolve, reject) => {
    resolve("resolve message")
})

promise.then(res => {
    console.log("res: ", res)
}).catch(err => {

}).finally(() => {
    console.log("finally code execute")
})