/**
 * JavaScript 对象的核心是一个字符串属性名称与属性值的映射表.
 * 这使得使用对象实现字段易如反掌,因为字典就是可变长的字符串与值的映射集合.
 * JavaScript甚至提供了枚举一个对象属性名的利器 ---- for...in 循环.
 */
var dict = {alice:34,bob:24,chris:62};
var people = [];
for(var name in dict){
    people.push(name + ":" + dict[name]);
}
console.table(people);
/**
 * 但是,每个对象还继承了其原型对象中的属性, for...in循环除了枚举出对象 "自身"的属性外,
 * 还会枚举出继承过来的属性. 例如, 如果我们创建一个自定义的字典并将其元素作为该字典对象
 * 自身的属性来存储会怎么样?
 */
function NaiveDict() {}
NaiveDict.prototype.count = function(){
    var i = 0;
    for(var name in this){//counts every property
        i++;
    }
    return i;
};
NaiveDict.prototype.toString = function(){
    return "[object NaiveDict]";
};
var dict_01 = new NaiveDict();
dict_01.alice = 34;
dict_01.bob = 24;
dict_01.chris = 62;
console.log(dict_01.count());
/**
 * 问题在于我们使用同一个对象来存储NaiveDict数据结构的固定属性(count 和 toString)
 * 和特定字典的变化条目(alice,bob 和 chris). 因此,当调用count来枚举字典的所有属性时,
 * 它会枚举出所有的属性(count,toString,alice,bob和chris), 而不是仅仅枚举出我们关心
 * 的条目. 一个改进的Dict类请参阅45条.
 * 该Dict类实现不是将其元素作为实例属性来存储,取而代之的是提供dict.get(key) 和 dict.set(key,value)
 * 方法. 这一条中,我们重点关注将对象属性作为字典元素的模式.
 * 
 * 一个相似的错误是使用数组类型类型来表示字典, 熟悉Perl 和 PHP等语言的程序员尤其容易掉入这个陷阱.
 * 这些语言中通常将字典称为 "关联数组". 极具欺骗性的是, 由于我们可以给任意类型的JavaScript对象
 * 增加属性, 因此这种使用模式有时似乎能工作.
 */
var dict_02 = new Array();
dict_02.alice = 34;
dict_02.bob = 24;
dict_02.chris = 62;
console.log(dict_02);
/**
 * 不幸的是,这段代码面对原型污染是很脆弱,原型污染是指当枚举字典的条目是,原型对象中的属性
 * 可能会导致出现一些不期望的属性.例如,应用程序中的其他库可能决定增加一些便利的方法到
 * Array.prototype中.
 */
Array.prototype.first = function(){
    return this[0];
}
Array.prototype.last = function(){
    return this[this.length - 1];
}
//现在,尝试枚举数组的元素看看发生什么?
var names = [];
for(var name in dict_02){
    names.push(name);
}
console.log(names);
/**
 * 这告诉我们将对象作为轻量级字典的首要原则是:
 * 应该仅仅将Object的直接实例作为字典,而不是其子类(例如NaiveDict),当然也不是数组.
 * 
 * 例如,我们可以简单地将上例中的 new Array()替换为 new Object(),甚至直接使用空对象
 * 字面量.这样的结果很难受到原型污染的影响.
 */
var dict_03 = {};
dict_03.alice = 34;
dict_03.bob = 54;
dict_03.chris = 78;
var names = [];
for (var name in dict){
    names.push(name);
}
console.log(names);
/**
 * 现在,新版本仍然不能保证对于原型污染是安全的,任何人仍然能增加属性到 Object.prototype 中,
 * 我们又会面对同样的问题,但是通过使用Object的直接实例,我们可以将风险仅仅局限于Object.prototype.
 * 
 * 那么,这种做法为什么更好? 举例来说,正如第47条解释的一样,所有人都不应当增加属性到Object.prototype中,
 * 因为这样做可能会污染 for...in循环. 相比之下, 增加属性到Array.prototype中是合理的.
 * 例如,第42条解释了如何在不支持数组标准方法的环境中将这些方法增加到Array.prototype中,
 * 这些属性会导致污染 for...in 循环. 
 * 类似地,一个用户自定义的类通常也会含有其原型中的属性, 坚持Object 的直接实例原则(总是遵守
 * 第47条的规则)可以使得 for...in 循环摆脱原型污染的影响.
 * 
 * 但是要当心: 正如第44,45 条证实的一样, 这条规则对于构建行为正确的字典是必要非充分的.
 * 虽然轻量级字典很方便, 但是它们却面临许多危险.
 * 
 */

/**
 * 提示
 * 1. 使用对象字面量构建轻量级字典.
 * 2. 轻量级字典应该是 Object.prototype 的直接子类,以使 for...in 循环免受原型污染.
 */