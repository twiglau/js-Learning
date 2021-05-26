//全局命名空间是JavaScript程序中独立的组件进行交互的唯一途径.因此,利用全局命名空间的情况是不可避免的.
var i,n,sum;
function averageScore(players){
    sum = 0;
    for(i = 0, n = players.length; i < n; i++){
        sum += score(players[i])
    }
    return sum / n;
}
//以上如果score函数出于自身的目的使用了任何同名的全局变量, averageScore 函数的定义将出现问题.
function score(player){
    sum = 0;
    for( i = 0; n = player.levels.length; i < n;i++){
        sum += player.levels[i].score;
    }
    return sum;
}
//以上尽量保持局部变量

/**
 * 1.避免声明全局变量
 * 2.尽量声明局部变量
 * 3.避免对全局对象添加属性
 * 4.使用全局对象来做平台特性检测.
 */
