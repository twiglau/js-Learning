const obj = {
    name: "lau",
    age: 18
}

console.log(Object.entries(obj)) //  [ [ 'name', 'lau' ], [ 'age', 18 ] ]
const objEntries = Object.entries(obj)
objEntries.forEach(([key, value]) => {
    console.log(key, value)
})


console.log(Object.entries(["abc", "cba", "nba"])) //  [ [ '0', 'abc' ], [ '1', 'cba' ], [ '2', 'nba' ] ]