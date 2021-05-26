/**
 * CSV(逗号分隔型取值)文件格式是一种表格数据的简单文本表示.
 * Bosendorfer,1828,Vienna,Austria
 * Fazioli,1981,Sacile,Italy
 * Steinway,1853,New York,USA
 * 
 * 我们可以编写一个简单的,可定制的读取CSV数据的类. 尽管从其命名上看,它是基于逗号的,
 * 但是目前CSV也存在一些允许不同的字符作为分隔器的变种.
 * 因此,构造函数需要一个可选的分割器字符数组并构造出一个自定义的正则表达式以将每一行
 * 分成不同的条目.
 */
function CSVReader(separators){
    this.separators = separators || [","];
    this.regexp = new RegExp(this.separators.map(function(sep){
        return "\\" + sep[0];
    }).join("|"));
}
//实现一个简单的read方法可以分为两步来处理.
// 第一步,将输入字符串分为按行划分的数组;
//第二步,将数组的每一行再分为按单元格划分的数组;因此,结果应该是一个二维的字符串数组,使用map方法最为合适
CSVReader.prototype.read = function(str){
    var lines = str.trim().split(/\n/);
    return lines.map(function(line){
        return line.split(this.regexp); //wrong this!
    });
};
var reader = new CSVReader();
let result = reader.read("a,b,c\nd,e,f\n")
console.log(result);
/**
 * 表面看起来,这段简单的代码有一个严重而微妙的Bug,传递给 line.map 的回调函数引用了 this,
 * 它期望能提取到CSVReader对象的regexp属性. 然而, map函数将其回调函数的接收者绑定到了lines
 * 数组,该lines数组并没有regexp属性.其结果是, this.regexp 产生undefined值,使得调用
 * line.split陷入混乱.
 * 
 * 导致该Bug的是这样一个事实: this 变量是以不同的方式被绑定的. 每个函数都有一个this变量的隐式绑定.
 * 该this变量的绑定值是在调用该函数时确定的.
 * 
 * 对于一个词法作用域的变量,你总能通过查找显示命名的绑定名(如在一个var声明的列表中或作为一个函数的参数)
 * 来识别其绑定的接收者. 相反, this变量是隐式地绑定到最近的封闭函数.
 * 
 * 因此,对于CSVReader.prototype.read函数, this 变量的绑定不同于传递给 Lines.map回调函数的 this 绑定.
 * 
 * 幸运的是,数组的map方法可以传入一个可选的参数作为其回调函数的this绑定,我们可以利用这点,这与第25条中的forEach
 * 例子异曲同工. 所以在这种情况下,修复该Bug的最简单的方法是将外部的 this 绑定通过 map的第二个参数传递给回调函数.
 */
CSVReader.prototype.readFixed = function(str){
    var lines = str.trim().split(/\n/);
    return lines.map(function(line){
        return line.split(this.regexp);
    },this); //forward outer this-binding to callback
}
var readerFixed = new CSVReader();
let fixed = readerFixed.readFixed("g,h,i\nj,k,l\n");
console.log(fixed);

/**
 * 目前,不是所有基于回调函数的API都是考虑周全的,假如map方法不接受这个额外的参数将会怎样?
 * 我们将需要另一种仍然能获取到外部函数this绑定的方式,以便回调函数仍然能引用它.
 * 直接了当的解决方案是使用词法作用域的变量来存储这个额外的外部this绑定的引用.
 */
CSVReader.prototype.readDirect = function(str){
    var lines = str.trim().split(/\n/);
    var self = this; //save a reference to outer this-binding
    return lines.map(function(line){
        return line.split(self.regexp); // use outer this
    })
}
var read_direct = new CSVReader()
let direct = read_direct.readFixed("n,o,p\nq,r,s\n");
console.log(direct);

/**
 * 对于此模式,程序员通常会使用变量名self,以表明该变量的唯一目的是作为当前作用
 * 域的this绑定的额外别名. (此模式其他流行的变量名还有me 和 that).
 */
/**
 * 然而在ES5的环境中,另一种有效的方法是使用回调函数的bind方法. ==>并没有起作用?
 */
CSVReader.prototype.readBind = function(str) {
    var lines = str.trim().split(/\n/);
    return lines.map(function(line){return line.split(this.regexp);}.bind(this)); // bind to outer this-binding
};
var reader_bind = new CSVReader();
let bind = reader_bind.read("t,o,v\nw,x,y\n");
console.log(bind);


/**
 * 1.this变量的作用域总是由其最近的封闭函数所确定.
 * 2.使用一个局部变量(通常命名为self,me或that) 使得this绑定对于内部函数是可用的.
 */