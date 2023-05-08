// 1. setTimeout

// function hySetTimeout(fn, duration) {
//    fn.call("abc")
// }
// hySetTimeout(function(){
//     console.log(this)
// }, 3000)

setTimeout(function(){
    console.log(this) // window
}, 2000)



// 2. 监听点击
const boxDiv = document.querySelector('.box')
boxDiv.onclick = function() {
    console.log(this) // boxDiv
}

boxDiv.addEventListener('click', function() {
    console.log('here:', this)
})

// 3. 数组.forEach/Map/Filter/Find
var names = ["abc", 'cba', 'nba']
names.forEach(function(item) {
    console.log(item, this)
}, "abc")

names.map(function(item) {
    console.log(item, this)
}, "cba")