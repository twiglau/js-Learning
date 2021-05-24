/**
 * JavaScript 支持词法作用域(lexical scoping),即除了很少的例外,对变量 foo 的引用
 * 会绑定到声明 foo 变量最近的作用域中.
 * 但是, JavaScript 不支持块级作用域,即变量定义的作用域并不是离其最近的封闭语句或代码块,
 * 而是包含它们的函数.
 */
function isWinner(player,others){
    var highest = 0;
    for(var i = 0, n = others.length; i < n; i++) {
        var player = others[i];
        if(player.score > highest) {
            highest = player.score;
        }
    }
    return player.score > highest;
}
//该程序在 for 循环体内声明了一个局部变量player,但是由于JavaScript中变量是函数级作用域(function-scoped),
//而不是块级作用域,所以在内部声明的 player 变量只是简单地重声明了一个已经存在于作用域内的变量(即参数 player).
//该循环的每次迭代都会重写同一变量. 因此, return 语句将player看做 others 的最后一个元素,而不是此函数最初的 player
//参数.

//理解JavaScript变量声明行为的一个好办法是把变量看作由两部分组成,即声明和赋值.
//JavaScript隐式地提升(hoists)声明部分到封闭函数的顶部,而将赋值留在原地.
//换句话说,变量的作用域是整个函数,但仅在var语句出现的位置进行赋值.

//变量声明提升也可能导致变量重声明的混淆,在同一函数中多次声明相同变量是合法的,这在写多个循环
//时会经常出现:


//JavaScript没有块级作用域的一个例外恰好是其异常处理. try...catch语句将捕获的异常
//绑定到一个变量,该变量的作用域只是catch语句块.
function test(){
    var x = "var",result = [];
    result.push(x);
    try {
        throw "exception";
    }catch(x){
        x = "catch";
    }
    result.push(x);
    return result;
}
console.log(test());

/**
 * 提示:
 * 1.在代码块中的变量声明会被隐式地提升到封闭函数的顶部.
 * 2.重声明变量被视为单个变量.
 * 3.考虑手动提升局部变量的声明,从而避免混淆.
 */