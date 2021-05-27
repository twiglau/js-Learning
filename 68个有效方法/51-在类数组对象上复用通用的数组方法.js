/**
 * Array.prototype中的标准方法被设计成其他对象可复用的方法,即使这些对象并没有继承Array.
 * 事实证明,许多这样的类数组对象接踵而至地出现在JavaScript的不同地方.
 * 
 * 如:函数的arguments对象, 该对象没有继承 Array.prototype.
 * 因此我们不能简单地通过调用 arguments.forEach 方法来遍历每一个参数,取而代之的是,
 * 我们不得不提取出 forEach 方法对象的引用并使用其call方法
 * [请参与第20条]
 */
function highlight(){
    [].forEach.call(arguments,function(widget){
        widget.setBackground("yellow");
    });
}
/**
 * forEach 方法是一个 Function 对象, 这意味着它继承了 Function.prototype 中的 call 方法.
 * 这使得我们可以使用一个自定义的值作为 forEach 方法内部的 this 绑定来调用它
 * (在这个例子中,也就是 arguments 对象),并紧随任意数量的参数(在这个例子中,也就是那个回调函数)
 * 总而言之,这段代码的行为正是我们想要的.
 * 
 * 在Web平台, DOM(Document Object Model) 的NodeList类是另一个类数组对象的实例,
 * 类似document.getElementsByTagName 这样的操作会查询Web页面中的节点,并返回NodeList
 * 作为搜索的结果,像arguments对象一样,NodeList的行为类似数组也没有继承Array.prototype.
 * 
 * 一,那到底怎样使得一个对象 "看起来像数组"呢? 数组对象的基本契约总共有两个简单的规则.
 * 1.具有一个范围在 0 到 2^32 - 1 的整形length 属性
 * 2.length属性大于该对象的最大索引,索引是一个范围在 0 到 2^32 - 2 的整数,它的字符串
 *    表示的是该对象中的一个key.
 * 
 * 这就是一个对象需要实现的与 Array.prototype 中任一方法兼容的所有行为,甚至是一个
 * 简单的对象字面量也可以用来创建一个类数组对象.
 */
var arrayLike = {0:"a",1:"b",2:"c",length:3};
var result = Array.prototype.map.call(arrayLike,function(s){
    return s.toUpperCase();
})
console.log(result)

//二,字符串也表现为不可变的数组,因为它们是可索引的,并且其长度也可以通过length属性获取.
//因此, Array.prototype 中的方法操作字符串时并不会修改原始数组.
var result_str = Array.prototype.map.call("abc",function(s){
    return s.toUpperCase();
});
console.log(result_str);

/**
 * 以上,模拟JavaScript数组的所有行为很精妙,这要归功于数组行为的两个方面.
 * 1. 将length属性值设为小于n 的值会自动地删除索引值大于或等于n 的所有属性.
 * 2. 增加一个索引值为n(大于或等于length属性值)的属性会自动地设置Length属性为n+1.
 */
/**
 * 第二条规则尤其难以完成,因为它需要监控索引属性的增加以自动地更新length属性.
 * 幸运的是, 对于使用 Array.prototype 中的方法,这两条规则都不是必须的,
 * 因为在增加或删除索引属性的时候他们都会强制地更新length属性
 * 
 * 只有一个Array方法不是完全通用的,即数组连接方法 concat. 
 * 该方法可以由任意的类数组接收者调用,但它会检查其参数的 [[Class]] 属性,如果参数将
 * 以一个真实的数组,那么concat会将该数组的内容连接起来作为结果.
 * 否则,参数将已一个单一的元素来连接. 这意味着,例如,我们就不能简单地连接一个以arguments
 * 对象作为内容的数组.
 */
function namesColumn(){
    return ["Names"].concat(arguments);
}
console.log(
    namesColumn("Alice","Bob","Chris")
)
//为了是concat方法将一个类数组对象视为真实的数组, 我们不得不自己转换该数组.
//实现该转换的一个流行而且简洁的惯用法是在类数组对象上调用 slice 方法.
function namesColumn_slice(){
    return ["Names"].concat([].slice.call(arguments));
}
console.log(
    namesColumn_slice("alice","boba","chris","lulan")
)

/** 
 * 1.对于数组对象,通过提取方法对象并使用其call方法来复用通用的Array方法.
 * 2.任意一个具有索引属性和恰当length属性的对象都可以使用通用的Array方法.
 */
