const obj = {
    name: "why",
    age: 18
}

console.log(Object.keys(obj))
console.log(Object.values(obj))

console.log(Object.values(["abc", "cba", "nba"]))
console.log(Object.values("阿伟死了"))
// [ 'abc', 'cba', 'nba' ]   
// [ '阿', '伟', '死', '了' ]