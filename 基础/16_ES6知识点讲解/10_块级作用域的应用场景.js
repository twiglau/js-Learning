const btns = document.getElementsByTagName('button')

// 1. 错误写法
// for(var i = 0; i< btns.length; i++) {
//     btns[i].onclick = function() {
//         console.log('第' + i + '个按钮的点击')
//     }
// }


// 2. ES6之前写法
// 使用立即执行函数: 函数能形成作用域, 闭包
// for(var i = 0; i< btns.length; i++) {
//     (function(n){
//         btns[n].onclick = function() {
//             console.log('第' + n + '个按钮的点击')
//         }
//     })(i)
// }


// 3. ES6之后后
// 因为onclick函数中变量 i, 中没有定义, 会从上级作用域中查找 i
// let 是有块级作用域的, 也就是 for {}, 那么访问i时, 就是块级作用域当中的i
// 而这个 i , 其实在第一次时, 是 0, 第二次时, 是 1, ...
for(let i=0; i < btns.length; i++) {
    btns[i].onclick = function() {
        console.log("第" + i + "个按钮被点击")
    }
}