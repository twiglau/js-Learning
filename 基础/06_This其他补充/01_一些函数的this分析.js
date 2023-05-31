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

// 3. 数组.forEach/Map/Filter/Find => window
var names = ["abc", 'cba', 'nba']
names.forEach(function(item) {
    console.log(item, this)
}, "abc")

names.map(function(item) {
    console.log(item, this)
}, "cba")

// 4. 对象没有作用域
var obj = {
    name: 'obj',
    foo: function() {
        // 该函数的上层作用域 是 全局
    }
}

function Student() {
    // 该函数上层作用域 为 全局
    this.foo = function() {
        // 该函数的上层作用域 为 Student 函数
    }
}