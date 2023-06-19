const names = ["abc", "cba", "nba"]

for(var i = 0; i < names.length; i++) {
    console.log(names[i])
}

// for...of:  ES6新增的遍历数组(对象)
for(let item of names) {
    console.log(item)
}