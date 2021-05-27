/**
 * 一个JavaScript对象是一个无序的属性集合,获取和设置不同的属性与顺序无关,
 * 都会以大致相同的效率产生相同的结果.
 * 
 * 这导致的问题是:
 * for...in循环会挑选一定的顺序来枚举对象的属性.由于标准允许JavaScript引擎
 * 自由选择一个顺序,它们的选择会微妙地改变程序行为.
 * 一个常见的错误是提供一个API,要求一个对象表示一个从字符串到值的有序映射,
 * 例如创建一个有序的报表:
 */
function report(highScores){
    var result = "";
    var i = 1;
    for(var name in highScores){//unpredictable order
        result += i + ". " + name + ": " + highScores[name] + "\n";
        i++;
    }
    return result;
}
console.log(
    report([
            {name:"Hanks",points:1110100},
            {name:"Steve",points:1064500},
            {name:"Billy",points:1050200}
        ])
)
/**
 * 如果你需要依赖一个数据结构中的条目顺序,请使用数组而不是字典,如果上述例子
 * 中的report函数的API使用一个对象数组而不是单个对象,那么它完全可以工作的
 * 任何JavaScript环境中.
 */
function report_01(highScores){
    var result = "";
    for(var i = 0,n = highScores.length; i < n; i++){
        var score = highScores[i];
        result += ( i + 1 ) + "." + score.name + ": " + score.points + "\n";
    }
    return result;
}
console.log(
    report(
        [
            {name:"Hanks",points:1110100},
            {name:"Steve",points:1064500},
            {name:"Billy",points:1050200}
        ]
    )
)
/**
 * 1.如果聚集运算字典中的数据,确保聚集操作与顺序无关.
 * 2.使用数组而不是字典来存储有序集合.
 */