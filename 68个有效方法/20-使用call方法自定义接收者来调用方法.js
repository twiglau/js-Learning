/**
 * 函数对象具有一个内置的方法call来自定义接收者,可以通过函数对象的call方法来调用其自身
 */
var obj = {

}
function f(){
    return 'Hello world!'
}
//console.log(f.call(obj,arg1,arg2,arg3));
//以上行为与直接调用函数自身很类似:
// console.log(f(arg1,arg2,arg3))
//不同的是,第一个参数提供了一个显示的接收者对象.

/**
 * 当调用的方法已经被删除,修改或者覆盖时,call方法就派上用场了. hasOwnProperty方法
 * 可被任意的对象调用,甚至该对象可以是一个字典对象,在字典对象中,查找 hasOwnProperty
 * 属性会得到该字典对象的属性值,而不是继承过来的方法.
 */
var dict = {}
dict.hasOwnProperty = 1;
// console.log(dict.hasOwnProperty("foo")) //error: 1 is not a function
//使用hasOwnProperty方法的call方法使调用字典对象中的方法成为可能,即使hasOwnProperty
//方法并没有存储在该对象中
var hasOwnProperty = {}.hasOwnProperty;
dict.foo = 1;
delete dict.hasOwnProperty;
console.log(hasOwnProperty.call(dict,"foo"));
console.log(hasOwnProperty.call(dict,"hasOwnProperty"));

/**
 * 定义高阶函数是call 方法也特别实用,高阶函数的一个惯用法是接收一个可选的参数作为调用
 * 该函数的接收者,例如,表示键值对列表的对象可能提供名为forEach的方法.
 */
var table = {
    entries:[],
    addEntry:function(key,value){
        this.entries.push({key:key,value:value});
    },
    forEach:function(f,thisArg){
        var entries = this.entries;
        for(var i = 0, n = entries.length; i < n; i++) {
            var entries = this.entries;
            f.call(thisArg,entry.key,entry.value,i);
        }
    }
}

/**
 * 上述例子允许table对象的使用者将一个方法作为table.forEach的回调函数f,并为该方法提供一个合理
 * 的接收者,例如,可以方便地将一个table的内容复制到另一个中.
 * table1.forEach(table2.addEntry,table2);
 * 
 * 这段代码从table2 中提取addEntry 方法(甚至可以从 Table.prototype 或者 table1 中提取),
 * forEach方法将table2作为接收者,并反复调用该 addEntry 方法, 请注意,
 * 
 * 虽然addEntry方法只期望两个参数,但是forEach方法调用它时却传递给他三个三叔: 键,值,索引.
 * 这个多余的索引参数是无害的,因为addEntry方法简单地忽略了它.
 */
 var obj1 = Object.create(table)
Object.defineProperty(obj1,"a",{
    value:1,
    writable:true,
    enumerable:true
})

var obj2 = Object.create(table)
debugger
obj2.forEach(obj1.addEntry,obj1)
console.log({table,obj1,obj2})

//以上理解有误,怎么处理这个问题,并不能复制obj1 属性 --> 到 obj2属性上去.

/**
 * 1.实用call方法自定义接收者来调用函数
 * 2.使用call方法可以调用在给定的对象中不存在的方法.
 * 3.使用call方法定义高阶函数允许使用者给回调函数指定接收者.
 */
