/**
 * JavaScript 函数无论放在何处看起来似乎都是一样的,但是根据上下文其含义会发生变化.
 */
function double(x) { return x*2;}
//这段代码可以是一个函数声明,也可以是一个命名函数表达式(named function expression),
//这取决于它出现的地方.
//它定义一个函数并绑定到当前作用域的一个变量.
//1. 以上的声明将创建一个名为 double 的全局函数. 
//2. 但是同一段函数代码也可以作为一个表达式,它可以有截然不同的含义
var f = function double(x) { return x*2; };
//2.1 此语句将该函数绑定到变量f, 而不是变量 double.当然,给函数表达式命名并不是必要的,可以
//使用匿名的函数表达式形式:
var f = function(x) { return x*2; };

//2.2 匿名和命名函数表达式的官方区别在于后者会绑定到与其函数名相同的变量上,该变量
//将作为该函数内的一个局部变量,这可以用来写递归函数表达式
var f = function find(tree,key){
    if(!tree){
        return null;
    }
    if(tree.key === key){
        return tree.value;
    }
    return find(tree.left,key) || find(tree.right,key);
}
//注意,变量find的作用域只在其自身函数中,不像函数声明,命名函数表达式不能通过其内部的函数
//名在外部被引用
console.log(find(myTree,"foo")); //error: find is not defined

