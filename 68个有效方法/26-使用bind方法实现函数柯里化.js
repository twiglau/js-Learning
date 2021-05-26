/**
 * 分析:若有一个装配URL字符串的简单函数.
 */
function simpleURL(protocol,domain,path) {
    return protocol + "://" + domain + "/" + path;
}
//通常情况下,程序可能需要将特定站点的路径字符串构建为绝对路径URL.
//一种自然的方式是对数组使用ES5提供的map方法来实现.
var urls = paths.map(function(path) {
    return simpleURL("http",siteDomain,path);
});

/**
 * 注意,上述例子中的匿名函数对map方法的每次迭代使用相同的协议字符串和网站域名
 * 字符串,传给simpleURL函数的前两个参数对于迭代都是固定的,仅第三个参数是变化
 * 的,我们可以通过调用simpleURL函数的bind方法来自动构造该匿名函数
 */
var urls = paths.map(simpleURL.bind(null,"http",siteDomain));

/**
 * 对simpleURL.bind的调用产生了一个委托到simpleURL的新函数,与往常一样,bind方法
 * 的第一个参数提供了接收者的值.
 * (由于simpleURL不需要引用this变量,所以可以使用任何值,使用null或undefined是习惯用法)
 * simpleURL.bind的其余参数和提供给新函数的所有参数共同组成了传递给simpleURL的参数.
 * 换言之, 使用单个参数 path 调用simpleURL.bind, 则该执行结果是一个委托到
 * simpleURL("http",siteDomain,path)的函数.
 * 
 * 将函数与其参数的一个子集绑定的技术称为 函数柯里化(currying).
 * 
 * 比起显式的封装函数,函数柯里化是一种简洁的, 使用更少引用来实现函数委托的方式.
 */

/**
 * 1.使用 bind 方法实现函数柯里化, 即创建一个固定需求参数子集的委托函数.
 * 2.传入 null 或 undefined 作为接收者的参数来实现函数柯里化,从而忽略其接收者.
 */

