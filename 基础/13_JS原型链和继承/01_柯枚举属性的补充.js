var obj = {
    name: "lau",
    age: 18
}

Object.defineProperty(obj, 'address', {
    enumerable: false,
    value: "PaiKing"
})

console.log(obj)