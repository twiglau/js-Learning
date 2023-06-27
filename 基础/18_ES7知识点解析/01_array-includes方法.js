const names = ["abc", "cba", "nba", "mba", NaN]

if (names.indexOf("cba") !== -1) {
    console.log("包含abc元素");
}

// ES7 ES2016
if (names.includes("cba", 2)) {
    console.log("包含cba元素")
}
// 没有办法判断 NaN
if (names.indexOf(NaN) !== -1) {
    console.log("包含NaN")
}

if (names.includes(NaN)) {
    console.log("包含NaN")
}